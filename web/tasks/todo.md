# Bun Test Implementation Plan

## Status: In Progress (4 subagents running)

### Phase 1: Fix Test Infrastructure
- [x] Update package.json test script: bun test (was jest)
- [x] Remove tsconfig.json exclusions for test files

### Phase 2: Coverage (4 subagents running)
| Area | Status |
|------|--------|
| Lib/Hooks | Running |
| API Routes | Running |
| RAG/Chat | Running |
| UI Components | Running |

### Bun Test Patterns (from ctx7 docs)
import { test, expect, describe, beforeAll, afterEach, mock, spyOn } from 'bun:test'

describe('utils', () => {
  test('cn merges classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})

### Output Structure
src/
- lib/__tests__/         (utils.test.ts, schemas.test.ts)
- hooks/__tests__/       (use-mobile.test.ts, etc.)
- server/lib/chat/__tests__/  (message-utils.test.ts)
- server/lib/rag/__tests__/   (embeddings.test.ts, vector-search.test.ts)
- components/__tests__/   (chat-core.test.tsx, etc.)
- app/(app)/api/         (route tests)

### Next Steps
- [ ] Wait for subagents to complete
- [ ] Run bun test to verify
- [ ] Run bun test --coverage for coverage report
- [ ] Fix any test failures
