# Delta Spec — Phase 3: Structure & Polish

## ADDED Requirements

### Requirement: Features-based Structure Migration

The system MUST migrate from flat `pages/` structure to `features/` structure, consolidating pages under feature-based directories for better code organization and maintainability.

#### Scenario: Migrate Device page to features

- GIVEN the current `src/pages/device/device.jsx` exists
- WHEN migration is executed
- THEN the file moves to `src/features/devices/pages/device/DevicePage.jsx`
- AND all imports in `App.jsx` are updated to reflect new path

#### Scenario: Migrate DeviceDetails page

- GIVEN the current `src/pages/deviceDetails/deviceDetails.jsx` exists
- WHEN migration is executed
- THEN the file moves to `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx`
- AND associated styles migrate accordingly

#### Scenario: Migrate DeviceTable page

- GIVEN the current `src/pages/device-table/` exists
- WHEN migration is executed
- THEN files move to `src/features/devices/pages/deviceTable/`
- AND the page folder name normalizes to `device-table` (kebab-case)

### Requirement: Generic Card Component

The system MUST provide a reusable `Card` component at `src/components/ui/Card/Card.jsx` that:
- Accepts `{children}` for flexible content
- Provides consistent styling (border, shadow, padding)
- Is responsive and adapts to container width
- Has BEM class naming following project conventions

#### Scenario: Card used for Device

- GIVEN the Card component is created
- WHEN Device component is refactored to use Card
- THEN the Device card extends Card with device-specific content
- AND the Card handles layout while Device handles domain logic

#### Scenario: Card reusable for other entities

- GIVEN the Card component is available
- WHEN a future component needs card-style layout
- THEN the Card component can be used without modification
- AND accepts any children (image, text, actions, etc.)

### Requirement: Skip Link for Keyboard Navigation

The system MUST provide a "Saltar al contenido" (Skip to main content) link for keyboard and screen reader users to bypass navigation and jump directly to main content.

#### Scenario: Skip link visible on focus

- GIVEN the page loads
- WHEN a keyboard user presses Tab
- THEN the skip link becomes visible as the first focusable element
- AND it links to `<main id="main-content">`

#### Scenario: Skip link functionality

- GIVEN the skip link is focused and activated
- WHEN the user presses Enter or clicks
- THEN focus moves to `<main>` element
- AND the page scrolls to main content

### Requirement: README.md Documentation

The system MUST provide a comprehensive README.md at the project root with installation instructions, architecture overview, and development guidelines.

#### Scenario: README contains installation section

- GIVEN a new developer clones the repository
- WHEN they read README.md
- THEN they find:
  - Prerequisites (Node.js version, package manager)
  - Installation commands (`npm install`, `npm run dev`)
  - Environment variables setup

#### Scenario: README contains architecture section

- GIVEN a developer needs to understand project structure
- WHEN they read README.md
- THEN they find:
  - Folder structure explanation
  - Key architectural patterns (TanStack Query, Suspense, features)
  - Component conventions

#### Scenario: README contains available scripts

- GIVEN a developer needs to run tests or build
- WHEN they read README.md
- THEN they find:
  - All available npm scripts (dev, build, test, lint)
  - Description of what each script does

## Acceptance Criteria

| Criterion | Validation |
|-----------|------------|
| Pages migrated to features/ | All pages under `src/features/devices/pages/` |
| Imports updated | App.jsx routes work correctly |
| Card component exists | File at `src/components/ui/Card/Card.jsx` |
| Card is reusable | Works with any children content |
| Skip link present | First Tab focusable element, links to `<main>` |
| README exists | File at project root with install + architecture |