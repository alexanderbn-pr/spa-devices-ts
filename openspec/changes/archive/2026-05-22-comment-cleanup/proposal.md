# Proposal: Comment Cleanup

## Intent

Remove ~130 lines of noise comments (JSX section labels, inline "what" comments) that add no information a senior developer would maintain. Normalize remaining ~120 lines of JSDoc, "why" comments, and test descriptions to English, unifying from the current ~70% Spanish / ~30% English mix.

## Scope

### In Scope
- Remove JSX `{/* section label */}` noise (~23 lines across 6 files)
- Remove inline "what" comments that restate obvious code (~35 lines across 8 files)
- Translate remaining comments (JSDoc, "why" comments, design notes) to English
- Preserve all intent-bearing comments (optimistic update patterns, architectural decisions, test scenarios)

### Out of Scope
- No new JSDoc or documentation added
- No code behavior changes
- No SCSS restructuring or refactoring
- Test logic, coverage, and file structure untouched

## Capabilities

### New Capabilities
None — pure refactor, no new functionality.

### Modified Capabilities
None — no spec-level behavior changes.

## Approach

Per-file, three-step review: (1) identify noise comments, (2) remove them, (3) translate preserved comments to English. Group into a single commit. Run `eslint --fix` after all changes.

## Affected Areas

| Area | Action | Files |
|------|--------|-------|
| **Noise removal** | Remove JSX labels + obvious inline comments | `Table.jsx`, `DeviceDetailsPage.jsx`, `DevicePage.jsx`, `DeviceTablePage.jsx`, `DeviceTable.jsx`, `Card.jsx`, `useTableState.js`, `useDevices.js`, `useTranslation.js`, `query-keys.js`, `table-helpers.js`, skeleton components (6) |
| **Language normalization** | Translate JSDoc, "why" comments, design notes to English | `useDevices.js`, `useDevicesSearch.js`, `useDeviceDetails.js`, `useDeviceOptions.js`, `useCart.js`, `useTableState.js`, `useBreadcrumbDevice.js`, `useToast.js`, `useCartContext.jsx`, `ErrorBoundary.jsx`, `EmptyState.jsx`, `ToastContext.jsx`, `ToastProvider.jsx`, `Table.jsx`, `DeviceTable.jsx`, `DeviceTablePage.jsx`, `App.jsx`, `theme.scss`, `mixins.scss`, component SCSS (10), test files (9) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Removing intent-bearing comments that look like noise | Low | Read code context before removal; keep anything non-obvious |
| Translation errors in JSDoc params | Low | Use formulaic translations; preserve technical English terms |
| Test comment translation alters scenario intent | Low | Read test context before translating |

## Rollback Plan

Single commit `chore: cleanup comments — remove noise, normalize to English`. Rollback: `git revert <sha>`.

## Dependencies

None.

## Success Criteria

- [ ] `npm run build` passes
- [ ] `npm run test:run` passes
- [ ] `npm run lint` passes with zero new warnings/errors
- [ ] All remaining comments are in English
- [ ] Zero removed comments that explain non-obvious intent
