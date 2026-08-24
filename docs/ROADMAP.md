# ROADMAP.md

> **Status Legend:** `NOT_STARTED` | `IN_PROGRESS` | `COMPLETED` | `BLOCKED`

---

## Milestone Overview

| #   | Milestone                               | Focus                                  | Status                                                                               |
| --- | --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| 0   | Documentation & Project Foundation      | Docs, repo setup, config               | **COMPLETED**                                                                        |
| 1   | Entrance + Hero                         | Arrival experience, hero section       | **IN_PROGRESS** (v4 opening + portrait instrument implemented, owner review pending) |
| 2   | Navigation + Scroll Architecture        | Nav, smooth scroll, section structure  | **IN_PROGRESS** (navigation instrument, section anchors, IA registry done)           |
| 3   | Selected Projects                       | Work showcase, project artifacts       | **IN_PROGRESS** (artifact treatments implemented, links pending)                     |
| 4   | Experience / Journey                    | Timeline, career/education narrative   | **IN_PROGRESS** (era chronology implemented, copy pending approval)                  |
| 5   | Personality / Human Layer               | Interests, writing, human touches      | **IN_PROGRESS** (fragment instrument implemented)                                    |
| 6   | Signature Interactive Experience        | The "holy shit" moment                 | NOT_STARTED                                                                          |
| 7   | Final Polish                            | Micro-interactions, content refinement | NOT_STARTED                                                                          |
| 8   | Performance, Accessibility & Deployment | Audits, optimization, launch           | NOT_STARTED                                                                          |

> **IA note (2026-08-23, v4):** The narrative order is now 01 Identity, 02 About, 03 Experience, 04 Skills, 05 Projects, 06 Personality, 07 Contact + Footer (Experience before Skills before Projects, owner-directed). The registry in `src/content/sections.ts` is the IA source of truth. The original milestone numbering above is retained for history; implementation now follows the v4 order.

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

- [ ] Finalize hero typography and layout (editorial, distinctive)
- [ ] Finalize hero copy (name, striking statement, role indication, invitation)
- [ ] Add hero portrait (`public/images/shikhar-hero.jpg`)
- [ ] Implement hero component (Server Component)
- [ ] Implement entrance animation (page load → hero reveal)
- [ ] Ensure hero works on mobile (portrait orientation, touch)
- [ ] Add scroll indicator / invitation to continue
- [ ] Test reduced-motion variant

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

- [ ] Design navigation (minimal, contextual, not sticky by default?)
- [ ] Implement header/nav component
- [ ] Decide on smooth scroll: native vs Lenis
- [ ] Implement section structure (semantic HTML, landmarks)
- [ ] Add scroll progress indicator (if desired)
- [ ] Implement scroll-driven animations foundation
- [ ] Ensure keyboard navigation works
- [ ] Mobile nav pattern (hamburger? bottom bar? none?)

### Design Decisions Needed

- Nav position: fixed? absolute? scroll-aware?
- Nav content: logo/name? links? theme toggle? scroll progress?
- Scroll behavior: native CSS scroll-snap? Lenis? GSAP ScrollTrigger?
- Section height: full viewport? content-driven? mix?
- Scroll progress: visual style? position?

### Exit Criteria

- Smooth, performant scrolling on desktop and mobile
- Nav is accessible (keyboard, screen reader)
- Sections are semantically structured
- Foundation ready for scroll-driven section animations

---

## MILESTONE 3 - Selected Projects

**Goal:** Showcase work - the portfolio core.

### Tasks

- [ ] Finalize project data structure (title, description, role, tech, links, images, featured flag)
- [ ] Populate `CONTENT.md` / data file with actual projects
- [ ] Design project card / showcase component
- [ ] Implement project grid / carousel / list
- [ ] Add project detail view (modal? separate page? inline expand?)
- [ ] Implement project images (optimized, lazy, blur placeholder)
- [ ] Add filter/tag system if multiple categories
- [ ] Ensure mobile touch/swipe works for carousel

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

- [ ] Finalize experience data structure (role, org, dates, description, highlights, type)
- [ ] Populate experience data
- [ ] Design timeline component (vertical? horizontal? interactive?)
- [ ] Implement timeline with scroll-driven reveal
- [ ] Add expandable detail for each entry
- [ ] Consider visual distinction: work vs education vs side projects

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

- [ ] Curate content: writing links, music, football, theatre, etc.
- [ ] Design personality section (not a "hobbies list")
- [ ] Implement component(s) - could be integrated or separate
- [ ] Ensure it feels editorial, not tacked on
- [ ] Add micro-interactions (hover, click)

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

- [ ] Audit all micro-interactions (hover, focus, tap, scroll)
- [ ] Refine copy across all sections
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Chrome Android)
- [ ] Fix layout shift / CLS issues
- [ ] Polish loading states (skeletons, blur placeholders)
- [ ] Verify all links work
- [ ] SEO metadata complete (Open Graph, Twitter, JSON-LD)
- [ ] Favicon / app icons
- [ ] 404 page (if multi-page)
- [ ] Print stylesheet (optional)

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
