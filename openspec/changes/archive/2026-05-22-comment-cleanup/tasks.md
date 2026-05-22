# Tasks: Comment Cleanup

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~250 (130 removals + 120 normalizations) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |

Decision needed before apply: No
Chained PRs recommended: No
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | All phases — single commit | PR 1 | Well under 400-line budget |

## Phase 1: Noise Removal — JSX Labels & Obvious Inline Comments

- [x] 1.1 Remove JSX section labels from `DeviceDetailsPage.jsx` (7 lines), `DevicePage.jsx` (2 lines), `DeviceTablePage.jsx` (2 lines)
- [x] 1.2 Remove JSX labels from skeleton components: `DeviceTableSkeleton.jsx` (5 lines), `DeviceListSkeleton.jsx` (3 lines)
- [x] 1.3 Remove JSX labels from `Table.jsx` (3 lines)
- [x] 1.4 Remove inline "what" comments from `useTableState.js` (~14 lines)
- [x] 1.5 Remove obvious inline comments from `DeviceTable.jsx` (4 lines)

## Phase 2: Language Normalization — JSDoc & Comments to English

- [x] 2.1 Translate JSDoc in hooks: `useDevices.js`, `useDevicesSearch.js`, `useDeviceDetails.js`, `useDeviceOptions.js`, `useBreadcrumbDevice.js`
- [x] 2.2 Translate JSDoc + inline comments in `useCart.js` (8 inline + JSDoc block)
- [x] 2.3 Translate JSDoc in UI components: `EmptyState.jsx` (@example), `Card.jsx`
- [x] 2.4 Translate JSDoc in utility files: `table-helpers.js`, `Table.jsx`, `DeviceTable.jsx`, `DeviceTablePage.jsx`
- [x] 2.5 Translate JSDoc in `DeviceTableSkeleton.jsx`, `DeviceListSkeleton.jsx`

## Phase 3: SCSS & Test Comment Cleanup

- [x] 3.1 Translate SCSS comments in `Table.scss` (4 lines)
- [x] 3.2 Remove/translate obvious skeleton comments in `DeviceTableSkeleton.scss`, `device-list.scss`
- [x] 3.3 Translate test comments and `it()` descriptions in `useDevices.test.jsx` (5 comments + 2 descriptions)

## Phase 4: Verification

- [x] 4.1 Run `npm run lint` — passes with 0 errors, 2 pre-existing warnings
- [x] 4.2 Run `npm run build` — succeeds
- [x] 4.3 Run `npm run test:run` — 59/59 tests pass across 9 test files
