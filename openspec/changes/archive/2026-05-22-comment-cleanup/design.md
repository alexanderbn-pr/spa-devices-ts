# Design: Comment Cleanup

## Technical Approach

Per-file, three-step pass: (1) remove JSX section labels and inline "what" comments that restate obvious code, (2) translate preserved JSDoc and "why" comments from Spanish to English, (3) run `eslint --fix` and verify build + tests. Single commit, zero behavior changes.

## Decision Framework

| Category | Remove if | Keep if |
|----------|-----------|---------|
| JSX `{/* ... */}` | Labels structural sections (header, footer, grid) | — |
| Inline `// ...` | Restates obvious code (`// Increment`, `// Filter`) | Explains **why** (architectural intent, optimization rationale, non-obvious pattern) |
| JSDoc | — | All (describes contract / API surface) |
| SCSS `// ...` | Duplicates class name intent | Documents design tokens, section dividers in files >100 lines |
| Test `// ...` | — | Scenario descriptions, setup intent |
| `it('...')` labels | — | All (test intent documentation) |
| Commented-out code | All (none found; rule needed) | — |
| ESLint disables | — | All (with inline rationale) |

## Architecture Decisions

### Decision: Language — Translate all preserved comments to English

**Choice**: English exclusively
**Alternatives considered**: Spanish (preserve status quo), bilingual (keep as-is)
**Rationale**: Code identifiers, function names, and API calls are English. Mixed-language comments are harder to maintain and create cognitive friction. English is the universal standard for open-source and cross-team code. The project's AGENTS.md conventions also use English for code documentation.

### Decision: Translation approach — Minimal, literal, no rewording

**Choice**: Translate only the language, not the content. No elaboration, rewording, or restructuring.
**Rationale**: Prevents scope creep. This is a pure refactor — any semantic change to comment content risks misrepresenting intent. "Keep intent, change language only."

### Decision: JSDoc — Preserve all, translate descriptions only

**Choice**: Keep all JSDoc blocks (params, returns, examples). Translate Spanish descriptions to English. Leave `@param`, `@returns`, TypeScript types untouched since they're already English.
**Rationale**: JSDoc is the function's contract. Removing it degrades DX. Only the prose descriptions need language normalization.

### Decision: SCSS section dividers — Keep in files >100 lines

**Choice**: Keep SCSS section header comments (e.g., `// ─── Image Section ───`) only in files exceeding 100 lines. Remove obvious dividers in smaller files.
**Alternatives considered**: Remove all, keep all
**Rationale**: Section headers aid navigation in long files (e.g., `device-list.scss` at 196 lines, `theme.scss` at 245 lines). In small files like `DeviceTableSkeleton.scss` (72 lines), they're unnecessary.

## File Changes

| File | Action | Changes |
|------|--------|---------|
| `src/components/table/Table.jsx` | Modify | Remove 3 JSX labels, translate JSDoc |
| `src/components/deviceTable/DeviceTable.jsx` | Modify | Remove 4 inline comments, translate JSDoc |
| `src/components/deviceTable/DeviceTableSkeleton.jsx` | Modify | Remove 5 JSX labels, translate JSDoc |
| `src/components/deviceList/DeviceListSkeleton.jsx` | Modify | Remove 3 JSX labels, translate comment |
| `src/components/ui/EmptyState/EmptyState.jsx` | Modify | Translate JSDoc @example |
| `src/components/ui/Card/Card.jsx` | Modify | Translate JSDoc |
| `src/components/error/ErrorBoundary.jsx` | Modify | JSDoc already English — no changes |
| `src/features/devices/pages/device/DevicePage.jsx` | Modify | Remove 2 JSX labels |
| `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` | Modify | Remove 8 JSX labels |
| `src/features/devices/pages/deviceTable/DeviceTablePage.jsx` | Modify | Remove 2 JSX labels, translate JSDoc |
| `src/hooks/useDevices.js` | Modify | Translate JSDoc |
| `src/hooks/useDevicesSearch.js` | Modify | Translate JSDoc |
| `src/hooks/useDeviceDetails.js` | Modify | Translate JSDoc |
| `src/hooks/useDeviceOptions.js` | Modify | Translate JSDoc |
| `src/hooks/useCart.js` | Modify | Translate 7 inline comments + JSDoc |
| `src/hooks/useTableState.js` | Modify | Remove 14 inline "what" comments, translate JSDoc |
| `src/hooks/useBreadcrumbDevice.js` | Modify | Translate JSDoc |
| `src/hooks/useToast.js` | Modify | JSDoc already English — no changes |
| `src/hooks/useTranslation.js` | Modify | JSDoc already English — no changes |
| `src/hooks/useCartContext.jsx` | Modify | No comments — no changes |
| `src/contexts/ToastContext.jsx` | Modify | JSDoc already English — no changes |
| `src/lib/query-keys.js` | Modify | JSDoc already English — no changes |
| `src/utils/table-helpers.js` | Modify | Translate JSDoc |
| `src/style/theme.scss` | Modify | All comments English — no changes |
| `src/style/mixins.scss` | Modify | Section headers English — no changes |
| `src/components/table/Table.scss` | Modify | Translate 3 SCSS comments |
| `src/components/deviceTable/DeviceTableSkeleton.scss` | Modify | Remove obvious skeleton comments, keep section headers |
| `src/components/deviceList/device-list.scss` | Modify | Section headers English — no changes |
| `src/hooks/useDevices.test.jsx` | Modify | Translate 5 comments + 2 test descriptions |
| `src/hooks/useTableState.test.js` | Modify | JSDoc + test comments English — no changes |
| `src/components/error/ErrorBoundary.test.jsx` | Modify | Comments English — no changes |
| `src/features/devices/pages/device/DevicePage.test.jsx` | Modify | JSDoc English — no changes |
| `src/features/devices/pages/deviceDetails/DeviceDetailsPage.test.jsx` | Modify | JSDoc English — no changes |
| `src/features/devices/pages/deviceTable/DeviceTablePage.test.jsx` | Modify | JSDoc English — no changes |

**Totals**: 33 modified, 0 new, 0 deleted

## Translation Strategy

1. **Technical terms preserve as-is**: `debounce`, `staleTime`, `gcTime`, `optimistic update`, `queryKey`, `Suspense`, `skeleton`, `shimmer`, `toast`, `breadcrumb`
2. **Component/API names preserve as-is**: `DeviceTable`, `ErrorBoundary`, `CartProvider`, `useSuspenseQuery`
3. **JSDoc**: Translate `@description` and prose, leave `@param`/`@returns`/types untouched
4. **Test descriptions**: `it('devuelve...')` → `it('returns...')`; `// Mock del servicio` → `// Mock service`
5. **SCSS**: `// Filas clickables` → `// Clickable rows`; `// Sin datos` → `// No data`

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Build | TypeScript compilation | `npm run build` — must pass with 0 errors |
| Lint | ESLint | `npm run lint` — must pass with 0 new warnings |
| Tests | All existing tests | `npm run test:run` — must pass unchanged |

No new tests needed. This is a pure comment refactor. Verification ensures no accidental code changes.

## Rollback

Single commit `5e53257`. Revert: `git revert <sha>`.

## Migration / Rollout

No migration required. Single commit, direct push.

## Open Questions

None.
