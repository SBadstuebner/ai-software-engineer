# Refactoring Review

The following potential maintenance concerns were raised for review:

- Lots of repetition
- Side effects in constructors
- Bloated templates

Potential approaches included global error handling and clearer patterns for logic and templates.

## Review outcome

The suggestions were reviewed against the current application and applied where they address concrete maintenance issues:

- The non-trivial book component templates now live in adjacent `.html` files, leaving component classes focused on state and behavior.
- Repeated loading markup was replaced with a shared accessible loading indicator.
- Book detail loading, success, not-found, and request-failure states are represented by one mutually exclusive status value instead of independent booleans.
- Book feature dependencies use Angular's `inject()` API, and the list's debounce timer is typed and cleared when the component is destroyed.
- Small accessibility gaps found during extraction were corrected with search and clear-button labels, button types, decorative SVG handling, and consistent cover alternative text.

No constructor was performing side effects before the refactor; initialization and data loading remain in lifecycle hooks. A custom global error handler was not added because `provideBrowserGlobalErrorListeners()` already forwards unexpected browser errors to Angular's error handling, while recoverable book request errors require the existing contextual not-found and service-failure UI. A custom reporting or notification policy can be added later when the product has concrete requirements for it.
