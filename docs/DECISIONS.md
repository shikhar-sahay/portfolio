# DECISIONS.md

> **Format:** Each decision entry includes: **Decision**, **Status**, **Date**, **Rationale**, **Alternatives Considered**, **Impact**.
> **Status:** `FINALIZED` | `SUPERSEDED` | `DEFERRED`

---

## Decision Log

### 1. Project Documentation Infrastructure

**Decision:** Create 11 documentation files (`CLAUDE.md`, `docs/PROJECT_CONTEXT.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/ANIMATION.md`, `docs/CONTENT.md`, `docs/PERFORMANCE.md`, `docs/HANDOFF.md`, `docs/AGENTS.md`) before any implementation.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** The project will be developed across many separate AI coding sessions using multiple agents (Claude Code, GitHub Copilot, Gemini, etc.). The repository itself must act as the persistent source of truth. Comprehensive documentation ensures continuity, prevents re-litigation of decisions, and enables any agent to be productive immediately.

**Alternatives Considered:**

- Minimal docs (README only) — rejected: insufficient for multi-agent, multi-session continuity
- Wiki/external docs — rejected: creates external dependency, not version-controlled with code

**Impact:** Establishes the "documentation-first" workflow. All future sessions start by reading these files.

---

### 2. Creative Direction: No Cybersecurity Aesthetic

**Decision:** The visual design will NOT use cyberpunk, Matrix, neon hacker, fake terminal, or any stereotypical "cybersecurity portfolio" aesthetics. Cybersecurity is content, not visual identity.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** The owner explicitly wants to avoid the cliché cybersecurity portfolio look. The desired reaction is "Holy shit. This person is actually technically impressive." — which requires visual sophistication, not genre tropes. References (Aryan Randeriya, Devansh Arora, Swayam) demonstrate editorial, typographically-driven, premium aesthetics.

**Alternatives Considered:**

- Subtle cybersecurity motifs (lock icons, shield shapes) — rejected: still signals the genre visually
- Terminal-inspired command palette — rejected: fake terminal is explicitly avoided

**Impact:** All visual design decisions (color, typography, layout, motion) must align with "smooth, suave, refined, premium, editorial, personal" — not "technical/hacker."

---

### 3. Hero Portrait Source

**Decision:** The hero portrait will be the second portrait provided by the project owner, placed at `public/images/shikhar-hero.jpg`.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly specified this. The file does not exist yet but the path is reserved.

**Alternatives Considered:** None — owner directive.

**Impact:** Hero implementation (M1) will use this path. Image optimization pipeline must handle it.

---

### 4. Conceptual Flow Structure

**Decision:** The site follows a continuous long-scroll experience with these conceptual sections (placeholder names): ARRIVAL → INTRODUCTION → SELECTED WORK → EXPERIENCE/JOURNEY → PERSONALITY → INTERACTIVE EXPERIENCE → CONTACT.

**Status:** `FINALIZED` (as placeholders)

**Date:** 2026-08-17

**Rationale:** Provides a narrative backbone for the long-scroll architecture. Sections are placeholders — final names and boundaries may change during implementation.

**Alternatives Considered:**

- Traditional multi-page — rejected: owner wants continuous scroll
- Single hero + cards — rejected: insufficient narrative depth

**Impact:** Drives M2 (scroll architecture), M3-M6 (section implementation). Section components map to these conceptual areas.

---

### 5. Technology Stack Direction

**Decision:** Likely stack: Next.js, TypeScript, Tailwind CSS, Motion for React, GSAP (when necessary), Lenis (if justified), Three.js/R3F (for specific high-value experiences), Vercel. **Not finalized.**

**Status:** `UNDECIDED` (direction only)

**Date:** 2026-08-17

**Rationale:** These are strong defaults for a modern, performant, animation-capable React portfolio. Next.js App Router + Server Components aligns with performance goals. Motion for React is the most accessible animation library. GSAP/Lenis/Three.js are additive only when justified.

**Alternatives Considered:**

- Astro — excellent for content sites, less for complex interactive scroll experiences
- Remix — similar to Next.js, smaller ecosystem
- Plain React + Vite — no SSR/SSG, worse SEO/performance defaults
- CSS Modules / Panda CSS — Tailwind's design token integration and JIT are strong for this use case

**Impact:** Architecture decisions in `ARCHITECTURE.md` assume this direction. Finalization will happen during M0/M1 as tooling is set up.

---

### 6. Animation Philosophy

**Decision:** Motion must be smooth, restrained, and purposeful. No animations for animation's sake. See `ANIMATION.md` for detailed philosophy.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly listed "Animations for the sake of animations" under AVOID. The site should be "clean at rest, extraordinary in motion." Motion serves narrative, hierarchy, and delight — not decoration.

**Alternatives Considered:** None — owner directive.

**Impact:** All animation implementations must justify their existence. `ANIMATION.md` tracks specific tokens, easing, duration ranges, and reduced-motion behavior.

---

### 7. Performance as Hard Requirement

**Decision:** Performance is a hard requirement, not a nice-to-have. The site must look impressive without becoming slow. Specific budgets documented in `PERFORMANCE.md` and `ROADMAP.md` (M8).

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** An impressive portfolio that loads slowly or janks undermines the "technically impressive" reaction. Performance budgets force discipline during implementation.

**Alternatives Considered:** None — owner directive.

**Impact:** Every milestone must consider performance. M8 is dedicated to audit and optimization. Bundle size, Core Web Vitals, and Lighthouse scores are tracked.

---

### 8. Mobile-First Approach

**Decision:** Mobile is a first-class experience, not a shrunken desktop layout.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Significant traffic will be mobile. A portfolio that feels broken on mobile fails the "professional and functional" bar. Touch interactions, scroll behavior, and performance budgets are stricter on mobile.

**Alternatives Considered:** None — owner directive.

**Impact:** All components designed mobile-first. Breakpoints in `DESIGN_SYSTEM.md` are mobile-up. Testing in M7/M8 includes real mobile devices.

---

### 9. Multi-Agent Workflow

**Decision:** Multiple AI coding agents (Claude Code, GitHub Copilot, Gemini, etc.) will work on this repository. All agents must follow the protocol in `AGENTS.md` and `CLAUDE.md`.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly stated this workflow. Documentation is the coordination mechanism.

**Alternatives Considered:** None — owner directive.

**Impact:** `HANDOFF.md` is the critical synchronization point. Every session updates it. `AGENTS.md` codifies the required reading/list.

---

### 10. Documentation Status Markers

**Decision:** Use `FINALIZED` / `EXPERIMENTAL` / `UNDECIDED` markers throughout documentation to distinguish decision states.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Prevents confusion about what's decided vs. what's exploratory. Makes it safe to document speculative ideas without them being mistaken for commitments.

**Alternatives Considered:**

- Separate "decisions" vs "ideas" files — rejected: fragments context
- No markers — rejected: leads to "I thought we decided this" conflicts

**Impact:** All docs use this convention. Agents must respect `FINALIZED` markers and not change them without discussion.

---

## Decision Log (Continued)

### 11. Next.js App Router + TypeScript + Tailwind Stack Finalized

**Decision:** Finalized the core stack as Next.js 14.2.15 (App Router), TypeScript 5.6.3, Tailwind CSS 3.4.14 with pnpm 9.12.0 as package manager.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** These are stable, compatible versions that align with the project's performance and developer experience goals. Next.js App Router provides Server Components by default for optimal performance. TypeScript strict mode catches errors early. Tailwind's JIT compiler and design token integration fit the "design tokens as source of truth" principle.

**Alternatives Considered:**

- Astro — Rejected: Less suited for complex interactive scroll experiences
- Remix — Rejected: Smaller ecosystem, similar capabilities to Next.js
- CSS Modules / Panda CSS — Rejected: Tailwind's design token integration is stronger for this use case

**Impact:** All architecture decisions in `ARCHITECTURE.md` now reflect this finalized stack. M1 can proceed with hero implementation using this foundation.

---

### 12. ESLint Flat Config with TypeScript ESLint

**Decision:** Use ESLint 8.57.1 with flat config (`eslint.config.mjs`), TypeScript ESLint 8.x, and Next.js ESLint plugin. Lint script uses direct `eslint .` instead of `next lint` due to flat config compatibility.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Flat config is the modern ESLint standard. TypeScript ESLint provides better TypeScript-aware linting than the legacy `@typescript-eslint/parser` approach. `next lint` has interactive prompts that don't work well with flat config in CI; direct `eslint .` is simpler and more reliable.

**Alternatives Considered:**

- Legacy `.eslintrc.json` — Rejected: Deprecated, no flat config benefits
- `next lint` with flat config — Rejected: Interactive prompt breaks CI/automation

**Impact:** Linting works in CI and locally. Rules include Next.js recommended, core-web-vitals, and TypeScript recommended with pragmatic overrides (`no-explicit-any: warn`, `no-unused-vars: warn` with underscore prefix ignore).

---

### 13. Prettier with Tailwind Plugin, No Husky in M0

**Decision:** Prettier 3.3.3 with `prettier-plugin-tailwindcss` for automatic class sorting. `.prettierignore` excludes generated files (lock files, build output). Husky + lint-staged deferred to a later milestone.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Tailwind plugin ensures consistent class ordering. Ignoring generated files prevents noise. Husky adds setup complexity that isn't needed for solo/agent development workflow; can be added when team collaboration requires it.

**Alternatives Considered:**

- Husky in M0 — Rejected: Unnecessary overhead for current workflow
- No Tailwind plugin — Rejected: Manual class sorting is error-prone

**Impact:** `pnpm format` and `pnpm format:check` work correctly. Lock files and build output are ignored.

---

### 14. Static Generation (SSG) as Default Rendering

**Decision:** All pages are statically generated at build time (as evidenced by `next build` output showing `○ (Static)` for all routes).

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Portfolio content is largely static. SSG provides optimal performance (no server runtime), perfect for Vercel deployment. ISR/on-demand revalidation can be added later if content needs periodic updates without rebuilds.

**Alternatives Considered:**

- SSR for all pages — Rejected: Unnecessary server cost for static content
- Hybrid per-page — Rejected: Premature complexity; start simple

**Impact:** `next.config.mjs` has no special output config (defaults to SSG). Dynamic routes will need explicit `generateStaticParams` when added.

---

## Deferred Decisions (Explicitly UNDECIDED)

The following are intentionally not decided yet. They will be resolved during relevant milestones:

| Decision                     | Milestone | Notes                                                               |
| ---------------------------- | --------- | ------------------------------------------------------------------- |
| Primary display font         | M1        | Candidates: Geist, Satoshi, Space Grotesk, Instrument Sans, Manrope |
| Color palette (light/dark)   | M1        | Must support both modes                                             |
| Spacing scale & base unit    | M1        |                                                                     |
| Border radius system         | M1        |                                                                     |
| Lenis vs native scroll       | M2        |                                                                     |
| GSAP vs Motion-only          | M2/M6     |                                                                     |
| Three.js/R3F inclusion       | M6        | Only if signature experience justifies it                           |
| Project data structure       | M3        |                                                                     |
| Experience data structure    | M4        |                                                                     |
| Personality section format   | M5        |                                                                     |
| Signature experience concept | M6        | Open ideation                                                       |

---

## How to Add a Decision

When a decision is made during implementation:

1. Add an entry to this file with the format above
2. Update the relevant documentation file (`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ANIMATION.md`, etc.) to mark the decision `FINALIZED` with actual values
3. Update `HANDOFF.md` with the decision in "DECISIONS MADE"
4. Commit with message: `docs: record decision - <short description>`

Do not make significant design/architecture decisions without documenting them here.
