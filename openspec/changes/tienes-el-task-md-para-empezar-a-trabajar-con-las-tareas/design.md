# Design: Project Audit — "tienes el task.md para empezar a trabajar con las tareas"

## Technical Approach

Phased implementation following the proposal's 3-phase strategy. Each phase delivers independent PRs with isolated scope. The design prioritizes React 19 compatibility, minimal dependencies, and incremental migration.

---

## Architecture Decisions

### Decision 1: ErrorBoundary — Functional over Class Component

**Choice**: Create `ErrorBoundary.jsx` as a functional component with `useState` and `componentDidCatch` equivalent via ErrorBoundary class wrapper.
**Alternatives considered**: Keep class component, use React 19 `use` hook for error state.
**Rationale**: The project already uses functional components everywhere. Class components are harder to test and compose. Using a `createContext` pattern allows global error state management without class inheritance.

### Decision 2: Toast System — Custom Context over Library

**Choice**: Simple `ToastContext` + `toast()` function using React Context.
**Alternatives considered**: `sonner` (too heavy), `react-hot-toast` (styled defaults hard to override).
**Rationale**: This project needs 3 toast types (success, error, info) with basic animations. A lightweight context solution avoids bundle bloat and matches the project's minimal styling approach.

### Decision 3: i18n — react-i18next with Namespace Strategy

**Choice**: `react-i18next` with two namespaces: `common` (shared strings) and `pages` (page-specific).
**Alternatives considered**: `@react-intl/universal` (less ecosystem), custom solution (maintenance burden).
**Rationale**: `react-i18next` is the React standard. Namespace separation allows lazy loading of translations per page.

### Decision 4: Structure Migration — One Page at a Time

**Choice**: Migrate `pages/device/` → `features/devices/pages/device/` first, then repeat per page.
**Alternatives considered**: Big-bang migration (risky), `pages/` folder keep (duplicated structure).
**Rationale**: Updating all imports atomically risks breaking routes. Incremental migration with verification after each page is safer.

### Decision 5: Card Component — Compound Component Pattern

**Choice**: `<Card><Card.Image /><Card.Body /></Card>` compound pattern.
**Alternatives considered**: Single `<Card image={} title={}>` config object (less flexible).
**Rationale**: Compound components allow flexible composition while keeping the API simple. Matches existing `Device` card behavior but generic.

---

## File Changes

### Phase 1: Error Handling + A11y + Assets

| File | Action | Description |
|------|--------|-------------|
| `src/components/error/ErrorBoundary.jsx` | Create | Shared functional ErrorBoundary with retry action |
| `src/components/error/ErrorBoundary.module.scss` | Create | Error state styling |
| `src/pages/device/device.jsx` | Modify | Remove inline `DeviceErrorBoundary` class, use shared component |
| `src/pages/device-table/DeviceTablePage.jsx` | Modify | Remove inline `DeviceTableErrorBoundary` class, use shared component |
| `src/App.jsx` | Modify | Wrap routes with global `<ErrorBoundary>` |
| `src/components/header/header.jsx` | Modify | `<aside>` → `<button>` for cart icon |
| `src/components/search/search.jsx` | Modify | Fix `aria-label="Buscar libro"` → `aria-label="Buscar dispositivo"` |
| `src/components/deviceList/device.jsx` | Modify | Add `loading="lazy"`, explicit `width`/`height` to `<img>` |

### Phase 2: Toast + Skeleton + i18n Foundation

| File | Action | Description |
|------|--------|-------------|
| `src/contexts/ToastContext.jsx` | Create | Context provider + toast dispatch |
| `src/hooks/useToast.js` | Create | `toast()` function hook |
| `src/components/toast/Toast.jsx` | Create | Toast notification component |
| `src/components/toast/Toast.module.scss` | Create | Toast positioning + animations |
| `src/locales/es.json` | Modify | Add common translation strings |
| `src/locales/en.json` | Modify | Add English translations |
| `src/i18n/index.js` | Create | i18next initialization |
| `src/hooks/useTranslation.js` | Create | Custom translation wrapper |
| `src/pages/deviceDetails/deviceDetails.jsx` | Modify | Replace `<div className="loading">` with skeleton |

### Phase 3: Structure + Card + EmptyState + Docs

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Card/Card.jsx` | Create | Generic Card compound component |
| `src/components/ui/Card/Card.module.scss` | Create | Card styling |
| `src/components/ui/Card/CardImage.jsx` | Create | Card image sub-component |
| `src/components/ui/Card/CardBody.jsx` | Create | Card body sub-component |
| `src/components/ui/EmptyState/EmptyState.jsx` | Create | Empty state with icon + message |
| `src/components/ui/SkipLink/SkipLink.jsx` | Create | Keyboard navigation skip link |
| `src/components/ui/SkipLink/SkipLink.module.scss` | Create | Skip link styling (visually hidden until focused) |
| `src/features/devices/pages/device/` | Create | Migrated page directory |
| `src/features/devices/pages/deviceDetails/` | Create | Migrated page directory |
| `src/features/devices/pages/deviceTable/` | Create | Migrated page directory |
| `src/features/devices/components/` | Create | Migrated components directory |
| `README.md` | Create | Project documentation |

---

## Data Flow

### Toast Notification Flow

```
User Action (addToCart)
        │
        ▼
  useCart() mutation
        │
        ▼
  ToastContext.show({ type: 'success', message: '...', duration: 3000 })
        │
        ├──► ToastProvider renders Toast component
        │           │
        │           ▼
        │     CSS animation → auto-dismiss
        │
        └──► useToast() hook exposes toast() for manual calls
```

### ErrorBoundary Flow

```
Error thrown in child component
        │
        ▼
ErrorBoundary catches (class wrapper for lifecycle)
        │
        ▼
State update: { hasError: true }
        │
        ▼
Render error state UI
        │
        ▼
User clicks "Reintentar" → reset state → children re-render
```

### i18n Flow

```
App mount → i18next.init(language: 'es')
        │
        ▼
<TranslationProvider> wraps app
        │
        ├──► useTranslation() → t('common:buttons.addToCart')
        │           │
        │           ▼
        │     Returns translated string from locales/es.json
        │
        └──► Language switcher → i18n.changeLanguage('en')
                    │
                    ▼
              Updates context → all components re-render with new locale
```

---

## Interfaces / Contracts

### ErrorBoundary Component

```jsx
// Usage
<ErrorBoundary fallback={<CustomError />}>
  <Children />
</ErrorBoundary>

// Props (all optional)
interface ErrorBoundaryProps {
  fallback?: ReactNode;      // Custom fallback UI (default: built-in)
  onReset?: () => void;      // Callback when reset is triggered
  level?: 'page' | 'section'; // Styling variant
}
```

### Toast API

```javascript
// Hook usage
const { toast } = useToast();

// toast types
toast.success('Producto añadido al carrito');
toast.error('Error al cargar datos');
toast.info('Sesión expira en 5 minutos');

// With options
toast.success('Mensaje', { duration: 5000, action: { label: 'Deshacer', onClick: fn } });
```

### Card Component API

```jsx
// Compound pattern
<Card>
  <Card.Image src={url} alt={alt} loading="lazy" />
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
    <Card.Footer>Footer content</Card.Footer>
  </Card.Body>
</Card>

// Props
interface CardProps {
  onClick?: () => void;      // Optional click handler
  className?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

interface CardBodyProps {
  children: ReactNode;
}
```

### EmptyState Component

```jsx
interface EmptyStateProps {
  icon?: string;             // Emoji or icon component
  title: string;            // Main message
  description?: string;     // Secondary text
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Usage
<EmptyState
  icon="📱"
  title="No hay dispositivos"
  description="Intenta con otra búsqueda"
  action={{ label: 'Limpiar filtros', onClick: handleClear }}
/>
```

### SkipLink Component

```jsx
// Usage — place as first child of <body> or inside <header>
<SkipLink targetId="main-content">
  Saltar al contenido principal
</SkipLink>

// Target element needs matching id
<main id="main-content" tabIndex={-1}>
```

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| **Unit** | ErrorBoundary reset logic | `renderHook` + simulate error |
| **Unit** | Toast context dispatch | `renderHook` + `act()` for state changes |
| **Unit** | useTranslation hook | Mock i18next, verify key resolution |
| **Integration** | Toast appears on cart mutation | Mock API, verify toast renders |
| **Integration** | ErrorBoundary catches render errors | Error boundary test utils |
| **A11y** | Skip link focus order | `userEvent.tab()` verify focus moves |
| **A11y** | aria-labels correct | `axe-core` or manual screen reader test |
| **E2E** | Full add-to-cart flow with toast | Playwright test |

---

## Migration / Rollout

### Phase Sequence

1. **Phase 1** (Low Risk): ErrorBoundary consolidation + a11y fixes
   - Create shared component, update 2 pages, fix 3 files
   - Verify: Load each page, trigger error, check recovery

2. **Phase 2** (Medium Risk): Toast system + i18n foundation
   - Create context, add translations, update DeviceDetails
   - Verify: Add to cart, see toast; switch language, see translations

3. **Phase 3** (Low Risk): Structure migration + polish
   - Move one page at a time, update App.jsx imports
   - Verify: Navigate to each route, ensure components render

### Rollback Plan

- Each phase = separate commit with PR
- `git revert <commit>` undoes entire phase
- Feature flags for Phase 2: `VITE_I18N_ENABLED=true` toggles translations

---

## Open Questions

- [ ] Should i18n include pluralization rules for en/es?
- [ ] Toast position: top-right (standard) or bottom-center (more visible)?
- [ ] Card component: support horizontal variant for table view?
- [ ] Skip link: show always or only on keyboard focus?