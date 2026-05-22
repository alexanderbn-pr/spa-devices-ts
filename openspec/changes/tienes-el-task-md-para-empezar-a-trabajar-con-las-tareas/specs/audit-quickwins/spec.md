# Delta Spec — Phase 1: Quick Wins

## ADDED Requirements

### Requirement: Shared ErrorBoundary Component

The system MUST provide a reusable `ErrorBoundary` component at `src/components/error/ErrorBoundary.jsx` that:
- Catches JavaScript errors in child components during render
- Displays a user-friendly fallback UI with retry action
- Logs errors to console for debugging
- Accepts `fallback` prop for custom fallback UI
- Accepts `onReset` prop for reset callback

#### Scenario: Error caught in Device card

- GIVEN the Device component throws an uncaught error during render
- WHEN the ErrorBoundary wraps the Device component
- THEN the user sees a fallback message with "Reintentar" button
- AND the error is logged to console

#### Scenario: Error caught in DeviceTable row

- GIVEN a DeviceTable row throws an error
- WHEN the ErrorBoundary is placed above the table
- THEN the fallback UI renders without crashing the entire table
- AND only the affected subtree shows the error state

### Requirement: Global ErrorBoundary in App

The system MUST wrap the entire application with a global `ErrorBoundary` in `App.jsx` so that uncaught errors anywhere in the app are handled gracefully without crashing the page.

#### Scenario: Uncaught error in any route

- GIVEN a runtime error occurs in any lazy-loaded route
- WHEN the GlobalErrorBoundary wraps `<Routes>`
- THEN the page does not go blank
- AND a fallback UI renders with navigation options

### Requirement: A11y — aria-label Copy Fixes

The system MUST fix incorrect aria-label text that references "libro" instead of "dispositivo" to maintain accessibility accuracy.

#### Scenario: Search input aria-label

- GIVEN the search component renders an input field
- WHEN the aria-label is rendered
- THEN the label MUST say "Buscar dispositivo" or "Search device" (not "Buscar libro")

#### Scenario: Cart button semantics

- GIVEN the header renders a cart icon button
- WHEN the cart icon is an interactive element
- THEN it MUST be a `<button>` element with `aria-label="Carrito de compras"` or `aria-label="Shopping cart"`
- AND NOT a non-interactive `<aside>` containing an `<img>`

### Requirement: Image Lazy Loading and Dimensions

The system MUST optimize image loading by adding `loading="lazy"` attribute and explicit dimensions to prevent Cumulative Layout Shift (CLS).

#### Scenario: Device card image optimization

- GIVEN a Device card renders a device image
- WHEN the image tag is defined
- THEN it MUST include `loading="lazy"` for non-critical images
- AND include explicit `width` and `height` attributes to reserve layout space

#### Scenario: Table image optimization

- GIVEN a DeviceTable renders device images in rows
- WHEN the image tags are defined
- THEN each image MUST include `loading="lazy"`
- AND include explicit `width` and `height` attributes
- AND include descriptive `alt` text: `${device.brand} ${device.model}`

## Acceptance Criteria

| Criterion | Validation |
|-----------|------------|
| ErrorBoundary extracted to shared component | File exists at `src/components/error/ErrorBoundary.jsx` |
| Global ErrorBoundary in App.jsx | App renders without blank page on uncaught errors |
| aria-label fixed in search.jsx | Text says "dispositivo", not "libro" |
| Cart icon is a `<button>` | Header uses semantic button for cart interaction |
| Images have `loading="lazy"` | All device images include lazy loading |
| Images have dimensions | All images have explicit width/height attributes |