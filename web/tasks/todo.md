# Qdrant Setup Fixes — Plan

## Context

Audit of the Qdrant setup in this project revealed three actionable issues:

1. **No payload indexes** — `type`, `category`, `subtype`, `project` fields have no indexes, so filtered searches brute-force scan all payload
2. **`deleteAllDocuments()` drops + recreates collection** — fine for ingest scripts, but bad pattern if this were ever called on a live system
3. **KB version SHA computed but discarded** — `computeKbVersion()` result (`_kbVersion`) is never stored or used

The project uses Qdrant Cloud (EU-central-1 AWS), `@qdrant/js-client-rest` v1.17.0, collection `otherdev_documents` with 1536-dim Cosine vectors, ~1660 documents from `knowledge-base.ts`.

---

## Changes

### Step 1 — Add payload indexes on collection create
**File:** `src/server/lib/rag/vector-search.ts`

Add `payload_indexes` to `createCollection` call for fields used in filtered searches:

```typescript
// Fields commonly filtered: type, category, subtype, project
// Optional but frequently used in RAG flows: source, year
await qdrant.createCollection('otherdev_documents', {
  vectors: { size: 1536, distance: 'Cosine' },
  payload_indexes: [
    { fields: ['metadata.type'], field_type: 'keyword' },
    { fields: ['metadata.category'], field_type: 'keyword' },
    { fields: ['metadata.subtype'], field_type: 'keyword' },
    { fields: ['metadata.project'], field_type: 'keyword' },
  ],
})
```

> **Tradeoff:** Payload indexes increase memory usage. For 1660 docs this is negligible. Indexes are built as data is upserted, so there's no blocking rebuild.

---

### Step 2 — Replace `deleteAllDocuments()` with `delete_points` + recreate collection only if needed
**File:** `src/server/lib/rag/vector-search.ts`

Current `deleteAllDocuments()`:
- Deletes the entire collection (drop)
- Recreates it from scratch (no indexes)

New approach:
- **Option A (recommended):** Use `delete_points` by filter to remove all points without dropping the collection or losing index configuration. Then re-create indexes if the collection was truly empty.
- **Option B:** Keep drop/recreate but make it explicit — rename to `resetCollection()` with a comment explaining this destroys indexes and should only be used in ingest scripts.

> **Tradeoff:** Option A preserves collection config (including newly added payload indexes) across ingest runs. Option B is simpler and matches current behavior — fine for an ingest-only script. Given this is only called from the ingest script, Option B is cleaner and the naming makes the intent clear.

---

### Step 3 — Wire KB version to something or remove it
**File:** `scripts/ingest-documents.ts`

Current: `computeKbVersion()` computes a SHA-256 hash of the knowledge base content and stores it in `_kbVersion`, which is then discarded.

Options:
- **Option A (remove):** Delete the unused `computeKbVersion()` function since it has no consumer
- **Option B (wire up):** Store the version in Redis/Upstash alongside the embedding cache, so on next run you can skip re-ingesting if the KB hasn't changed

> **Tradeoff:** Option A is the minimal correct fix. Option B adds real cache invalidation but introduces a dependency on Upstash being available during ingest. Given ingest is run manually (not on every deploy), Option A is sufficient.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/server/lib/rag/vector-search.ts` | Add payload indexes to `createCollection`, rename `deleteAllDocuments` to `resetCollection` with comment |
| `scripts/ingest-documents.ts` | Remove `computeKbVersion()` |

## Verification

1. Run `bun run clear && bun run ingest` locally
2. Query Qdrant collection info to confirm payload indexes exist
3. Test a filtered search (e.g., `type: 'project'`) and confirm it uses the index
4. Confirm ingest still completes with same doc count (~1660)

## Success Criteria

- [ ] Payload indexes exist on `metadata.type`, `metadata.category`, `metadata.subtype`, `metadata.project`
- [ ] Ingest script still runs successfully end-to-end
- [ ] No functional changes to the actual search behavior (only structural improvements)
