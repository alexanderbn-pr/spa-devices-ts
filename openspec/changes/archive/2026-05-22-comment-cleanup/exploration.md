## Exploration: Comment Cleanup

### Current State

The codebase has approximately **250-300 comment lines** across **~35 of ~56 source files**. The comment landscape is a mix of:

- **JSDoc documentation** on hooks, components, and utility functions — generally well-maintained but bilingual (Spanish + English)
- **JSX section labels** (`{/* Header - Brand & Model */}`) — redundant with class/structure, pervasive across UI components
- **Inline "what" comments** (`// Filtrar`, `// Ordenar`, `// Paginar`) — noise that restates what the code already says
- **Inline "why" comments** (optimistic update pattern, caching strategy) — small number but genuinely useful
- **SCSS design system notes** in `theme.scss` — valuable documentation of Apple design tokens
- **SCSS section dividers** in component SCSS files — mixed usefulness
- **Test intent comments** — document what each test block is verifying

**No** commented-out code, **no** TODOs/FIXMEs, **no** ESLint disable comments, **no** license headers were found.

### Language Distribution

- **~70% Spanish** — most JSDoc descriptions, most inline logic comments, SCSS comments
- **~30% English** — some hooks (useToast, useTranslation, useBreadcrumbDevice, ToastContext, Card, EmptyState), test file descriptions, some JSDoc

The code itself (variable names, function names, identifiers) is entirely in English. The i18n system handles user-facing text in both Spanish and English. The project config files (AGENTS.md, DESIGN.md) are in Spanish.

### Affected Areas

#### Files with NO comments (21 files — no changes needed):
- `src/main.jsx`
- `src/constants.js`
- `src/setupTests.js`
- `src/services/getDevices.js`
- `src/services/getDeviceDetails.js`
- `src/services/postAddDeviceCart.js`
- `src/components/breadcrumb/breadcrumb.jsx`
- `src/components/breadcrumb/breadcrumb.scss`
- `src/components/header/header.jsx`
- `src/components/deviceList/deviceList.jsx`
- `src/components/deviceList/device.jsx`
- `src/components/search/search.jsx`
- `src/components/search/search.scss`
- `src/components/toast/ToastContainer.jsx`
- `src/components/toast/Toast.jsx`
- `src/components/ui/LanguageSelector/LanguageSelector.jsx`
- `src/components/ui/LanguageSelector/LanguageSelector.scss`
- `src/components/ui/LanguageSelector/index.js`
- `src/components/ui/Card/index.js`
- `src/components/ui/EmptyState/index.js`
- `src/components/toast/index.js`

#### Files with comments to REMOVE (noise/obvious):
- `src/components/table/Table.jsx` — JSX section labels (3 lines)
- `src/components/deviceList/DeviceListSkeleton.jsx` — JSX skeleton labels (3 lines)
- `src/components/deviceTable/DeviceTableSkeleton.jsx` — JSX skeleton labels + inline (10 lines)
- `src/components/deviceTable/DeviceTable.jsx` — noise inline comments (2 lines)
- `src/features/devices/pages/deviceDetails/DeviceDetailsPage.jsx` — JSX section labels (7 lines)
- `src/features/devices/pages/device/DevicePage.jsx` — JSX labels (2 lines)
- `src/features/devices/pages/deviceTable/DeviceTablePage.jsx` — JSX labels + JSDoc noise (4 lines)
- `src/hooks/useTableState.js` — obvious inline comments (15 lines)
- `src/hooks/useTranslation.js` — field-documenting inline comments (4 lines)
- `src/components/ui/Card/Card.jsx` — `// Compound component pattern` (1 line)
- `src/utils/table-helpers.js` — some noise comments (3 lines)
- `src/lib/query-keys.js` — `// Freeze todo para hacerlo inmutable` (1 line)

#### Files with comments to KEEP (useful documentation):
- `src/style/theme.scss` — design system, all comments valuable
- `src/style/mixins.scss` — mixin description comments
- `src/contexts/ToastContext.jsx` — architectural intent comments
- `src/hooks/useCart.js` — optimistic update pattern documentation
- `src/hooks/useDeviceOptions.js` — selection logic explanation
- `src/hooks/useDevices.js` — filtering explanation
- `src/App.jsx` — route architecture comments
- `src/hooks/useBreadcrumbDevice.js` — JSDoc
- `src/hooks/useDeviceDetails.js` — JSDoc
- `src/hooks/useDevicesSearch.js` — JSDoc
- `src/hooks/useToast.js` — JSDoc
- `src/components/error/ErrorBoundary.jsx` — JSDoc
- `src/components/ui/EmptyState/EmptyState.jsx` — JSDoc + params
- `src/components/deviceTable/DeviceTableSkeleton.jsx` — JSDoc (but remove inline)
- `src/components/deviceList/DeviceListSkeleton.jsx` — JSDoc (but remove inline)
- `src/components/toast/ToastProvider.jsx` — JSDoc
- `src/components/error/ErrorBoundary.scss` — BEM comment
- `src/components/toast/Toast.scss` — section dividers + comments
- `src/components/deviceTable/DeviceTableSkeleton.scss` — block explanation
- `src/components/deviceList/device-list.scss` — section dividers
- `src/components/header/header.scss` — `// White icon on dark background` (1 line, useful)
- `src/hooks/useTableState.js` — JSDoc (but remove inline noise)

#### Test files — PRESERVE with language normalization:
- `src/hooks/useTableState.test.js`
- `src/hooks/useDevices.test.jsx`
- `src/hooks/useDeviceDetails.test.jsx`
- `src/hooks/useDeviceOptions.test.jsx`
- `src/hooks/useBreadcrumbDevice.test.jsx` (check if exists)
- `src/features/devices/pages/device/DevicePage.test.jsx`
- `src/features/devices/pages/deviceDetails/DeviceDetailsPage.test.jsx`
- `src/features/devices/pages/deviceTable/DeviceTablePage.test.jsx`
- `src/components/error/ErrorBoundary.test.jsx`

#### Files with comments to add/improve:
- `src/services/getDevices.js` — could add a brief JSDoc
- `src/services/postAddDeviceCart.js` — could add a brief JSDoc
- `src/components/header/header.jsx` — could add JSDoc
- `src/components/deviceList/deviceList.jsx` — could add JSDoc
- `src/components/deviceList/device.jsx` — could add JSDoc
- `src/services/getDeviceDetails.js` — could add a brief JSDoc

> **Note**: The "files to add/improve" section is OPTIONAL. The change request focuses on REMOVING noise, not adding new documentation. Adding JSDoc to 5-6 files increases scope. Recommend keeping scope narrow: cleanup only.

### Comment Categories Found

| Category | Count | Examples | Action |
|----------|-------|----------|--------|
| JSDoc (useful) | ~40 | `@param`, `@returns`, `@example`, component descriptions | Keep — but normalize language |
| JSX section labels (noise) | ~23 | `{/* Header skeleton */}`, `{/* Controles superiores */}` | Remove — classNames are self-documenting |
| Inline "what" comments (noise) | ~35 | `// Filtrar`, `// Ordenar`, `// Paginar`, `// Cleanup al unmount` | Remove — code says what it does |
| Inline "why" comments (useful) | ~15 | Optimistic update pattern, caching strategy, architectural decisions | Keep — document intent |
| SCSS design notes (useful) | ~25 | `theme.scss` tokens, BEM methodology comments, section dividers in large files | Keep — valuable for maintenance |
| SCSS obvious comments (noise) | ~15 | `// Shimmer animation`, `// Paginación` in Table.scss, `// Hover`, `// Striped rows` | Remove — CSS selectors describe themselves |
| Test comments (useful) | ~60+ | Test scenario labels, mock descriptions, intent documentation | Keep most — normalize language |
| Commented-out code | 0 | None found | — |
| TODOs/FIXMEs | 0 | None found | — |
| ESLint disable | 0 | None found | — |
| License headers | 0 | None found | — |

### Language Distribution

| Language | Percentage | Where |
|----------|-----------|-------|
| Spanish | ~70% | JSDoc descriptions, inline logic comments, SCSS comments, test comments |
| English | ~30% | Some hooks (useToast, useTranslation, useBreadcrumbDevice, ToastContext), EmptyState, Card, some tests |

**Recommendation for language**: Choose **English** as the canonical language. Rationale:
- The code itself is entirely in English (identifiers, function names, variable names)
- English is the universal language for code documentation in open-source/large projects
- The few existing English JSDoc blocks are better written than the Spanish ones
- Mixing is worse than choosing one — English is the safer default
- AGENTS.md conventions primarily use English for code concepts

### Approaches

1. **Minimal — remove noise only** (recommended)
   - Remove JSX section labels and obvious inline "what" comments
   - Keep all SCSS comments, test comments, JSDoc, and "why" comments
   - Do NOT change language, do NOT add new comments
   - Pros: Low risk, fast execution, addresses the core ask
   - Cons: Doesn't unify language, doesn't add missing documentation
   - Effort: Low (~30 files to touch, 5-10 minutes each)

2. **Cleanup + language normalization**
   - Remove noise comments
   - Translate remaining comments to English (unify all to English)
   - Keep all useful documentation
   - Pros: Complete solution, consistent codebase
   - Cons: Higher risk of introducing errors in translations, more files touched
   - Effort: Medium (~35 files, needs review of every kept comment)

3. **Full audit — add missing documentation**
   - All of approach 2, plus add JSDoc to files that lack it (services, header, breadcrumb, device components)
   - Pros: Comprehensive documentation coverage
   - Cons: Scope creep — change request says "remove" not "add"; adds ~5-6 new JSDoc blocks
   - Effort: Medium-High

### Recommendation

**Approach 1: Minimal — remove noise only** with a secondary pass for language normalization on kept comments.

Rationale:
- The change request says "elimina los comentarios que veas que no añaden información y un senior no mantendria para documentar" — its primary directive is REMOVAL
- Adding documentation or translating is extra scope not explicitly requested
- However, since it asks for "todos en el mismo idioma" (all in the same language), a SECONDARY language normalization pass on kept comments is justified
- English is the best choice for language unification

**Proposed plan:**
1. Remove all JSX `{/* section */}` noise comments (~23 lines, 6 files)
2. Remove all inline "what" comments that restate the obvious (~35 lines, ~8 files)
3. Normalize language of remaining comments to English:
   - Translate Spanish JSDoc `@param`/`@returns`/descriptions to English
   - Translate Spanish inline "why" comments to English
   - Keep English comments as-is
   - Translate SCSS comments to English
4. Keep ALL test comments, SCSS design notes, and architectural "why" comments
5. Do NOT add new JSDoc to any files (keep scope contained)

### Risks

- **Removing comments that look like noise but encode intent**: Some inline comments like `// Cleanup al unmount` in useTableState.js seem obvious — but the cleanup pattern (clearing debounce timers) is an important edge case. Mitigation: always read the code before removing a comment. If the pattern is non-obvious (like debounce cleanup), keep the comment.
- **SCSS section dividers**: Large SCSS files (like device-list.scss at 196 lines) benefit from visual section markers. Removing all of them makes the file harder to scan. Mitigation: keep section dividers in files >100 lines, remove in smaller files.
- **Test scenario comments**: Some test files use numbered sections (`// 3.1 PLP: carga`) that help developers locate specific test scenarios. These look like noise but actually help with test navigation. Mitigation: keep these, they serve a structural purpose.
- **Language normalization on technical terms**: Terms like "debounce", "optimistic update", "staleTime" should NOT be translated. Mitigation: preserve technical English terms even when translating surrounding text to English.
- **Over-translation of JSDoc**: JSDoc param descriptions in Spanish like `@param {string} id - ID del dispositivo` are perfectly clear. Translating to English carries a small risk of introducing errors. Mitigation: simple translations only, use a consistent formula.

### Ready for Proposal

Yes
