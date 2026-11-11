# Architecture

## Overview

BookMonkey is a client-side, standalone Angular 20 application. It displays and filters books obtained from the separately started Bookmonkey API, with local examples available when that collection is empty or unavailable; this repository does not contain an application backend or database.

## Tech stack

- **Framework:** Angular 20 with standalone components, Angular Router, HttpClient, template-driven forms, RxJS, and Zone.js
- **Language and build:** strict TypeScript 5.9 targeting ES2022, Angular CLI, and the `@angular/build:application` builder
- **UI:** Tailwind CSS 4 (loaded through PostCSS) plus Angular Material/CDK; the current feature UI primarily uses Tailwind utility classes
- **Testing and tooling:** Angular's Karma test builder, Playwright for browser tests, Prettier for formatting, and a VS Code compound run configuration for the frontend and API

## Application structure

```text
src/
├── main.ts                       # Bootstraps the standalone application
├── styles.css                    # Loads Tailwind CSS globally
├── material-theme.scss           # Angular Material theme overrides
└── app/
    ├── app.ts / app.html         # Root shell and router outlet
    ├── app.config.ts             # Router, HTTP, animations, and change detection
    ├── app.routes.ts             # Route table
    ├── books/                    # Book model, API access, examples, and component/template pairs
    └── shared/                   # Reusable loading indicator and Material snackbar wrapper
```

The `/` route renders `BookListComponent`, and `/books/:id` renders `BookDetailComponent`; unknown URLs redirect to the list. Book cards use the book's ISBN as the detail route parameter because the Bookmonkey API identifies individual books by ISBN. The list owns loading, search, and result state. It calls the root-provided `BookApiClient`, which uses `HttpClient` to request `http://localhost:4730/books`. Results flow down to presentational `BookItemComponent` instances through inputs, while the detail component requests `GET /books/:isbn` directly so detail URLs also work when opened or refreshed.

```text
Browser → App shell/router ┬→ BookListComponent → BookItemComponent[]
                           │          └→ BookApiClient ─┐
                           └→ BookDetailComponent ──────┴→ Bookmonkey API
```

State is local to components and services; there is no application-wide store. The detail component represents its asynchronous UI with one mutually exclusive status value, while repeated loading presentation is provided by a shared component. Search is debounced in the list component and sent to the API through its `q` query parameter. If the initial collection request returns no books or fails, `BookApiClient` uses the local examples for the collection, search, and matching detail URLs while leaving normal API results authoritative.

## Dependencies

The core runtime dependencies are Angular, RxJS, Zone.js, Tailwind CSS, and Angular Material/CDK. The package manifest also includes NgRx Signals, NgRx Toolkit, TanStack Angular Query, Express, and Angular SSR packages, but these are not currently imported or configured by the application source. Treat them as available foundations rather than active architectural layers.

Static assets live in `public/`. Production builds use hashed output and bundle-size budgets; development builds enable source maps. Playwright starts the app at `http://localhost:4200`. The Bookmonkey API command pins its package version and runs it in isolation to avoid dependency conflicts; it can be started separately with `npm run api` or together with Angular through the VS Code compound configuration documented in the [README](README.md#vs-code). The compound configuration waits for Angular's ready URL before opening a Chrome debugging session and stops both server sessions when terminated.
