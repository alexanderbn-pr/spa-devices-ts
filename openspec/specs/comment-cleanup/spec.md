# Comment Cleanup Spec

## Requirements

### Requirement: Noise Comment Removal

Noise comments that add no information MUST be removed. Senior developer readability SHALL be the bar for retention.

| Type | Action | Examples |
|------|--------|----------|
| JSX section labels | REMOVE | `{/* Header */}`, `{/* Buttons */}` |
| "What" restating code | REMOVE | `// Set loading to true`, `// Map devices` |
| Divider lines | REMOVE | `// =======`, `// --------` |

#### Scenario: JSX section labels removed
- GIVEN a component with `{/* Section Name */}` comments
- WHEN cleanup runs
- THEN those JSX comment blocks are absent
- AND no code behavior changes

#### Scenario: Obvious inline comments removed
- GIVEN a line `const isLoading = true; // Set loading to true`
- WHEN cleanup runs
- THEN the trailing comment is removed
- AND the code statement is preserved

### Requirement: Intent-Bearing Comment Preservation

Comments that explain "why", non-obvious decisions, architectural tradeoffs, or test intent MUST be preserved.

#### Scenario: JSDoc preserved
- GIVEN a hook with `/** Fetches device details with retry */`
- WHEN cleanup runs
- THEN the JSDoc block remains

#### Scenario: "Why" comments preserved
- GIVEN `// Using setTimeout because debounce causes flicker here`
- WHEN cleanup runs
- THEN the comment remains unchanged

#### Scenario: Test scenario descriptions preserved
- GIVEN `it('should rollback optimistic update on error', ...)`
- WHEN cleanup runs
- THEN the test description string is preserved

### Requirement: Language Normalization

All remaining comments, JSDoc, and test scenario descriptions MUST be in English. Technical terms SHALL remain unchanged.

#### Scenario: Spanish JSDoc translated
- GIVEN `/** Obtiene el dispositivo por ID */`
- WHEN cleanup runs
- THEN becomes `/** Gets device by ID */`

#### Scenario: Spanish inline comment translated
- GIVEN `// Mapeamos los datos de la API`
- WHEN cleanup runs
- THEN becomes `// Map API response data`

#### Scenario: Technical terms preserved
- GIVEN `// Usamos useQuery para cachear`
- WHEN cleanup runs
- THEN becomes `// Use useQuery for caching`
- AND `useQuery` remains unchanged

#### Scenario: English comments unchanged
- GIVEN `// Optimistic update pattern for better UX`
- WHEN cleanup runs
- THEN the comment remains identical

### Requirement: No Behavior Changes

This is a pure refactor. Code behavior MUST NOT change.

#### Scenario: Build passes
- GIVEN all comment changes applied
- WHEN `npm run build` executes
- THEN build succeeds with zero errors

#### Scenario: Tests pass
- GIVEN all comment changes applied
- WHEN `npm run test:run` executes
- THEN all tests pass

#### Scenario: Lint passes
- GIVEN all comment changes applied
- WHEN `npm run lint` executes
- THEN zero new warnings or errors
