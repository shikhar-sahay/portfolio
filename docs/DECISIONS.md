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

- Minimal docs (README only) - rejected: insufficient for multi-agent, multi-session continuity
- Wiki/external docs - rejected: creates external dependency, not version-controlled with code

**Impact:** Establishes the "documentation-first" workflow. All future sessions start by reading these files.

---

### 2. Creative Direction: No Cybersecurity Aesthetic

**Decision:** The visual design will NOT use cyberpunk, Matrix, neon hacker, fake terminal, or any stereotypical "cybersecurity portfolio" aesthetics. Cybersecurity is content, not visual identity.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** The owner explicitly wants to avoid the cliché cybersecurity portfolio look. The desired reaction is "Holy shit. This person is actually technically impressive." - which requires visual sophistication, not genre tropes. References (Aryan Randeriya, Devansh Arora, Swayam) demonstrate editorial, typographically-driven, premium aesthetics.

**Alternatives Considered:**

- Subtle cybersecurity motifs (lock icons, shield shapes) - rejected: still signals the genre visually
- Terminal-inspired command palette - rejected: fake terminal is explicitly avoided

**Impact:** All visual design decisions (color, typography, layout, motion) must align with "smooth, suave, refined, premium, editorial, personal" - not "technical/hacker."

---

### 3. Hero Portrait Source

**Decision:** The hero portrait will be the second portrait provided by the project owner, placed at `public/images/shikhar-hero.jpg`.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly specified this. The file does not exist yet but the path is reserved.

**Alternatives Considered:** None - owner directive.

**Impact:** Hero implementation (M1) will use this path. Image optimization pipeline must handle it.

---

### 4. Conceptual Flow Structure

**Decision:** The site follows a continuous long-scroll experience with these conceptual sections (placeholder names): ARRIVAL → INTRODUCTION → SELECTED WORK → EXPERIENCE/JOURNEY → PERSONALITY → INTERACTIVE EXPERIENCE → CONTACT.

**Status:** `FINALIZED` (as placeholders)

**Date:** 2026-08-17

**Rationale:** Provides a narrative backbone for the long-scroll architecture. Sections are placeholders - final names and boundaries may change during implementation.

**Alternatives Considered:**

- Traditional multi-page - rejected: owner wants continuous scroll
- Single hero + cards - rejected: insufficient narrative depth

**Impact:** Drives M2 (scroll architecture), M3-M6 (section implementation). Section components map to these conceptual areas.

---

### 5. Technology Stack Direction

**Decision:** Likely stack: Next.js, TypeScript, Tailwind CSS, Motion for React, GSAP (when necessary), Lenis (if justified), Three.js/R3F (for specific high-value experiences), Vercel. **Not finalized.**

**Status:** `UNDECIDED` (direction only)

**Date:** 2026-08-17

**Rationale:** These are strong defaults for a modern, performant, animation-capable React portfolio. Next.js App Router + Server Components aligns with performance goals. Motion for React is the most accessible animation library. GSAP/Lenis/Three.js are additive only when justified.

**Alternatives Considered:**

- Astro - excellent for content sites, less for complex interactive scroll experiences
- Remix - similar to Next.js, smaller ecosystem
- Plain React + Vite - no SSR/SSG, worse SEO/performance defaults
- CSS Modules / Panda CSS - Tailwind's design token integration and JIT are strong for this use case

**Impact:** Architecture decisions in `ARCHITECTURE.md` assume this direction. Finalization will happen during M0/M1 as tooling is set up.

---

### 6. Animation Philosophy

**Decision:** Motion must be smooth, restrained, and purposeful. No animations for animation's sake. See `ANIMATION.md` for detailed philosophy.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly listed "Animations for the sake of animations" under AVOID. The site should be "clean at rest, extraordinary in motion." Motion serves narrative, hierarchy, and delight - not decoration.

**Alternatives Considered:** None - owner directive.

**Impact:** All animation implementations must justify their existence. `ANIMATION.md` tracks specific tokens, easing, duration ranges, and reduced-motion behavior.

---

### 7. Performance as Hard Requirement

**Decision:** Performance is a hard requirement, not a nice-to-have. The site must look impressive without becoming slow. Specific budgets documented in `PERFORMANCE.md` and `ROADMAP.md` (M8).

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** An impressive portfolio that loads slowly or janks undermines the "technically impressive" reaction. Performance budgets force discipline during implementation.

**Alternatives Considered:** None - owner directive.

**Impact:** Every milestone must consider performance. M8 is dedicated to audit and optimization. Bundle size, Core Web Vitals, and Lighthouse scores are tracked.

---

### 8. Mobile-First Approach

**Decision:** Mobile is a first-class experience, not a shrunken desktop layout.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Significant traffic will be mobile. A portfolio that feels broken on mobile fails the "professional and functional" bar. Touch interactions, scroll behavior, and performance budgets are stricter on mobile.

**Alternatives Considered:** None - owner directive.

**Impact:** All components designed mobile-first. Breakpoints in `DESIGN_SYSTEM.md` are mobile-up. Testing in M7/M8 includes real mobile devices.

---

### 9. Multi-Agent Workflow

**Decision:** Multiple AI coding agents (Claude Code, GitHub Copilot, Gemini, etc.) will work on this repository. All agents must follow the protocol in `AGENTS.md` and `CLAUDE.md`.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Owner explicitly stated this workflow. Documentation is the coordination mechanism.

**Alternatives Considered:** None - owner directive.

**Impact:** `HANDOFF.md` is the critical synchronization point. Every session updates it. `AGENTS.md` codifies the required reading/list.

---

### 10. Documentation Status Markers

**Decision:** Use `FINALIZED` / `EXPERIMENTAL` / `UNDECIDED` markers throughout documentation to distinguish decision states.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Prevents confusion about what's decided vs. what's exploratory. Makes it safe to document speculative ideas without them being mistaken for commitments.

**Alternatives Considered:**

- Separate "decisions" vs "ideas" files - rejected: fragments context
- No markers - rejected: leads to "I thought we decided this" conflicts

**Impact:** All docs use this convention. Agents must respect `FINALIZED` markers and not change them without discussion.

---

## Decision Log (Continued)

### 11. Next.js App Router + TypeScript + Tailwind Stack Finalized

**Decision:** Finalized the core stack as Next.js 14.2.15 (App Router), TypeScript 5.6.3, Tailwind CSS 3.4.14 with pnpm 9.12.0 as package manager.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** These are stable, compatible versions that align with the project's performance and developer experience goals. Next.js App Router provides Server Components by default for optimal performance. TypeScript strict mode catches errors early. Tailwind's JIT compiler and design token integration fit the "design tokens as source of truth" principle.

**Alternatives Considered:**

- Astro - Rejected: Less suited for complex interactive scroll experiences
- Remix - Rejected: Smaller ecosystem, similar capabilities to Next.js
- CSS Modules / Panda CSS - Rejected: Tailwind's design token integration is stronger for this use case

**Impact:** All architecture decisions in `ARCHITECTURE.md` now reflect this finalized stack. M1 can proceed with hero implementation using this foundation.

---

### 12. ESLint Flat Config with TypeScript ESLint

**Decision:** Use ESLint 8.57.1 with flat config (`eslint.config.mjs`), TypeScript ESLint 8.x, and Next.js ESLint plugin. Lint script uses direct `eslint .` instead of `next lint` due to flat config compatibility.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Flat config is the modern ESLint standard. TypeScript ESLint provides better TypeScript-aware linting than the legacy `@typescript-eslint/parser` approach. `next lint` has interactive prompts that don't work well with flat config in CI; direct `eslint .` is simpler and more reliable.

**Alternatives Considered:**

- Legacy `.eslintrc.json` - Rejected: Deprecated, no flat config benefits
- `next lint` with flat config - Rejected: Interactive prompt breaks CI/automation

**Impact:** Linting works in CI and locally. Rules include Next.js recommended, core-web-vitals, and TypeScript recommended with pragmatic overrides (`no-explicit-any: warn`, `no-unused-vars: warn` with underscore prefix ignore).

---

### 13. Prettier with Tailwind Plugin, No Husky in M0

**Decision:** Prettier 3.3.3 with `prettier-plugin-tailwindcss` for automatic class sorting. `.prettierignore` excludes generated files (lock files, build output). Husky + lint-staged deferred to a later milestone.

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Tailwind plugin ensures consistent class ordering. Ignoring generated files prevents noise. Husky adds setup complexity that isn't needed for solo/agent development workflow; can be added when team collaboration requires it.

**Alternatives Considered:**

- Husky in M0 - Rejected: Unnecessary overhead for current workflow
- No Tailwind plugin - Rejected: Manual class sorting is error-prone

**Impact:** `pnpm format` and `pnpm format:check` work correctly. Lock files and build output are ignored.

---

### 14. Static Generation (SSG) as Default Rendering

**Decision:** All pages are statically generated at build time (as evidenced by `next build` output showing `○ (Static)` for all routes).

**Status:** `FINALIZED`

**Date:** 2026-08-17

**Rationale:** Portfolio content is largely static. SSG provides optimal performance (no server runtime), perfect for Vercel deployment. ISR/on-demand revalidation can be added later if content needs periodic updates without rebuilds.

**Alternatives Considered:**

- SSR for all pages - Rejected: Unnecessary server cost for static content
- Hybrid per-page - Rejected: Premature complexity; start simple

**Impact:** `next.config.mjs` has no special output config (defaults to SSG). Dynamic routes will need explicit `generateStaticParams` when added.

---

### 15. Typeface: Instrument Sans

**Decision:** Instrument Sans (variable, via `next/font/google`) is the single primary family for the M1 prototype - display, body, and metadata.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Clean editorial grotesque with true italics; holds up from 12.5rem display to 11px uppercase metadata without needing a second family. Fluid `clamp()` type scale introduced (`display`, `lede`, `micro` tokens in `tailwind.config.ts`).

**Alternatives Considered:**

- Space Grotesk - distinctive display but weak at small sizes
- Geist - reads as "Vercel template," which the direction explicitly avoids
- Satoshi - not available via next/font/google (would need Fontshare self-hosting)

**Impact:** Font loaded via `next/font` in `layout.tsx` as `--font-sans`. Revisit after visual review.

---

### 16. Experimental Palette

**Decision:** Restrained warm-neutral palette adopted from owner's suggested starting values, implemented as CSS variables with system-preference dark mode.

**Status:** `SUPERSEDED` by #21 (palette v2, vermilion identity) after owner review found it too anonymous.

**Date:** 2026-08-23

**Rationale:** Warm paper tones support "editorial / cinematic / warm" over cold tech grays. Five roles only (paper, surface, ink, muted, accent). Manual theme toggle deferred.

**Impact:** Defined in `globals.css`; mapped to Tailwind color tokens. Accent used only for selection, focus ring, and one rule so far.

---

### 17. Hero Composition & Signature Scroll Interaction

**Decision:** Asymmetric editorial hero: portrait bleeds off the right edge behind oversized staggered display type ("SHIKHAR" / indented "SAHAY"). Signature behavior: on scroll, the hero pins natively (sticky) while the two title lines drift upward at different rates **over** the portrait, which sinks slightly and scales down - typography physically travels through the composition into the next section.

**Status:** `SUPERSEDED` by #20 (aperture concept) after owner review found the composition too generic.

**Date:** 2026-08-23

**Rationale:** Creates tension between type and image without effects libraries; feels physical/editorial rather than "techy." Single memorable behavior per project constraints.

**Alternatives Considered:**

- Centered symmetric hero - rejected: generic
- Parallax background image - rejected: reads as template
- Text blend modes over image - rejected: muddy with warm palette, gimmicky

**Impact:** Implemented via `<ScrollScene>` writing a `--p` custom property (one rAF-gated passive listener); all motion is CSS transform/opacity reading that variable.

---

### 18. CSS-Only Motion for M1 (No Animation Libraries Yet)

**Decision:** Entrance choreography and scroll transition are pure CSS keyframes + custom properties. Motion for React, GSAP, Lenis, Three.js are NOT installed.

**Status:** `SUPERSEDED` by #23 (Motion added for scroll-scrubbed choreography in the v2 hero).

**Date:** 2026-08-23

**Rationale:** The required effects need zero JS beyond a scroll-progress variable. Avoids bundle cost and keeps entrance animation functional even before hydration. Architecture principle "start simple" applies.

**Alternatives Considered:**

- Motion for React now - rejected: no current effect requires it (~15KB saved)
- GSAP ScrollTrigger pinning - replaced by native CSS sticky

**Impact:** If M2 scroll architecture needs scrubbed timelines or layout animations, revisit this decision rather than extending hand-rolled CSS.

---

### 19. Portrait Asset Location Amendment

**Decision:** Hero portrait source file lives at `src/assets/shikhar-hero.jpg` (statically imported), amending Decision 3's path of `public/images/shikhar-hero.jpg`.

**Status:** `FINALIZED` (amendment)

**Date:** 2026-08-23

**Rationale:** Next.js does not support static imports from `public/`. Static import enables automatic blur placeholder (CLS/LCP benefit), which string URLs cannot provide. Image optimization pipeline is unchanged.

**Alternatives Considered:**

- String URL referencing public/ - rejected: loses blur placeholder
- Duplicating file in both locations - rejected: repo bloat, drift risk

**Impact:** Future images should follow the same pattern (source in `src/assets/`, referenced via static import).

---

### 20. Visual Reconceptualization: the "Aperture" Opening

**Decision:** M1 was redesigned around one concept: the photograph is an aperture. Arrival: a shutter-like curtain opens to reveal the portrait window while oversized type arrives (line 1 solid, line 2 outline, intersecting the window edge). On scroll the hero pins natively while the aperture expands 4.35x into a full-bleed cinematic moment (title pushed past the viewer, photo credit appears), holds, then releases into an editorial introduction (ghost serif numeral, mixed-face lede, offset fragment columns).

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner review of v1 found it "polished-but-basic": portrait placed beside type, accidental negative space, conventional name treatment. The aperture makes the photograph belong to the visual language, creates a designed transition INTO the photo, and builds curiosity (what happens next?) while keeping native scroll and transform/opacity-only motion.

**Alternatives Considered:**

- Image masked through letterforms - rejected: gimmick risk, hurts photo legibility
- Horizontal scroll section - rejected: premature, mobile risk
- Keeping v1 layout with more polish - rejected: owner explicitly asked for reconceptualization

**Impact:** `Hero.tsx` is now a Client Component (Motion scrubbing). `ScrollScene`/CSS scroll-var approach removed. Scene wrapper is 240svh.

---

### 21. Palette v2: Warm Print Identity with Vermilion Accent

**Decision:** Cream paper (#F3EFE6), warm ink (#1D1915), muted warm gray, and a vermilion accent (#BC3F1A light / #E0643B dark). Dark mode is a warm charcoal colorway (#161310 base), not inverted black/white.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner feedback: neutral palette was anonymous and electric blue was generic-tech. Vermilion reads as editorial print (ink-stamp red), supports "warm, confident, slightly unexpected", and survives both colorways.

**Impact:** Replaces Decision #16 values in `globals.css`. Accent roles: selection, focus ring, eyebrow ticks, fragment labels, cue segment, credit dot, nav hover underline.

---

### 22. Typography Pairing: Instrument Sans + Instrument Serif

**Decision:** Add Instrument Serif (400, normal + italic) as an accent face for italic emphasis inside statements and oversized ghost numerals. Instrument Sans remains the workhorse.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** The faces were designed as a pair (cohesive identity). The serif italic creates typographic moments without a third family or a new weight system.

**Impact:** Second `next/font` load (small, subset latin, swap). Used in hero statement, intro lede, ghost numeral.

---

### 23. Motion for React Added

**Decision:** Install `motion` (Motion for React, ~15 KB gzipped) for scroll-scrubbed hero choreography, `whileInView` intro reveals, and nav fade. Supersedes Decision #18.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** The aperture sequence requires multi-phase scroll scrubbing of interpolated transform values. CSS custom-property math was brittle; Motion provides reliable scrubbing, `useReducedMotion`, and was already the planned primary animation library in ARCHITECTURE.md. Entrance choreography stays pure CSS (pre-hydration safe).

**Known quirk (important):** Motion v13 2-point `useTransform` ranges did not hold end values beyond the range in testing (opacity mirrored back). Always use explicit 3-point ranges with a terminal stop. Documented in ANIMATION.md.

**Impact:** First Load JS rose from ~93 KB to ~140 KB (budget 150 KB). GSAP/Lenis/Three.js still excluded. Native sticky pinning retained (no scroll hijacking).

---

### 24. Theme System: Class-Based Toggle with Crossfade

**Decision:** Manual light/dark toggle. Class on `<html>` (`dark`), Tailwind `darkMode: 'class'`, inline head script applies stored/system preference before paint (no FOUC), quiet text micro-toggle in the nav, 0.7s CSS crossfade of colors.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner asked for a polished, minimal theme system with smooth transition. Hand-rolled (~60 lines) avoids the `next-themes` dependency.

**Impact:** `?theme=dark|light` query override exists for testing. Auto (system-follow) mode is not a toggle option; first visit follows system, first toggle persists a choice.

---

### 25. Long-Form Structure, Opening Sequence, and Navigation Instrument

**Decision:** The site becomes a seven-part long-scroll narrative (01 Introduction, 02 Selected Work, 03 Experience, 04 Systems, 05 Outside the Screen, 06 Resume, 07 Contact) with: a cinematic opening title card (indices tick 01 to 07 over a progress hairline, ~1.6s, session-gated, skipped for reduced motion), a navigation instrument (scroll progress hairline, live `NN / 07 Name` readout via IntersectionObserver, difference-blend white links so the nav survives the inverted panel), an editorial site index in the Introduction, and a Contact ending that calls back to the opening indices. Hero pinned scene shortened from 240svh to 180svh so the full-bleed photograph is a beat rather than the whole experience.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner feedback: the aperture hero dominated too much; the site needed personality, narrative, and unexpected details rather than more hero polish. The counting-indices motif ties opening, navigation, index, and ending into one identity.

**Impact:** New sections and components; page assembled from `src/content` modules; nav rebuilt as client component with IO + scroll progress.

---

### 26. Content Architecture: Typed Data Modules

**Decision:** All content moves to `src/content/` modules (profile, sections, projects, experience, systems, personality). Components consume the modules; nothing user-facing is hardcoded inline. Metrics and claims restricted to owner-supplied source material; contact/social/resume links are explicit placeholders.

**Status:** `FINALIZED` (structure), content values remain provisional

**Date:** 2026-08-23

**Rationale:** Owner directive to stop hardcoding content in giant components; makes future updates trivial and lets agents extend sections without touching markup.

**Impact:** Documented in CONTENT.md. Resume PDF is a placeholder at `public/resume.pdf` (owner must drop the real file; the source PDF could not be read by the implementing agent).

---

### 27. Section-Specific Motion Behaviors (Motion Language)

**Decision:** Each section gets its own motion behavior under one language (ARRIVE / DISCOVER / TRANSFORM / SETTLE / DEPART): contextual counters and a flowing signal map (Work), sticky era chronology with shifting visual mood (Experience), an interactive fragment instrument with inverted full-tone panel (Outside), a condensed resume artifact moment (Resume). Uniform fade-up is avoided; reveals vary per section via the shared `Reveal` primitive.

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner asked for sections that transform rather than slide, content that changes representation with scroll, and personality represented as discovery rather than cards.

**Impact:** New small client components justified: `Counter`, `InView`, `Reveal`, `Opening`, plus section clients (Work artifacts are server; Experience, Outside, SiteNav, Opening are client). First Load JS ~145 kB of the 150 kB budget.

---

### 28. Opening v4: Title Sequence, Portrait Instrument, Scene-Change Transition, IA Reorder

**Decision:** Four linked changes after owner review of v3:

1. **Opening v4:** the title card becomes a cinematic ink-field sequence: name reveals word by word (solid + outline), indices tick 01 to 07 along a vermilion signal line, the field lifts away as the hero boots beneath it. Synchronized via a pre-paint head script setting `html[data-intro]` and `--intro-delay` (no flash for returning visitors, no delayed-animation mismatch). ~2.2s, once per session, skipped entirely for reduced motion.
2. **Portrait as instrument:** the rectangular window is replaced by a circular aperture with a technical ring system (drawing hairline orbit, rotating dashed ring, tick marks, rotating vermilion arc, coordinate labels). Pointer parallax on the crop and counter-drift on the rings (fine pointers, reduced-motion-gated).
3. **Face zoom rejected and removed:** the v2/v3 scroll behavior that scaled the portrait toward the viewer is gone. The hero pins for 150svh and the scene changes: typography separates into layers, the instrument exits laterally and scales down, a hairline draws as the handoff into About.
4. **IA reorder:** 01 Identity, 02 About, 03 Experience, 04 Skills, 05 Projects, 06 Personality, 07 Contact + Footer (Experience before Skills before Projects). Resume folds into 07 as an artifact moment. Section components renamed to match (About, Skills, Projects, Personality).

**Status:** `EXPERIMENTAL`

**Date:** 2026-08-23

**Rationale:** Owner review found the opening template-like, the portrait "placed rather than designed", the face zoom gimmicky, and the hero static after entrance. The instrument concept makes the portrait part of the identity system, ties into existing motifs (indices, coordinates, hairlines), and the scene change keeps scrolling feeling like moving between scenes.

**Alternatives Considered:**

- Portrait masked through letterforms - rejected: hurts photo legibility, gimmick risk
- Iris-close into a nav badge - rejected: over-clever, fragile
- Keeping rectangular window with more decoration - rejected: owner explicitly asked for reconceptualization

**Impact:** Hero/Opening rebuilt; sections renamed and reordered; `sections.ts` registry is the IA source of truth; canonical root `AGENTS.md` created (CLAUDE.md now points to it). First Load JS ~147 kB of 150 kB.

---

## Deferred Decisions (Explicitly UNDECIDED)

The following are intentionally not decided yet. They will be resolved during relevant milestones:

| Decision                       | Milestone | Notes                                                      |
| ------------------------------ | --------- | ---------------------------------------------------------- |
| ~~Primary display font~~       | M1        | Instrument Sans + Instrument Serif pairing (see #15, #22)  |
| ~~Color palette (light/dark)~~ | M1        | Vermilion identity implemented EXPERIMENTAL (see #21)      |
| ~~Manual theme toggle~~        | M1        | Implemented EXPERIMENTAL (see #24)                         |
| Spacing scale & base unit      | M1+       | Tailwind defaults + viewport-based section padding for now |
| Border radius system           | M1        | Sharp corners used so far; no tokens defined               |
| Lenis vs native scroll         | M2        | Native sticky + Motion scrub working well so far           |
| GSAP vs Motion-only            | M2/M6     | Motion installed (see #23); GSAP still excluded            |
| Three.js/R3F inclusion         | M6        | Only if signature experience justifies it                  |
| Project data structure         | M3        |                                                            |
| Experience data structure      | M4        |                                                            |
| Personality section format     | M5        |                                                            |
| Signature experience concept   | M6        | Open ideation                                              |
| Finalized hero copy            | M1        | Current statement/context are owner-provided placeholders  |

---

## How to Add a Decision

When a decision is made during implementation:

1. Add an entry to this file with the format above
2. Update the relevant documentation file (`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ANIMATION.md`, etc.) to mark the decision `FINALIZED` with actual values
3. Update `HANDOFF.md` with the decision in "DECISIONS MADE"
4. Commit with message: `docs: record decision - <short description>`

Do not make significant design/architecture decisions without documenting them here.

---

### 30. v5 Iteration: Loader, Statements Bridge, Timeline, Emblems, Carousel, Control Panel, Letter Footer

**Decision:** Owner-directed iteration on v4.1. Opening replaced by a minimal signal-line loader (hairline draws, vermilion marker rides its tip, about 1.6s); the v4 title card read as a blank frame.

2. A statements bridge (pinned 300svh ink field) sits between hero and About: three large statements (I build. / I break. / I rebuild.) reveal with scroll, removing the dead space after the portrait exits.
3. About: the editorial index is removed (header and progress bar suffice); the lede reveals word by word with scroll (WordReveal component).
4. Experience: one continuous timeline, latest first, one condensed factual line per role; details live in the resume. Markers are rotated squares that fill on hover; no org metadata.
5. Skills: each tool is a golden emblem (gold ring, serif monogram, hover rotation); gold exists only in Skills and Certifications. Certifications get their own sub-block. Education removed from Skills (lives in control center and footer).
6. Projects: a looping, keyboard- and touch-accessible horizontal carousel with five artifact panels (three real, the honeypot, and this site); consistent panel architecture with clamped copy and structured placeholder links.
7. Control center structured as one framed instrument (title strip, divided modules). Footer wordmark fitted to viewport with per-letter hover interaction.

**Status:** EXPERIMENTAL

**Date:** 2026-08-24

**Rationale:** Owner screenshot review found the title card blank, the post-portrait void empty, the About index redundant, Experience too dense, Skills too plain, projects too spread out, and the control panel too loose. Each change maps to one of those findings.

---

### 31. v4.2 Owner Brief: Opening Rhythm, Org Timeline, Marquee Skills, Drifting Carousel, Compact Footer

**Decision:** Owner-directed iteration on the v5 structure.

1. Hero name reacts letter by letter under the pointer (InteractiveLetters: gaussian rise field, accent tint, one rAF loop, fine pointers only, static on touch and reduced motion).
2. Opening compressed: hero 130svh, every layer holds the frame until late; the statements bridge keeps all three statements on one sticky ink stage from the first pixel and moves emphasis down the stack with scroll; the stage stays opaque to the end so no blank beige screen can appear before About.
3. Experience content grouped by organization in the owner's mandated order (Cyber Defenders, Recipharm, GDG, CodeChef-VIT, Skilledity, Team Shade); the Skilledity Social Media Management Intern role is listed without dates because the owner's source supplies none. Timeline rebuilt around a central spine whose accent fill draws with scroll; org blocks alternate sides on lg and stack along the spine below lg; one condensed line per role.
4. Skills rebuilt as three drifting marquee rows of golden emblems (alternate directions, pause on hover, edge fade). No numeric counts. The emblem core is a slot so technology logos can drop in later without layout changes. Certifications remain a separate register.
5. Projects: continuous auto-drift (40px/s) that permanently stops on the first user interaction (drag, swipe, arrows, keys); seamless wrap via a two-copy track whose offset wraps modulo one copy width; pointer drag with gentle grid settle and click suppression after drags; strictly uniform cards; P.0x tags removed.
6. Control center: framed panel with accent corner ticks, title strip with live status, six hairline-divided modules, footer strip.
7. Footer: compact contact grid (Let's talk, Elsewhere, Pages), slim resume row, and the closing element is the name as an infinite marquee with reactive letters; the large Say hello block and the large link rows are removed.
8. .ink-stage utility keeps cinematic ink fields (opening, bridge) dark in both themes; dark mode never flashes to cream mid-story.
9. Reduced-motion variants gate on useMountedReducedMotion (post-mount flip) so server and client markup always match; Chrome ignores smooth scrolling under forced reduced motion, so reduced-mode carousel arrows scroll instantly.
10. Nav magnetic pull removed to reclaim first-load budget; Magnetic component deleted (unused).

**Status:** EXPERIMENTAL

**Date:** 2026-08-26

**Rationale:** The owner's brief mapped each section to a concrete defect: dead scroll after the hero, a bland statements section, an empty right column in Experience, a static resume-list Skills, an unacceptable carousel, loose control-panel divisions, and a footer that spent its space on Say hello. References: Aryan Randeriya (opening typography, utility panel, footer), DevJams screenshot (timeline), Devansh Arora (compact structures), Swayam (art direction).

**Alternatives Considered:** Sequential statement reveals (rejected: empty stage time); index-based carousel with clone-snap (rejected: visible seams and glitchy snapping); CSS-only footer letter hover (kept JS for parity with the hero wave); code-splitting below-fold sections via next/dynamic in RSC (rejected: does not produce separate chunks in the App Router client manifest, adds indirection without benefit).

**Impact:** First Load JS ~151 kB (budget 150, baseline was already 150 at checkpoint); reclamation options recorded in HANDOFF known issues. All interactions degrade to complete static layouts under reduced motion and on touch.

---

### 32. v4.3 Polish Pass: Eight-Issue Sweep (FINALIZED behaviors, EXPERIMENTAL polish)

**Decision:** Sequential inspect, implement, verify pass over eight reported issues. Verified with DOM/bbox/scroll-state harnesses (no screenshot loops), production build, and a 12-point end-to-end pass.

1. Hero letters use a 2D gaussian proximity field (sigma X 130px, sigma Y 85px) with per-letter springs, scroll-aware center re-caching, an explicit overflow-visible chain, row separation, and footer marquee bleed. Hovering one row leaves the other at rest (measured 0.000 crosstalk both directions).
2. Hero exit kept as the ink veil handoff (verified frame by frame: no dead viewport, no paper gap); reduced motion no longer pins the hero scene.
3. Statements recomposed as full-width interlocked registers (flush-left BUILD, flush-right larger BREAK, indented REBUILD finale) with controlled overlap, per-line sizes, and unified activation scale.
4. Experience geometry verified numerically (spine centered 0.00px, markers on spine 0.00px, fill coincident, alternation exact, mobile stacking correct); org renamed to the owner-specified "CodeChef-VIT Student Chapter". Cyber Defenders content untouched (single factual role).
5. Skills emblems now carry real CC0 marks for 19 of 23 tools (added C, C++, R from Simple Icons; C++ key disambiguated via a plusplus normalization rule). SQL, Nmap, CrowdStrike Falcon, and Beelzebub have no genuine CC0 mark and keep honest monograms. No new dependency.
6. Carousel direction corrected (forward is negative offset, matching the drift; arrows, keys, and reduced-motion scrolls all follow it); one copy width is summed from slide metrics so wraps land exactly on grid; placeholder links are inert everywhere.
7. Control center kept as the framed instrument; placeholder tiles swallow clicks.
8. Footer kept as the marquee ending (reactive letters verified at 0.160em peak); server-rendered placeholder links became plain text. No SAY HI treatment anywhere.
9. Added `src/app/icon.svg` (ink field, vermilion diamond) so the favicon resolves.

**Status:** EXPERIMENTAL

**Date:** 2026-09-04

**Rationale:** Each fix maps to one reported defect; where the repo already implemented the desired behavior (hero exit, timeline geometry, footer marquee), the work was verification plus gap closure rather than rewrites.

**Alternatives Considered:** Rebuilding sections from scratch (rejected: the brief mandates preserving working implementation); installing an icon library (rejected: vendoring three CC0 paths keeps the bundle lean).

**Impact:** First Load JS ~153 kB (budget 150); reclamation options recorded in HANDOFF known issues. Placeholder-link policy recorded in CONTENT.md. Motion patterns recorded in ANIMATION.md v4.3.

---

### 33. v4.4 Visual Polish Pass (EXPERIMENTAL polish)

**Decision:** Top-to-bottom polish with DOM/layout verification (one targeted screenshot to check the hero type over portrait overlap). No system rewrites.

1. Hero name never wraps: `whitespace-nowrap` on the letter containers plus `min-w-0` on the identity column, so oversized display type stays on one line and bleeds over the arch instead of wrapping mid-word (which had doubled the h1 height and pushed it to the viewport top) or squeezing the portrait. Verified: single line at 375/1440/1920, 122px interlock at 1440, face clear.
2. Footer wordmark interaction quieted: new `tintStrength` prop (footer 45 versus hero 85) and footer lift 0.16 to 0.10.
3. Skills emblems: solid full-bleed marks (JavaScript, TypeScript, HTML, CSS, Next.js, C++) render one step smaller for matching optical weight; labels reserve two lines with balanced wrap so every emblem slot is uniform.
4. Project cards render the existing `role` field (previously dropped) as a muted micro line; stack naming unified to Tailwind.
5. Footer Elsewhere links wrapped in `li` (they flowed horizontally as bare inline spans in the list).
6. Skilledity intern row renders a muted "Details coming soon" line (owner supplies no dates or summary) to keep the progression rhythm.
7. Metadata title/description spacing cleaned to single spaces; favicon wired via `src/app/icon.svg`.

**Status:** EXPERIMENTAL

**Date:** 2026-09-04

**Rationale:** Each change fixes an observed defect (mid-word wrap, orange wash, uneven emblems, dropped content, horizontal links) without altering any working system.

**Impact:** First Load JS unchanged at ~153 kB. No new dependencies.

---

### 34. v4.5 Opening Scroll Architecture (EXPERIMENTAL polish)

**Decision:** Audit-first rework of the opening sequence (hero, exit, statements, About handoff), keeping every visual system but changing the choreography architecture where it caused defects.

1. Root-caused the blank post-hero frame: the exit-veil text opacity used a range ending at 0.9, and Motion v13 drops flat terminal segments past the last keyframe, so the veil rose empty. Binding rule going forward: every scroll-driven input range ends at 1.0.
2. Pristine hero at 100% zoom: the name stays on one line and interlocks with the arch by grid construction; display cap 12.5rem; portrait crop holds the face right of center (eyeline into the type); small-desktop nudge keeps the name off the face. Verified no face contact at 1024/1280/1366/1440/1536/1920.
3. The statements section overlaps the hero by exactly one viewport (`-mt-[100dvh]`) so its sticky engages the pixel the hero releases; each thought phase carries its own ink over a transparent stage; the bridge ignores pointer events so hero hover survives underneath. Phase windows share boundaries (crossfade morphs, never two strong thoughts, never zero).
4. Statements rebuilt as phased in-place kinetic typography: serif "I" arrives, then the verb unmasks bottom-up with a rise, then the note; the previous thought masks away upward. REBUILD holds into the About handoff (verified present as About enters).

**Status:** EXPERIMENTAL

**Date:** 2026-09-05

**Rationale:** Fine-grained scroll tracing showed the defects were architectural (range overrun, scene tail, late bridge entry, simultaneous competing phrases), not value tweaks. The reference pattern (sequential single-word focus) was translated into the existing ink/vermilion editorial language, not cloned.

**Alternatives Considered:** Value-only tweaks (rejected: tracing proved structural gaps); merging hero and statements into one sticky scene (rejected: the overlap achieves the same continuity while preserving landmarks and the reduced-motion branches).

**Impact:** No new dependencies. Reduced-motion branches unchanged (static hero, static statement stack, no overlap). All prior verifications re-run green.

---

### 36. v4.7 Owner Data, Vertical Statements, Notes Wall (EXPERIMENTAL polish)

**Decision:** Three-track pass on owner-supplied material.

1. Owner data: real email/GitHub/LinkedIn/Instagram/Medium/X/Spotify links wired with per-channel hierarchy (primary four in control tiles, broader set plus handles in footer Elsewhere, Discord as a copy action since no public URL exists). Resume viewed via the canonical Drive link, downloaded from the local file (still a placeholder until the real PDF lands). Certifications link to verification URLs with issuer plus external affordance. Resume adopted as the factual authority: Recipharm title corrected to IT Intern with DR/BCP, Veritas, and CSV detail; GDG and CodeChef collapsed to the single senior roles the resume establishes (prior Inner/Junior splits and the unsourced event lines removed); Cyber Defenders enriched with LLM backend and Geo-IP detail; Docker added to skills with a vendored mark; Papers stack matches the resume spelling. Phone number and CGPA deliberately not displayed.
2. Statements rebuilt as a vertical accumulative composition sharing one upward travel: emphasis follows distance from center while inactive thoughts persist as dimmed history, so phrases transition through each other instead of replacing. The hero veil carries no text (it duplicated the bridge thought); the bridge owns every word.
3. MarkWall replaced by an infinite notes wall: pan-able world canvas (2400 by 1600) with transform panning, viewport-filtered rendering capped at 150, composer with strict limits, one-level replies, keyboard parity, calm reduced motion. Persistence is an in-memory store behind an interface (works on dev and long-running servers; serverless needs the documented KV swap); seeds are labeled owner notes; wall text renders as plain nodes only.

**Status:** EXPERIMENTAL

**Date:** 2026-09-06

**Rationale:** Owner material outranks earlier provisional content where they conflict. Vertical travel matches scroll direction and lets history persist, which the horizontal slideshow could not do. Shared persistence is honest about what exists today with an explicit upgrade path instead of a faked backend.

**Alternatives Considered:** Keeping both wall systems (rejected: clutter and duplicated purpose); auto-linking URLs in notes (rejected: plain text is safer); zoom on the canvas (rejected: fixed scale keeps layout and a11y predictable); merging GDG/CodeChef sub-roles with resume dates (rejected: overlapping periods would misrepresent progression).

**Impact:** First Load JS ~158 kB (wall UI plus larger statement type). No new dependencies. API routes add zero client JS.

---

### 37. v4.8 Tagline Afterimage, Statement Echoes, Wall Rework, Footer Rows (EXPERIMENTAL polish)

**Decision:** Four implementation tracks plus five feedback-only studies.

1. Hero tagline owns a memory interaction: the serif word carries a vermilion afterimage that stirs a few pixels toward the pointer and fades slowly on leave (fast in, 1000ms out), with a 650ms hold for touch taps (whose enter/leave batch in one frame). Ghost is absolute over its word (never layout), aria-hidden, absent under reduced motion. Verified 15/15 including repeated-interaction settle.
2. Statements use the full viewport: verbs grow to 12.5vw (cap 14rem, fit-verified 375 to 1920), each row carries a giant cropped echo of the neighboring verb at 7% paper on the right (static CSS riding the shared stack, zero extra motion state), rows cascade diagonally (flush mobile, progressive offsets sm+). Reduced-motion stack keeps echoes. Verified no-blank/no-pop/determinism/veil-textless/refresh across four widths.
3. Notes wall reworked from utility canvas to tactile surface (translated from the friend reference, not cloned): deterministic tilt plus restrained width scale from id hashes, pin-diamond metadata, tactile shadows, hover/focus straighten, dotted field plus vignette plus dashed world boundary with accent corner ticks, controls docked on the wall itself, serif composer card, narrow thread slip with vermilion reply rail, focus moved into thread/composer on open (Escape keeps working after pin). All data safety preserved (validation, limits, 150 cap, store abstraction, moderation, plain text). Verified 30+ checks plus XSS probe.
4. Footer Elsewhere simplified to icon plus name rows with real monochrome brand marks, whole row linking, no handles; hover lifts the mark, shifts the row, reveals an arrow. Resume row removed from Elsewhere (the resume moment below covers it). Discord stays a copy row with identical layout (copy icon, "copy"/"copied" micro, no invented URL). Verified both themes.
5. Feedback only (NOT implemented): Experience imagery, merging Security Tools, certification prominence, opening interaction, Personality detail stories. Options and recommendations live in the owner-facing session notes and ROADMAP backlog; nothing about them is described as shipped anywhere.

**Status:** EXPERIMENTAL

**Date:** 2026-09-06

**Rationale:** Each track answers one brief point with the smallest distinct mechanism: the tagline needed its own language (not springs, wave, or scroll); statements needed the right half without decoration (typography only); the wall needed spatial clarity (rotation, scale, boundary, dock); the footer needed simplification (rows, not glyph/handle lines).

**Alternatives Considered:** Underline draw for the tagline (rejected: annotation language belongs to editing, not memory); giant slideshow for statements (rejected by brief); cloning the reference wall cards/behavior (rejected: names-only cards would hide messages; starfield breaks the palette); brand-color social icons (rejected: monochrome keeps the editorial voice).

**Impact:** First Load JS ~159 kB (plus ~1 kB for the tagline springs and wall presentation). No new dependencies. Real resume PDF committed (owner-supplied file replaces the placeholder).

---

### 38. v4.9 Correction Pass: Tagline Rule, Residue Echoes, Cert Ledger, Wordmark Object, Panel Scope, Open Wall (EXPERIMENTAL polish)

**Decision:** Six-track visual/interaction correction pass on owner screenshot evidence.

1. Tagline: the vermilion afterimage is removed (it read as misregistration). Replacement is an accent rule that draws beneath the serif word with a diamond riding to the cursor; movement glides the marker, leave retracts. No loop, no layout, aria-hidden, absent under reduced motion.
2. Statements: echoes now map same-word as trailing two-letter residues (LD/AK/LD), offset low-right so they can never stack behind their own letterforms; full-word echoes were judged muddy in light mode. The scene is theme-deliberate: paper surface with ink type in light, deep warm charcoal with cream type in dark (theme tokens, no fixed colors); hero veil and tail match the surface per theme so both handoffs stay seamless.
3. Certifications leave Skills for their own ledger chapter (eyebrow, serif lede, generous break, hairline rows, featured first row larger, boxed Verify links): one credential per row arriving with a scroll-driven mask wipe, full set static under reduced motion. No invented issuer marks.
4. Footer wordmark rebuilt as one object: uniform velocity lean plus stretch, tracking breath, and a narrow vermilion sheen band following the cursor (an early fill-to-cursor version was judged too loud). Separators grow to 0.16em diamonds with 0.7em air after finding the old ones rendered 4px (em resolved against body type, fixed with an explicit text size). Seamless -50% loop verified.
5. Theme system: Personality plus wall render inside a `.panel-ink` token scope (light values pinned), fixing the light-island-in-dark-mode bug at the system level; full section audit in both themes; toggle gains a state-driven icon rotation.
6. Wall opens up: mosaic statement (owner-supplied meaning, lightly polished, EXPERIMENTAL copy), full-bleed section-width surface with the box border and world boundary removed, cursor-following placement ghost (direct DOM writes, no re-renders), Recenter replaced by Latest (store `latest()` plus `?order=latest`, honest global lookup, smooth camera flight, thread opens on arrival, reduced motion jumps). All safety architecture preserved.

**Status:** EXPERIMENTAL

**Date:** 2026-09-07

**Rationale:** Every change answers screenshot evidence: misregistration, accidental mapping, appendix hierarchy, childish motion, theme island, app-in-a-box. Where a first attempt failed visual judgment (full-word same echoes, fill sweep), it was redesigned, not tuned.

**Alternatives Considered:** Leaving the tagline static (rejected: the rule earns its place); neighbor-word echoes (rejected: accidental by construction); brand-color social icons (unchanged); names-only wall cards (rejected: hides messages); merging Security Tools, Experience imagery, opening interaction, Personality stories (still backlog, not implemented).

**Impact:** First Load JS measured at final build (see PERFORMANCE.md). No new dependencies. One new client component (Certifications, justified by scroll choreography).

---

### 35. v4.6 Footer Life, Sliding Statements, Mark Wall (EXPERIMENTAL polish)

**Decision:** Interaction-depth pass without touching working choreography foundations.

1. Skills emblem cores all resolve to one beige family: the four monograms moved from gold to ink (rings stay gold). Verified per emblem in both themes.
2. Footer Elsewhere channels carry meaning glyphs (code, diamond, document) plus a mail glyph on Email; control Navigate and footer Pages links use arrow markers. All decorative symbols are aria-hidden text glyphs (no icon dependency).
3. Footer marquee rebuilt around pointer velocity instead of the hero spring field: proximity rise plus direction-signed lean and swell, decay settle, zero cost at idle. Reduced-motion and touch unchanged (static).
4. Personality hover feedback loop root-caused: the auto-sized word column resized on every word swap, reflowing buttons under the cursor so the active state chased itself. Fixed with a constant 28rem word column (reflow now impossible by construction).
5. Statements upgraded from in-place replacement to a continuous leftward slide: full-viewport panels travel plus 60vw to minus 60vw with shared crossfade windows, scale 1.06/1/0.94, rotation plus/minus 1.5 degrees, verbs at 17vw capped for viewport fit. Opacity fades sit at travel end (fading ink over transparency reads gray) and each panel carries an oversized ink bleed (transformed corners never uncover).
6. Mark wall: glyph picker plus stamp field inside Personality. Geometric text glyphs only (nothing to sanitize); deterministic size/rotation from stored attrs; localStorage persistence with memory fallback through a `MarkStore` interface (a shared backend would implement the same interface with server allow-listing and rate limiting); 150-mark cap; keyboard stamping via free-spot search plus a Stamp button; instant under reduced motion. Honestly local-only: the UI states marks keep in this browser.

**Status:** EXPERIMENTAL

**Date:** 2026-09-05

**Rationale:** Each item answers a concrete brief point (uniform icons, expressive footer, livelier marquee, glitch cause, smooth sliding statements, meaningful markers, memorable visitor feature) with the smallest mechanism that satisfies it.

**Alternatives Considered:** Icon library for markers (rejected: Unicode text glyphs suffice); backend for marks (rejected: no infrastructure exists; faking shared persistence would be dishonest); mask-plus-slide combined transitions (rejected after a gray-band frame proved translucency over transparency fails; travel-first fade-last instead).

**Impact:** First Load JS ~156 kB (plus ~3 kB for the wall, wave, and larger type). No new dependencies.

---

### 39. v5.0 Full-Word Echoes, Theme-Following Pieces of Me, Toolkit IA (EXPERIMENTAL polish)

**Decision:** Three-track IA plus visual correction pass on owner directive (supersedes the residue-echo mapping and the fixed-dark panel of #38; #38 history stands).

1. Statements: echoes render the COMPLETE verb (BUILD, BREAK, REBUILD), oversized and cropped low-right, same word behind same word. Root cause of the incident: the animated branch sliced trailing two-letter residues while the reduced-motion branch already rendered full words. Full words at full strength pile into mud (verified on screenshot), so subtlety moved to element opacity (`opacity-[0.06]`, `dark:opacity-[0.09]`): color opacity-modifier utilities do not compile against the bare `var()` tokens in Tailwind v3 (see item 4), while element opacity always generates. No choreography or theme change.
2. Pieces of Me (renamed from Personality, see item 3) follows the theme like every other chapter: paper surface plus ink type in light, warm charcoal plus cream in dark. Root cause: `.panel-ink` pinned the subtree to a fixed dark treatment (dark background, light-pinned tokens, `text-paper` authoring). The scope is deleted; the section and wall are re-authored in solid theme tokens (`text-ink`, `text-muted`, `border-ink`, `border-paper`, `border-muted`, `bg-ink` plus `text-paper` pairs) with theme-relative washes (dotted field, vignette) living as `color-mix` CSS in `globals.css`. The vermilion reply rail and accent-bordered card variant now genuinely render vermilion (their `/50` and `/70` modifiers were compiling to nothing, so both had been falling back to currentColor). Reduced-motion, rapid-toggle, and refresh-persistence verified in both themes.
3. Toolkit becomes a first-class navigational destination spanning the Skills emblems and the Certifications ledger chapter: the Skills section takes `id="toolkit"` plus the Toolkit eyebrow and aria label; the ledger keeps its `certifications` element id as a deep anchor but leaves the observed registry, so Toolkit stays the active nav entry through both. Primary nav, footer Pages, and control Navigate (all three render the shared `navLinks`) expose About, Experience, Toolkit, Projects, Pieces of Me, Contact. Desktop keeps one premium row from md up (tighter gaps and tracking below xl); below md a disclosure menu carries the six destinations (Escape closes, selection closes plus lands after layout settles, focus moves into the panel) instead of shrinking links into unreadable text. Certifications never appears as its own nav or footer entry.
4. Authoring rule discovered (binding): Tailwind v3 does not emit color opacity-modifier utilities (`text-ink/80`, `border-ink/15`, `bg-paper/85`, `text-ink/[0.06]`) for colors defined as bare `var()` tokens, verified by compiling a fixture through the project config and by absence in the production CSS. Affected classes render as their unmodified fallback (usually full-strength currentColor or inherited text), which the approved look has implicitly absorbed. Do NOT author new `/opacity` color utilities; use solid tokens, element opacity, or `color-mix` CSS. A future global token migration (channel variables plus `<alpha-value>`) would change every subtle surface site-wide and needs its own owner-approved pass; recorded in HANDOFF known issues.

**Status:** EXPERIMENTAL

**Date:** 2026-09-07

**Rationale:** Every change answers the brief directly: full-word echoes are the intended design; a section that stays dark in light mode is a theme bug by owner ruling (the v4.9 inverted-panel direction is retired); Toolkit plus Pieces of Me is the new canonical IA.

**Alternatives Considered:** Keeping residues (rejected: brief mandates full words); keeping the fixed dark panel as intentional contrast (rejected: owner ruled it a bug); hamburger-free wrapped mobile nav row (rejected: wraps unpredictably across small widths); global `<alpha-value>` token migration now (rejected: rebuilds the approved look of every section without owner review); `color-mix` arbitrary Tailwind values per use (rejected: the two wall washes are the only theme-relative needs, a tiny CSS home beats repeated arbitrary values).

**Impact:** First Load JS ~160 kB (unchanged). No new dependencies. One small client addition (mobile menu state inside the existing SiteNav client component).

---

### 40. Custom 404: You BROKE. plus REBUILD (EXPERIMENTAL polish)

**Decision:** Genuine App Router `not-found.tsx` (proper 404 status on invalid and nested routes) designed as a hidden scene in the bridge grammar: editorial eyebrow (Missing page), serif pronoun (You) over the giant verb BROKE. with accent period, micro note (This page was never built), Error 404 plus the attempted path, and one accent REBUILD action home. The verb arrives misregistered like a slipped print (deterministic em offsets per letter; the accent period stays put as the registration anchor). The single interaction: REBUILD re-registers the letters with a staggered expo settle, holds a beat, then routes to `/`. Slim identity chrome only (brand link plus reused ThemeToggle, slim outro strip), never the full section nav. CSS transitions only, no animation library; the 404 route costs ~140 B over shared chunks. Reduced motion gets aligned type plus immediate navigation; no-JS gets a plain working link; the h1 carries an `You broke it` accessible label over aria-hidden letterforms.

**Status:** EXPERIMENTAL

**Date:** 2026-09-07

**Rationale:** The missing page reads as the broken fourth statement (I BUILD / I BREAK / I REBUILD becomes You BROKE.), so the joke is structural, never cheesy. Rebuild-before-navigate makes the action meaningful instead of decorative.

**Alternatives Considered:** Generic centered 404 digits (rejected: explicitly banned); glitch/matrix/terminal treatments (rejected: banned aesthetics); pointer-driven letter displacement (rejected: too close to the hero Gaussian field); rebuilding on hover rather than on the home action (rejected: the payoff belongs to REBUILD); rendering the full SiteNav (rejected: section links are meaningless off-page; slim chrome keeps identity without clutter).

**Impact:** Home First Load JS unchanged (~160 kB). No new dependencies. One new client component (`not-found.tsx`, justified by the rebuild interaction plus theme toggle).

---

### 41. Content plus Scroll Pacing: About Lede, Bridge Breaths (EXPERIMENTAL polish)

**Decision:** Owner-locked About copy plus perceptual pacing fixes on both sides of the statement bridge.

1. Hero to BUILD root cause: after the veil covers (hero progress 0.85) the bridge panel fades invisibly (paper on paper in light mode) while BUILD fades in over its first 15 percent, reading as an empty canvas for ~15svh. Fix on the bridge side only (hero choreography untouched): BUILD center 0.15 to 0.1 with note window [0.07, 0.15] to [0.02, 0.1], so the verb materializes promptly after the veil. Centers now sit evenly at 0.1 / 0.5 / 0.9. Measured veil-full to BUILD-readable: 10.5svh with continuous motion.
2. REBUILD to About root cause: the finale hold (0.9 to 1.0) plus About top padding stacked into ~24svh before the eyebrow arrived, and the finale resolved high enough that the shared frame read empty. Fix as a combination: finale travel ends at -44vh instead of -50vh (finale rides nearer the About entry, still clearing it), About top padding 12vh to 6vh, About reveal trigger margin -12 percent to -20 percent. Measured REBUILD-full to eyebrow arrival: ~20svh with the finale and entry sharing the frame. No collision, no clipping, reverse deterministic, reduced motion untouched.
3. About lede replaced with the locked copy (segmentation keeps serif italic on `inevitable` exactly as before, including the house space-before-colon rendering), lede type rebalanced to `clamp(1.75rem, 5vw, 4rem)` with a wider measure for confident viewport presence (4 lines desktop, 7 readable lines at 375), fact cards replaced with the locked HOME / STUDYING / INTERESTS values (card 2 gains its missing `Vellore`). About stays text-only; Experience untouched.

**Status:** EXPERIMENTAL

**Date:** 2026-09-07

**Rationale:** Both breaths are tuned perceptually in-browser, not to numeric targets: shorter but still present, with continuous motion across each transition and no blank viewport anywhere in either direction.

**Alternatives Considered:** Shortening the hero scene (rejected: hero pacing is approved, fix belongs on the bridge side); negative margins or overlap hacks (rejected: fragile across viewports); compressing the whole bridge further (rejected: would rush all three phases and harm premium pacing); trimming About bottom padding (rejected: not part of the complaint); attaching the colon to the serif `inevitable` segment (rejected: keeps prior-art segmentation where the colon stays sans).

**Impact:** First Load JS ~160 kB (unchanged). No new dependencies. No new client components.

---

### 42. Experience Polish: Copy, Artifact Personalities, Bridge Breath, Device Rule (EXPERIMENTAL polish)

**Decision:** Owner-directed Experience pass plus one scroll-spacing fix and one standing rule.

1. Experience intro continuation replaced with the owner-supplied "different rooms, same instinct: find the problem and get to work." (serif italic, same WordReveal thought, no layout redesign; judged at desktop widths).
2. GDG Senior final sentence now reads the cumulative "brought my sponsorship total to ₹3.3L+ along the way." (₹3.3L+ is the GDG total, not an additional raise). The `₹3.3L+` egg target is untouched, so the rupees interaction keeps working. Wrap rechecked at 1440/1366/1280: Senior stays 4 lines with a 428px final line; every other paragraph unchanged; no measure adjustment needed.
3. Multi-role artifact alignment verified, not changed: settled centering offset measures 0px on all blocks (an early scare was un-triggered entrance transforms, not layout bias). The `self-stretch` plus `items-center` cell construction already centers each artifact against its whole organization block.
4. GDG artifact enlarged moderately (220px to 250px box, mobile 150px to 165px) for optical balance; neighbors re-judged, no other size touched.
5. Artifact interactions rebuilt as six personalities on one shared foundation (normalized pointer, one perspective stage, spring return, rest at identity; mouse-only tracking): cyber heavy tilt with narrow bevel sheen; recipharm shallow tilt with lettering sweep (quietest moving part); gdg lateral shift with radial give plus twist (no asset split); codechef badge lift with edge sweep; skilledity press dip with lean; shade coin yaw with traveling specular plus snappy spring. Keyboard spotlight wakes the artifact from org-link focus (no new tab stops); reduced motion stays fully static; one shared scroll entrance kept (personality lives in interaction, not entrance).
6. REBUILD to About root cause: the finale resolved high while About entered low, so the frame always held an empty middle and the eyebrow arrived after the finale had left. Fix: finale resolves at -40vh instead of -44vh, and the About reveal margin returns to -12 percent (reverting half of #41, which had overshot). The eyebrow now lands while REBUILD is still readable, sharing the frame with no overlap; breath is short and deliberate. Hero to BUILD measured (veil-full to readable ~14svh with continuous overlapping motion) and left alone.
7. Standing device vetting rule recorded in HANDOFF: every section in the website-wide pass is vetted at large desktop, laptop, narrower desktop, tablet, and phone with input-appropriate interactions (this pass: 1440/1366/1280/1024/820/390/360, dark plus light, reduced motion, touch scroll, keyboard spotlight).

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Copy carries owner-mandated meaning (cumulative total, rooms/instinct voice). Alignment needed measurement, not adjustment. Size and interaction judgments were made against the live page, one artifact at a time, keeping text primary. The spacing fix addresses frame composition (empty middle) rather than scroll duration, which is why a margin value plus a resolve height beat further padding or hold tweaks. The Hero opening stays untouched for a marginal gain.

**Alternatives Considered:** Sentence-specific wrapping hacks (rejected: banned, and unneeded); splitting the GDG raster for literal separation (rejected: fidelity risk); per-artifact animation systems (rejected: one spec map); removing the artifact entrance (rejected: it matches every section reveal); shortening the bridge or About padding (rejected: would rush approved pacing); tightening Hero to BUILD (rejected: continuous motion already, no blank frame).

**Impact:** First Load JS ~165 kB (unchanged by this pass; page chunk 77.9 to 78.2 kB). No new dependencies. Org-link focus handlers are the only new client state (one boolean per block).

---

### 43. Experience Final Cleanup: Physical Artifacts, Footnote Removal, Boundary Retirement (EXPERIMENTAL polish)

**Decision:** Owner-directed closing pass on Experience before the Toolkit redesign.

1. All traveling highlight overlays deleted from `ExperienceArtifacts.tsx` (SweepSpec, per-org sweep entries, sweep transform, overlay layer); baked PNG lighting carries material response. Physicality deepened through transform composition instead: cyber forward Z pick-up (settle 1.03 plus lift -2), recipharm shallow perspective plus wider drift, gdg stronger radial give (0.07) plus twist, codechef press-into-depth keyframes, skilledity diagonal shear, shade wider coin yaw. Shared foundation, springs, spotlight, and reduced-motion branches unchanged.
2. Experience resume footnote deleted; the section ends on Team Shade. Resume remains in the footer. No empty wrapper left behind.
3. Experience to Toolkit gap tightened by footnote removal alone (measured 328px to 235px at 1440, about 28 percent perceived reduction, inside the 25 to 35 band); no padding changes, no negative margins.
4. Full-width section-top boundary rules removed from Experience, Skills, and Certifications sections (there is no shared wrapper component; each section owned its own `border-t`). Internal hairlines kept: role dividers, skill group rules, cert ledger rows, About meta rules, eyebrow ticks. Remaining sections keep their rules until their own passes. About to Experience and Toolkit to Certifications spacing unchanged (252px and the intended generous break); hierarchy now comes from space plus eyebrows.
5. Lasting rules recorded: major sections separate through spacing plus the vermilion eyebrow system, never full-width boundary rules; Experience artifacts use physical interaction with a static rest state, never animated shimmer.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Shimmer fought the baked lighting instead of enhancing it; depth reads better from composed transforms. The footnote diluted the Team Shade ending and its removal alone hit the spacing target, so padding surgery would have been gratuitous. Boundaries read as slide edges; their removal was verified transition by transition (About to Experience, Experience to Toolkit, Toolkit to Certifications) in both themes.

**Alternatives Considered:** Independent glow layers per artifact (rejected: shine ban); splitting the GDG raster (rejected again: fidelity); trimming section padding for extra tightness (rejected: target already met, crash risk); removing all section borders site-wide at once (rejected: out-of-scope sections keep theirs until their passes); a shared section wrapper component (rejected: three one-line deletions beat new abstraction).

**Impact:** First Load JS 165 kB unchanged (page chunk 77.9 kB). No new dependencies. PNG bytes untouched.

---

### 44. Control Center Removal, Footer Clock Salvage (EXPERIMENTAL polish)

**Decision:** The Control Center section is deleted outright, not redesigned or redistributed.

1. `ControlCenter.tsx` deleted (320 lines: framed instrument, six modules, channel tiles, IST seconds clock, session uptime). `page.tsx` no longer imports or renders it. No empty wrapper, no orphan `#control` id, no dead imports, timers, icons, or CSS left behind. Registry, nav links, and footer Pages needed no change (Control Center never had a nav entry).
2. Only the live time survives, as a new `FooterClock.tsx` client island placed below the Email action in the footer left column. Two lines, no box, no card, no border: `22:11 IST` (text-sm semibold ink, tabular numerals) over `BANGALORE` (micro uppercase muted). Minute precision, 24-hour, Asia/Kolkata. Hydration-safe placeholder (`--:-- IST`) renders on server and first paint, live time swaps in after mount. Refreshes every 20 seconds (prompt minute rollover, no per-second busyness). Time changing is content, so reduced motion keeps it.
3. Nothing else moves. Toolbox lists, role summaries, study card, extra navigation panel, and redundant social buttons are intentionally deleted. The footer keeps both resume actions and `Everything, condensed.` untouched as the canonical resume location.
4. Footer bottom location metadata changes from Vellore to Bangalore (`profile.location`, used only there): Bangalore is home, Vellore remains the study location in About. The clock and the credit line now agree.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The panel was well made but redundant: About, Experience, Toolkit, navigation, and the footer already communicate everything inside it more effectively. Redistribution would have preserved the redundancy in pieces. The clock earns its place as a small living detail at the true ending, not a dashboard.

**Alternatives Considered:** Shrinking the panel to a slim strip (rejected: still a redundant beat before the footer); moving toolbox or role summaries into About or Toolkit (rejected: that content already lives there in stronger form); seconds precision on the footer clock (rejected: constantly busy, dashboard voice); labeling the clock Vellore (rejected: Bangalore is home, and the footer must agree with itself).

**Impact:** First Load JS 165 kB to 163 kB (page chunk 75.4 kB). The per-second Control Center timers are gone from the bundle; the only new client code is the tiny footer clock island. No new dependencies.

---

### 45. Section Boundary Retirement Complete (EXPERIMENTAL polish)

**Decision:** The remaining full-width major-section dividers are removed: Projects `border-t`, Pieces of Me `border-t`, Contact footer top `border-t`. The system rule now holds site-wide: major page sections separate through negative space plus the vermilion eyebrow plus typography, never full-width horizontal rules.

1. Boundary audit outcome: Hero/Statements (no boundary, handoff hairline kept), About (none, meta rules kept), Experience (none, removed in #43), Toolkit/Skills (none, removed in #43), Certifications (none, removed in #43), Projects (removed now), Pieces of Me (removed now, full-strength `border-ink` line), Control Center (deleted with the section), Contact/Footer (top rule removed now).
2. Intentionally retained: short vermilion eyebrow ticks, Experience role hairlines, Toolkit category rules, certification row separators, About meta rules, project card borders, button outlines, footer internal resume-strip and credit-strip rules, note-wall UI lines. The footer internal rules structure footer content; they do not separate page sections.
3. No spacing surgery. Pieces of Me (`py-[18vh]`) into Contact (`pt-[14vh]`) measures contiguous with the established 28 to 32vh chapter rhythm; Certifications to Projects and Projects to Pieces already sit in the same band, so divider removal needed no padding compensation. About to Experience and Experience to Toolkit untouched.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The dividers read as stacked-slide edges; without them the page reads as one continuous editorial object. Internal hairlines carry local hierarchy, so they stay: the rule distinguishes page separation from component structure.

**Alternatives Considered:** Compressing the Certifications to Projects breath once the divider left (rejected: the whitespace is an intentional chapter breath, consistent with every other transition); a shared section wrapper to enforce the rule (rejected: three one-line deletions, same as #43).

**Impact:** No JS change (pure class removals plus the #44 island). Both themes and reduced motion verified; no horizontal overflow at desktop or mobile widths.

---

### 46. Toolkit Consolidation plus Footer Threshold (EXPERIMENTAL polish)

**Decision:** Toolkit drops from three carousels to two, and the footer gains a dedicated closing threshold.

1. Toolkit intro copy is now exactly "The inventory behind the work. Collected through projects, problems, and curiosity." (reflective, broad enough for languages through tools, less defensive than the old line). Wrapping rebalances naturally at the existing measure; no forced breaks.
2. The Security Tooling group is deleted outright. Nmap and Wireshark move into the second group; CrowdStrike Falcon, Veritas, and Beelzebub leave Toolkit (they keep their Experience context, where the professional meaning lives). The second group is renamed from "Frameworks & Platforms" to exactly "Technologies & Tools". Final groups: Languages (10 items, order preserved) and Technologies & Tools (11 items: existing 9 in order, Nmap plus Wireshark appended).
3. Dead data deleted: the `Veritas` glyph entry in `techLogos.ts` (no remaining consumer; Wireshark glyph stays; CrowdStrike Falcon and Beelzebub never had glyphs). Carousel implementation untouched: seamless halves, alternate directions, hover pause, edge fade, reduced-motion static. Eleven items fill one half without doubling, so the second row repeats less by construction.
4. Spacing retune at the source, no hacks: Certifications `pt-[20vh]` to `pt-[14vh]`, so the Toolkit to Certifications breath lands at the standard 28vh chapter rhythm (measured 224px last-row to eyebrow at 1440x900). No residual third-group allocation exists (`space-y` is dynamic). Certifications content, order, URLs, and row styling unchanged; the interaction redesign stays a separate pass.
5. Footer threshold (`FooterThreshold.tsx`, tiny client island like the clock): a centered 80 percent hairline (`bg-ink` at element opacity 0.2, safe against the var-opacity rule) with a small vermilion diamond seated at its middle over a paper knockout. Draws once left to right on entry (1.2s expo, echoing the opening loader in reverse; diamond fades in at 0.55s); static under reduced motion. It sits inside the footer top breath (footer `pt-[14vh]` to `pt-[8vh]`, eyebrow gains `mt-[6vh]`, total unchanged), so it never collides with the Contact eyebrow.
6. Design-system amendment to #45: narrative sections still never use full-width dividers; the footer, as terminal state rather than narrative section, may carry this one deliberate threshold. Internal footer rules (resume strip, credit strip) keep their separate structural roles.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Three marquees read as categories-in-search-of-content; two substantial rows earn the motion. Security vendors belong to the jobs where they were used, while Nmap and Wireshark are genuine general-purpose tools. The footer entered too softly after the divider retirement; an inset line plus diamond says closing chapter without restoring the stacked-slide edge.

**Alternatives Considered:** Merging all tools into one row (rejected: loses the language versus tool distinction the intro sets up); keeping a slimmed Security row with two items (rejected: repeats visibly, the original defect); full-width footer line (rejected: indistinguishable from the retired generic dividers); restoring the old Contact `border-t` (rejected: same reason); endpoint diamond instead of centered (rejected: centered reads as a seal, endpoints read as decoration).

**Impact:** First Load JS unchanged at 163 kB (route chunk 75.4 to 75.6 kB; removed data offsets the threshold island). No new dependencies. Verified 68 DOM/computed-style checks green on the production build across 6 widths, both themes, and reduced motion, plus 4 judged screenshots.

---

### 47. Certifications Compact Disclosure Stack (EXPERIMENTAL polish)

**Decision:** Certifications becomes a quiet four-row editorial disclosure stack. All credentials have equal weight. The row button owns the issuer and credential name, while the existing Verify anchor remains an independent sibling. Only one row opens at a time and the owner-supplied PNG unfolds beneath that same list item.

1. The authoritative order, issuer metadata, verification URLs, and four supplied PNGs remain unchanged. The static image map follows the `systems.ts` order: CompTIA Security+, Google Cybersecurity Professional, IBM Cybersecurity Fundamentals, Cisco Introduction to Cybersecurity.
2. Rows are compact hairline entries with one 8px diamond marker, no featured credential, no separate image card, no overlay, and no added imagery treatment. Expanded images use `next/image`, their natural aspect ratios, blur placeholders, `max-w-[880px]` on desktop, and full available width on mobile.
3. The row button provides native Enter and Space behavior, `aria-expanded`, and `aria-controls`; its labeled region references that button. Verify is independently focusable, opens the existing external URL in a new tab, and cannot toggle or close the row because it is not inside the button.
4. Opening uses a 500ms clipped grid reveal with opacity and an 8px vertical settle. Closing shares the restrained choreography. Reduced motion removes the transition, preserving the same disclosure behavior.
5. The Certifications to Projects breath is retained, except for the chapter's bottom padding reducing from 16vh to 12vh so the compact stack does not create a redundant trailing gap.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Certifications are supporting proof. The closed group reads quickly as one precise ledger, while opening a row makes the evidence available in place without elevating any credential or interrupting the page with a modal.

**Alternatives Considered:** A featured Security+ row (rejected: all four credentials carry equal weight); modal or lightbox viewing (rejected: breaks the reading flow); an FAQ-style accordion with chevrons and rounded panels (rejected: generic UI language); a framed certificate card (rejected: proof should extend the row, not become its own object); a carousel or sticky gallery (rejected: too prominent for supporting evidence).

**Impact:** No dependency added. Certifications remains the existing client island, now justified by local disclosure state in addition to its one-time mask wipe. Final bundle measurement is recorded in PERFORMANCE.md and HANDOFF.md.

---

### 48. Certifications Holder plus Projects Artifact Rebuild (EXPERIMENTAL polish)

**Decision:** Certifications now uses one unified holder for the expanded credential, and Projects now uses the final five owner-supplied project artifacts, content, links, and artwork.

1. Certification heading copy changed to "Learning, with the paperwork to match." with the paperwork phrase in the established serif italic treatment. The supporting line is "Four credentials, collected along the way."
2. The open credential row now becomes the header of a restrained vermilion holder. The expanded region carries a small uppercase Certificate label, a fine vermilion rule, and the real certificate image with `next/image`, preserving natural aspect ratio and equal visual weight across all four credentials.
3. Projects category labels, metric modules, role labels, and fake case-study actions are removed. Final carousel order is Papers by CodeChef, Hawk3ye, HolmesKit, This Site, RT-ENSS.
4. Project cards render authentic owner-provided previews from `src/assets/projects/` with per-image fit and position metadata. Images remain in their native visual identities, with no generated replacement, device mockup, duotone, grayscale lock, glow, or heavy processing.
5. Project actions are truthful only: live links where a distinct deployment exists, GitHub links where supplied, and the non-interactive "YOU'RE ALREADY HERE." location line for This Site.
6. Carousel architecture is preserved: slow automatic movement, drag and swipe, arrows, keyboard controls, pause behavior, and reduced-motion native scrolling. Hover image enhancement is intentionally tiny and disabled while dragging.
7. QA found collapsed certificate proof images could still force horizontal overflow through grid min-content sizing. The holder now uses explicit overflow and min-size guards so closed proofs cannot widen the page.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The certifications needed containment, not a new presentation mode: the row and document should read as one ledger object. Projects needed to stop abstracting the work into categories and instead let the real artifacts carry identity, breadth, and credibility.

**Alternatives Considered:** Beige document frames (rejected: too literal and against the reference intent); modal certificate viewing (rejected: interrupts the page); featured Security+ treatment (rejected: unequal weight); project category labels (rejected: five projects communicate breadth without classification); grayscale-to-color artwork interaction (rejected: the authentic colors are valuable at rest); fake case studies (rejected: only real actions appear).

**Impact:** First Load JS measured at 165 kB after the project artwork and holder pass. No new dependencies. No new animation library. Project SVG motif code was removed from the cards, while static images are optimized through `next/image`.

---

### 49. Projects Link Repair plus Persistent Notes Wall Rebuild (EXPERIMENTAL polish)

**Decision:** The Projects carousel keeps its architecture but restores real anchor activation, and Pieces of Me now ends in a Postgres-backed spatial notes wall.

1. Project links opt out of carousel pointer capture and click suppression through an explicit interactive marker. The carousel still supports card drag and still suppresses accidental link activation after real drags. A centered low-opacity hairline now closes the Projects control row without restoring full-width section dividers.
2. Pieces of Me is reduced to five provisional fragments: Writing, Music, Football, Rabbit Holes, Communities. The selector rebalances as a five-item instrument, with the selected word and micro-subheading interaction preserved.
3. Notes persistence moves from in-memory storage to Postgres through `@neondatabase/serverless`. The schema lives in `db/001_wall_notes.sql`, uses one `wall_notes` table with nullable `parent_id` for one-level replies, visible/hidden moderation state, persisted coordinates, seed rows, and indexes for latest, viewport reads, and replies.
4. Missing `DATABASE_URL` is an explicit API setup state: routes return 503. The visible wall status was later simplified to a plain count in #50. There is no silent memory fallback in production.
5. The wall presentation is rebuilt as one full-bleed spatial field: manifesto, notes, composer, and controls live in the same world. The field keeps normal page scroll, direct panning, keyboard arrow panning, short camera flights for Latest and Random, a viewport-aware Center action, and instant behavior under reduced motion.
6. Seed content is neutral `Guest NN` sample material plus one Shikhar owner note. It is not presented as real testimonials from named people.
7. One-level replies remain implemented because the Postgres model supports them cleanly without deeper nesting or a social-media side panel.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The link bug was interaction arbitration, not missing URLs. The notes wall needed a real durable store and a visual model that belongs to the page rather than a bounded mini-app. Postgres fits the relational data shape and the planned Vercel deployment, while Neon keeps the route-handler integration small.

**Alternatives Considered:** Disabling carousel drag (rejected: loses the intended interaction); fake click handlers for links (rejected: semantic anchors must remain); localStorage or in-memory persistence (rejected: not durable); Redis/KV primary storage (rejected: relational notes and replies fit Postgres better); wheel zoom (rejected: long-scroll page should preserve normal scrolling); deeply nested replies (rejected: outside the portfolio scale).

**Impact:** First Load JS measured at 166 kB. One server-side dependency was added: `@neondatabase/serverless`. Client wall work remains event-gated, with no wheel hijack, no idle wall animation, and a 150-note render cap.

---

### 50. Toolkit Closing Rule, Wall Intro, Contact Threshold Removal (EXPERIMENTAL polish)

**Decision:** Four small visual corrections.

1. Toolkit gets a content-width 1px ink hairline after the Technologies & Tools carousel. It uses element opacity and no diamond, matching the local carousel rhythm without becoming a section divider.
2. The footer threshold line plus centered vermilion diamond is removed. Contact now arrives through whitespace; footer-internal resume and credit rules remain.
3. The Notes Wall manifesto moves out of the transformed coordinate world into a normal wide static section intro above the wall. The dotted field, notes, panning, persistence, replies, placement, and discovery controls remain intact.
4. The visible wall status is simplified to a plain uppercase note count. Database architecture and API error behavior do not change.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The Toolkit instrument needed local closure after the second carousel. The Contact threshold over-explained the footer entrance. The manifesto reads better in the site's section-intro grammar, while the wall can stay focused on interaction.

**Alternatives Considered:** Reusing the old Toolkit border utility (rejected after browser inspection showed the rule was not visible); keeping a footer threshold because #46 allowed it (rejected by owner direction); leaving setup status text for local development (rejected because production persistence is now confirmed).

---

### 51. Notes Wall Width, Inscription, Seed Wipe, and Spacing Tune (EXPERIMENTAL polish)

**Decision:** Follow-up polish after production persistence was confirmed.

1. The Notes Wall manifesto keeps the normal section-intro grammar but uses the full content measure with responsive type, so the first sentence fits on one line at wide desktop widths where space allows.
2. The operational guidance stays exactly "Drag to look around. Leave a note, or just see what people have left behind. Be kind: everything here is public." with line breaks in the rendered inscription. It lives inside the transformed world layer near the initial upper-left view, with stronger emphasis on the first sentence and serif italic emphasis on "Be kind:".
3. Temporary seed/demo notes are removed from `src/content/wall.ts`; `db/001_wall_notes.sql` keeps schema and indexes only and no longer inserts seed rows. This does not delete live visitor notes.
4. Late chapter spacing is tightened selectively: mobile breath is reduced around Experience, Toolkit, Certifications, Projects, and Pieces of Me, while desktop retains the established cinematic rhythm. The Notes Wall to Contact handoff is now short, intentional whitespace rather than a long void.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The live database no longer needs local demo content, and the wall reads better when the manifesto behaves like a major section intro while the guidance feels printed into the field. The spacing tune addresses actual measured dead air instead of applying one global reduction.

**Alternatives Considered:** Keeping seed rows for local demos (rejected now that production has real persistence); anchoring guidance as fixed overlay text (rejected because it should belong to the spatial field); hardcoded line breaks in the manifesto (rejected to preserve responsive typography); globally reducing section padding (rejected because each transition has different content density).

---

### 52. Production Audit and Responsive Polish, Mobile First (EXPERIMENTAL polish)

**Decision:** End-to-end audit pass over the deployed site with the weight on mobile, fixing root causes without touching the desktop identity.

1. Notes Wall manifesto now uses the standard section-intro scale (`text-lede`) at the full content measure, so it reads as a normal major-section intro and its first sentence holds one line at wide desktop widths. The serif italic on `this place` is preserved and no hardcoded breaks were added.
2. The wall guidance keeps its exact meaning but loses the hardcoded line-break orphans. It renders as a fixed ch-measure inscription with pretty wrapping, slightly larger type, and the existing emphasis treatment. Root cause of the mobile one-word column: the inscription lives in a zero-width transformed world layer, so a max-width collapsed under shrink-to-fit; a fixed width removes the dependence.
3. The statements bridge runs a compact cut below sm: 165svh section, 30svh rows, tighter stack travel, lower finale resolve. Desktop phase math, centers, and travel are untouched. Reduced-motion static stack is shared.
4. Project preview letterboxing no longer inverts: the preview surface uses the theme-relative surface matte instead of the inverting ink token, so contained art and fractional drift offsets cannot flash light seams in the dark colorway. Artwork files are untouched.
5. Certification rows stack their Verify and arrow actions below full-width names on small screens, ending text-under-button overlap. The redundant arrow tab stop is removed (pointer affordance kept, keyboard uses the main row button).
6. Dead UI primitives (`Counter`, `CopyText`, `InView`) with zero usages were deleted. First Load JS moved 166 to 165 kB. The remaining overage is documented, not forced.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Each fix targets a measured defect: oversized manifesto type, a zero-width containing block, sparse mobile statement frames, an inverting matte token, a 100px flex squeeze, and shipped dead code. Desktop rendering is preserved by gating every behavior change below sm or behind interaction.

**Alternatives Considered:** One global mobile spacing reduction (rejected: each transition has different density); cover fit for all artwork (rejected: crops authentic artifacts); forcing the 150 kB budget through architectural compromise (rejected: documented instead).

**Impact:** First Load JS 166 to 165 kB (dead primitives removed). No new dependencies. Verified across 1440/1280/1024/820/390/360, both themes, reduced motion, touch, and keyboard, with zero console errors on the production build.

---

### 53. Mobile Stabilization: Carousel Takeover Intent, Unified Toolkit Rules (EXPERIMENTAL polish)

**Decision:** Focused responsive pass over three reported issues plus a regression sweep, changing only what measured broken.

1. Certifications mobile collision: verified already resolved in current source by #52 item 5 (the row toggle takes a full-width first flex line below sm while Verify plus the arrow share a dedicated second row). Re-verified with bounding-box overlap checks at 360/375/390/430/640/820/1024/1440, the open holder at 390, and both themes: zero overlaps, 44px touch targets, one-open-at-a-time intact, proof images uncropped. No new edit; restyling it again would be churn.
2. Projects mobile drift root cause: the drift itself already ran on mobile (measured 40px/s at a 390 viewport), but any pointerdown stopped it permanently, and on touch screens nearly every scroll gesture starts with a pointerdown on the track. Mobile visitors therefore ended the drift before ever seeing it move. Fix: pointerdown only arms the drag; the drift stops solely on genuine takeover intent (accumulated movement past the 6px click-suppression threshold), arrows, or keys. Taps and vertical scroll pass-throughs leave no snap target, so the rest drift resumes cleanly. While dragging, the rAF loop already yields (auto is gated on not dragging), so nothing fights the finger. Verified: incidental click keeps drifting, a 160px drag stops it permanently with a grid settle, links stay real, reduced motion stays a native scroll row.
3. Toolkit closing rule root cause: the two group rules used `border-ink/15 border-t`, which emits no border-color rule against bare `var()` tokens (binding rule from #39), so they rendered the preflight fallback gray at full strength while the closing rule rendered true ink at element opacity 0.15. Measured at 360: fallback `rgb(229, 231, 235)` at opacity 1 versus ink at 0.15, identical widths. Fix unifies all three on the identical standalone `h-px bg-ink opacity-15` hairline (the group rule moves out of the heading wrapper, spacing unchanged). Direction is deliberate: the group rules change toward the closing rule, never the reverse, because the fallback look was a compiler accident, never a token. This also removes the last opacity-modifier utilities in the Toolkit section. No diamond, no animation, carousels untouched. Verified identical computed style (1px, theme ink, 0.15, same width and x) in light and dark at 390 and 1440.
4. Project image seams: the theme-relative preview matte from #52 item 4 verified intact in dark mode (dark surface, no light seams at fractional drift offsets). No new image or container change.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** Each change answers a measured defect with the smallest mechanism: intent threshold instead of press-to-kill, one shared hairline class instead of mixed mechanisms, verification instead of rework where the previous fix holds. Desktop behavior is preserved by construction (same drift, same stop conditions for real input, same grid settle).

**Alternatives Considered:** Per-certification offsets or min-widths (rejected: the flex-line construction already makes overlap impossible); resuming drift on an idle timer after takeover (rejected: breaks the desktop permanent-manual contract); matching the closing rule to the fallback gray (rejected: theme-wrong in dark mode and fragile); cover fit for all artwork (rejected before in #52: crops authentic artifacts).

**Impact:** First Load JS unchanged at 165 kB (route chunk 77.9 kB). No new dependencies. No new client components. Verified 1440/1280/1024/820/390/375/360, light plus dark, reduced-motion emulation, touch-equivalent pointer flows, keyboard, zero horizontal overflow, footer clock ticking, no new console errors (local notes API 503s remain the expected no-DATABASE_URL setup state).

---

### 54. Light-Mode Structural Contrast System (EXPERIMENTAL polish)

**Decision:** Light-mode legibility pass built so dark mode keeps its rendering exactly.

1. Shared root cause: opacity-modifier color utilities do not compile against bare `var()` tokens (binding rule from #39). Measured consequences in the browser: every `bg-ink/xx` renders transparent (the Experience base spine, the hero meta divider, and the hero handoff hairline were invisible in both themes); every `border-ink/yy` and `border-gold/yy` falls back to the preflight gray, which nearly disappears on paper in light while reading as a deliberate light line on charcoal in dark (a large part of why dark felt like the stronger theme).
2. Fix at the correct level: one `lm-*` utility family in `globals.css`, every rule scoped `html:not(.dark)`. Levels: `lm-line` (structural borders, ink 30 percent), `lm-line-soft` (hairlines in whitespace, ink 16 percent), `lm-fill-line` (1px background lines, ink 22 percent), `lm-gold` (emblem rings, gold 65 percent; dashed orbit transparent at rest, gold 45 percent on hover; gold 12 percent hover wash), `lm-hover-accent` (working card hover), `lm-nav` (compact header: hairline border plus 88 percent paper tint over the blur). Dark rendering verified unchanged by computed style (same gray fallbacks, same transparent spine).
3. Section applications: Experience spine base plus diamond borders (prose hover becomes solid `group-hover/role:text-ink`, which also repairs the dead hover in dark); About meta rules to the hairline level; Toolkit rings to real gold; project frames to structural with seams and stack dividers at hairline level plus a working accent hover; footer resume and credit rules to hairline level with DOWNLOAD PDF at structural; compact nav edge plus tint; hero meta divider and handoff line restored.
4. Deliberately untouched: `--muted` (about 4.0 to 1 on paper, the approved secondary voice), the statement serif notes at full ink (intended read), the Opening loader (theme-proof ink field, identical in both themes), the Notes Wall (solid tokens throughout), Certifications (already color-mix), mobile menu dividers (solid ink), placeholder-only `text-muted/60` paths.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** One shared light-only mechanism beats per-section hacks, and light-only scoping beats globally darkening tokens (which would rebuild the approved dark look). Levels mirror the existing editorial grammar: structural borders carry weight, hairlines stay quiet, vermilion stays the only accent.

**Alternatives Considered:** Globally darkening border tokens (rejected: restyles dark without owner review); per-component inline color-mix styles (rejected: repeats identical washes across files, utilities centralize); the channel-variable token migration (rejected in #39: needs its own owner-approved pass); pure-black borders (rejected: kills the paper subtlety); leaving the invisible hero handoff and spine base as-is (rejected: they are choreography, not decoration).

**Impact:** First Load JS unchanged at 165 kB. No new dependencies. CSS only, no new client state. Verified light at 1440/1280/1024/820/430/390/375/360 with judged screenshots (Experience, About, Toolkit, Projects, Contact, hero), dark at 1440/390 with computed-style parity plus a judged Experience screenshot, zero horizontal overflow, no new console errors.

---

### 55. Mobile Responsive System Stabilization (EXPERIMENTAL polish)

**Decision:** Fix the mobile and short-landscape responsive architecture without redesigning desktop.

1. The statements bridge now gates the whole moving stack with the bridge surface opacity. Because the section overlaps the final hero viewport, child rows could previously be present in the lower landing viewport before the sticky bridge had actually begun. The stack opacity prevents BREAK or REBUILD from leaking into first load, while BUILD starts readable as soon as the bridge takes over.
2. Compact statement choreography now applies to both narrow portrait viewports and short landscape viewports. It uses a 155svh bridge, tighter travel, quieter inactive rows, smaller mobile verb type, and a nearly immediate handoff fade. The strongest sampled state progresses BUILD, then BREAK, then REBUILD across 360, 375, 390, 430, 844 by 390, 820, 1024, 1280, and 1440.
3. Short landscape viewports below lg get a separate hero composition: identity left, restrained arch right, compact metadata, hidden scroll cue, and a nav surface. The full desktop nav row starts at lg, so tablet and phone landscape views keep the disclosure menu instead of drawing links across the portrait.
4. Section spacing is tuned by transition for mobile: About, Experience, Toolkit, Certifications, Projects, Pieces of Me, Notes Wall, and Contact lose accidental mobile dead air; md and up keep the existing broader chapter rhythm.

**Status:** EXPERIMENTAL

**Date:** 2026-09-09

**Rationale:** The failure was structural, not only visual. The bridge overlap put later statement rows in the landing viewport, width-only compact logic ignored short-wide screens, and desktop section padding leaked into mobile continuity. The fix uses viewport height and orientation where those are the actual variables.

**Alternatives Considered:** Removing the hero and bridge overlap (rejected: it is the desktop handoff mechanism); reducing every section's padding globally (rejected: each transition has different content density); forcing desktop nav into tablet landscape (rejected: it crosses the hero image and becomes hard to read); adding a new animation dependency (rejected: Motion plus CSS already solve it).

**Impact:** No new dependencies and no new client components. One additional media-query strategy lives in `globals.css`; the bridge reuses its existing Motion progress. Build size unchanged in local checks.

---

### 56. Identity Metadata, Diamond Favicon, Social Preview, Gmail Compose (EXPERIMENTAL polish)

**Decision:** Identity and sharing pass with no visual redesign (the top-left `S. SAHAY` mark is deliberately deferred and untouched).

1. Favicon was the vermilion diamond only (superseded by #57 below: the finalized mark is an ink rounded tile with a large diamond and thin vermilion perimeter on both routes). A matching opaque tile for iOS (`src/app/apple-icon.tsx`: diamond on the ink field) exists because Apple touch icons technically require full-bleed art. No PWA manifest: the site does not need one.
2. Metadata is finalized in `layout.tsx` against the canonical production URL (`https://shikharsahay.vercel.app/` via `metadataBase`): title "Shikhar Sahay | Portfolio", the canonical description everywhere (standard, Open Graph, Twitter), canonical URL, Open Graph site name plus `website` type, and `summary_large_image` Twitter card. Icons and preview images resolve through Next.js file-convention discovery (verified in the built HTML).
3. Social preview is an edge-rendered 1200x630 editorial card (`src/app/opengraph-image.tsx`): paper field, eyebrow tick, giant SHIKHAR SAHAY, serif-italic tagline, metadata line, vermilion diamond. Every string is real site copy; no portrait (keeps the output light and crisp), no fake data. Fonts load as TTF from the Fontsource CDN because satori cannot parse woff2. Both image routes declare `runtime = 'edge'`: the `@vercel/og` node entry crashes at import on Windows dev machines with spaces in the project path (it joins an `import.meta.url` into `fileURLToPath`), while the edge entry renders cleanly and is also the documented serving runtime on Vercel.
4. The primary email action opens Gmail compose (`https://mail.google.com/mail/?view=cm&fs=1&to=sahay.shikhar@gmail.com`, new tab, `noopener noreferrer`) instead of invoking the OS `mailto:` handler. The visible `Email` label is unchanged and no other contact link moves.

**Status:** EXPERIMENTAL

**Date:** 2026-09-10

**Rationale:** Shared links previously resolved to a generic title plus placeholder-era description. The diamond is already the site's mark everywhere (timeline nodes, tagline rule, wordmark separators), so the favicon extends the identity instead of inventing a logo. Gmail compose matches how the owner actually receives mail; `mailto:` on a Windows browser otherwise launches Outlook.

**Alternatives Considered:** Raster PNG favicon set (rejected: vector scales from tab to high-DPI with one file); portrait in the OG card (rejected: heavier output, weaker typography at small sizes); keeping `mailto:` (rejected by owner direction); a PWA manifest with maskable icons (rejected: no install use case); JSON-LD in this pass (left for the QA pass backlog).

**Impact:** First Load JS unchanged at 165 kB (route chunk 78.2 kB). No new dependency (`next/og` ships with Next.js 14). Two on-demand edge routes, zero client JS, no recurring runtime work. Verified: built-HTML meta audit, live 1200x630 and 180x180 renders, Gmail compose opens a new tab with the recipient populated, 1440/390 light plus dark regression clean, no hydration warnings.

---

### 57. Header Identity Lockup plus Finalized Favicon (EXPERIMENTAL polish)

**Decision:** Top-left identity becomes the edition mark `◆ PORTFOLIO / 26`, built natively (accent diamond span plus micro tracked text), keeping the home link, header height, and nav balance. The existing underline mechanism is preserved with identical timing but now lives on the text span through group triggers, so diamond hover and keyboard focus reveal it too (the unfocusable span could never be `:hover` itself). The diamond rotates 45 degrees toward square with a slight scale on hover and springs back on leave; reduced motion cancels the rotation and keeps only the instant underline. Favicon is the finalized geometry on both routes: ink rounded tile, large centered diamond, thin vermilion perimeter (vector `icon.svg`, opaque 180 PNG tile).

**Status:** EXPERIMENTAL

**Date:** 2026-09-10

**Rationale:** The hero owns the personal identity; the header carries edition metadata. Native markup keeps the lockup crisp at every size and theme-following without raster weight. Group triggers fix the real defect QA found (diamond hover and focus showed no underline) without changing the animation character.

**Alternatives Considered:** Placing the reference raster into the nav (rejected: heavier, fixed colors, blurry at small sizes); spinning or looping diamond (rejected: advertises itself); a separate mobile logo (rejected: full lockup fits at 360 with clearance); theme-adaptive favicon tiles (rejected: the dark tile reads on both chromes).

**Impact:** No new dependency, no client JS change (CSS classes only). First Load JS unchanged at 165 kB. Verified 1440/1280/1024/820/430/390/375/360 plus short landscape, both themes, hover/leave/click/focus/touch/reduced motion, favicon routes, zero overflow, no hydration warnings.

---

### 58. Guidance Foreground Patch, Footer Measure, Finalized Favicon Artwork

**Decision:** Three narrow refinements, no redesigns.

1. Notes Wall guidance is now printed on a static foreground patch: the anchored container holds a plain wall-paper backdrop (feathered with its own paper-colored shadow, no card, no border) behind the unchanged copy. The patch is a viewport-positioned sibling above the translated world, so panning notes disappear underneath it. Verified by pixel-decoding screenshots with a probe note parked behind the text (zero bleed pixels) and byte-identical guidance regions before and after a 440px pan. Replaces the transparent anchored text from the previous pass; `placeGuide` JS placement is deleted.
2. Footer contact paragraph keeps its exact copy and typography with the measure widened from 42ch to 64ch, so it resolves into the intended balanced two lines at desktop widths (column-limited, verified 1440/1280/1024) and reflows naturally on mobile. No grid, font, tracking, or line-height change.
3. Favicon supersedes #57 tile geometry: the attached finalized artwork (single glowing vermilion diamond on transparency) ships as a tightly cropped 256px `icon.png` generated from the owner-supplied source, replacing the CSS-recreation `icon.svg` (deleted, so no conflicting definition remains). The Apple touch tile and OG preview are unchanged. Supersedes the #56/#57 diamond-only and tile descriptions as the canonical favicon.

**Status:** EXPERIMENTAL

**Date:** 2026-09-10

**Rationale:** Transparency-only anchoring let world content intersect the guidance; occlusion needs a real surface, and the lightest honest surface is the wall itself. The footer needed measure, not new type. The favicon must be the approved art, not a redraw.

**Alternatives Considered:** Dotted-texture patch (rejected: dot-phase seam against the moving field); glassmorphism or bordered card (rejected: app-widget read); hardcoding footer line breaks (rejected: fragile across widths); multi-size ICO set (rejected: one clean 256 PNG downscales predictably); regenerating the Apple tile from glow art (rejected: edge runtime cannot read local bytes, existing tile stays consistent).

**Impact:** No new dependency, no client JS change. First Load JS unchanged at 165 kB. Verified guidance anchoring plus occlusion, controls/composer/scroll, footer lines, favicon serving plus single-definition metadata, overflow, both themes, no hydration warnings.

---

### 59. Mobile Collision Pass: Wall Foreground Layers, Hero Cue, Compact Statements, Footer Lines (EXPERIMENTAL polish)

**Decision:** Targeted fixes for three phone-screenshot collisions plus one deliberate footer composition, no redesigns.

1. Notes Wall guidance now sits on a foreground surface flush to the viewport left and top edges, with the copy inset (24px mobile, 64px left plus 32px top on sm and up). The previous patch was offset from the edges, leaving a strip where panning notes reappeared left of the copy. The copy is unchanged.
2. Notes Wall controls gain the same treatment below: a full-bleed paper foreground strip flush to the viewport bottom (covering the safe area) sits under the dock, so notes slide underneath instead of colliding with LEAVE A NOTE, LATEST, RANDOM, CENTER, and the count. The dock moves to an inset-x row with safe-area-aware bottom padding, every action keeps a 44px touch target, and thread plus composer sheets use safe-area-aware offsets. Stored positions never change.
3. Hero metadata keeps right clearance below sm while the vertical scroll cue tucks closer to the edge with a shorter line, ending the overlap with SOFTWARE, SECURITY and THE WEB. Desktop and short-landscape behavior untouched (landscape already hides the cue).
4. Statements compact cut tightens for phones: section 140svh, rows 24svh, travel 20vh to minus 14vh, inactive opacity 0.08 to 0.14, so BUILD, BREAK, REBUILD read as one continuous sequence instead of three disconnected screens. Desktop travel, centers, and reduced-motion branches untouched; short-landscape override follows the compact height.
5. Projects control row wraps (hint flexes, arrows keep 44px targets) so the hint line and arrows cannot squeeze at 360px.
6. Footer contact paragraph resolves to the approved desktop two lines via a desktop-only break after unreasonable, with a 52ch measure; mobile wraps naturally. Copy and colophon unchanged.

**Status:** EXPERIMENTAL

**Date:** 2026-09-10

**Rationale:** Each fix extends an existing mechanism (foreground occlusion surfaces, compact choreography cut, measure plus break) instead of inventing new UI. Occlusion beats repositioning for the wall because note coordinates are real persisted data.

**Alternatives Considered:** Padding-only guidance shift (rejected: leaves the reappearance strip); pushing notes to new coordinates (rejected: mutates real positions); removing the hero cue on mobile (rejected: repositioning solves it); global section-height cuts (rejected: per-transition density differs); forcing the 150 kB budget now (rejected: documented, needs its own pass).

**Impact:** First Load JS 165 to 166 kB (route chunk 78.2 to 78.4 kB, markup only). No new dependencies. Verified production build, production-server smoke (200 with guidance, footer, colophon, cue strings), typecheck, lint, format, zero em dashes.

---

### 60. Certifications Stable Rows (EXPERIMENTAL polish)

**Decision:** Delete the progressive row reveal. Each credential row used a scroll-driven mask wipe (`whileInView` clip-path with an index stagger) that caused occasional visual glitches. All four rows now render as plain list items on first paint. Order, typography, layout, hairlines, Verify links, expand behavior, one-open rule, images, copy, themes, and mobile stacking are untouched, and no replacement animation was added. The expansion transitions keep their existing reduced-motion branches.

**Status:** EXPERIMENTAL

**Date:** 2026-09-11

**Rationale:** A credential ledger should feel calm and reliable; staggered entrances added instability without meaning.

**Alternatives Considered:** A subtler entrance (rejected: any scroll-linked entrance keeps the glitch surface); a section-level fade (rejected: unnecessary, default to simplicity).

**Impact:** Removed the `motion` import, the shared `ease` tuple, and the per-row viewport reveal from `Certifications.tsx`. Route chunk 78.4 to 78.3 kB, First Load JS unchanged at 166 kB. Verified production build plus production-server smoke (all four names and toggles present in SSR HTML, no clip remnants), typecheck, lint, format on the touched file.

---

### 61. Pieces of Me Literature Archive (EXPERIMENTAL polish)

**Decision:** Pieces of Me opens with no fragment selected: eyebrow, lede, and five click-only selectors. Clicking Literature opens an editorial stage below the row: story column (identity, micro, weighted opening, three paragraphs with the purest-expression sentence in semibold ink plus vermilion underline) beside two fixed warm-paper article sheets (serif titles, category micro, teasers, whole-sheet READ links to the real essay URLs, static tilt with CSS-only straighten and lift on hover), with a four-record FROM THE ARCHIVES strip beneath (native touch scroll plus snap and arrows below lg, plain grid on desktop). Other fragments keep their selectors and render an identity-plus-voice teaser until their stages are supplied. No entrance choreography, no observers, no loops, no new assets.

**Status:** EXPERIMENTAL

**Date:** 2026-09-11

**Rationale:** The default-selected giant word gave every fragment the same display whether or not it had content; per-fragment stages let Literature carry a real archive while later fragments take their own shapes. Hover-to-select was removed because it fought the click-to-open model.

**Alternatives Considered:** Keeping hover selection (rejected: opens stages the visitor did not ask for); raster book artwork (rejected: weight and fragility, CSS layering carries the archive feel); a carousel dependency for archives (rejected: native overflow plus snap suffices); forcing all fragments into the Literature layout (rejected: brief requires independent stages).

**Impact:** Content and stage live in `personality.ts` plus `Personality.tsx` (still one client island, no Motion used). Route chunk 78.3 to 80.4 kB, First Load JS 166 to 168 kB (copy and markup only). Verified production build plus production-server smoke, typecheck, lint, format on touched files, banned-phrase and em-dash audits clean.
