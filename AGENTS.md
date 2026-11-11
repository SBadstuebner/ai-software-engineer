# Repository Development Guide

## Mandatory workflow skills

- After a user story and its Given/When/Then acceptance criteria are explicitly approved, use `$tdd-red` before implementing production behavior.
- The Red phase may add or modify tests and test-only helpers, but must not implement production behavior.
- When the user authorizes implementation after a valid Red handoff, use `$tdd-green` to make the failing tests pass with minimal production code. Preserve tests unless evidence proves a test is wrong, and stop before broader refactoring.
- After Green is verified and the user authorizes cleanup, use `$angular-refactor` for behavior-preserving Angular refactoring. Keep tests Green after each small transformation and avoid unrelated modernization.
- Before declaring a feature delivered or closing its GitHub issue, use `$requirements-finalization` to reconcile every acceptance criterion, run the full verification and documentation gates, update the verified issue, and close it only when all evidence passes.

## Shared guidance

- Read [`ARCHITECTURE.md`](ARCHITECTURE.md) for the current stack, routes, dependencies, and application data flow.
- Instructions under [`src/AGENTS.md`](src/AGENTS.md) apply to application source, with narrower feature guidance taking precedence where present.
- Preserve unrelated working-tree changes and follow the documentation completion gate in `src/AGENTS.md` after major changes.
