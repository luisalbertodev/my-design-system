# Modal Architecture

> Technical overview of the `Modal` component. |
> _Last updated: 2025-05-26 · Maintainer: @luisalbertodev_

---

## 1. Purpose

The `Modal` provides a composable and accessible overlay for focused interactions such as confirmations, forms, or interruptive messages.
It is rendered via a portal to avoid layout constraints and includes keyboard interaction support.

---

## 2. Public Behavior Contract

- Controlled externally via `isOpen`. If false, nothing is rendered.
- `onClose` is triggered when the user presses Escape or clicks the backdrop.
- Uses composition via `<Modal.Title>`, `<Modal.Content>`, and `<Modal.Actions>`.
- Applies `role="dialog"` with `aria-modal="true"`, and links `aria-labelledby` and `aria-describedby` via `titleId` and `descriptionId`.
- Focus is trapped inside while open and returned to the previously focused element after close.
- Supports size variants through `size` prop (`Small`, `Medium`, `Large`).

---

## 3. Internals

- Implements a native focus trap using [`FocusTrap`](../../atoms/FocusTrap/FocusTrap.architecture.md) without relying on third-party libraries.
- Renders outside the DOM tree using [`GenericPortal`](../../atoms/GenericPortal/GenericPortal.architecture.md), safely during hydration (SSR-friendly).
- Uses function-as-child pattern to inject a fallback focus target.
- Encapsulates click delegation on backdrop to detect outside clicks cleanly.
- Exposes composition primitives and size enum via static properties on the main component.

---

## 4. Styling Notes

- Layout is handled via `ModalContainer` (`display: flex; align-items: center; justify-content: center`) with full viewport coverage.
- `ModalContentStyled` defines size variants, padding, scroll behavior and focusable outline.
- Backdrop uses a semi-transparent overlay and supports dismissal.
- Responsive design is implemented with fixed size tokens per variant.

---

## 5. Dependencies

- [FocusTrap](../../../atoms/FocusTrap/FocusTrap.architecture.md) — for focus containment and restoration.
- [GenericPortal](../../../atoms/GenericPortal/GenericPortal.architecture.md) — for DOM projection.
- [Component Guidelines](../../../../docs/component-guidelines.md). For shared philosophies, testing strategy, and architectural patterns
