# ROADMAP.md

> **Status Legend:** `NOT_STARTED` | `IN_PROGRESS` | `COMPLETED` | `BLOCKED`

---

## Milestone Overview

| #   | Milestone                               | Focus                                  | Status                                                                 |
| --- | --------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| 0   | Documentation & Project Foundation      | Docs, repo setup, config               | **COMPLETED**                                                          |
| 1   | Entrance + Hero                         | Arrival experience, hero section       | **COMPLETED** (implementation; copy provisional, owner review pending) |
| 2   | Navigation + Scroll Architecture        | Nav, smooth scroll, section structure  | **COMPLETED** (native scroll, sticky scenes; no Lenis by decision)     |
| 3   | Selected Projects                       | Work showcase, project artifacts       | **COMPLETED** (5 artifacts; real links pending)                        |
| 4   | Experience / Journey                    | Timeline, career/education narrative   | **COMPLETED** (org timeline; Skilledity dates pending)                 |
| 5   | Personality / Human Layer               | Interests, writing, human touches      | **COMPLETED** (fragment instrument; no backend by decision)            |
| 6   | Signature Interactive Experience        | The "holy shit" moment                 | NOT_STARTED (open ideation)                                            |
| 7   | Final Polish                            | Micro-interactions, content refinement | **COMPLETED** (passes v4.2-v4.5; copy approval pending)                |
| 8   | Performance, Accessibility & Deployment | Audits, optimization, launch           | NOT_STARTED                                                            |

> **IA note (2026-08-23, v4):** The narrative order is now 01 Identity, 02 About, 03 Experience, 04 Skills, 05 Projects, 06 Personality, 07 Contact + Footer (Experience before Skills before Projects, owner-directed). The registry in `src/content/sections.ts` is the IA source of truth. The original milestone numbering above is retained for history; implementation now follows the v4 order.
>
> **IA note (2026-09-07, v5.0):** Toolkit is now one navigational destination spanning Skills and the Certifications ledger; Personality is user-facing Pieces of Me. Nav: About, Experience, Toolkit, Projects, Pieces of Me, Contact (see DECISIONS.md #39).

---

## MILESTONE 0 - Documentation & Project Foundation

**Goal:** Establish persistent documentation, repo structure, and tooling config.

### Tasks

- [x] Create `CLAUDE.md` - Permanent session instructions
- [x] Create `docs/PROJECT_CONTEXT.md` - Person, purpose, creative direction
- [x] Create `docs/DESIGN_SYSTEM.md` - Typography, color, spacing, visual decisions
- [x] Create `docs/ARCHITECTURE.md` - Framework, structure, rendering, components
- [x] Create `docs/ROADMAP.md` - This file
- [x] Create `docs/DECISIONS.md` - Decision log
- [x] Create `docs/ANIMATION.md` - Motion philosophy
- [x] Create `docs/CONTENT.md` - Content source of truth
- [x] Create `docs/PERFORMANCE.md` - Performance principles
- [x] Create `docs/HANDOFF.md` - Session-to-session state
- [x] Create `docs/AGENTS.md` - Multi-agent guidelines
- [x] Initialize git repository (already done)
- [x] Add `.gitignore` for Node/Next.js
- [x] Decide on package manager (pnpm recommended)
- [x] Initialize `package.json` with minimal deps
- [x] Set up TypeScript config
- [x] Set up Tailwind config
- [x] Set up ESLint + Prettier
- [ ] Set up Husky + lint-staged (deferred)
- [x] Create basic folder structure per `ARCHITECTURE.md`
- [x] Add content to `README.md`

### Exit Criteria

- All 11 documentation files exist and are coherent
- Repo has basic tooling config
- `npm install` / `pnpm install` works
- `npm run dev` / `pnpm dev` starts a dev server (even if empty)

**All exit criteria met as of 2026-08-17.**

---

## MILESTONE 1 - Entrance + Hero

**Goal:** The arrival experience - first impression, hero section, portrait.

### Tasks

- [x] Hero typography and layout (editorial arch + oversized two-line name)
- [x] Hero copy from owner material (statement + lede; provisional until approved)
- [x] Hero portrait (`src/assets/shikhar-hero.jpg`, static import, blur placeholder)
- [x] Hero component (client: parallax, letter springs, scene change)
- [x] Entrance animation (CSS keyframes + session loader; pre-hydration safe)
- [x] Mobile hero (stacked, art-directed; no horizontal overflow)
- [x] Scroll invitation cue
- [x] Reduced-motion variant (static, never pinned)

### Design Decisions Needed

- Hero layout: centered? asymmetrical? split?
- Typography: display font, size, weight, line height
- Portrait treatment: shape, size, framing, animation
- Copy: exact wording for "striking statement"
- Entrance animation: fade/slide/scale? duration? stagger?

### Exit Criteria

- Hero renders correctly in light/dark mode
- Entrance animation feels premium, not generic
- Portrait loads fast (optimized, proper formats)
- Mobile experience is first-class
- Reduced motion works

---

## MILESTONE 2 - Navigation + Scroll Architecture

**Goal:** Cohesive navigation and the long-scroll backbone.

### Tasks

- [x] Navigation (fixed header: transparent to compact, tuck/reveal, active section, theme toggle)
- [x] Smooth scroll: native (Lenis rejected, no justification found)
- [x] Section structure (semantic landmarks, registry-driven order)
- [x] Scroll progress indicator (accent hairline)
- [x] Scroll-driven animation foundation (one progress per scene, ranges end at 1.0)
- [x] Keyboard navigation (focusable controls, carousel arrow keys)
- [x] Mobile nav pattern (quiet row, no hamburger needed)

### Design Decisions Needed (resolved during implementation)

- Nav: fixed, transparent to compact with tuck/reveal (done)
- Nav content: wordmark, section links, theme toggle, progress hairline (done)
- Scroll behavior: native scroll + sticky scenes, no snap, no Lenis (done)
- Section height: full-viewport pinned scenes for the opening, content-driven elsewhere (done)
- Scroll progress: accent hairline at the very top (done)

### Exit Criteria

- Smooth, performant scrolling on desktop and mobile
- Nav is accessible (keyboard, screen reader)
- Sections are semantically structured
- Foundation ready for scroll-driven section animations

---

## MILESTONE 3 - Selected Projects

**Goal:** Showcase work - the portfolio core.

### Tasks

- [x] Project data structure (`src/content/projects.ts`: kind, name, role, stack, metrics, links, visual key)
- [x] Populated with 5 artifacts (3 real, honeypot, this site)
- [x] Infinite drifting carousel (drag/swipe/arrows/keyboard, grid-exact wrap)
- [ ] Project detail views (decided: details live in the resume; no modals)
- [x] SVG preview motifs (resolution-independent, no image cost)
- [ ] No filter/tag system (decided: unnecessary at 5 items)
- [x] Mobile touch/swipe works for carousel

### Design Decisions Needed

- Layout: grid? masonry? horizontal scroll? cards?
- Interaction: hover reveal? click to expand? modal?
- Image treatment: aspect ratio, cropping, captions
- Tag/category system: needed? how displayed?
- Featured vs regular projects: visual distinction?

### Exit Criteria

- All selected projects displayed with correct data
- Images load fast, look sharp
- Interaction feels smooth and intentional
- Mobile experience is excellent (swipe, touch targets)

---

## MILESTONE 4 - Experience / Journey

**Goal:** Narrative timeline of career, education, key moments.

### Tasks

- [x] Experience data structure (org-grouped roles in `src/content/experience.ts`)
- [x] Populated in owner-mandated order (Skilledity dates still unsupplied)
- [x] Vertical timeline with centered spine, scroll-drawn accent fill, diamond markers
- [ ] Expandable detail per entry (decided: full detail lives in the resume)
- [x] Visual distinction via org grouping and role progression dividers

### Design Decisions Needed

- Timeline orientation: vertical (scroll) or horizontal (scrub)?
- Visual style: line + dots? cards on alternating sides? minimal?
- Animation: stagger on scroll? progress line fill?
- Density: compact or spacious?

### Exit Criteria

- Timeline renders all experience entries
- Scroll-driven animation feels natural
- Expandable details work on mobile
- Visual hierarchy clear (most recent/most important prominent)

---

## MILESTONE 5 - Personality / Human Layer

**Goal:** Human touches - interests, writing, values - without forcing them.

### Tasks

- [x] Curated content (8 fragments with voice captions in `src/content/personality.ts`)
- [x] Fragment instrument section (inverted panel, not a hobbies list)
- [x] Hover, focus, click/tap micro-interactions (keyboard accessible, aria-live)

### Design Decisions Needed

- Format: separate section? woven throughout? footer Easter egg?
- Visual treatment: how distinct from "professional" sections?
- Content selection: what to include, what to exclude
- Tone: playful? sincere? understated?

### Exit Criteria

- Personality content feels authentic and integrated
- Doesn't feel like a "hobbies section"
- Maintains overall visual cohesion

---

## MILESTONE 6 - Signature Interactive Experience

**Goal:** The "holy shit" moment - a memorable, technically impressive interaction.

### Tasks

- [ ] Ideate concepts (3D? generative? scroll-narrative? input-driven?)
- [ ] Prototype 2-3 concepts (low fidelity)
- [ ] Select one based on: impact, performance, feasibility, uniqueness
- [ ] Build production version
- [ ] Optimize bundle size (lazy load, code split)
- [ ] Test across devices/browsers
- [ ] Add reduced-motion fallback

### Design Decisions Needed

- **Concept:** What is the experience? (Keep open - explore in milestone)
- Technology: Three.js/R3F? Canvas 2D? CSS/SVG? GSAP?
- Trigger: scroll? mouse/touch? time? input?
- Duration: how long does it last?
- Placement: dedicated section? woven into hero? end of journey?

### Constraints (FINALIZED)

- Must be performant (lazy-loaded, not on initial bundle)
- Must have reduced-motion equivalent
- Must work on mobile (touch-adapted)
- Must not feel like a "tech demo" - serves the narrative

### Exit Criteria

- Experience is memorable and unique
- Performance budget met (see `PERFORMANCE.md`)
- Graceful degradation for reduced motion / low-end devices
- Feels integrated, not bolted on

---

## MILESTONE 7 - Final Polish

**Goal:** Micro-interactions, content refinement, cross-browser, edge cases.

### Tasks

- [x] Audit micro-interactions across passes v4.2-v4.9 (hover, focus, tap, scroll, drag)
- [ ] Copy approval (provisional copy throughout; owner decision)
- [ ] Cross-browser testing (Chromium verified; Firefox, Safari, Edge open)
- [ ] Real-device testing (open)
- [x] No layout shift sources found (fixed display sizes, blur placeholder, uniform slots)
- [x] Loading states (blur placeholder, carousel skeleton, session loader)
- [x] Real owner links wired (email, socials, Drive resume, cert verifications, real resume PDF; project URLs still pending)
- [x] SEO metadata basic set (title, description, OG/Twitter cards, robots) + favicon
- [ ] OG image, JSON-LD, custom 404, print stylesheet (open)

### Exit Criteria

- No visible jank, layout shift, or broken interactions
- Content is polished and error-free
- Works across target browsers/devices
- SEO/social sharing ready

---

## MILESTONE 8 - Performance, Accessibility & Deployment

**Goal:** Ship it - fast, accessible, deployed.

### Tasks

- [ ] Lighthouse audit (target: 90+ all categories)
- [ ] Core Web Vitals measurement (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [ ] Bundle size analysis (target: < 150KB JS gzipped initial)
- [ ] Accessibility audit (axe, manual keyboard/screen reader)
- [ ] Fix all a11y violations (WCAG 2.1 AA)
- [ ] Configure Vercel (or chosen platform)
- [ ] Set up preview deployments
- [ ] Configure custom domain
- [ ] Add analytics (privacy-friendly)
- [ ] Final performance budget sign-off
- [ ] Deploy to production

### Performance Budgets (FINALIZED - Targets)

| Metric                   | Target                            |
| ------------------------ | --------------------------------- |
| LCP                      | < 2.5s                            |
| CLS                      | < 0.1                             |
| INP                      | < 200ms                           |
| Initial JS (gzipped)     | < 150KB                           |
| Total page weight        | < 500KB (excluding hero portrait) |
| Lighthouse Performance   | ≥ 90                              |
| Lighthouse Accessibility | ≥ 95                              |

### Exit Criteria

- All performance budgets met
- Accessibility audit passes
- Deployed to production domain
- Analytics functioning
- Monitoring in place

---

## Proposed Backlog (UNDECIDED, feedback only, NOT implemented)

Studied 2026-09-06 against the current build. No code, no copy, no assets committed for any of these. Owner decides; implementation would follow the usual DECISIONS.md proposal path.

- [ ] **Experience imagery:** one image per org on the timeline side opposite its text (image or org name hyperlinked). Needs art direction: photo vs logo vs contextual image, size/crop, alternation discipline, mobile stacking, busyness risk. Recommendation pending owner review of options.
- [ ] **Merge Security Tools into Frameworks:** the Security Tooling row is thin; merging would improve density and rhythm but weakens taxonomy and the security-credibility signal. Category labels could survive as micro tags. Recommendation pending owner review of options.
- [x] **Certification prominence:** IMPLEMENTED v4.9 as the credential-ledger direction (own chapter, hairline rows, featured first credential, boxed Verify links, mask-wipe progression).
- [ ] **Opening interaction:** something interactive during the ~1.6s initialization that is not a fake loader (must stay session-aware, reduced-motion-safe, and hand into the hero). Recommendation pending owner review of options.
- [ ] **Pieces of Me detail stories:** clicking a fragment reveals an owner-supplied story below the chooser and above the wall (replace vs accumulate, transition, height, keyboard, deep-linking open). Owner supplies all text; nothing invented. Recommendation pending owner review of options.

## Dependency Graph

```
M0 (Foundation)
  ├── M1 (Hero) ─────────────────────┐
  ├── M2 (Nav + Scroll) ─────────────┤
  │                                  ├── M3 (Projects)
  │                                  ├── M4 (Experience)
  │                                  ├── M5 (Personality)
  │                                  └── M6 (Signature Experience)
  │                                        │
  └────────────────────────────────────────┘
                          │
                          ▼
                      M7 (Polish)
                          │
                          ▼
                      M8 (Ship)
```

**Parallelizable:** M1, M2 can start together after M0. M3-M6 can be developed in parallel once M2 provides scroll architecture.

---

## Notes

- Milestones are sequential in dependency but overlapping in execution
- Each milestone should update `HANDOFF.md` with current state
- Design decisions made during a milestone should be marked `FINALIZED` in `DESIGN_SYSTEM.md` and logged in `DECISIONS.md`
- If a milestone reveals a need to revisit earlier decisions, document in `DECISIONS.md` and update affected docs
