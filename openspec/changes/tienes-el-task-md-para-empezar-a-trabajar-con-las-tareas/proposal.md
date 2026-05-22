# Proposal: Project Audit — "tienes el task.md para empezar a trabajar con las tareas"

## Intent

Improve the SPA device catalog to production-ready quality across 8 audit areas: Performance, Structure, Error Handling, Accessibility, Asset Optimization, UX/Feedback, i18n, and Documentation. The project already uses solid patterns (TanStack Query, Suspense, Error Boundaries) but needs consolidation, polish, and missing systems.

## Scope

### In Scope
- Consolidate ErrorBoundary components (extract to shared component)
- Add global ErrorBoundary in App.jsx
- Fix a11y copy errors (`aria-label="Buscar libro"` → "dispositivo")
- Fix semantic HTML (cart icon as `<button>`)
- Add `loading="lazy"` and explicit dimensions to images
- Create toast notification system for cart feedback
- Replace `<div className="loading">` with skeleton in DeviceDetails
- Integrate react-i18next with Spanish/English locale files
- Migrate flat `pages/` to `features/` structure
- Create generic Card component
- Add skip link for keyboard navigation
- Add EmptyState component for DeviceList
- Create README.md

### Out of Scope
- TypeScript migration (`.js` → `.tsx`) — future work
- Storybook setup — deferred after audit
- WebP/AVIF image optimization (requires API support)
- Performance fine-tuning (`useOptimistic`, AbortController) — Phase 3

## Capabilities

> This is a pure audit/refactor — no new features introduced at spec level.

**New Capabilities:** None  
**Modified Capabilities:** None

## Approach

Phased delivery with independent PRs to keep review workload manageable:

| Phase | Focus | Key Deliverables | Risk |
|-------|-------|-----------------|------|
| **1 — Quick Wins** | Error Handling + A11y + Assets | ErrorBoundary extracted, global boundary, aria fixes, lazy images | Low |
| **2 — Core Systems** | UX + i18n | Toast system, skeleton in DeviceDetails, EmptyState, i18n foundation | Medium |
| **3 — Structure & Polish** | Architecture + Docs | Features migration, Card component, skip link, README | Low |

### Delivery Strategy

**Chained PRs recommended** — This audit affects 30+ files across 8 areas. A single PR would exceed the 400-line review budget. Each phase is a self-contained PR with clear start/finish and independent rollback via git.

## Affected Areas

| Area | Impact | Files |
|------|--------|-------|
| Error Handling | Modified | `src/components/`, `src/App.jsx` |
| Accessibility | Modified | `src/components/header/`, `src/components/search/`, `src/components/deviceList/` |
| Asset Optimization | Modified | `src/components/deviceList/device.jsx`, `src/components/deviceTable/DeviceTable.jsx` |
| UX/Feedback | New + Modified | `src/components/`, `src/pages/deviceDetails/deviceDetails.jsx` |
| i18n | New | All `.jsx` files with hardcoded text |
| Structure | Modified | `src/pages/*`, `src/features/`, `src/components/` |
| Documentation | New | Project root — README.md |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| i18n integration touches all files | High | Phase 2 separately; feature-flag or incremental migration |
| Features migration breaks imports | Medium | Migrate one page at a time; verify App.jsx routes after each |
| Toast system requires context setup | Low | Use simple context-based system; avoid heavy libraries |

## Rollback Plan

- Each phase is a separate git commit/PR — revert via `git revert`
- Toast/i18n systems can be feature-flagged with `VITE_ENABLED_*` env vars
- Structure migration: atomic commits per page moved

## Dependencies

- Phase 2 (Toast/i18n) depends on Phase 1 (ErrorBoundary consolidation)
- Phase 3 (Features migration) depends on Phase 2 (no shared state)

## Success Criteria

- [ ] Phase 1: All pages have ErrorBoundary, no copy errors in aria-labels, images have `loading="lazy"`
- [ ] Phase 2: Cart mutations show toast feedback, DeviceDetails uses skeleton, EmptyState appears when no devices match search
- [ ] Phase 3: All pages under `features/devices/`, generic Card component reusable, skip link navigates to main content, README.md covers installation and architecture
- [ ] All phases: ESLint passes, no console errors, accessible via keyboard navigation