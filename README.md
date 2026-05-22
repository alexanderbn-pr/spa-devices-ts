# SPA Devices — React 19 Device Catalog

A React 19 single-page application for browsing and comparing mobile devices, featuring a product catalog with search, filtering, and detail views.

## Prerequisites

- **Node.js**: `>=18.0.0` (LTS recommended)
- **Package Manager**: npm (bundled with Node.js) or pnpm/yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spa-devices
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (if applicable)
   ```bash
   # Copy example env file if available
   cp .env.example .env.local
   # Edit with your API URLs and keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Create production build (output: `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint with auto-fix for JS/JSX |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI mode) |

## Architecture Overview

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **JavaScript ES6 + PropTypes** | Core language with runtime type checking |
| **React 19** | UI framework with concurrent features |
| **Vite** | Build tool and dev server |
| **TanStack Query** | Server state management |
| **React Router v7** | Client-side routing |
| **SCSS + BEM** | Styling with CSS preprocessor |

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Generic UI (Card, EmptyState, SkipLink)
│   ├── header/          # App header with navigation
│   ├── search/          # Search component with debounce
│   ├── deviceList/      # Device listing components
│   └── ...
├── features/            # Feature-based modules
│   └── devices/         # Devices feature
│       ├── pages/       # Page components
│       │   ├── device/          # Device list page
│       │   ├── deviceDetails/   # Device detail page
│       │   └── deviceTable/     # Device comparison table
│       └── ...
├── hooks/               # Custom React hooks
├── services/            # API layer (device, cart services)
├── contexts/            # React contexts (Toast)
├── styles/             # Global SCSS and mixins
├── constants/          # App constants (currency, weights)
├── locales/             # i18n translation files (es, en)
└── i18n/               # i18n configuration
```

### Key Patterns

#### Data Fetching (TanStack Query)
- Server state managed via `useDevices()`, `useDeviceDetails()`, `useCart()`
- Suspense boundaries for loading states
- ErrorBoundary for error handling

#### Component Architecture
- **Container/Presentational**: Smart containers connect to data, presentational components render UI
- **Compound Components**: `<Card><Card.Image /><Card.Body /></Card>`
- **Custom Hooks**: `useDevicesSearch()` handles search state + debounce

#### State Management
- **Server State**: TanStack Query (devices, cart)
- **Client State**: React hooks + Context (Toast notifications)
- **URL State**: React Router (route params for device details)

## Development Guidelines

### Code Style
- Arrow functions for components and callbacks
- `const` over `let`, early returns to avoid nesting
- BEM methodology for SCSS class naming
- Maximum 3 nesting levels in SCSS

### Component Rules
- One component per file
- No data fetching inside components (use hooks)
- Separate business logic from UI (container pattern)
- Use semantic HTML (`<main>`, `<nav>`, `<article>`)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT