---
name: tdd-green
description: Implement the minimum production code needed to make an approved story's failing Jasmine and Playwright tests pass in this repository. Use after the TDD Red phase and before refactoring.
---

# TDD Green

Complete the Green phase by satisfying valid Red tests with the smallest coherent production change. Preserve the approved behavior and tests; do not broaden the feature or refactor beyond what is needed to reach Green.

## Confirm a valid Red handoff

Use the current `$tdd-red` handoff or the private `context-recovery` snapshot to identify:

- the approved user story and Given/When/Then scenarios;
- the scenario-to-test mapping;
- the exact expected Red failures and any known environment limitations;
- the test and production files in scope.

Read applicable `AGENTS.md` files, `ARCHITECTURE.md`, the failing tests, and only the production code needed to understand their public boundary. Capture targeted Git status/diff evidence so pre-existing user changes remain distinguishable.

Run the smallest relevant test commands before editing production code. Continue only when failures reproduce as missing approved behavior. If tests are unexpectedly Green, invalid, or blocked by the environment, report that state and resolve the Red handoff before implementation.

## Interpret expectations

For each failing test, translate its arrangement, action, and assertions into an observable production obligation. Maintain a concise mapping:

| Test and scenario | Expected behavior | Production boundary | Current failure |
| --- | --- | --- | --- |

Treat the approved acceptance criteria as the product authority and valid tests as executable evidence. Do not implement assertion text literally when doing so would hardcode fixtures, selectors, timing, or test-only behavior.

## Preserve tests

Do not alter, skip, weaken, delete, or replace tests merely to obtain Green. Do not use focused tests, loosen assertions, increase timeouts without evidence, or change fixtures to match the implementation.

A test may change only when evidence shows that it is wrong, such as when it:

- contradicts the approved story or another higher-authority requirement;
- contains a syntax, type, selector, fixture, mock, or runner error that prevents the scenario from being exercised;
- asserts an implementation detail that the approved contract does not require;
- is nondeterministic for a demonstrated reason unrelated to production behavior.

Before changing such a test, state the evidence and the minimal correction. Preserve its behavioral intent, rerun it to confirm it still produces valid Red against the unimplemented behavior when practical, and include the change in the handoff. If correcting it would change product scope or an acceptance criterion, stop and request user approval or return to `requirement-interview`.

Do not add new acceptance behavior during Green. Return uncovered requirements or missing scenarios to `$tdd-red` instead.

## Implement the minimum behavior

Work one failing behavior at a time and prefer the narrowest production change that satisfies the approved contract.

- Follow the standalone Angular, strict TypeScript, service-boundary, and Tailwind conventions in the applicable repository guidance.
- Reuse existing dependencies, components, models, and patterns.
- Keep behavior general for the accepted input domain; never special-case test data, detect the test runner, bypass real paths, or expose test-only production APIs.
- Handle approved error, empty, loading, accessibility, and direct-navigation behavior when covered by the story.
- Avoid unrelated cleanup, speculative abstractions, dependency additions, architectural expansion, and broad refactors.

After each coherent change, rerun the narrowest affected tests. Use their output to choose the next change rather than implementing beyond demonstrated requirements.

## Verify Green

When targeted tests pass, run the repository's complete relevant verification:

1. Jasmine/Karma: `npm test -- --watch=false --browsers=ChromeHeadless`.
2. Playwright: `npx playwright test`.
3. Production build: `npm run build`.
4. Formatting and `git diff --check` for changed files.

All tests must pass before claiming Green. Distinguish production failures from environment blockers and pre-existing unrelated failures. Do not describe an unexecuted or blocked suite as passing.

After the production change, perform the mandatory documentation review from `src/AGENTS.md`. Update affected documentation when behavior, routes, commands, dependencies, architecture, setup, or feature guidance changed; otherwise explicitly record that the existing documentation remains accurate.

## Handoff

Return:

1. the test-to-production mapping;
2. the minimal production changes made;
3. any test changes, with evidence that each test was wrong and how intent was preserved;
4. targeted and full verification commands with results;
5. documentation reviewed or updated;
6. remaining blockers or scenarios not Green.

Refresh the private `context-recovery` snapshot with implementation progress and verification evidence. Stop at Green; when the user separately authorizes the Refactor phase, hand off to `$angular-refactor`.
