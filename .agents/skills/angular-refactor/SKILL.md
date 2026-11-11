---
name: angular-refactor
description: Refactor Green Angular code without changing behavior, using this repository's standalone-component conventions, reactive composition, and pragmatic SOLID principles. Use after the TDD Green phase when cleanup is authorized.
---

# Angular Refactor

Improve the internal design of a completed Green implementation while preserving its approved behavior. Keep every test Green and avoid unrelated cleanup or new feature work.

## Confirm the Green baseline

Use the `$tdd-green` handoff or private `context-recovery` snapshot to identify the approved story, production changes, test mapping, and verification evidence. Read the applicable `AGENTS.md` files, `ARCHITECTURE.md`, changed Angular source, and directly related tests.

Capture targeted Git status/diff evidence so existing user changes remain distinguishable. Before refactoring, reproduce the Green baseline with the smallest relevant Jasmine and Playwright tests. Run `npm run build` when the planned transformation can affect compilation, templates, routing, dependency injection, or bundling.

If the relevant tests are failing, return to `$tdd-green`; do not refactor on a Red baseline. If the intended cleanup would change acceptance behavior, public contracts, dependencies, routes, or architecture, stop and request separate authorization.

## Assess before editing

Inspect the Green implementation and produce a short, evidence-based refactor map:

| Smell or inconsistency | Proposed transformation | Principle or project rule | Verification |
| --- | --- | --- | --- |

Prioritize issues introduced or exposed by the current story. Do not turn the Refactor phase into a repository-wide modernization pass.

Apply SOLID as a design aid, not as a quota for interfaces or layers:

- **Single responsibility:** keep presentation, orchestration, domain transformation, and HTTP access at clear boundaries.
- **Open/closed and dependency inversion:** introduce an abstraction only when an actual variation, dependency boundary, or test seam benefits from it.
- **Liskov substitution:** preserve existing behavioral contracts when replacing or generalizing types.
- **Interface segregation:** keep component inputs, service APIs, and types as narrow as their consumers require.
- Prefer composition over inheritance and avoid speculative frameworks, base classes, facades, or repositories.

## Apply repository Angular standards

- Keep one Angular component per TypeScript file with its non-trivial template in the adjacent `.html` file.
- Use standalone components and explicit `imports` arrays. Register application-wide providers only through the established application configuration.
- Keep feature models, components, and services together under the feature folder; move reusable presentation only to `app/shared/` when there is demonstrated reuse.
- Keep HTTP and external-data access behind injectable services. Components own presentation state and user interaction rather than calling external APIs directly.
- Preserve strict TypeScript and template typing. Model optional data explicitly instead of hiding uncertainty with casts or non-null assertions.
- Maintain semantic HTML, keyboard access, focus visibility, accessible names, and status/alert semantics.
- Preserve Tailwind utility styling and responsive behavior; do not introduce another styling system.

Keep abstraction levels consistent within a method or component. Extract a helper, service, or child component when it creates a cohesive responsibility, removes meaningful duplication, or makes a reactive flow understandable. Do not split cohesive behavior merely to reduce line count.

## Prefer reactive composition

- Represent derived state as a derivation rather than another manually synchronized mutable field.
- Prefer template `async`, signals, computed values, or composed RxJS streams over manual subscription bookkeeping when they fit the existing boundary.
- Avoid nested subscriptions. Use operators such as `switchMap`, `map`, `catchError`, `finalize`, and `distinctUntilChanged` according to the required cancellation and error semantics.
- When an imperative subscription is necessary, bind its lifetime with Angular lifecycle-aware utilities such as `takeUntilDestroyed`.
- Do not mix signals and observables without a clear ownership boundary or repeatedly convert between them.
- Keep loading, success, empty, and error states mutually understandable and prevent stale requests from overwriting newer state.

Choose reactive primitives based on the local design and behavior; do not migrate working code to a different state style solely for fashion or consistency at a distance.

## Refactor in verified increments

Make one coherent transformation at a time. After each transformation:

1. inspect the diff for accidental behavior or scope changes;
2. run the narrowest affected unit or browser tests;
3. revert or correct the transformation immediately if the tests stop being Green.

Preserve routes, API contracts, accessible names, visible behavior, test fixtures, and acceptance assertions. Tests may be reorganized only when file moves or public-neutral structural changes require import updates; do not weaken, delete, skip, or rewrite behavioral expectations to accommodate the refactor.

Do not add features, dependencies, test-only production hooks, speculative abstractions, or broad formatting churn. Keep useful comments that explain non-obvious constraints and remove comments only when the refactored code makes them genuinely obsolete.

## Verify and hand off

After incremental checks pass, run the complete relevant verification:

1. `npm test -- --watch=false --browsers=ChromeHeadless`.
2. `npx playwright test`.
3. `npm run build`.
4. Formatting for changed files and `git diff --check`.

Do not claim behavior preservation when a relevant suite was not run. Distinguish refactor regressions, pre-existing failures, and environment blockers.

Perform the mandatory documentation review from `src/AGENTS.md`. Update documentation only when the resulting structure, architecture, routes, dependencies, commands, setup, testing, or feature guidance changed; otherwise explicitly record that it remains accurate.

Return:

1. the refactor map and transformations completed;
2. how project conventions and SOLID principles improved the design;
3. any structural test-only changes and why they were necessary;
4. incremental and full verification results;
5. documentation reviewed or updated;
6. remaining opportunities intentionally left out of scope.

Refresh the private `context-recovery` snapshot with the completed Refactor phase and verification evidence. When delivery is ready to verify and the user authorizes issue finalization, hand off to `$requirements-finalization`.
