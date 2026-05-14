# Code Modernization Plan

## Context

Audit of 20 shadcn/ui components + full codebase scan via 4 parallel subagents + ctx7 research on TypeScript, React, error handling, and Next.js best practices. Committed Base vs Radix fixes in `a56ae207`. Now planning fixes for remaining high/medium severity issues.

---

## HIGH Priority

### 1. TypeScript — Discriminated Unions to eliminate `as any` casts
**Files:** `src/server/lib/chat/stream-handler.ts`, `src/lib/groq-citations.ts`, `src/components/chat-core.tsx`
**Why:** 12 High severity `as` casts — the root cause is `ModelMessage.content` union being untyped
**Pattern (from ctx7):**
```typescript
type TextPart = { type: 'text'; text: string }
type ImagePart = { type: 'image'; image: { url: string; mediaType?: string } }
type FilePart = { type: 'file'; file: { url: string; mediaType: string; filename?: string } }
type MessageContent = TextPart | ImagePart | FilePart
// Then: if (part.type === 'image') { part.image.url } // no cast needed
```

### 2. Env var crash risk — fail-fast on missing API keys
**File:** `src/server/lib/chat/stream-handler.ts`
**Why:** `process.env.GROQ_API_KEY!` — missing env crashes prod cold
**Pattern:** Validate at module load, throw descriptive error if missing

### 3. RAG cache poisoning — throw on cache failure
**File:** `src/server/lib/rag/embeddings.ts`
**Why:** `return null` from cached function poisons persistent cache
**Pattern:** `throw new Error()` instead; callers use `.catch(() => null)` for graceful degradation

### 4. XSS — DOMPurify on CMS content
**File:** `src/app/(app)/blog/[slug]/page.tsx`
**Why:** `dangerouslySetInnerHTML` on Payload `contentHtml` without sanitization
**Pattern:** `import DOMPurify from 'dompurify'` then `DOMPurify.sanitize(contentHtml)`

---

## MEDIUM Priority

### 5. DRY — Extract `suggestionDataSchema` to shared module
**Files:** 4 copies in `stream-handler.ts`, `stream/route.ts`, `native/route.ts`, `chat-core.tsx`
**Fix:** Create `src/lib/schemas.ts` with shared schema + infer TypeScript type

### 6. DRY — Delete dead `sliceMessagesAtId`
**File:** `src/server/lib/chat/message-utils.ts`
**Why:** Zero usages, `replaceMessageAtId` handles the same use case

### 7. DRY — Consolidate `createArtifactTool`
**Files:** `src/server/lib/artifact-tool.ts` (unused) vs `src/server/lib/chat/tools.ts`
**Fix:** Delete `artifact-tool.ts`, single import from `tools.ts`

### 8. DRY — Rate limit error string magic
**Files:** 3 copies in chat routes + `stream-handler.ts`
**Fix:** Extract to `src/server/lib/rate-limit.ts`

### 9. React perf — `React.memo` on chat subcomponents
**Files:** `chat-core.tsx` — `AssistantMessage`, `UserMessage`, `SuggestionButton`
**Pattern (from ctx7):**
```typescript
const AssistantMessage = memo(function AssistantMessage({ message, setActiveArtifact, ... }) { ... })
```

### 10. React perf — `useCallback` for inline handlers in map
**File:** `prompt-suggestions.tsx` — `onClick={() => append(...)` in map
**Fix:** `const handleClick = useCallback((content) => append({ role: 'user', content }), [append])`

### 11. React perf — `React.memo` on `PromptSuggestions`
**File:** `src/components/ui/prompt-suggestions.tsx`
**Fix:** Wrap in `memo()` to prevent re-render when parent re-renders

### 12. Error handling — Silent catch blocks in AI tools
**File:** `src/server/lib/chat/tools.ts`
**Why:** `retrieveKnowledgeTool.execute` and `tavilySearchTool.execute` silently swallow errors
**Fix:** Log errors + return structured error result instead of silently catching

### 13. DRY — `SITE_URL` duplicated
**Files:** `src/lib/constants.ts` vs `src/lib/metadata.ts`
**Fix:** Import from `constants.ts`, remove hardcoded value from `metadata.ts`

### 14. DRY — Footer social link CSS duplicated 3x
**File:** `src/components/footer.tsx`
**Fix:** Extract to constant, apply via `className={SOCIAL_LINK_CLASS}`

### 15. Error handling — Transcribe API error leakage
**File:** `src/app/(app)/api/transcribe/route.ts:81-90`
**Why:** `errorMessage` exposed directly to client
**Fix:** Generic error message + server-side logging

---

## LOW Priority

### 16. Next.js Image — `style={{ width: 'auto', height: 'auto' }}` overrides explicit dimensions
**File:** `chat-core.tsx:369, 512, 582, 1087`
**Why:** Avatar images have `width={32} height={32}` but also `style={{ width: 'auto', height: 'auto' }}` — contradictory, likely a bug
**Fix:** Remove the `style` overrides

### 17. Next.js Image — Missing `sizes` prop on avatar images
**File:** `chat-core.tsx`
**Fix:** Add `sizes="32px"` to prevent unnecessary full-resolution loads

### 18. Next.js — Missing `generateStaticParams` on dynamic routes
**Files:** `work/[slug]/page.tsx`, `blog/[slug]/page.tsx`
**Fix:** Add `generateStaticParams` if collection sizes are reasonable (<1000)

---

## Implementation Order
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17 → 18

## Verification
- [ ] No `as any` casts remaining in `stream-handler.ts`, `groq-citations.ts`
- [ ] `tsc --noEmit` passes with no new errors
- [ ] `GROQ_API_KEY` missing → clear error at startup, not runtime crash
- [ ] RAG cache misses throw (not return null), callers use `.catch(() => null)`
- [ ] DOMPurify wraps CMS content in blog slug page
- [ ] `suggestionDataSchema` imported from `src/lib/schemas.ts` in all 4 files
- [ ] `sliceMessagesAtId` deleted from `message-utils.ts`
- [ ] `artifact-tool.ts` deleted, routes import from `tools.ts`
- [ ] `AssistantMessage`, `UserMessage`, `SuggestionButton` wrapped in `memo()`
- [ ] `PromptSuggestions` wrapped in `memo()` + `useCallback` for handler