# Exploration: Análisis del Proyecto spa-devices vs. Requisitos de Prueba Técnica

## Current State

### Resumen del Proyecto

El proyecto es una SPA en React 19 + Vite para catálogo/comparativa de dispositivos móviles, construida como prueba técnica. Ya cuenta con un nivel de implementación **sorprendentemente avanzado** — no es un proyecto desde cero, sino uno que ya tiene la gran mayoría de features implementadas.

### Lo que YA funciona (cubre casi todo `prueba.md`)

| Requisito | Estado | Archivos Clave |
|-----------|--------|----------------|
| **PLP** (Product List Page) | ✅ Implementado | `src/features/devices/pages/device/DevicePage.jsx` |
| **PDP** (Product Details Page) | ✅ Implementado | `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` |
| **Header** con breadcrumbs + cart count | ✅ Implementado | `src/components/header/header.jsx` |
| **Search** con debounce (marca/modelo) | ✅ Implementado | `src/hooks/useDevicesSearch.js`, `src/components/search/search.jsx` |
| **API Integration** (list, detail, add-to-cart) | ✅ Implementado | `src/services/getDevices.js`, `getDeviceDetails.js`, `postAddDeviceCart.js` |
| **Client-side caching** (1-hour expiration) | ✅ Implementado | `staleTime: EXPIRATION`, `gcTime: EXPIRATION` en hooks |
| **Cart persistence** (localStorage + expiración) | ✅ Implementado | `src/hooks/useCartContext.jsx` |
| **Scripts** (dev, build, test, lint) | ✅ Implementado | `package.json` |
| **React Router** (SPA routing) | ✅ Implementado | `src/App.jsx` con rutas `/device`, `/deviceDetails/:id` |
| **TanStack Query** (useSuspenseQuery, useMutation) | ✅ Implementado | `src/hooks/useDevices.js`, `src/hooks/useCart.js` |
| **i18n** (es/en) | ✅ Implementado | `src/locales/`, `src/i18n/` |
| **Skeleton loading** | ✅ Implementado | `DeviceListSkeleton`, `DeviceTableSkeleton` |
| **Error Handling** | ✅ Implementado | `ErrorBoundary`, Toast notifications |
| **Error states** con retry | ✅ Implementado | PDP tiene error state con botón reload |
| **Semantic HTML** (main, nav, article, section) | ✅ Implementado | En la mayoría de componentes |
| **Responsive design** (tablet/mobile breakpoints) | ✅ Implementado | Mixins `respond(phone)` y `respond(tablet)` |
| **Apple Design System** | ✅ Implementado | `DESIGN.md`, `theme.scss`, CSS variables |
| **Empty states** | ✅ Implementado | `EmptyState` component con clear filters |
| **Optimistic cart updates** | ✅ Implementado | `useCart.js` con onMutate + rollback |
| **Query key factory** | ✅ Implementado | `src/lib/query-keys.js` con Object.freeze |
| **SCSS con BEM + mixins** | ✅ Implementado | `style/mixins.scss`, BEM en componentes |
| **Testing setup** | ✅ Parcial | `vitest`, `setupTests.js`, 2 hooks con tests |
| **README** | ✅ Existe | `README.md` (menciona TypeScript pero no se usa) |

### Lo que FALTA o necesita mejora respecto a `prueba.md`

1. **Grid 4 items por fila**: El PLP usa `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` que es auto-fitting, no específicamente 4 por fila. El test dice explícitamente "Se mostrarán un máximo de cuatro elementos por fila, y que sea adaptativo según la resolución."
2. **Script `test:run`**: El package.json solo define `test` (watch mode). El test pide `TEST` para lanzamiento de tests — debería estar `test:run` para CI.
3. **README precisa**: Menciona TypeScript pero el proyecto es 100% JavaScript.

### Problemas de Arquitectura y Calidad

| Problema | Severidad | Detalle |
|----------|-----------|---------|
| **TypeScript no implementado** | Alta | AGENTS.md y README.md mencionan TypeScript, pero el proyecto es 100% JavaScript (.jsx/.js). No hay tsconfig. `types/` está vacío. Usa `prop-types` en su lugar. |
| **`'use client'` directives incorrectas** | Media | Varios componentes usan `'use client'` (DevicePage, Header, Breadcrumb, ErrorBoundary, EmptyState). Esta es una directiva de Next.js/Server Components, **innecesaria y engañosa** en una SPA pura con Vite. |
| **ErrorBoundary con patrón roto** | Alta | `ErrorBoundary.jsx` tiene un patrón híbrido donde un componente funcional wrappea un class component. La variable `setError` se declara con `useState` pero nunca se usa (solo está para el linter). El class component `ErrorBoundaryWrapper` recibe `t` por props en lugar de usar directamente i18n. El flujo de error no es confiable. |
| **Breadcrumb hace fetching de datos** | Media | `Breadcrumb` llama a `useDeviceDetails(id)` en cada render del PDP, lo que dispara una llamada API paralela cuando ya `DeviceDetailsPage` está cargando los mismos datos. |
| **useDeviceDetails mezcla UI state con data fetching** | Media | El hook `useDeviceDetails` maneja tanto fetching (`useQuery`) como estado de UI (`storageSelected`, `colorSelected`). Viola SRP. |
| **Zustand no usado** | Media | AGENTS.md menciona Zustand para estado cliente, pero se usa React Context (CartContext). No hay dependencia de Zustand en package.json. |
| **Precio en rojo vs diseño Apple** | Baja | El precio usa `--color-red` en lugar de `--color-text-dark`. Apple solo usa azul como acento cromático. |
| **Iconos PNG vs SVG** | Baja | Logo y cart son PNG, no SVG. En producción se prefiere SVG para escalabilidad y tema. |
| **Tabla no usa i18n** | Media | `Table.jsx` tiene strings hardcodeados: "Buscar...", "Anterior", "Siguiente", "No se encontraron resultados". |
| **Hooks específicos en carpeta raíz** | Media | `useCart.js`, `useDeviceDetails.js`, `useDevicesSearch.js` están en `src/hooks/` raíz pero son específicos de la feature devices. Deberían estar en `features/devices/hooks/`. |
| **Sin tests de integración** | Media | Solo hay 2 tests unitarios de hooks (`useDevices`, `useTableState`). No hay tests de componentes (pages, DeviceList, DeviceDetails). |
| **Mock con typo** | Baja | `dimentions` en vez de `dimensions` en `useDeviceDetailsMocks.js`. |
| **staleTime === gcTime** | Baja | En `useDevices.js`, ambos están en 1 hora. Normalmente `gcTime` > `staleTime` para mantener datos en caché mientras se refetchea. |
| **Vite config en JS** | Baja | `vite.config.js` en vez de `vite.config.ts`, inconsistente con el claim de TypeScript. |
| **Empty response handling frágil** | Media | `fetchDevices` usa `res?.json() ?? []` (fallback a array si json es null), pero si la respuesta no es OK, tira error — luego `useDevices` con `useSuspenseQuery` no maneja error explícitamente. |

### Lo que SOBRA (no pedido en prueba.md pero implementado)

- **DeviceTablePage** con tabla genérica, sorting, paginación — es over-engineering para la prueba pero muestra iniciativa.
- **Toast notifications** — no pedido pero valor añadido.
- **Language switcher** con i18n — no pedido pero excelente adicional.
- **ErrorBoundary** con reset — no pedido pero buena práctica.

---

## Affected Areas

- `src/App.jsx` — Entry point, routing configuration
- `src/main.jsx` — App bootstrap with QueryClient + providers
- `src/features/devices/pages/device/DevicePage.jsx` — PLP page
- `src/features/devices/pages/device/device.scss` — PLP styles
- `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` — PDP page
- `src/features/devices/pages/deviceDetails/device-details.scss` — PDP styles
- `src/components/deviceList/deviceList.jsx` — Device grid component
- `src/components/deviceList/device-list.scss` — Grid layout (4 per row)
- `src/components/deviceList/device.jsx` — Device card component
- `src/components/header/header.jsx` — Header with breadcrumbs + cart
- `src/components/header/header.scss` — Header styles
- `src/components/breadcrumb/breadcrumb.jsx` — Breadcrumb (needs refactor)
- `src/components/search/search.jsx` — Search input
- `src/components/error/ErrorBoundary.jsx` — Error boundary (needs fix)
- `src/components/table/Table.jsx` — Generic table (needs i18n)
- `src/components/toast/` — Toast system
- `src/components/ui/` — UI primitives
- `src/hooks/useDevices.js` — Devices query hook
- `src/hooks/useDeviceDetails.js` — Device detail hook (refactor needed)
- `src/hooks/useCart.js` — Cart mutation hook
- `src/hooks/useCartContext.jsx` — Cart context with localStorage
- `src/hooks/useDevicesSearch.js` — Search state + debounce
- `src/hooks/useTableState.js` — Table state management
- `src/hooks/useToast.js` — Toast convenience hook
- `src/hooks/useTranslation.js` — Translation wrapper
- `src/hooks/mocks/` — Test mock data
- `src/hooks/useDevices.test.jsx` — Hook test
- `src/hooks/useTableState.test.js` — Hook test
- `src/constants.js` — App constants (CURRENCY, EXPIRATION, etc.)
- `src/lib/query-keys.js` — Query key factory
- `src/services/getDevices.js` — Device list API
- `src/services/getDeviceDetails.js` — Device detail API
- `src/services/postAddDeviceCart.js` — Add to cart API
- `src/contexts/ToastContext.jsx` — Toast context
- `src/style/theme.scss` — Global theme variables
- `src/style/mixins.scss` — SCSS mixins
- `src/i18n/index.js` — i18n configuration
- `src/locales/es.json` — Spanish translations
- `src/locales/en.json` — English translations
- `src/setupTests.js` — Test setup
- `package.json` — Dependencies and scripts
- `vite.config.js` — Vite configuration
- `README.md` — Project documentation
- `DESIGN.md` — Design system documentation
- `AGENTS.md` — Development conventions

---

## Approaches

### Approach 1: Correctivo Mínimo (Mejora Rápida para Prueba)

Corregir solo los gaps directos con `prueba.md` y los bugs más críticos.

- **Pros**:
  - Mínimo esfuerzo (1-2 días)
  - Entrega rápida
  - Bajo riesgo de introducir bugs
- **Cons**:
  - No resuelve deuda técnica subyacente
  - El claim de TypeScript sigue siendo falso
  - Patrones rotos persisten
- **Effort**: Low

**Items**:
1. Grid PLP a 4 columnas explícitas con `repeat(4, 1fr)` + responsive
2. Agregar `test:run` script en package.json
3. Actualizar README quitando mención a TypeScript (o agregar)
4. Eliminar directivas `'use client'`
5. Fix ErrorBoundary (eliminar setError no usado, simplificar)
6. Fix Breadcrumb (no fetchear datos, recibir modelName por props)
7. Hooks i18n para Table.jsx
8. Fix typo `dimentions` → `dimensions`

### Approach 2: Refactor Significativo (Calidad + Prueba)

Todo lo del Approach 1 + mejoras de arquitectura y cobertura de tests.

- **Pros**:
  - Código más mantenible y profesional
  - Mejor presentación para entrevista técnica
  - TypeScript real (valor diferenciador)
- **Cons**:
  - Esfuerzo medio (3-5 días)
  - Riesgo de romper funcionalidad existente
  - Migrar a TS requiere configurar toolchain
- **Effort**: Medium

**Items adicionales**:
1. Migración a TypeScript (.tsx/.ts + tsconfig)
2. Migrar CartContext a Zustand (consistente con AGENTS.md)
3. Separar UI state de data fetching en useDeviceDetails (split hook)
4. Mover hooks específicos a `features/devices/hooks/`
5. Agregar tests de integración (al menos PLP y PDP)
6. Reemplazar iconos PNG con SVG
7. Corregir color de precio (Apple blue en vez de red)
8. Agregar barrel exports (index.js) para features
9. Configurar `test:coverage` script

### Approach 3: Reescrita con Mejores Prácticas

Reescribir desde cero aplicando todo lo aprendido y las mejores prácticas del stack.

- **Pros**:
  - Sin deuda técnica heredada
  - Arquitectura limpia y consistente
  - TypeScript desde el día 1
- **Cons**:
  - Esfuerzo alto (1-2 semanas)
  - Pierde el trabajo ya hecho (que es considerable)
  - Podría no terminar a tiempo
  - Alto riesgo para una prueba técnica
- **Effort**: High

---

## Recommendation

**Approach 2 (Refactor Significativo)** combinado con los items críticos del Approach 1.

La razón: el proyecto ya tiene un nivel de implementación MUY alto — aproximadamente el 85-90% de lo que pide `prueba.md` ya está funcionando. El mayor problema no es lo que falta, sino la **discrepancia entre lo que el proyecto CLAIM ser (React 19 + TypeScript + Zustand) y lo que REALMENTE ES (React 19 + JavaScript + Prop-Types + Context)**. Esto se notaría inmediatamente en una revisión de código.

**Prioridad de implementación sugerida:**

| Prioridad | Item | Impacto |
|-----------|------|---------|
| 🔴 Critical | Grid 4 items/fila (requisito explícito) | Directo en prueba |
| 🔴 Critical | Fix ErrorBoundary (patrón roto) | Estabilidad |
| 🔴 Critical | Quitar `'use client'` | Honestidad técnica |
| 🟡 High | Fix Breadcrumb fetching duplicado | Performance + patrón |
| 🟡 High | Separar UI state de fetching en useDeviceDetails | SRP |
| 🟡 High | i18n para Table.jsx | Completitud |
| 🟡 High | Script test:run + test:coverage | Requisito prueba |
| 🟢 Medium | TypeScript migration (crítico si se claim) | Consistencia |
| 🟢 Medium | Mover hooks a features (SRP estructural) | Organización |
| 🟢 Medium | Tests de integración para pages | Cobertura |
| 🟢 Medium | Fix README y documentación | Veracidad |
| 🔵 Low | SVG icons, precio color, barrel exports | Pulido |

---

## Risks

- **Riesgo de romper funcionalidad existente**: El proyecto ya funciona. Cada cambio debe ser cuidadoso, especialmente la migración a TypeScript y la refactorización de hooks.
- **TypeScript migration puede ser traicionera**: Sin tipados claros de la API (las imágenes en `prueba.md` están rotas, no se ven los endpoints exactos), inferir tipos puede ser difícil.
- **Tiempo subestimado**: El proyecto ya tiene implementación compleja (Suspense, optimistic updates, query factory). Refactorizar sin romper requiere comprensión profunda.
- **La prueba pide una store de cliente (Zustand)**: AGENTS.md lo menciona pero no se usa. Si el evaluador espera Zustand, la falta podría restar puntos.
- **`'use client'` es un anti-patrón en SPA**: Si el evaluador nota directivas de Next.js en una SPA pura, podría indicar copia de código sin comprensión.

---

## Ready for Proposal

**Yes.** El proyecto tiene una base sólida y la exploración revela claramente qué mejorar.

El enfoque recomendado es: **tomar el proyecto existente como base sólida** y aplicar mejoras enfocadas, en lugar de reescribir. La mayoría de los requisitos de `prueba.md` ya están cubiertos — el trabajo es de pulido y honestidad técnica (TypeScript vs JavaScript, quitando `'use client'`, arreglando patrones rotos).

Lo que el orchestrator debe decir al usuario:

> "He analizado el proyecto completo contra la prueba técnica. La buena noticia: **el 85-90% ya está implementado** — PLP, PDP, búsqueda con debounce, carrito con optimistic updates, caché de 1 hora, diseño Apple, responsive, i18n, skeletons. El trabajo pendiente es principalmente de **calidad y honestidad técnica**: el proyecto CLAIM ser React 19 + TypeScript + Zustand, pero en realidad es JavaScript con Prop-Types y Context. También hay algunos patrones rotos (ErrorBoundary, Breadcrumb haciendo fetching) y un requisito específico de la prueba (grid 4 columnas) que hay que ajustar. Recomiendo un refactor de ~3-5 días que corrija estos gaps y lleve el proyecto a un estado 'production-ready'."

---

## Detalle por Área

### 1. PLP (Product List Page)
- **Estado**: ✅ Funcional
- **Cambio necesario**: Grid CSS a 4 columnas explícitas con `grid-template-columns: repeat(4, 1fr)` + responsive breakpoints
- **Archivos**: `src/components/deviceList/device-list.scss`

### 2. PDP (Product Details Page)
- **Estado**: ✅ Funcional
- **Cambio necesario**: Separar responsabilidades en `useDeviceDetails` (fetch vs UI state)
- **Archivos**: `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx`, `src/hooks/useDeviceDetails.js`

### 3. Header + Breadcrumbs
- **Estado**: ⚠️ Funcional pero con problemas
- **Cambio necesario**: Breadcrumb no debe fetchear datos. Recibir modelName por props.
- **Archivos**: `src/components/breadcrumb/breadcrumb.jsx`, `src/components/header/header.jsx`

### 4. API Layer
- **Estado**: ✅ Funcional pero mejorable
- **Cambio necesario**: Centralizar fetch en un API client, tipar respuestas si se migra a TS
- **Archivos**: `src/services/`

### 5. State Management
- **Estado**: ⚠️ Funcional pero inconsistente con AGENTS.md
- **Cambio necesario**: Migrar CartContext a Zustand (o actualizar AGENTS.md)
- **Archivos**: `src/hooks/useCartContext.jsx`, `src/hooks/useCart.js`

### 6. Testing
- **Estado**: ⚠️ Mínimo (2 tests de hooks)
- **Cambio necesario**: Agregar tests de integración para páginas y componentes críticos
- **Archivos**: Tests nuevos para pages y components

### 7. TypeScript
- **Estado**: ❌ No implementado (claim falso)
- **Cambio necesario**: Migrar .jsx → .tsx, .js → .ts, agregar tsconfig, tipar todo
- **Archivos**: Todo el proyecto

### 8. Estilos y Diseño
- **Estado**: ✅ Buena implementación del Apple Design System
- **Cambio necesario**: Corregir precio en rojo, reemplazar PNG con SVG
- **Archivos**: `src/style/theme.scss`, `src/components/header/header.jsx`, `src/assets/`

---

## Conclusión

El proyecto es una implementación **sólida y avanzada** de la prueba técnica. El desarrollador mostró conocimiento de:
- TanStack Query (Suspense, mutations, optimistic updates)
- React 19 patterns
- Arquitectura de componentes (container/presentational)
- Diseño responsive con Apple Design System
- i18n, testing, accesibilidad básica

Las áreas de mejora son principalmente de **honestidad técnica** (TypeScript que no es tal, directivas de Next.js que no aplican) y **calidad de código** (patrones rotos, mezcla de responsabilidades). No son problemas de un desarrollador novato — son detalles que separan un "funciona" de un "está listo para producción".
