# 🧱 Learn Design System | React Boilerplate Design System

A modern component library built with **React**, **TypeScript**, and **Storybook** — focused on accessibility, composability, and developer experience.

> For technical decisions, architectural philosophy, and contributor onboarding, see [`docs/component-guidelines.md`](./docs/component-guidelines.md)

---

## 🚀 Getting Started

### 1. Requirements

- **Node.js**: `v22.14.0`
- **npm**: `v10.9.2`

Set up your environment:

```bash
nvm use
npm install
```

---

### 2. Run Storybook

```bash
npm run storybook
```

Build a static version:

```bash
npm run build:storybook
```

---

### 3. Run Tests

```bash
npm run test              # all tests
npm run test:unit         # unit tests
npm run test:integration  # integration tests
npm run test:coverage     # full coverage report
```

---

## 📦 Usage in Projects

This library is **published on npm** under the name [`@luisalbertodev/my-design-system`](https://www.npmjs.com/package/@luisalbertodev/my-design-system) — **as a technical practice only**.
It is **not intended for production usage**, and no guarantees are provided for stability or updates.

Install (for demo/testing purposes only):

```bash
npm install @luisalbertodev/my-design-system
```

> ✅ Recommended usage: fork and adapt to your own design system needs.

Alternatively, you can consume it locally:

```bash
npm run build
npm link
```

---

## 📚 Folder Structure

Each component lives in its own folder under `src/`, and follows this structure:

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

> Refer to [`docs/component-guidelines.md`](./docs/component-guidelines.md) for architectural rationale.

---

## 🧪 Testing Strategy

Testing is split into:

- Unit
- Integration
- E2E (via Playwright – WIP)

Run E2E (once implemented):

```bash
npx playwright test
```

---

## ⚠️ Disclaimer

> **This project is no longer maintained.**
> It was created as a technical exercise to consolidate knowledge in building scalable design systems using React, TypeScript, and Storybook.
>
> **Suggested usage**:
>
> - Fork this repository and explore it for your own learning.
> - Use it as a boilerplate for building your own design system.
> - Modify and adapt freely — that’s the purpose.

---

## 🧑‍💻 Maintainer

Luis Alberto Pérez Coello
[Portfolio](https://out-luisalbertodev.vercel.app) · [LinkedIn](https://www.linkedin.com/in/luisalbertodev/)

---

## 📝 License

MIT — see `LICENSE` file
