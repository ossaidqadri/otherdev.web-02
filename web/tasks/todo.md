# Performance Fix Plan — otherdev.com

## Context

Lighthouse audit of otherdev.com reveals:
- **TTFB: ~5,000ms** — every request hits MongoDB via Payload, no ISR caching
- **3 render-blocking CSS chunks** — `/_next/static/chunks/*.css` blocking ~1.5s
- **LCP image delayed** — `loading=lazy` + no `fetchpriority=high` on LCP image
- **No R2 preconnect** — extra DNS+TCP+TLS per image
- **`maximum-scale=1`** — blocks zoom, Lighthouse Best Practices failure

**Good news:** On-demand ISR via Payload `afterChange` hooks already exists for Blog and Projects collections.

---

## Tasks

### Task 1 — Add ISR fallback `revalidate = 60` to all public pages
**Impact:** Cuts TTFB from ~5,000ms to <200ms (Vercel Edge cache hit)

| File | Line to add |
|------|-------------|
| `src/app/(app)/page.tsx` | `export const revalidate = 60` after imports |
| `src/app/(app)/work/page.tsx` | `export const revalidate = 60` after imports |
| `src/app/(app)/work/[slug]/page.tsx` | `export const revalidate = 60` after imports |
| `src/app/(app)/blog/page.tsx` | `export const revalidate = 60` after imports |
| `src/app/(app)/blog/[slug]/page.tsx` | `export const revalidate = 60` after imports |
| `src/app/(app)/about/page.tsx` | `export const revalidate = 60` after imports |

**About page note:** Queries Payload global (`getAboutContent()`). ISR will cache the global query too. 60s staleness is acceptable for a portfolio. Full on-demand invalidation for globals requires a separate hook — low priority.

---

### Task 2 — Add R2 preconnect to root layout
**Impact:** ~100-300ms saved per R2 image connection setup

**File:** `src/app/(app)/layout.tsx`
Add inside `<head>` before existing `<link>` tags:
```tsx
<link rel="preconnect" href="https://pub-bb3787984f924b288b4158546c9171fb.r2.dev" crossOrigin="anonymous" />
```

---

### Task 3 — Fix viewport `maximum-scale=1`
**Impact:** Fixes Lighthouse Best Practices failure (accessibility)

**File:** `src/app/(app)/layout.tsx`
In the `viewport` export, remove `maximumScale: 1`:
```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,  ← REMOVE
}
```

---

### Task 4 — Fix LCP image priority on home page
**Impact:** Browser fetches LCP image immediately instead of waiting 2.1s

**File:** `src/app/(app)/page.tsx`

Home page uses `shuffle()` which randomizes card order. Current `priority={index < 8}` means the first 8 cards in shuffled order get priority, but the LCP image (`ads-portfolio-detail-3.webp`) may not be in those first 8 positions.

**Fix:** Always give `priority={index === 0}` to the first card in the shuffled grid. This ensures the first visible card's image starts downloading immediately.

```tsx
<ProjectCard
  priority={index === 0}  // First card always prioritized
  // ...
/>
```

---

### Task 5 — Investigate render-blocking CSS chunks
**Impact:** ~500ms estimated FCP savings if CSS can be deferred

**Problem:** 3 CSS files at `/_next/static/chunks/*.css` (not `/_next/static/css/`). Standard Next.js puts CSS in `/_next/static/css/`. These chunks are `VeryHigh` priority render-blocking and take ~1.5s.

**Likely cause:** Payload admin CSS bundled into frontend build. The `(payload)/` route group is separate but may share the same Next.js build/worker.

**Investigation steps:**
1. Run `bun next build` and inspect the chunk contents
2. Search for imports from `@payloadcms/next/css` or admin components in frontend files
3. Check if Payload components are being imported in Server Components that run on all pages

**Fix options (once identified):**
- Move admin-only CSS to separate build
- Ensure Payload admin routes use their own standalone worker
- Find and remove the cross-contamination of admin CSS into frontend

---

## Implementation Order
1. Task 1 (ISR) → Task 2 (R2 preconnect) → Task 3 (viewport) → Task 4 (LCP) → Task 5 (CSS investigation)

## Verification
Run Lighthouse audit after changes:
- Expected TTFB: <200ms (was ~5,000ms)
- Expected LCP: <2,000ms (was 2,404ms)
- Expected Accessibility score: 100 (was 89)
- Lighthouse failures: 0 (was 4)

## Success Criteria
- [ ] All public pages have `export const revalidate = 60`
- [ ] R2 preconnect present in root layout
- [ ] `maximumScale` removed from viewport export
- [ ] First home page card has `priority={index === 0}`
- [ ] Render-blocking CSS chunks investigated and root cause identified
