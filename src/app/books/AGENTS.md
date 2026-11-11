# Books Feature Guide

This file applies only to `src/app/books/` and extends [`../../AGENTS.md`](../../AGENTS.md). See [`../../../ARCHITECTURE.md`](../../../ARCHITECTURE.md) for the wider application context.

## Feature boundaries

- `book.ts` defines the API-facing `Book` model. Keep fields optional when the backend can omit them.
- `book-api-client.service.ts` is the feature's HTTP and example-data boundary. Components must not call the Bookmonkey API directly.
- Each book component keeps its logic in the `.ts` file and its non-trivial markup in the adjacent `.html` template.
- `book-list.component.ts` owns collection loading and search state. `book-item.component.ts` is the accessible, linked book-card presentation. `book-detail.component.ts` uses one mutually exclusive status value for loading, loaded, not-found, and request-error states.
- Use the shared `LoadingIndicatorComponent` for asynchronous book views instead of duplicating loading markup.
- `example-books.ts` and the matching assets under `public/covers/` provide deterministic fallback content when the initial API collection is empty or unavailable. Real API results remain authoritative.

## Routing and API contract

- The application detail route is `/books/:id`, but the route value is the book's ISBN.
- The Bookmonkey API identifies a single book through `GET /books/:isbn`; encode the ISBN before placing it in the request URL.
- Book cards must link with `book.isbn` so direct navigation and browser refresh load the same record.
- Preserve the local-example fallback for matching ISBNs while continuing to surface 404 and request-error states for unknown books.
- Example-book search is case-insensitive across title and author and must respect the requested page size.

## UI and tests

- Display the cover, title, subtitle, author, publisher, ISBN, page count, price, and abstract where available. Keep the current fallbacks for missing values.
- Maintain responsive Tailwind layouts, semantic headings, keyboard-visible card links, loading status announcements, and alert semantics for failures.
- Add or update Playwright coverage in `../../../tests/book-details.spec.ts` for navigation, direct URL loading, fallback examples, and distinct 404 and service-failure behavior when those flows change.
