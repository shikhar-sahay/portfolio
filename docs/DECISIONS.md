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
