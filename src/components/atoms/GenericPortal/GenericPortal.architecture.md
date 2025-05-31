# GenericPortal Architecture

> Technical overview of the `GenericPortal` component. |
> _Last updated: 2025-05-26 · Maintainer: @luisalbertodev_

---

## 1. Purpose

`GenericPortal` projects `children` into a DOM node outside the main React tree using `ReactDOM.createPortal`.
It provides a reusable and SSR-safe way to render floating UI elements like modals, dropdowns, and toasts, detached from layout or stacking constraints.

---

## 2. Public Behavior Contract

- Requires a `containerId` to resolve or create the target DOM node.
- Renders `null` on the first render to ensure SSR safety.
- Only renders content after `useEffect` confirms the DOM is available.
- Reuses or creates containers through `DomPortalContainerService`.
- If `containerId` is not provided or container resolution fails, nothing is rendered.
- Forwards `children` directly into the resolved container via `createPortal`.

---

## 3. Internals (optional if trivial)

- Applies **imperative DOM manipulation** in `useEffect` to avoid SSR issues.
- Uses `useRef` to persist the resolved container element.
- Applies **defensive rendering**: avoids runtime errors by waiting for the client render before accessing the DOM.
- Leverages **composition and separation of concerns**:
  - The component only manages portal mounting.
  - Container logic is abstracted to `DomPortalContainerService`.
- Minimal prop surface: no style or layout logic is handled here.

---

## 4. Styling Notes (optional)

- The component does not apply any styles.
- Styling and structure of projected content is fully delegated to the consumer component (e.g., `Modal`).

---

## 5. Dependencies (optional)

- [`DomPortalContainerService`](../../../services/DomPortalContainerService.ts): responsible for resolving or creating DOM containers.
