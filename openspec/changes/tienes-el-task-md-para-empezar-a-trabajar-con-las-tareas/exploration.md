# Exploration: Project Audit — "tienes el task.md para empezar a trabajar con las tareas"

## Current State Summary

The project is a well-structured React 19 SPA for a device catalog. It uses modern patterns (TanStack Query, Suspense, code splitting, Error Boundaries), has a consistent Apple-inspired design system, and follows reasonable file organization. However, there's significant room for improvement in all 8 audit areas.

---

## 1. Performance

### Current State
- ✅ `React.memo` applied to `Device` and `DeviceList`
- ✅ `useMemo` used in `useDevices` (filtering) and `useDeviceDetails` (storages/colors)
- ✅ `useCallback` not needed yet (no handlers passed to memoized children)
- ✅ `useOptimistic` — NOT implemented. Cart uses optimistic update via TanStack Query `onMutate`, but no `useOptimistic` hook from React 19
- ✅ Code splitting via `React.lazy()` on all 3 routes
- ✅ `Suspense` wrapping all lazy routes with skeleton fallbacks

### Issues Found
| File | Issue | Severity |
|------|-------|----------|
| `src/components/deviceList/deviceList.jsx` | `key={device.id}` should be on outer element (line 9) | Medium |
| `src/services/getDevices.js` | No `AbortController` support for fetch cancellation | Low |
| `src/services/getDeviceDetails.js` | No `AbortController` support for fetch cancellation | Low |
| `src/hooks/useDeviceDetails.js` | `useEffect` for defaulting selections — React 19 prefers `useReducer` or local state | Low |

### Recommendation
The `useOptimistic` hook from React 19 should replace the manual TanStack Query optimistic pattern for cart updates. Add `AbortController` to service fetch calls.

---

## 2. Structure

### Current State
```
src/
├── components/          # Reusable UI
│   ├── deviceList/      # ✅ Well organized (component + styles + skeleton)
│   ├── deviceTable/     # ✅ Well organized
│   ├── table/           # ✅ Generic reusable table
│   ├── header/          # ✅ Simple, good
│   ├── search/          # ✅ Simple, good
│   └── breadcrumb/      # ✅ Simple, good
├── pages/               # Route pages
│   ├── device/          # ✅ Has page + styles
│   ├── deviceDetails/   # ✅ Has page + styles
│   └── device-table/    # ✅ Has page + styles
├── hooks/               # Custom hooks
├── services/            # API per domain
├── style/               # Global SCSS (theme + mixins)
├── locales/             # i18n JSON files (empty)
├── features/            # Feature-based structure (EMPTY — duplicate folders)
│   └── devices/
│       ├── components/device-table/   # Empty folder
│       └── pages/device-table/        # Empty folder
├── types/               # Empty directory
├── lib/                 # query-keys.js
└── utils/              # table-helpers.js
```

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **Dual structure** | High | `pages/` and `features/` coexist — `features/devices/` has empty folders, `pages/` has the actual files. Migration needed. |
| **No generic Card component** | Medium | `device.jsx` is a specific card, but there's no reusable `Card` with `{children}` pattern. Currently 420px min-height, which could limit reuse. |
| **`types/` empty** | Medium | No TypeScript type definitions. Project uses `.js` (not `.tsx`) files. Only `useTableState.js` has JSDoc types. |
| **`constants.js` mix** | Low | Mixed exports (constants + cart key + expiration). Could separate into `constants/` directory. |
| **`pages/` duplicate** | Low | `pages/device-table/` and `pages/device-table/DeviceTablePage.jsx` same name; also `device-table` vs `device-table/DeviceTablePage.jsx` inconsistency. |

### Recommendation
Migrate from flat `pages/` to `features/` structure. Extract generic `Card` component. Add TypeScript types. Normalize file naming.

---

## 3. Error Handling

### Current State
- ✅ Error Boundaries implemented in `device.jsx` and `DeviceTablePage.jsx` as class components
- ⚠️ Each page defines its own `ErrorBoundary` — code duplication
- ✅ Skeleton fallbacks for Suspense
- ✅ DeviceDetails has manual `isError` check with retry button

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **Duplicated ErrorBoundary** | High | Same `DeviceErrorBoundary` class code appears in `device.jsx` and `DeviceTablePage.jsx`. Should be a shared component. |
| **No global ErrorBoundary** | High | No root-level ErrorBoundary in `App.jsx` or `main.jsx` for uncaught errors. |
| **No error logging** | Medium | Error boundaries don't log to console or external service. |
| **DeviceDetails inline error** | Low | `isErrorDeviceDetails` check is fine but could use a shared error state component. |

### Recommendation
Extract `ErrorBoundary` to `src/components/error/ErrorBoundary.jsx`. Add global ErrorBoundary in `App.jsx`. Add toast notification on error.

---

## 4. Accessibility (a11y)

### Current State
- ✅ `aria-label` on device card
- ✅ `tabIndex={0}` + `onKeyDown` for keyboard navigation on cards
- ✅ `role="button"` on device card
- ✅ `aria-label` on search input
- ✅ `aria-label` on color radiogroup
- ✅ `aria-pressed` on color/storage selectors
- ✅ `aria-hidden` on decorative elements (arrows, icons)
- ✅ `aria-label` on nav elements
- ✅ Semantic `<article>`, `<section>`, `<header>`, `<nav>`, `<main>` used in most places
- ✅ Focus-visible styles in SCSS
- ✅ `role="radiogroup"` on color and storage selectors

### Issues Found
| Issue | Severity | Location | Description |
|-------|----------|----------|-------------|
| **`<div>` for cart icon** | Medium | `header.jsx:24` | `<aside class="header-cart">` contains `<img>` — should be `<button>` for cart interaction. |
| **Logo link no label** | Low | `header.jsx:15` | `<Link>` wraps logo — `aria-label` on `img` exists but link itself should also describe intent ("Ir a inicio" or similar). |
| **`aria-label="Buscar libro"`** | Medium | `search.jsx:12` | Copy error — says "libro" instead of "dispositivo". |
| **No skip link** | Low | Global | Missing "Saltar al contenido" skip link for keyboard users. |
| **Table image alt** | Low | `DeviceTable.jsx:22` | `alt={device.model}` is OK but could be more descriptive: `${device.brand} ${device.model}` |
| **No `role` on custom table** | Low | `Table.jsx` | Table is semantic `<table>` — OK, but no `role="grid"` if it has interactive features. |

### Recommendation
Fix copy errors and improve cart button semantics. Add skip link. Review all aria-labels for accuracy.

---

## 5. Asset Optimization

### Current State
- ⚠️ No `loading="lazy"` on images — images load eagerly
- ❌ No WebP/AVIF optimization
- ✅ Code splitting via `React.lazy()` implemented
- ⚠️ No preload hints for critical assets
- ⚠️ Images served from API (`device.imgUrl`) — external control

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **No lazy loading on images** | Medium | All `<img>` tags missing `loading="lazy"` |
| **No width/height on images** | Medium | Device card image has no explicit dimensions — causes layout shift potential |
| **No modern format** | Medium | No WebP/AVIF — relies on API source |
| **No picture/srcset** | Low | No responsive image variants |
| **No preload** | Low | Critical fonts or hero images not preloaded |

### Recommendation
Add `loading="lazy"` to all non-hero images. Add explicit `width`/`height` to prevent CLS. Add `<picture>` with WebP sources if API supports it.

---

## 6. UX / Feedback

### Current State
- ✅ Skeleton loaders in place (DeviceListSkeleton, DeviceTableSkeleton)
- ⚠️ `aria-hidden="true"` on skeleton (good)
- ✅ Empty state in Table (`no-data` class)
- ❌ **No toast notifications** — cart add/success/error has no user feedback
- ❌ No loading state for button during cart mutation (button shows "Añadiendo..." but no spinner)
- ⚠️ DeviceDetails loading state: `<div className="loading">Cargando...</div>` (plain div, not skeleton)

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **No toast system** | High | Cart mutation has no visible success/error toast |
| **Loading spinner on button** | Medium | "Añadiendo..." text only — no spinner during mutation |
| **DeviceDetails loading** | Medium | Uses `<div className="loading">` instead of skeleton component |
| **No empty state on DeviceList** | Medium | If `devices` array is empty, nothing renders (no EmptyState component) |

### Recommendation
Add a toast notification system (simple context-based or use a library). Create a `LoadingSpinner` component for buttons. Add `EmptyState` component for when no devices match search.

---

## 7. i18n (Internationalization)

### Current State
- ✅ `locales/` folder exists with `en.json` and `es.json`
- ❌ Both JSON files are **empty** `{}`
- ❌ No i18n integration — all text is hardcoded in Spanish

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **No i18n library** | High | No `react-i18next`, `react-intl`, or similar |
| **Empty locale files** | High | `en.json` and `es.json` have no content |
| **Hardcoded Spanish** | High | All UI text ("Dispositivos", "Ver detalles", "Añadir al carrito", etc.) is hardcoded |

### Recommendation
Integrate `react-i18next` or `@react-intl/universal`. Define all UI strings in `locales/es.json` and `locales/en.json`. Create a `useTranslation` hook wrapper.

---

## 8. Documentation

### Current State
- ❌ No README.md
- ❌ No Storybook
- ❌ No contributing guidelines
- ⚠️ No JSDoc on most components (except `useTableState.js`)
- ✅ Code has good inline comments in some files

### Issues Found
| Issue | Severity | Description |
|-------|----------|-------------|
| **No README** | High | Missing project documentation |
| **No Storybook** | Medium | Not critical for a small project, but would help document components |
| **No API documentation** | Medium | No endpoint documentation |
| **Inconsistent JSDoc** | Low | Some files have JSDoc, others don't |

### Recommendation
Create a professional README.md with: installation, dev commands, architecture overview, folder structure, conventions. Consider Storybook if the project grows.

---

## Affected Areas by Category

| Category | Files Affected |
|----------|---------------|
| **Performance** | `src/hooks/useDeviceDetails.js`, `src/services/*.js` |
| **Structure** | `src/pages/*`, `src/features/devices/*`, `src/components/`, `src/types/` |
| **Error Handling** | `src/pages/device/device.jsx`, `src/pages/device-table/DeviceTablePage.jsx`, `src/App.jsx` |
| **Accessibility** | `src/components/header/header.jsx`, `src/components/search/search.jsx`, `src/components/deviceList/device.jsx`, `src/components/table/Table.jsx` |
| **Asset Optimization** | `src/components/deviceList/device.jsx`, `src/components/deviceTable/DeviceTable.jsx`, `src/pages/deviceDetails/deviceDetails.jsx` |
| **UX/Feedback** | `src/App.jsx`, `src/pages/deviceDetails/deviceDetails.jsx`, `src/components/` |
| **i18n** | All `.jsx` files with hardcoded Spanish text |
| **Documentation** | Project root — needs README, Storybook config |

---

## Risks

1. **i18n is a breaking change** — adding it requires wrapping all text strings across every component. Should be done before project scales.
2. **Structure migration** — moving from `pages/` to `features/` requires updating all imports in `App.jsx`. Low risk with careful migration.
3. **Toast system** — introducing a new notification system adds a dependency. Simple context-based toast is low-cost.
4. **No TypeScript** — project uses `.js` files. Adding types requires conversion or JSDoc. Could be optional improvement.

---

## Ready for Proposal

**Yes** — This audit provides all findings needed to create a structured proposal. The work is well-scoped and can be phased:

1. **Phase 1 (Quick Wins)**: Error handling consolidation, a11y fixes, SCSS organization
2. **Phase 2 (Core Improvements)**: Toast system, i18n setup, structure migration
3. **Phase 3 (Polish)**: Performance fine-tuning, documentation, Storybook

Each phase can be a separate PR to keep review workload manageable.