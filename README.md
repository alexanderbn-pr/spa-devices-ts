# spa-devices-ts

Device catalog SPA for browsing, searching, and managing mobile devices. Built with React 19 + TypeScript 6 + Vite 6.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 6 (strict mode) |
| Bundler | Vite 6 |
| Server State | TanStack Query 5 |
| Routing | React Router v7 |
| Styling | SCSS (BEM) — Apple-inspired design |
| Testing | Vitest 3 + React Testing Library |
| Linting | ESLint 9 (flat config) + typescript-eslint |
| i18n | i18next + react-i18next (ES/EN) |

## Features

- **Device Catalog** — Browse mobile devices with search, filter, sort, and pagination
- **Device Details** — View specifications, select color/storage options, add to cart
- **Shopping Cart** — Track cart count across sessions (localStorage)
- **Internationalization** — Spanish / English with i18next
- **Responsive Design** — Apple-inspired UI with SF Pro typography
- **Suspense + Skeletons** — Loading states for all async operations

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run tsc

# Run tests (watch mode)
npm run test

# Run tests (single run)
npm run test:run

# Lint
npm run lint
```

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_DEVICE_API_URL=https://your-api-url.com
```

## Architecture

```
src/
├── components/          # Shared UI components
│   ├── breadcrumb/
│   ├── deviceList/
│   ├── deviceTable/
│   ├── error/
│   ├── header/
│   ├── search/
│   ├── table/
│   ├── toast/
│   └── ui/
├── contexts/            # React contexts (Toast)
├── features/devices/    # Device domain
│   └── pages/
├── hooks/               # Custom hooks
│   └── mocks/           # Test mock data
├── lib/                 # Query key factory
├── services/            # API layer
├── types/               # TypeScript types
├── utils/               # Pure utilities
├── i18n/                # i18n configuration
├── locales/             # Translation files (es.json, en.json)
└── styles/              # Global SCSS
```

### Data Flow

```
API (fetch) → Services (typed) → Custom Hooks (TanStack Query) → Pages → Components
```

### Key Patterns

- **Feature-based organization**: device domain has its own pages under `features/devices/`
- **Container/Presentational**: pages handle data, components render UI
- **Typed API layer**: services use `unknown` + type guards, never `any`
- **Suspense**: all async data uses `useSuspenseQuery` with skeleton fallbacks
- **Query Key Factory**: centralized, type-safe query key management

## TypeScript Conventions

- `interface` for component props, domain models, context values
- `type` for unions, DTOs, utility shapes, generic configuration
- Bounded generics: `<T extends Record<string, unknown>>`
- `as const` for literal types and query keys
- `satisfies` for mock data validation without widening
- **Zero `any`**: ESLint `no-explicit-any: error` enforced
- Inferred return types preferred over explicit annotations

## Testing

- Framework: Vitest + React Testing Library
- Mock patterns: `vi.mock()` + `vi.mocked()`
- Mock data: `satisfies` keyword for type safety
- Coverage: `npm run test:coverage`

## Design System

Apple-inspired design. See `DESIGN.md` for full reference.

- Primary CTA: `#0071e3`
- Page background: `#f5f5f7`
- Typography: SF Pro Display / SF Pro Text
- Cards: `rgba(0,0,0,0.22) 3px 5px 30px 0px`

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
