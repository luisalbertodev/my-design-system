# Component Guidelines

> Shared conventions and architectural principles across all components in the design system. |
> _Last updated: 2025-05-26 · Maintainer: @luisalbertodev_

This document provides a high-level overview to ensure consistency, maintainability, and a shared mental model across the component library.

---

## 1. Design Philosophy

### 🔁 Composition Over Configuration

Components are designed to be composed declaratively rather than configured via complex props. This leads to:

- Better readability and developer experience
- Greater flexibility and control
- More expressive and maintainable code

To see this approach applied in practice, explore components such as `Modal` or `Button`.

---

### 🧠 Encapsulation & Decoupling

Responsibilities are delegated to focused utilities and services to avoid coupling and repetition. This applies to logic like portal rendering, focus management, and state synchronization.

> See how the `Modal` uses internal abstractions to manage portals and focus behavior without polluting its surface API.

---

## 2. Accessibility (a11y)

All components must:

- Use semantic HTML roles and structures
- Support keyboard navigation and screen readers
- Ensure proper `aria-*` attributes where applicable
- Support visual and programmatic focus
- Encourage accessible usage by enforcing clarity during development:
  - For example, components like `Button` that allow visual-only content should emit a warning when rendered without a readable text or `aria-label`. This helps catch issues before they reach production.

Accessibility is considered part of the baseline definition of “done”.

---

## 3. Testing Strategy

### 🔍 Philosophy

We follow a hybrid testing model:

- **BDD (Behavior-Driven Development)**:
  Test descriptions are written in the language of the user or feature, not the code.
- **TDD (Test-Driven Development)**:
  Features are often driven by tests, encouraging simpler and testable designs.

### ✅ Focus

- We test behavior, not implementation.
- Unit tests validate logic in isolation.
- Integration tests validate component behavior and interaction.
- End-to-end tests validate real user flows at the app level.

### 🧪 Tooling

- `Jest` for unit and integration tests
- `@testing-library/react` for real user interaction simulation
- `Playwright` for end-to-end tests

---

## 4. Architecture & Patterns

Components in this system are designed to be **predictable, maintainable, and scalable**.
We don’t enforce rigid patterns — instead, we encourage applying architectural thinking where it adds value.

The following principles and ideas act as guidance when designing or evolving components:

### ✅ What We Expect from a Well-Structured Component

- Clear purpose and responsibility
- A clean, focused public API
- Internal complexity isolated in utilities, hooks, or services
- Supports flexible composition without over-configuration
- Easy to test, reason about, and extend

### 🧠 Guiding Philosophies

These philosophies are **not mandatory**, but can help guide better structure:

- **Object-Oriented Programming (OOP)**: promotes encapsulation and clarity
- **SOLID Principles**: can guide design choices when components grow
- **Composition over inheritance**: is preferred for flexibility and reuse

### 🧩 When Patterns Help

Use common design patterns when they solve real needs:

- **Factory**: e.g., creating or managing dynamic DOM containers
- **Adapter**: wrapping browser APIs or third-party inconsistencies
- **Context Provider**: for shared state or configuration across nested components

Patterns should simplify code and improve separation — not add layers by default.

> For practical examples, explore components like `Modal`, `Button`, or `Toast` to see how these ideas have been applied in context.

---

## 5. Folder Structure

Each component is organized as:

```
  /ComponentName
  ├── Component.tsx
  ├── Component.styled.ts
  ├── Component.types.ts
  ├── Component.unit.spec.tsx
  ├── Component.integration.spec.tsx
  ├── Component.architecture.md
  └── index.ts
```

Subcomponents live within the parent component unless they are shared.

---

## 6. Future Considerations

- Extract common utilities into reusable internal packages
- Add visual guidelines as the system grows
- Expand coverage of end-to-end tests for real scenarios
- Implement regression testing (e.g., visual snapshot comparison for interactive components)

---
