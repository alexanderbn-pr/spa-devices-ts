# Design: Corrección y pulido del proyecto spa-devices para alinearlo con la prueba técnica

## Technical Approach

Refactor correctivo en 3 bloques paralelizables: (1) quick fixes de bajo riesgo, (2) refactors de patrón medio, (3) tests de integración. Cada bloque en commits individuales para permitir rollback granular. Sin cambios de comportamiento visible — solo corrección de deuda técnica, patrones rotos, y desalineación con `prueba.md`.

---

## Architecture Decisions

| # | Decision | Alternatives | Rationale |
|---|----------|--------------|-----------|
| 1 | Grid: `repeat(4, 1fr)` + `@media` queries | Mantener `auto-fit`, usar CSS Grid subgrid | `prueba.md` item 1.4: "máximo 4 elementos por fila". `auto-fit` permite más de 4 en pantallas anchas. Media queries estándar: 1200px (4 cols), 1024px (3), 768px (2), 480px (1) |
| 2 | ErrorBoundary: eliminar clase wrapper, usar `componentDidCatch` puro | Mantener híbrido (clase + hooks), usar `error boundaries` de React 19 | El patrón actual es inviable: `const [setError] = useState(null)` asigna el **valor** (no el setter) a `setError`, nombrándolo confusamente. La clase `ErrorBoundaryWrapper` recibe y llama `setError` pero el valor nunca se lee en render. React 19 no cambia la naturaleza de class-based error boundaries. Solución: mover todo a `componentDidCatch` en la clase, eliminar la función que envuelve. |
| 3 | `useDeviceDetails`: extraer UI state a hook separado | Mantener todo junto, usar props drilling | El hook mezcla server state (TanStack Query) con client state (storages/colors). El Breadcrumb lo consume solo para `deviceDetails.model`, pagando el costo de toda la lógica de selección + effects. Solución: hook `useDeviceOptions` que solo maneja storages/colors/storageSelected/colorSelected desde los datos ya obtenidos. |
| 4 | Breadcrumb: hook ligero `useBreadcrumbDevice` | Seguir usando `useDeviceDetails`, pasar model por props | El Breadcrumb llama `useDeviceDetails(id)` que dispara una petición API completa solo para obtener `model`. `useBreadcrumbDevice` será un hook TanStack Query mínimo que solo fetchea si no hay datos del device en cache. |
| 5 | Table i18n: `useTranslation()` + nuevas keys en locales | Mantener strings hardcodeados | El componente Table es genérico, pero sus strings son visibles al usuario y deben traducirse. Keys nuevas: `table.searchPlaceholder`, `table.noResults`, `table.previous`, `table.next`, `table.pageInfo`. |
| 6 | README: corregir stack | Eliminar TypeScript del tech stack | El proyecto es JavaScript ES6 + PropTypes. El README lista TypeScript como tecnología activa, lo que es falso y confunde en una prueba técnica. |

### Data Flow Changes

**Antes (Breadcrumb + useDeviceDetails):**
```
Breadcrumb
  └─ useDeviceDetails(id) ──→ fetchDeviceDetails API ──→ data (sobrecargado)
       ├─ deviceDetails (solo usa .model)
       ├─ storages, colors (no usados)
       ├─ storageSelected, colorSelected (no usados)
       └─ 2 useEffect + 2 useMemo (ejecutados sin necesidad)
```

**Después:**
```
Breadcrumb
  └─ useDeviceName(id) ──→ useQuery (misma queryKey, reusa caché)
       └─ solo retorna deviceDetails?.model ó usa caché de TanStack Query

DeviceDetailsPage
  └─ useDeviceDetails(id) ──→ solo fetching + deviceDetails
  └─ useDeviceOptions(deviceDetails) ──→ storages, colors, selection state
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/deviceList/device-list.scss` | Modify | Grid `auto-fit` → `repeat(4, 1fr)` + 4 media queries `@media (max-width: ...)` |
| `src/components/error/ErrorBoundary.jsx` | Modify | Eliminar función wrapper, convertir a clase pura con `componentDidCatch`, eliminar `setError` muerto, eliminar `'use client'` |
| `src/hooks/useDeviceDetails.js` | Modify | Extraer UI state (storages, colors, selection). Hook solo retorna `deviceDetails`, `isLoading`, `isError`, `refetch` |
| `src/hooks/useDeviceOptions.js` | Create | Nuevo hook: recibe `deviceDetails`, maneja `storages`, `colors`, `storageSelected`, `colorSelected`, effects de selección por defecto |
| `src/hooks/useBreadcrumbDevice.js` | Create | Hook TanStack Query mínimo para breadcrumb, reusa caché de `queryKeys.devices.detail(id)` |
| `src/components/breadcrumb/breadcrumb.jsx` | Modify | Reemplazar `useDeviceDetails` por `useBreadcrumbDevice`, eliminar `'use client'` |
| `src/components/table/Table.jsx` | Modify | Reemplazar strings hardcodeados con `useTranslation()` + keys i18n |
| `src/components/table/Table.scss` | Modify | Ningún cambio de estilo necesario |
| `src/locales/es.json` | Modify | Añadir keys de tabla: `table.searchPlaceholder`, `table.noResults`, `table.previous`, `table.next`, `table.pageInfo` |
| `src/locales/en.json` | Modify | Añadir mismas keys en inglés |
| `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` | Modify | Consumir `useDeviceOptions` además de `useDeviceDetails`, eliminar `'use client'` |
| `src/App.jsx` | Modify | Eliminar `'use client'` |
| `src/main.jsx` | Modify | Eliminar `'use client'` |
| `src/components/header/header.jsx` | Modify | Eliminar `'use client'` |
| `src/components/ui/EmptyState/EmptyState.jsx` | Modify | Eliminar `'use client'` |
| `src/components/ui/Card/Card.jsx` | Modify | Eliminar `'use client'` |
| `src/components/toast/ToastProvider.jsx` | Modify | Eliminar `'use client'` |
| `src/contexts/ToastContext.jsx` | Modify | Eliminar `'use client'` |
| `src/features/devices/pages/device/DevicePage.jsx` | Modify | Eliminar `'use client'` |
| `package.json` | Modify | Añadir script `"test:run": "vitest run"` |
| `README.md` | Modify | Corregir stack: eliminar TypeScript, mencionar JavaScript ES6 + PropTypes. Mantener TanStack Query, React Router, SCSS + BEM. |
| `src/features/devices/pages/device/__tests__/DevicePage.test.jsx` | Create | Tests de integración PLP: renderiza lista, búsqueda filtra, navegación a detalle |
| `src/features/devices/pages/deviceDetails/__tests__/DeviceDetailsPage.test.jsx` | Create | Tests de integración PDP: renderiza detalle, selectores, add to cart |

**Summary: 3 new files, 20 modified, 0 deleted**

## Interfaces / Contracts

```js
// useDeviceOptions — nuevo hook
export const useDeviceOptions = (deviceDetails) => ({
  storages: Array<{ value: string, label: string }>,
  colors: Array<{ value: string, label: string }>,
  storageSelected: string,
  setStorageSelected: (value: string) => void,
  colorSelected: string,
  setColorSelected: (value: string) => void,
})

// useBreadcrumbDevice — hook ligero
export const useBreadcrumbDevice = (id) => ({
  modelName: string | undefined,
  isLoading: boolean,
})
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Integration | PLP: carga productos desde API mock | Render DevicePage con `useDevices` mockeado, verificar que se renderizan N cards en grid. Afirmar estructura del grid (4 columnas implícitamente vía CSS). |
| Integration | PLP: búsqueda filtra resultados | Simular input de búsqueda, verificar que la lista se reduce. Mock `useDevices` para que devuelva datos filtrados según el término. |
| Integration | PLP: navegación a PDP | `fireEvent.click` en una card, verificar que `navigate` se llamó con el ID correcto. |
| Integration | PDP: renderiza detalle del producto | Mock `useDeviceDetails` + `useDeviceOptions`. Verificar brand, model, specs visibles. |
| Integration | PDP: color y storage selectors | Verificar que los botones de color/storage se renderizan y actualizan selección al click. |
| Integration | PDP: Add to Cart | Click en add-to-cart con selecciones, verificar que `addToCart` se llama con id, colorCode, storageCode. |
| Integration | PDP: loading skeleton | Mock `isLoading: true`, verificar esqueleto presente. |
| Integration | PDP: error state | Mock `isError: true`, verificar mensaje de error + botón de recarga. |

**Mocking strategy:** Mockear solo `useDevices`, `useDeviceDetails`, `useDeviceOptions`, `useCart` a nivel de hook (vi.mock). NO mockear React Router — usar `MemoryRouter` como wrapper. NO mockear i18n — las traducciones viven en `src/locales/` y se cargan en test.

## Migration / Rollout

No migration required. Cada bloque tiene su propio commit. Rollback granular por `git revert <commit-hash>`.

## Open Questions

- [ ] Ninguna — todos los cambios están mapeados a código existente.
