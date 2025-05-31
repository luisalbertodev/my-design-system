# Button Architecture

> Technical overview of the `Button` component. |
> _Last updated: 2025-05-26 · Maintainer: @luisalbertodev_

---

## 1. Purpose

The `Button` provides an accessible, flexible, and consistent interactive element for triggering actions or navigation across the system.
It supports multiple variants, sizes, and usage contexts (e.g., icon-only buttons, block-level layouts).

---

## 2. Public Behavior Contract

- `variant` defines the visual style (`Primary`, `Secondary`, `Link`)
- `size` controls spacing and font sizing (`Medium`)
- `fluid` makes the button span the full width of its container
- `allowWrap` controls text wrapping within the button
- If rendered with no visible text, `aria-label` is required (for icon-only buttons)
- `onClick` is triggered unless the button is disabled
- Defaults to `type="button"` to avoid unintended form submissions
- `aria-disabled` is set in addition to `disabled` for accessibility
- Warnings are shown in development if no accessible label is present

---

## 3. Internals

- Encapsulates accessibility logic:
  - Detects icon-only use cases and applies `aria-label` and `title`
  - Warns in dev if neither visible content nor `aria-label` is present
- Applies the **composition over configuration** principle:
  - Size and variant options are declared as exported enums
  - Logical styling is applied via a single styled component
- Respects **single responsibility**: business logic is avoided; styling and rendering only
- Safely forwards unknown props (`data-*`, `aria-*`, etc.) to support native HTML features
- Default values are assigned to critical props (`type`, `size`, `variant`) to reduce friction

---

## 4. Styling Notes

- Styles are defined via `Button.styled.ts`
- Uses `getButtonVariantStyles()` (not shown here) to isolate visual logic for variant/size
- Supports `fluid` and `allowWrap` as boolean flags mapped to CSS rules
- Size and variant options are limited and type-safe via enums (`Sizes`, `Variants`)
- Styling is responsive to design tokens and can be extended via the theme

---

## 5. Dependencies

- [Component Guidelines](../../../../docs/component-guidelines.md). For shared philosophies, testing strategy, and architectural patterns
