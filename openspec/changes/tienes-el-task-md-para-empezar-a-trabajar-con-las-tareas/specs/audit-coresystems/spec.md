# Delta Spec — Phase 2: Core Systems

## ADDED Requirements

### Requirement: Toast Notification System

The system MUST provide a toast notification system to give users visual feedback for cart operations (add to cart, remove, errors).

#### Scenario: Cart add success

- GIVEN the user clicks "Añadir al carrito" on a device
- WHEN the mutation completes successfully
- THEN a toast notification appears saying "Añadido al carrito" or "Added to cart"
- AND the toast auto-dismisses after 3 seconds
- AND the toast is non-blocking (does not prevent further interaction)

#### Scenario: Cart add error

- GIVEN the user clicks "Añadir al carrito" and the mutation fails
- WHEN the error is caught
- THEN a toast notification appears with error message "Error al añadir al carrito" or "Error adding to cart"
- AND the toast persists for 5 seconds (longer for errors)

#### Scenario: Toast stack behavior

- GIVEN multiple toast notifications are triggered in quick succession
- WHEN toasts are displayed
- THEN they stack vertically without overlapping
- AND older toasts remain visible until dismissed

### Requirement: DeviceDetails Skeleton Consistency

The system MUST replace the plain `<div className="loading">` text in `DeviceDetails` with a skeleton loading component for visual consistency with other pages.

#### Scenario: DeviceDetails loading state

- GIVEN the user navigates to `/device/:id`
- WHEN the device data is being fetched
- THEN a skeleton UI renders (matching the layout shape)
- AND the skeleton uses the same styling as DeviceListSkeleton
- AND the skeleton has `aria-hidden="true"`

### Requirement: EmptyState Component

The system MUST provide an `EmptyState` component to display when the device list has no results (no devices match search or filter criteria).

#### Scenario: No devices match search

- GIVEN the user enters a search query that matches no devices
- WHEN the device list is rendered
- THEN the EmptyState component displays a friendly message: "No se encontraron dispositivos" or "No devices found"
- AND includes an illustration or icon
- AND includes a "Limpiar filtros" action button

#### Scenario: No devices at all

- GIVEN the device list is empty (no devices in database)
- WHEN the page renders
- THEN the EmptyState displays "No hay dispositivos disponibles" or "No devices available"

### Requirement: i18n Foundation (Spanish/English)

The system MUST integrate `react-i18next` to support Spanish (default) and English languages with a locale file structure.

#### Scenario: Spanish is default language

- GIVEN the app loads without language preference
- WHEN the user views any page
- THEN all UI text renders in Spanish
- AND the locale file `locales/es.json` contains all translated strings

#### Scenario: English language support

- GIVEN the user changes language to English
- WHEN the page re-renders
- THEN all UI text renders in English
- AND the locale file `locales/en.json` contains all translated strings

#### Scenario: Translation keys required

- GIVEN the i18n system is initialized
- THEN the following keys MUST exist in both locale files:
  - `nav.devices`: "Dispositivos" / "Devices"
  - `cart.add`: "Añadir al carrito" / "Add to cart"
  - `cart.added`: "Añadido al carrito" / "Added to cart"
  - `cart.error`: "Error al añadir al carrito" / "Error adding to cart"
  - `search.placeholder`: "Buscar dispositivo..." / "Search device..."
  - `empty.noResults`: "No se encontraron dispositivos" / "No devices found"
  - `loading`: "Cargando..." / "Loading..."
  - `error.retry`: "Reintentar" / "Retry"
  - `error.generic`: "Algo salió mal" / "Something went wrong"

## Acceptance Criteria

| Criterion | Validation |
|-----------|------------|
| Toast system functional | Cart mutations show toast feedback |
| Toast stacks vertically | Multiple toasts display correctly |
| DeviceDetails uses skeleton | Loading state matches other pages |
| EmptyState renders on empty list | "No devices found" message appears |
| i18n initialized | react-i18next integrated with namespace support |
| Both locale files populated | es.json and en.json have all required keys |