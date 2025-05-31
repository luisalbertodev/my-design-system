# FocusTrap Architecture

> Technical overview of the `FocusTrap` component. |
> _Last updated: 2025-05-26 · Maintainer: @luisalbertodev_

---

## 1. Purpose

`FocusTrap` ensures that keyboard focus is contained within a specific DOM subtree while active.
It's used in layered UI components such as modals, drawers, and overlays to prevent focus from escaping to the background.

---

## 2. Public Behavior Contract

- Only activates focus logic when `isActive` is `true`.
- Autofocuses the first interactive element inside the container.
- If no focusable element is found, focuses a fallback node provided via `ref`.
- Tabbing (`Tab` / `Shift+Tab`) cycles within the container.
- Pressing `Escape` calls `onEscape`, which must be handled by the consumer.
- Restores focus to the previously focused element when unmounted.
- Exposes a function-as-child API to inject the fallback reference.

---

## 3. Internals (optional if trivial)

- Implements imperative DOM focus logic using `useEffect`.
- Stores the previously focused element before activation, restoring it on cleanup.
- Listens globally to `keydown` events and intercepts Tab navigation and Escape key.
- Applies the **function-as-child** pattern to support fallback ref injection.
- Designed with accessibility in mind (WCAG focusable selectors), but avoids third-party libraries.
- Follows the **Single Responsibility Principle**: isolates only focus trapping logic.

---

## 4. Styling Notes (optional)

- No visual styles are applied by default.
- The outer wrapper uses `style={{ outline: 'none' }}` to avoid default browser outlines.
- Consumers can style child elements freely.

---

## 5. Dependencies (optional)

- No external dependencies.
