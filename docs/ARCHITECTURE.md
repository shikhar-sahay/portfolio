# ARCHITECTURE.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Framework & Runtime

| Decision            | Status               | Notes                          |
| ------------------- | -------------------- | ------------------------------ |
| **Framework**       | Next.js (App Router) | `FINALIZED` — Next.js 14.2.15  |
| **Language**        | TypeScript           | `FINALIZED` — TypeScript 5.6.3 |
| **Runtime**         | Node.js (Vercel)     | `FINALIZED` — Node.js 20+      |
| **Package Manager** | pnpm                 | `FINALIZED` — pnpm 9.12.0      |

---

## Rendering Strategy

| Aspect                | Status                          | Notes                                          |
| --------------------- | ------------------------------- | ---------------------------------------------- |
| **Primary**           | Static Generation (SSG)         | `FINALIZED` — All pages prerendered at build   |
| **Dynamic**           | ISR / On-demand                 | `UNDECIDED` — For content that may update      |
| **Client Components** | Minimal, only for interactivity | `FINALIZED` — "Use client" only when necessary |
| **Streaming**         | `UNDECIDED`                     | For heavy sections (3D, large media)           |

**Principle (FINALIZED):** Default to Server Components. Only use Client Components for genuine interactivity (animation hooks, 3D canvas, forms).

---

## Styling Architecture

| Decision          | Status                      | Notes                                          |
| ----------------- | --------------------------- | ---------------------------------------------- |
| **CSS Approach**  | Tailwind CSS                | `FINALIZED` — Tailwind 3.4.14                  |
| **Config**        | `tailwind.config.ts`        | `FINALIZED` — Design tokens as source of truth |
| **CSS Variables** | For theming (light/dark)    | `FINALIZED` — Defined in `globals.css`         |
| **Global Styles** | Minimal — reset + variables | `FINALIZED` — In `src/app/globals.css`         |

---

## Animation Stack

| Library                              | Purpose                                                   | Status                                               |
| ------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------- |
| **Motion for React (Framer Motion)** | Primary animation — layout, transitions, gestures         | `UNDECIDED` — Will add in M1                         |
| **GSAP**                             | Complex timelines, scroll-triggered, performance-critical | `UNDECIDED` — Only when genuinely necessary          |
| **Lenis**                            | Smooth scroll                                             | `UNDECIDED` — Only if justified by scroll experience |
| **Three.js / React Three Fiber**     | 3D / WebGL experiences                                    | `UNDECIDED` — Only for specific high-value moments   |

**Principle (FINALIZED):** Start with Motion for React. Add GSAP only when Motion cannot achieve the effect performantly. Add Lenis only if native scroll + scroll-driven animations feel insufficient. Add Three.js/R3F only for a specific signature experience that justifies the bundle cost.

---

## Folder Structure (Implemented — FINALIZED)

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (long scroll)
│   ├── globals.css        # Global styles + CSS variables
│   └── ...                # Other routes if needed
├── components/
│   ├── ui/                # Primitive components (Button, Link, etc.)
│   ├── sections/          # Page sections (Hero, Work, Experience, etc.)
│   ├── layout/            # Header, Footer, Navigation
│   └── effects/           # Visual effects (3D, canvas, scroll effects)
├── lib/
│   ├── utils.ts           # Shared utilities (cn, etc.)
│   ├── animations.ts      # Animation variants, presets (not created yet)
│   └── constants.ts       # Site config, metadata (not created yet)
├── hooks/                 # Custom React hooks
├── styles/                # Additional styles if needed
├── types/                 # TypeScript types
└── content/               # Content data (projects, experience, etc.)
public/
├── images/                # Static images (hero portrait, etc.)
```

---

## Component Architecture

### Component Categories (FINALIZED)

1. **Primitives** — Button, Link, Typography, Image — no business logic
2. **Sections** — Hero, SelectedWork, Experience, Personality, InteractiveExperience, Contact — compose primitives
3. **Layout** — Header, Footer, Navigation — global chrome
4. **Effects** — Canvas, WebGL, scroll-driven visual — isolated, lazy-loaded

### Component Principles (FINALIZED)

- **Server Components by default** — only `"use client"` when needed
- **Composition over configuration** — slots/children over props explosion
- **Design tokens via Tailwind** — no arbitrary values in components
- **Animation variants in `lib/animations.ts`** — reusable, consistent
- **Lazy-load heavy components** — `next/dynamic` with `ssr: false` for 3D/heavy effects

---

## State Management

| Need                                  | Solution                      | Status      |
| ------------------------------------- | ----------------------------- | ----------- |
| **Global UI state** (theme, nav open) | React Context + `useReducer`  | `UNDECIDED` |
| **Scroll position / progress**        | Custom hook + Lenis (if used) | `UNDECIDED` |
| **Animation orchestration**           | Motion/GSAP timelines         | `UNDECIDED` |
| **Form state** (contact)              | React Hook Form + Zod         | `UNDECIDED` |

**Principle (FINALIZED):** No global state library (Redux, Zustand, Jotai) unless genuinely needed. Prefer local state, Context for truly global concerns.

---

## Data & Content

| Content Type            | Source                                       | Status                               |
| ----------------------- | -------------------------------------------- | ------------------------------------ |
| **Projects**            | Local JSON/TS/MDX                            | `UNDECIDED`                          |
| **Experience/Timeline** | Local data file                              | `UNDECIDED`                          |
| **Personal info**       | Local data file                              | `UNDECIDED`                          |
| **Images**              | `public/images/` + `next/image` optimization | `FINALIZED`                          |
| **SEO/Metadata**        | `lib/constants.ts` + page `metadata` export  | `FINALIZED` (metadata in layout.tsx) |

**Principle (FINALIZED):** Content as data — separate from components. Single source of truth in `src/content/` or `lib/constants.ts`.

---

## Performance Architecture

| Strategy               | Status                                         |
| ---------------------- | ---------------------------------------------- | ------------------------------------------- |
| **Image optimization** | `next/image` with AVIF/WebP, blur placeholders | `FINALIZED` (configured in next.config.mjs) |
| **Font optimization**  | `next/font` (self-hosted, variable fonts)      | `UNDECIDED` — Will add in M1                |
| **Script loading**     | `next/script` with `strategy: "lazyOnload"`    | `UNDECIDED`                                 |
| **Bundle analysis**    | `@next/bundle-analyzer` in CI                  | `UNDECIDED`                                 |
| **Critical CSS**       | Tailwind JIT + Next.js automatic               | `FINALIZED`                                 |
| **Lazy loading**       | Heavy sections below fold — `next/dynamic`     | `UNDECIDED`                                 |

---

## Deployment & Infrastructure

| Aspect                  | Decision                     | Status               |
| ----------------------- | ---------------------------- | -------------------- |
| **Platform**            | Vercel                       | `FINALIZED` — Likely |
| **Preview deployments** | Every PR                     | `UNDECIDED`          |
| **Analytics**           | Vercel Analytics / Plausible | `UNDECIDED`          |
| **Error tracking**      | Sentry (if needed)           | `UNDECIDED`          |
| **Edge/ISR**            | For dynamic content          | `UNDECIDED`          |

---

## Developer Experience

| Tool              | Status                                 |
| ----------------- | -------------------------------------- | ------------------------------- |
| **Linting**       | ESLint (flat config, Next.js)          | `FINALIZED`                     |
| **Formatting**    | Prettier + prettier-plugin-tailwindcss | `FINALIZED`                     |
| **Type checking** | `tsc --noEmit` in CI                   | `FINALIZED`                     |
| **Git hooks**     | Husky + lint-staged                    | `UNDECIDED` — Deferred to later |
| **Testing**       | Vitest (unit), Playwright (e2e)        | `UNDECIDED`                     |

---

## Future Technical Decisions (UNDECIDED)

- [ ] Finalize animation stack (Motion, GSAP, Lenis)
- [ ] Decide on MDX for content vs pure data files
- [ ] Decide on 3D approach (R3F vs raw Three.js vs none)
- [ ] Define component testing strategy
- [ ] Set up CI/CD pipeline
- [ ] Define performance budgets (LCP, CLS, TBT, bundle size)

---

## Notes

Architecture decisions should be made incrementally as milestones progress. See `ROADMAP.md` for milestone order. Each milestone may finalize a subset of these decisions.

**M0 Completion Summary (2026-08-17):**

- Next.js 14.2.15 + TypeScript 5.6.3 + Tailwind 3.4.14 initialized
- ESLint flat config with TypeScript ESLint + Next.js plugin
- Prettier with Tailwind plugin
- Folder structure created per specification
- Static generation working (build produces static pages)
- Dev server starts successfully
- All lint, typecheck, format checks pass
