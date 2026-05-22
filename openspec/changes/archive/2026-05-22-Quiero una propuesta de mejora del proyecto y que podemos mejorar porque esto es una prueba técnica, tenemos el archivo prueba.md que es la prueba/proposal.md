# Proposal: Corrección y pulido del proyecto spa-devices para alinearlo con la prueba técnica

## Intent

Alinear el proyecto con los requisitos de la prueba técnica (`prueba.md`), corregir patrones rotos y deuda técnica, y asegurar que todo el código refleje honestamente su stack real (JavaScript ES6 + Prop-Types, no TypeScript/Zustand).

## Scope

### In Scope
- Fix grid CSS: cambiar `auto-fit` por 4 columnas explícitas (`repeat(4, 1fr)`) con `@media` queries responsive
- Fix ErrorBoundary: eliminar patrón híbrido roto (clase + hooks), limpiar `setError` huérfano
- Remove `'use client'` directives de los 9 archivos (SPA pura, no Next.js)
- Refactor `useDeviceDetails`: separar fetching (TanStack Query) de UI state (storages/colors selection)
- Refactor Breadcrumb: usar hook ligero en vez de `useDeviceDetails` para evitar fetching duplicado
- i18n para Table.jsx: reemplazar strings hardcodeados con `useTranslation()`
- Añadir script `test:run` en `package.json` (vitest run)
- Escribir tests de integración para PLP y PDP con React Testing Library + Vitest
- Corregir `README.md`: eliminar menciones falsas a TypeScript y Zustand

### Out of Scope
- NO migrar a TypeScript (el proyecto debe quedar en JavaScript ES6 + Prop-Types)
- NO migrar a Zustand (mantener React Context + hooks para estado cliente)
- NO añadir nuevas features o vistas
- NO reescribir componentes funcionales existentes (solo corregir patrones)
- NO cambiar el sistema de estilos (SCSS + BEM se mantiene)

## Capabilities

### New Capabilities
None — no se introducen nuevas funcionalidades.

### Modified Capabilities
None — la corrección es puramente técnica (bugfixes + refactoring), no cambia comportamiento del usuario desde la perspectiva de especificaciones.

## Approach

Enfoque correctivo con 3 bloques paralelizables:

1. **Quick fixes** (bajo riesgo): Grid CSS, `'use client'`, script `test:run`, README
2. **Refactors** (riesgo medio): ErrorBoundary, `useDeviceDetails`, Breadcrumb, Table i18n
3. **Testing** (riesgo bajo): tests de integración para flujos PLP + PDP

Se trabaja por archivo individual con commits pequeños por cada bloque.

## Affected Areas

| Area | Impact | Descripción |
|------|--------|-------------|
| `src/components/deviceList/device-list.scss` | Modified | Grid `auto-fit` → `repeat(4, 1fr)` con media queries |
| `src/components/error/ErrorBoundary.jsx` | Modified | Eliminar `setError` huérfano, limpiar patrón híbrido |
| `src/components/breadcrumb/breadcrumb.jsx` | Modified | Separar fetching de breadcrumb navigation |
| `src/components/table/Table.jsx` | Modified | Strings hardcodeados → i18n `t()` |
| `src/hooks/useDeviceDetails.js` | Modified | Separar UI state del fetching (storages/colors → hook separado o inline) |
| `src/components/error/ErrorBoundaryWrapper.jsx` | Modified | Eliminar `setError` prop |
| `src/App.jsx` | Modified | Quitar `'use client'` |
| `src/main.jsx` | Modified | Quitar `'use client'` |
| `src/components/header/header.jsx` | Modified | Quitar `'use client'` |
| `src/components/ui/EmptyState/EmptyState.jsx` | Modified | Quitar `'use client'` |
| `src/components/ui/Card/Card.jsx` | Modified | Quitar `'use client'` |
| `src/components/toast/ToastProvider.jsx` | Modified | Quitar `'use client'` |
| `src/contexts/ToastContext.jsx` | Modified | Quitar `'use client'` |
| `src/features/devices/pages/device/DevicePage.jsx` | Modified | Quitar `'use client'` |
| `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` | Modified | Quitar `'use client'` |
| `package.json` | Modified | Añadir script `test:run` |
| `README.md` | Modified | Corregir stack (JS no TypeScript) |
| `src/**/*.test.{jsx,js}` | New | Tests de integración PLP + PDP |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Refactor de ErrorBoundary rompa manejo de errores global | Low | Test manual de error boundary antes/después |
| Separar `useDeviceDetails` rompa PDP o Breadcrumb que lo consume | Medium | Refactor secuencial: extraer primero, testear, luego actualizar consumidores |
| Grid change afecte layout en resoluciones no testeadas | Low | Usar media queries estándar (1200px, 768px, 480px) |
| Tests de integración sean frágiles por mocking incompleto | Medium | Mockear solo servicios API, no React Router ni i18n |

## Rollback Plan

Cada bloque tiene su propio commit individual. Para revertir:
1. `git revert <commit-grid>` — Grid layout
2. `git revert <commit-errorboundary>` — ErrorBoundary
3. `git revert <commit-useclient>` — Directivas 'use client'
4. `git revert <commit-usedevices>` — Hook refactor
5. `git revert <commit-breadcrumb>` — Breadcrumb
6. `git revert <commit-table-i18n>` — Table i18n
7. `git revert <commit-tests>` — Tests

Si algo sale mal, revertir solo el commit problemático sin afectar el resto.

## Dependencies

- Ninguna externa. Todo el tooling ya está en `package.json` (Vitest, React Testing Library, i18next).

## Success Criteria

- [ ] Grid CSS muestra máximo 4 productos por fila en desktop y se adapta responsive
- [ ] ErrorBoundary no tiene código muerto ni patrones rotos (sin `setError`, sin hooks dentro de clase)
- [ ] Ningún archivo `.jsx|.js` contiene `'use client'`
- [ ] `useDeviceDetails` solo maneja fetching; storages/colors selection se manejan donde se usan
- [ ] Breadcrumb no hace fetching duplicado de datos del dispositivo
- [ ] Table.jsx usa `useTranslation()` para todos sus strings visibles
- [ ] `npm run test:run` funciona y ejecuta tests una vez
- [ ] README menciona JavaScript ES6 no TypeScript
- [ ] Tests de integración cubren: PLP carga productos, búsqueda filtra, PDP muestra detalle, Add to Cart
