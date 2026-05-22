# Tasks: Project Audit — "tienes el task.md para empezar a trabajar con las tareas"

**Generated**: Mayo 2026  
**Phases**: 3  
**Total Tasks**: 28

---

## Phase 1: Quick Wins — Error Handling + A11y + Assets

**Scope**: ErrorBoundary consolidation, aria-label fixes, image optimization  
**Files affected**: 7  
**Estimated lines**: ~280

### 1.0 Create Shared ErrorBoundary Component
- [x] **File**: `src/components/error/ErrorBoundary.jsx` (create)
- [x] **File**: `src/components/error/ErrorBoundary.module.scss` (create)
- **What**: Create functional ErrorBoundary component with:
  - `fallback` prop for custom UI
  - `onReset` prop for reset callback
  - Retry button with Spanish/English text
  - Console error logging
- **Size**: small

### 1.1 Extract DeviceErrorBoundary from device.jsx
- [x] **File**: `src/pages/device/device.jsx` (modify)
- **What**: Remove inline `DeviceErrorBoundary` class (lines 14-37), import and use shared `ErrorBoundary` component
- **Size**: small

### 1.2 Extract DeviceTableErrorBoundary from DeviceTablePage.jsx
- [x] **File**: `src/pages/device-table/DeviceTablePage.jsx` (modify)
- **What**: Remove inline `DeviceTableErrorBoundary` class (lines 14-37), import and use shared `ErrorBoundary`
- **Size**: small

### 1.3 Wrap App Routes with Global ErrorBoundary
- [x] **File**: `src/App.jsx` (modify)
- **What**: Import shared ErrorBoundary, wrap `<Suspense>` with global `<ErrorBoundary>` fallback
- **Size**: small

### 1.4 Fix Cart Icon Button Semantics
- [x] **File**: `src/components/header/header.jsx` (modify)
- **What**: Change `<aside className="header-cart"><img /></aside>` to `<button className="header-cart" aria-label="Carrito de compras"><img /></button>`
- **Size**: small

### 1.5 Fix Search Input aria-label
- [x] **File**: `src/components/search/search.jsx` (modify)
- **What**: Change `aria-label="Buscar libro"` to `aria-label="Buscar dispositivo"`
- **Size**: tiny

### 1.6 Add Image Lazy Loading and Dimensions
- [x] **File**: `src/components/deviceList/device.jsx` (modify)
- **What**: Add `loading="lazy"`, `width={80}`, `height={80}`, and `alt={`${device.brand} ${device.model}`}` to device card image
- **Size**: tiny

---

## Phase 2: Core Systems — Toast + Skeleton + i18n Foundation

**Scope**: Toast notification system, i18n integration, skeleton consistency  
**Files affected**: 10  
**Estimated lines**: ~400

### 2.0 Create ToastContext Provider
- [x] **File**: `src/contexts/ToastContext.jsx` (create)
- **What**: Create ToastContext with:
  - State for toasts array
  - `show({ type, message, duration })` function
  - Auto-dismiss logic with `setTimeout`
  - Stack management (max 3 visible)
- **Size**: medium

### 2.1 Create useToast Hook
- [x] **File**: `src/hooks/useToast.js` (create)
- **What**: Create `useToast()` hook exposing `toast.success()`, `toast.error()`, `toast.info()` convenience methods
- **Size**: small

### 2.2 Create Toast Component
- [x] **File**: `src/components/toast/Toast.jsx` (create)
- [x] **File**: `src/components/toast/Toast.scss` (create)
- **What**: Create toast notification component with:
  - Success (green), Error (red), Info (blue) variants
  - CSS animations (slide-in, fade-out)
  - Manual dismiss button
  - `aria-live="polite"` for screen readers
- **Size**: medium

### 2.3 Create ToastProvider
- [x] **File**: `src/components/toast/ToastProvider.jsx` (create)
- **What**: Wrap Toast component with ToastContext, render at app root level
- **Size**: small

### 2.4 Initialize react-i18next
- [x] **File**: `src/i18n/index.js` (create)
- **What**: Initialize i18next with:
  - Spanish as default language
  - Resource paths for `locales/es.json` and `locales/en.json`
  - Namespace: `common` for shared strings
- **Size**: small

### 2.5 Create Locale Files
- [x] **File**: `src/locales/es.json` (create)
- [x] **File**: `src/locales/en.json` (create)
- **What**: Add required translation keys:
  - `nav.devices`, `cart.add`, `cart.added`, `cart.error`
  - `search.placeholder`, `empty.noResults`
  - `loading`, `error.retry`, `error.generic`
- **Size**: small

### 2.6 Create useTranslation Custom Hook
- [x] **File**: `src/hooks/useTranslation.js` (create)
- **What**: Create `useTranslation()` wrapper hook for cleaner component usage
- **Size**: small

### 2.7 Integrate Toast into Cart Hook
- [x] **File**: `src/hooks/useCart.js` (modify)
- **What**: Import useToast, call `toast.success()` on add, `toast.error()` on failure
- **Size**: small

### 2.8 Update DeviceDetails with Skeleton
- [x] **File**: `src/pages/deviceDetails/deviceDetails.jsx` (modify)
- **What**: Replace `<div className="loading">` text with `<DeviceListSkeleton count={1} />`
- **Size**: tiny

---

## Phase 3: Structure & Polish

**Scope**: Features migration, Card component, EmptyState, SkipLink, README  
**Files affected**: 12  
**Estimated lines**: ~350

### 3.0 Create Generic Card Component
- **File**: `src/components/ui/Card/Card.jsx` (create)
- **File**: `src/components/ui/Card/Card.module.scss` (create)
- **What**: Create compound Card component with:
  - `<Card>` root with `onClick`, `className` props
  - `<Card.Image>` sub-component with lazy loading
  - `<Card.Body>` sub-component for content
  - `<Card.Title>`, `<Card.Description>` helpers
- **Size**: medium

### 3.1 Create EmptyState Component
- **File**: `src/components/ui/EmptyState/EmptyState.jsx` (create)
- **File**: `src/components/ui/EmptyState/EmptyState.module.scss` (create)
- **What**: Create EmptyState with:
  - `icon` prop (emoji or component)
  - `title`, `description`, `action` props
  - Centered layout with CTA button
- **Size**: small

### 3.2 Create SkipLink Component
- **File**: `src/components/ui/SkipLink/SkipLink.jsx` (create)
- **File**: `src/components/ui/SkipLink/SkipLink.module.scss` (create)
- **What**: Create accessible skip link:
  - Visually hidden by default
  - Shows on keyboard focus (`:focus-visible`)
  - Links to `main-content` id
  - `aria-label="Saltar al contenido principal"`
- **Size**: small

### 3.3 Add SkipLink to App
- **File**: `src/App.jsx` (modify)
- **What**: Add `<SkipLink />` as first child inside Router
- **Size**: tiny

### 3.4 Add main-content id to main elements
- **File**: `src/pages/device/device.jsx` (modify)
- **File**: `src/pages/device-table/DeviceTablePage.jsx` (modify)
- **What**: Add `id="main-content"` and `tabIndex={-1}` to `<main>` elements for skip link target
- **Size**: tiny

### 3.5 Migrate device page to features
- **Source**: `src/pages/device/device.jsx`
- **Target**: `src/features/devices/pages/device/DevicePage.jsx` (create)
- **Target**: `src/features/devices/pages/device/device.scss` (create)
- **What**: Move file, update relative imports
- **Size**: medium

### 3.6 Migrate deviceDetails page to features
- **Source**: `src/pages/deviceDetails/deviceDetails.jsx`
- **Target**: `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` (create)
- **What**: Move file, update imports
- **Size**: medium

### 3.7 Migrate deviceTable page to features
- **Source**: `src/pages/device-table/DeviceTablePage.jsx`
- **Source**: `src/pages/device-table/DeviceTablePage.scss`
- **Target**: `src/features/devices/pages/device-table/DeviceTablePage.jsx` (create)
- **Target**: `src/features/devices/pages/device-table/DeviceTablePage.scss` (create)
- **What**: Move files, update imports
- **Size**: medium

### 3.8 Update App.jsx Import Paths
- **File**: `src/App.jsx` (modify)
- **What**: Update lazy imports to new features paths:
  - `./pages/device/device` → `./features/devices/pages/device/DevicePage`
  - etc.
- **Size**: tiny

### 3.9 Remove Old pages Directory
- **Directory**: `src/pages/` (delete empty folders after migration)
- **What**: Remove empty `pages/device/`, `pages/deviceDetails/`, `pages/device-table/` directories
- **Size**: tiny

### 3.10 Create README.md
- **File**: `README.md` (create)
- **What**: Document:
  - Prerequisites (Node.js, npm)
  - Installation (`npm install`, `npm run dev`)
  - Available scripts
  - Architecture overview (features structure)
  - Key patterns (TanStack Query, Suspense)
- **Size**: small

---

## Review Workload Guard — MANDATORY CHECK

| Metric | Value | Status |
|--------|-------|--------|
| **Estimated total lines changed** | ~1,030 | ⚠️ EXCEEDS 400 |
| **Decision needed before apply** | No | ✅ Can proceed |
| **Chained PRs recommended** | **YES** | ⚠️ Mandatory |
| **400-line budget risk** | **HIGH** | ⚠️ 2.6× over budget |

### Recommendation

Despite user selecting **single-pr** delivery strategy, the total scope (~1,030 lines across 3 phases) exceeds the 400-line budget by **2.6×**. 

**Recommended work-unit slices (chained PRs)**:

| PR | Phase | Files | Est. Lines | Focus |
|----|-------|-------|------------|-------|
| #1 | Quick Wins | 7 | ~280 | ErrorBoundary + a11y fixes |
| #2 | Core Systems | 10 | ~400 | Toast + i18n foundation |
| #3 | Structure | 12 | ~350 | Features migration + polish |

**If user insists on single PR**: Task breakdown supports atomic commits within the PR. Phase commits can be squashed before merge.

---

## Task Summary by Phase

| Phase | Tasks | Est. Lines | Priority |
|-------|------|------------|----------|
| 1. Quick Wins | 7 | ~280 | P1 |
| 2. Core Systems | 9 | ~400 | P2 |
| 3. Structure | 12 | ~350 | P3 |
| **Total** | **28** | **~1,030** | — |

---

## Next Steps

- **Approve this breakdown** → `sdd-apply` phase by phase
- **Request chained PRs** → User confirms 3-PR approach
- **Adjust scope** → If single PR required, remove Phase 3 (lowest priority)

---

*End of tasks.md*