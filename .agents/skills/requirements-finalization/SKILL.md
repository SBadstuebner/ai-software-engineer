---
name: requirements-finalization
description: Reconcile a completed feature with its approved acceptance criteria, run final repository verification, update and close the identified GitHub issue, and produce a traceable completion summary. Use after implementation and optional refactoring are complete.
---

# Requirements Finalization

Finish an implemented requirement with evidence. Treat acceptance criteria, verification, documentation, and GitHub traceability as one completion gate; do not close an issue while any required part is incomplete or uncertain.

## Establish authoritative context

Use the current handoff and private `context-recovery` snapshot to recover:

- the approved user story and Given/When/Then acceptance criteria;
- scope exclusions, decisions, and approved requirement changes;
- Red test mapping, Green implementation evidence, and Refactor verification;
- the GitHub repository and exact issue identifier.

Read the applicable `AGENTS.md` files, `ARCHITECTURE.md`, relevant feature guidance, changed implementation and tests, and the current GitHub issue. Current explicit user instructions override older evidence, but do not silently replace the issue's original acceptance criteria with the implementation.

Resolve the issue from an explicit identifier or a confirmed snapshot/reference. A branch name, commit message, or pull request may be used only to locate a candidate that is then verified against the repository and requirement. Never invent an issue number or update a merely plausible issue.

Use an available authenticated GitHub connector or `gh` CLI scoped to the current repository. Read current issue state before any mutation. Never expose credentials or copy the private context snapshot into GitHub.

## Reconcile delivery with acceptance criteria

Build an evidence matrix before declaring completion:

| Acceptance scenario | Implementation evidence | Test evidence | Documentation or manual evidence | Status |
| --- | --- | --- | --- | --- |

Use `met`, `not met`, or `unverified` for status. Each scenario needs observable evidence tied to the approved Given/When/Then behavior. A changed file alone is not proof, and a passing test is relevant only when it actually exercises that criterion.

Also verify:

- explicit non-goals remain out of scope;
- approved error, loading, empty, accessibility, and direct-navigation behavior is preserved where applicable;
- implementation has not introduced unapproved routes, dependencies, contracts, or behavior;
- issue checklists and current implementation describe the same delivered scope.

If implementation and requirements conflict, do not rewrite the requirement after the fact. Report the discrepancy and route missing behavior back to `$tdd-red` and `$tdd-green`. If product intent changed, require explicit approval through `requirement-interview` before updating acceptance criteria.

## Run the completion gate

Run the narrow acceptance tests first, then the complete repository verification:

1. `npm test -- --watch=false --browsers=ChromeHeadless`.
2. `npx playwright test`.
3. `npm run build`.
4. Formatting checks for changed files and `git diff --check`.

Inspect results rather than relying only on exit codes. Do not describe blocked or unexecuted checks as passing. Distinguish feature regressions, unrelated pre-existing failures, and environment blockers.

Perform the documentation completion gate in `src/AGENTS.md`: re-read `README.md`, `ARCHITECTURE.md`, root and applicable nested `AGENTS.md` files, and feature documentation. Update stale documentation before completion, then rerun any check affected by that update.

Completion is blocked when any acceptance criterion is `not met` or `unverified`, any required verification fails or cannot run, documentation is stale, issue identity is uncertain, or the working-tree evidence cannot distinguish this feature from unrelated changes.

## Update GitHub safely

GitHub updates and closure are external mutations. Proceed only when the current request authorizes finalization for the verified issue. If authorization or issue identity is unclear, present the local completion evidence and ask for the missing direction before posting.

When the completion gate passes:

1. Re-read the issue immediately before mutation to detect new comments, criteria, or state changes.
2. Prepare a concise completion comment containing:
   - delivered outcome;
   - acceptance-criteria checklist with evidence;
   - test and build commands with results;
   - documentation updated or confirmed current;
   - relevant pull request or commit references when verified;
   - known limitations that do not contradict acceptance.
3. Update matching issue-body checkboxes only when each checkbox maps unambiguously to verified criteria and the edit can preserve all unrelated content. Otherwise leave the body intact and use the completion comment.
4. Post the completion comment. Confirm it succeeded before closing.
5. Close the issue with the repository's normal completed/resolved reason. Do not close an issue already closed for a different reason without user direction.
6. Read the issue once more and confirm its final state and posted traceability.

If posting, editing, or closing fails, stop further mutations, retain the issue's actual state, and report the exact remaining action. Do not retry repeatedly or claim closure from the intended request.

When the gate is blocked, keep the issue open. If authorized, post a blocker comment only when it provides useful shared status and does not misrepresent delivery.

## Completion output

Return a self-contained summary with:

1. issue reference and final state;
2. delivered scope and explicit exclusions;
3. acceptance-criteria evidence matrix;
4. tests, build, formatting, and documentation results;
5. GitHub changes made, including the completion comment and any checklist update;
6. pull request or commit references when confirmed;
7. limitations, blockers, or follow-up stories.

After verified issue closure, mark the private `context-recovery` snapshot `complete` with the final evidence and retain it until the next task replaces it. If closure remains pending, keep the snapshot active with the exact next action.
