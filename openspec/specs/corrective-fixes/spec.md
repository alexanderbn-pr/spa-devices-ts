# Corrective Fixes Specification

## Requirements

### Requirement: Grid — Max 4 Items Per Row

PLP grid MUST use `repeat(4, 1fr)` on desktop (≥1200px), 2 columns on tablet (768–1199px), 1 on mobile (<768px).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Desktop | viewport ≥1200px | PLP renders | `grid-template-columns: repeat(4, 1fr)` |
| Tablet | viewport 768–1199px | PLP renders | 2 columns |
| Mobile | viewport <768px | PLP renders | 1 column |

### Requirement: ErrorBoundary — No Dead Code

ErrorBoundary MUST be a pure class component. MUST NOT contain `setError` or unused hooks. MUST handle `componentDidCatch`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Normal render | no error | renders | children display |
| Catch error | child throws | componentDidCatches | fallback UI shows |
| No dead code | source reviewed | static analysis | `setError` absent |

### Requirement: No `'use client'` Directives

No `.js` or `.jsx` file MAY contain `'use client'`. Pure SPA has no RSC architecture.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| All clear | full project | grep `'use client'` | zero matches |

### Requirement: `useDeviceDetails` — Fetching Only

Hook MUST handle only TanStack Query fetching. `storageSelected`/`colorSelected` state MUST live in the consuming component.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Clean return | hook called | returns | `{ device, isLoading, error }` shape |
| UI state separate | PDP renders | user selects storage | state managed in page, not hook |

### Requirement: Breadcrumb — No Fetching

Breadcrumb MUST use a lightweight hook (`useBreadcrumbDevice`) that shares the same TanStack Query `queryKey` as `useDeviceDetails` to reuse cached data. MUST NOT fetch data independently.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| No duplicate fetch | PDP renders | network tab | zero additional XHR from Breadcrumb |
| Cache reuse | useDeviceDetails already fetched | Breadcrumb renders | name shows using cached data |

### Requirement: Table — i18n Strings

Table MUST use `useTranslation()` for all visible strings: "Buscar...", "Anterior", "Siguiente", "No se encontraron resultados".

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Placeholder | component renders | inspect input | `t('table.search')` |
| Pagination | renders with pages | inspect buttons | `t('table.previous')`, `t('table.next')` |
| Empty state | no results | renders | `t('table.noResults')` |

### Requirement: `test:run` Script

`package.json` MUST define `test:run` → `vitest run` (single-run mode).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Single run | `npm run test:run` | executes | vitest runs once and exits |

### Requirement: Integration Tests

Integration tests MUST cover: (1) PLP loads device grid, (2) search filters results, (3) PDP shows detail with storages/colors, (4) Add to Cart from PDP.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| PLP loads | mock returns devices | page renders | cards in grid |
| Search filters | user types | debounce fires | list filtered |
| PDP detail | user clicks device | PDP renders | name, price, storages visible |
| Add to Cart | user clicks add | mutation succeeds | cart count up, toast shown |

### Requirement: README — Accurate Stack

README MUST state JavaScript ES6 + PropTypes (not TypeScript), React Context (not Zustand).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| No TS mention | README reviewed | tech stack section | TypeScript/Zustand absent |
| JS stated | README reviewed | tech stack section | JavaScript stated |
