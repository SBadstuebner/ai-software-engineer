# Source Development Guide

This file applies to everything under `src/`. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md) before making structural changes; it is the source of truth for the stack, application boundaries, routes, and data flow.

## Technical baseline

- The application uses Angular 20, strict TypeScript, standalone components, Angular Router, HttpClient, RxJS, and Zone.js.
- Bootstrap the application through `main.ts` and register application-wide providers in `app/app.config.ts`.
- Define top-level routes in `app/app.routes.ts`. Keep feature-specific models, components, and services together under their feature folder.
- Keep state local to components or root-provided services unless a requirement clearly needs a broader state-management layer.
- Use Tailwind CSS utilities for feature UI and responsive layout. Global Tailwind and Angular Material configuration belongs in `styles.css` and `material-theme.scss`.
- Preserve strict typing and strict template checking. Model optional API fields explicitly and render sensible missing-data states.

## Implementation conventions

- Prefer standalone components with explicit `imports` arrays.
- Keep non-trivial component markup in adjacent `.html` templates and put reusable presentation patterns under `app/shared/`.
- Keep HTTP access behind injectable API services; components own presentation state such as loading, success, empty, and error states.
- Use semantic HTML, visible keyboard focus, meaningful link and button names, and status or alert semantics for asynchronous states.
- Reuse existing dependencies and patterns before introducing another framework or application-wide abstraction.
- Update [`../ARCHITECTURE.md`](../ARCHITECTURE.md) when routes, dependencies, application boundaries, or data flow change.

## Verification

- Run `npm run build` after application changes.
- Browser workflows are covered with Playwright under `../tests/`; mock the external API boundary when deterministic data or error responses are required.
- Format changed source and Markdown files with Prettier and keep `git diff --check` clean.

## Documentation completion gate

- After every major change, re-read the existing project documentation and verify it against the resulting implementation. This review is mandatory before considering the change complete.
- Update every affected document in the same change whenever routes, commands, dependencies, architecture, behavior, setup, testing, or feature guidance would otherwise be inaccurate or outdated.
- At minimum, check `../README.md`, `../ARCHITECTURE.md`, this file, and any more narrowly scoped `AGENTS.md` files that apply to the changed area.
- If no documentation update is necessary, explicitly confirm that the review was performed and that the existing documentation remains accurate.
