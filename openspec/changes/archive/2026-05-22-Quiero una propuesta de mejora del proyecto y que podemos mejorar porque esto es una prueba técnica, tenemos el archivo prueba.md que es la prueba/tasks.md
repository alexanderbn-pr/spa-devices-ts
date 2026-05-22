# Tasks: Corrección y pulido del proyecto spa-devices

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~383 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

Decision needed before apply: No
Chained PRs recommended: No
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Quick fixes + Refactors | Single PR | Block 1 & 2 — no behavioral changes, well-scoped |
| 2 | Integration tests | Same PR | Block 3 — depends on refactored components |

## Phase 1: Quick Fixes (bajo riesgo, sin dependencias)

- [x] 1.1 **Grid CSS** — `device-list.scss`: cambiar `repeat(auto-fit, minmax(320px, 1fr))` a `repeat(4, 1fr)` + media queries (1200px, 1024px, 768px, 480px)
- [x] 1.2 **Remove `'use client'`** — eliminar directiva de 9 archivos: ErrorBoundary.jsx, breadcrumb.jsx, DevicePage.jsx, DeviceDetailsPage.jsx, header.jsx, EmptyState.jsx, Card.jsx, ToastProvider.jsx, ToastContext.jsx
- [x] 1.3 **Add `test:run`** — `package.json`: añadir `"test:run": "vitest run"` en scripts
- [x] 1.4 **Fix README** — tech stack: eliminar TypeScript → JavaScript ES6 + PropTypes; eliminar Zustand → React Context

## Phase 2: Refactors (riesgo medio, modificar patrones rotos)

- [x] 2.1 **ErrorBoundary** — `ErrorBoundary.jsx`: convertir a clase pura con `componentDidCatch` + `getDerivedStateFromError`; eliminar `setError` muerto y función wrapper `ErrorBoundaryWrapper`; eliminar `'use client'`
- [x] 2.2 **useDeviceDetails** — `useDeviceDetails.js`: eliminar `storageSelected`/`colorSelected`/storages/colors state y effects; hook retorna solo `{ deviceDetails, isLoading, isError, refetch }`
- [x] 2.3 **useDeviceOptions** — CREAR `src/hooks/useDeviceOptions.js`: recibe `deviceDetails`, maneja `storages`, `colors`, `storageSelected`, `colorSelected`, default selection effects
- [x] 2.4 **useBreadcrumbDevice** — CREAR `src/hooks/useBreadcrumbDevice.js`: hook TanStack Query mínimo que fetchea device name usando misma `queryKey`, reusa caché existente; retorna `{ modelName, isLoading }`
- [x] 2.5 **Breadcrumb** — `breadcrumb.jsx`: reemplazar `useDeviceDetails(id)` por `useBreadcrumbDevice(id)`; eliminar `'use client'`
- [x] 2.6 **DeviceDetailsPage** — `DeviceDetailsPage.jsx`: consumir `useDeviceOptions` para storages/colors/selection; eliminar esas props de `useDeviceDetails`; eliminar `'use client'`
- [x] 2.7 **Table i18n** — `Table.jsx`: añadir `useTranslation()`, reemplazar strings hardcodeados (`"Buscar..."`, `"Anterior"`, `"Siguiente"`, `"No se encontraron resultados"`)
- [x] 2.8 **Locale keys** — `es.json` + `en.json`: añadir keys `table.searchPlaceholder`, `table.noResults`, `table.previous`, `table.next`, `table.pageInfo`

## Phase 3: Integration Tests (Vitest + RTL)

- [x] 3.1 **PLP: carga** — `DevicePage.test.jsx` CREAR: mock `useDevices` retorna N dispositivos, renderizar con MemoryRouter, verificar N cards en el grid
- [x] 3.2 **PLP: búsqueda** — `DevicePage.test.jsx`: simular input de búsqueda, verificar que lista se filtra
- [x] 3.3 **PLP: navegación** — `DevicePage.test.jsx`: click en card, verificar `navigate` llamado con ID correcto
- [x] 3.4 **PLP: loading** — `DevicePage.test.jsx`: mock `isLoading: true`, verificar skeleton presente
- [x] 3.5 **PLP: error** — `DevicePage.test.jsx`: mock `isError: true`, verificar mensaje + retry button
- [x] 3.6 **PDP: detalle** — `DeviceDetailsPage.test.jsx` CREAR: mock `useDeviceDetails` + `useDeviceOptions`, verificar brand, model, specs visibles
- [x] 3.7 **PDP: selectores** — `DeviceDetailsPage.test.jsx`: verificar botones color/storage renderizados y actualizan selección al click
- [x] 3.8 **PDP: add to cart** — `DeviceDetailsPage.test.jsx`: click en add-to-cart, verificar `addToCart` llamado con id/colorCode/storageCode
- [x] 3.9 **PDP: loading + error** — `DeviceDetailsPage.test.jsx`: mock loading skeleton; mock error + reload button
