---
name: tdd-red
description: Create failing Jasmine and Playwright tests from an approved user story before production implementation in this repository. Use for the TDD Red phase after requirements are approved.
---

# TDD Red

Turn an approved story into executable specifications that fail for the missing behavior. Modify tests and test-only support code; do not implement production behavior.

## Establish the approved input

Use the current explicitly approved user story. When it is not present in the conversation, load the private `context-recovery` snapshot and require an active approved story produced by `requirement-interview` or equivalent evidence.

Stop and request refinement through `requirement-interview` when acceptance criteria are absent, materially ambiguous, or not observable. Do not invent product behavior to make a test possible.

Before editing, capture targeted Git status/diff evidence so existing user changes remain distinguishable from Red-phase changes.

## Assess the test surface

Read the applicable `AGENTS.md` files, `ARCHITECTURE.md`, the relevant production interfaces, and nearby tests. Inspect only the files needed to identify observable boundaries and existing conventions.

This repository uses:

- Jasmine through Angular's Karma builder for unit/component/service tests in adjacent `src/**/*.spec.ts` files;
- Playwright for browser workflows under `tests/`;
- Playwright route interception for deterministic Bookmonkey API responses;
- standalone Angular components and dependency injection through Angular's test utilities.

Reuse those tools and patterns. Do not add dependencies or change test/build configuration unless the approved story explicitly requires it.

## Map scenarios before writing

Create a concise coverage map for every complete Given/When/Then scenario:

| Acceptance scenario | Test boundary | Test file and case | Observable Red expectation |
| --- | --- | --- | --- |

Each acceptance scenario must map to at least one independently named test case. Treat Given as arrangement, When as the action, and Then/And as observable assertions within that test. Preserve the scenario's business language in the test name where practical.

Choose the narrowest boundary that proves the behavior:

- Use Jasmine for component state/rendering, service behavior, routing configuration, transformations, and error handling that can be verified without a real browser.
- Use Playwright for user navigation, accessibility-facing behavior, direct URLs, responsive or browser behavior, and end-to-end state transitions.
- For UI stories, create both meaningful unit-level and Playwright coverage across the story. Do not duplicate every assertion at both layers; use Playwright for the user-visible contract and Jasmine for focused logic or component integration.

If a scenario has no legitimate unit or browser boundary, explain that in the coverage map instead of creating a meaningless test.

## Scaffold executable failing tests

Write the tests before any production implementation.

- Prefer executable assertion failures caused by missing behavior.
- A compile failure is acceptable only when the approved story requires a genuinely new public symbol that cannot be referenced otherwise; report it explicitly.
- Never use unconditional `fail()`, knowingly false constants, placeholder assertions, skipped/pending tests, `test.only`, or timing-dependent behavior to manufacture Red.
- Keep fixtures deterministic. Mock external HTTP at the existing boundary and use semantic Playwright locators such as roles, names, and visible user text.
- Assert outcomes rather than private implementation details. Avoid locking in a proposed implementation from technical notes unless it is an approved contract.
- Add test-only helpers only when they reduce repetition without hiding Given/When/Then intent.
- Do not edit production source, application configuration, dependencies, or permanent documentation during this phase.

When existing behavior already satisfies a scenario, keep the valid test and report it as already Green. Do not weaken or falsify the assertion merely to obtain a failure. A story is not a complete Red phase until every new scenario has an expected failing test or is explicitly identified as already implemented.

## Prove the Red phase

Format only the changed test files, then run the smallest relevant checks first:

- targeted Jasmine/Karma tests with `npm test -- --watch=false --browsers=ChromeHeadless --include <spec-path>`;
- targeted Playwright tests with `npx playwright test <test-path> --project=chromium`.

Expand only when useful. A nonzero exit code alone is not proof of Red. Inspect the output and classify each failure:

- **Expected Red:** an assertion or missing approved public surface demonstrates absent required behavior.
- **Invalid test:** syntax, type, selector, fixture, mock, configuration, or test-runner failure prevents the requirement from being exercised.
- **Environment blocker:** browser, dependency, port, or process setup prevents execution.
- **Unexpected Green:** the asserted behavior already passes.

Fix invalid tests and rerun them. Do not change production code to turn invalid failures into expected failures. If environment setup blocks execution, run safe diagnostics and report the exact unverified tests rather than claiming Red.

## Handoff

Return:

1. the scenario-to-test coverage map;
2. test files created or changed;
3. commands run and the expected failing evidence for each scenario;
4. invalid failures or environment limitations, if any;
5. any scenarios that were already Green;
6. confirmation that production code was not changed by this phase.

Refresh the private `context-recovery` snapshot with the test mapping, Red evidence, blockers, and the next authorized step. Stop before Green-phase implementation unless the user separately authorizes it; when authorized, hand off to `$tdd-green`.
