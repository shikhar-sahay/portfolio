# HANDOFF.md

> **CRITICAL:** Every session MUST read this file first, then update it at the end of their work.
> This is the single source of truth for session-to-session continuity.

---

## CURRENT STATE

**Milestone:** 1-2 (v4 opening redesign + IA foundation), spanning ROADMAP M1/M2 scope
**Status:** IMPLEMENTED and browser-validated; awaiting owner review
**Last Updated:** 2026-08-24
**Last Session:** Major visual redesign of the opening experience, portrait treatment, hero scroll transition, and information architecture; canonical `AGENTS.md` established

### What Exists

**Canonical agent instructions:**

- Root `AGENTS.md` is the single canonical instruction file (purpose, visual direction, constraints, animation philosophy, IA, performance, copy rules, documentation protocol). `CLAUDE.md` is a pointer to it. `docs/AGENTS.md` extends it with multi-agent protocol.

**Opening experience (v4):**

- Title sequence: ink field, "SHIKHAR" solid + "SAHAY" outline mask-rises, indices tick 01 to 07 along a vermilion signal line with a serif counter, field lifts at 1.5s (800ms ease-expo), unmounts at 2.3s
- Pre-paint head script sets `html[data-intro]` and `--intro-delay`: returning visitors and reduced-motion users get `data-intro="skip"` (overlay display:none before hydration, no flash) and `--intro-delay: 0s`
- Hero entrance delays stack on `--intro-delay`, so the hero boots as the field lifts

**Hero (01 Identity):**

- Portrait is now an INSTRUMENT: circular aperture (face centered, `object-position: center 24%`) inside a technical ring system drawn as one SVG: outer hairline orbit (stroke-draws on boot), dashed ring rotating 90s cw, 12 tick marks, vermilion arc rotating 26s ccw, coordinate labels (`11.94 N, 79.16 E` / name) on the orbit
- Pointer parallax (fine pointers, reduced-motion-gated): crop drifts up to 9px toward cursor, rings up to 6px against it, spring-smoothed
- Composition: eyebrow `( 01 ) Portfolio, 2026`, giant name (solid + outline, overlapping the instrument edge), statement, compact context row (CS @ VIT Vellore / software, security & the web / coordinates)
- Scroll transition: NO face zoom (rejected). Scene change over a 150svh pinned stage: name layers separate (up-left / down-right) and fade, instrument exits laterally (x 22vw, scale 0.72), a hairline draws as the handoff into About

**Narrative sections (v4 IA, registry in `src/content/sections.ts`):**

- 01 Identity, 02 About (statement, meta, sticky editorial index), 03 Experience (era chronology), 04 Skills (inventory + CGPA + credentials), 05 Projects (three artifacts), 06 Personality (fragment instrument, inverted panel), 07 Contact + Footer (resume artifact moment + ending callback)
- Components renamed to match IA: `About.tsx`, `Skills.tsx`, `Projects.tsx`, `Personality.tsx`; Resume folded into Contact

**Atmosphere:** static film grain + `.atmosphere` fixed light field (two radial gradients, ~5-7% opacity, 80s transform drift)

**Navigation instrument:** progress hairline, live `NN / 07 Name` readout, difference-blend white links, hidden wordmark on mobile, fades during hero, returns after

### What Does NOT Exist Yet

- Real destinations: email, GitHub, LinkedIn URLs, project links, real resume PDF (owner must supply)
- Deep About content (kept compact per scope), case studies, footer beyond Contact
- CI/CD, Husky, Lighthouse measurement, real-device testing
- Final copy approval

---

## RECENT CHANGES

| Date       | Session      | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-23 | Long-form v3 | Content modules, 7 sections, opening v3, nav instrument (see DECISIONS #25-27)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-08-24 | v4 redesign  | Canonical root `AGENTS.md` (CLAUDE.md now a pointer); opening v4 (ink field title sequence, pre-paint intro gating); portrait instrument (circular aperture + ring system + pointer parallax); face zoom REMOVED, replaced by lateral scene change; hero shortened to 150svh; IA reordered (Experience before Skills before Projects) with sections registry + component renames; Resume folded into Contact; `.atmosphere` light field; docs updated (DECISIONS #28, DESIGN_SYSTEM, ANIMATION v4, CONTENT, ROADMAP, README) |

---

## CURRENT MILESTONE

**v4 opening redesign + IA foundation** - **IMPLEMENTED, REVIEW PENDING**

### Completed

- [x] Full-screen opening sequence (cinematic, session-gated, reduced-motion skip, pre-paint gating, no layout shift)
- [x] Portrait as visual object (instrument treatment, recognizable face at all viewports)
- [x] Face-zoom scroll removed; scene-change transition implemented
- [x] New IA established (registry, anchors, nav behavior, hero-to-About transition)
- [x] Compact personal context in the landing composition
- [x] Atmosphere system (grain + light field)
- [x] Micro-interactions capped at: pointer parallax, ring rotation, nav readout/progress, index hover notes, fragment swap, underline hovers
- [x] Validation: 16 screenshots across 4 viewports, dark, reduced motion, returning visitor, overflow checks

### Remaining

- [ ] Owner review of v4 direction
- [ ] Real links + real resume PDF
- [ ] Copy approval
- [ ] Depth passes on About/Experience/Skills/Projects/Personality per subsequent milestones
- [ ] Real-device check, Lighthouse (M8)

---

## DECISIONS MADE (This Session)

See `DECISIONS.md` #28 (EXPERIMENTAL):

1. **Opening v4 title sequence** with pre-paint `data-intro`/`--intro-delay` synchronization
2. **Portrait instrument** (circular aperture + ring system + pointer parallax)
3. **Face zoom rejected and removed**; scene-change transition (layers separate, lateral instrument exit, hairline handoff)
4. **IA reorder** (01 Identity, 02 About, 03 Experience, 04 Skills, 05 Projects, 06 Personality, 07 Contact + Footer; Resume folded into 07)
5. **Canonical root `AGENTS.md`** created; `CLAUDE.md` is a pointer; `docs/AGENTS.md` is protocol detail

---

## KNOWN ISSUES

| Issue                                                 | Severity | Notes                                                                                     |
| ----------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| Placeholder links (email, GitHub, LinkedIn, projects) | High     | Replace before any public sharing                                                         |
| `public/resume.pdf` placeholder                       | High     | Owner PDF could not be read by the agent; drop real file in place                         |
| First Load JS ~147 kB of 150 kB budget                | Medium   | No headroom for new client JS without audit                                               |
| First image request can be slow on cold start         | Low      | squoosh fallback without sharp locally; Vercel uses sharp. Warm-up observed in validation |
| Copy provisional throughout                           | Medium   | Owner-supplied facts, unapproved wording                                                  |
| Ring/parallax constants hand-tuned                    | Low      | Re-tune if instrument size changes                                                        |
| Reduced motion verified via emulation                 | Low      | Human check recommended                                                                   |
| `sharp` warning at build                              | Low      | Vercel provides sharp; revisit if self-hosting                                            |

---

## NEXT STEPS

### Immediate

1. Owner review of v4 (opening, instrument, scene change, IA) at desktop + mobile, light + dark
2. Supply real links and the real resume PDF
3. Copy approval pass
4. Then depth passes in v4 order: About depth, Experience depth, Skills, Projects, Personality

---

## FILES TO KNOW

| File                                      | Purpose                                                   | Status          |
| ----------------------------------------- | --------------------------------------------------------- | --------------- |
| `AGENTS.md`                               | CANONICAL agent instructions                              | New (canonical) |
| `CLAUDE.md`                               | Pointer to AGENTS.md                                      | Rewritten       |
| `docs/HANDOFF.md`                         | This file                                                 | Current         |
| `docs/DESIGN_SYSTEM.md`                   | Tokens, motifs, portrait instrument                       | Updated         |
| `docs/ANIMATION.md`                       | Motion language, opening v4, scene change                 | Updated         |
| `docs/DECISIONS.md`                       | #28 added                                                 | Updated         |
| `docs/CONTENT.md`                         | Content model + v4 IA                                     | Updated         |
| `docs/ROADMAP.md`                         | Milestone statuses + IA note                              | Updated         |
| `src/content/sections.ts`                 | IA registry (drives nav/opening/index)                    | Updated         |
| `src/components/layout/Opening.tsx`       | Title sequence v4 (client)                                | Rewritten       |
| `src/components/layout/SiteNav.tsx`       | Navigation instrument (client)                            | Revised         |
| `src/components/sections/Hero.tsx`        | Identity: instrument + scene change (client)              | Rewritten       |
| `src/components/sections/About.tsx`       | 02 (renamed from Intro.tsx)                               | Renamed         |
| `src/components/sections/Experience.tsx`  | 03 (unchanged)                                            | -               |
| `src/components/sections/Skills.tsx`      | 04 (renamed from Systems.tsx)                             | Renamed         |
| `src/components/sections/Projects.tsx`    | 05 (renamed from Work.tsx)                                | Renamed         |
| `src/components/sections/Personality.tsx` | 06 (renamed from Outside.tsx)                             | Renamed         |
| `src/components/sections/Contact.tsx`     | 07 + resume artifact moment (server)                      | Extended        |
| `src/components/sections/Resume.tsx`      | REMOVED (folded into Contact)                             | Deleted         |
| `src/app/globals.css`                     | Tokens, intro-delay choreography, ring styles, atmosphere | Rewritten       |
| `src/app/layout.tsx`                      | Pre-paint theme + intro-mode script                       | Updated         |

**Client components (deliberate):** Opening, SiteNav, ThemeToggle, Hero, About, Experience, Personality, Reveal, Counter, InView. Server: Skills, Projects, Contact, page shell.

---

## TESTING STATUS

| Test                | Status                 | Notes                                                                                                                      |
| ------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`    | Pass                   |                                                                                                                            |
| `pnpm lint`         | Pass                   |                                                                                                                            |
| `pnpm format:check` | Pass                   |                                                                                                                            |
| `pnpm build`        | Pass                   | Static; `/` = 59.6 kB page, First Load JS ~147 kB (budget 150)                                                             |
| Browser validation  | Performed              | Playwright-core + system Chrome against prod build                                                                         |
| Screenshots         | 16                     | Opening early/mid/late, hero settled, transition mid/end, About, mobile opening/hero, laptop, tablet, dark, reduced motion |
| Viewports           | 4                      | 1440x900, 1024x768, 768x1024, 390x844                                                                                      |
| Overflow-x          | 0 px                   | All four widths                                                                                                            |
| Opening gating      | Verified               | Reduced motion: overlay absent (`data-intro="skip"`); returning visitor: display none                                      |
| Face zoom removed   | Verified               | Transition screenshots show lateral scene change, no scaling into face                                                     |
| Nav readout         | Verified               | "02 / 07 About" at #about                                                                                                  |
| Dark mode           | Verified               | Hero + Contact                                                                                                             |
| Reduced motion      | Verified via emulation | Hero complete, no overlay, no parallax                                                                                     |
| Keyboard navigation | Partial                | Full audit pending                                                                                                         |
| Real mobile device  | Not tested             | Recommended                                                                                                                |
| Lighthouse          | Not measured           | M8 scope                                                                                                                   |

---

## AGENT NOTES FOR NEXT SESSION

> **Read order:** `AGENTS.md` (root, canonical) > `docs/HANDOFF.md` > `docs/CONTENT.md` > `docs/DESIGN_SYSTEM.md` > `docs/ANIMATION.md` > `docs/DECISIONS.md` > `docs/ARCHITECTURE.md` > `docs/ROADMAP.md` > `docs/AGENTS.md`

**Key implementation facts:**

- The intro gating mechanism: inline head script sets `html[data-intro="play"|"skip"]` and `--intro-delay` (1.35s or 0s) BEFORE paint. Opening reads `data-intro` on mount; hero entrance delays use `calc(var(--intro-delay) + Ns)`. Never hardcode hero entrance delays.
- The portrait instrument SVG uses `ring-boot` (stroke-draw), `ring-dash`/`ring-arc` (rotation), `ring-late` (delayed fade). The photo circle is `portrait-photo` (iris-in). All delays key off `--intro-delay`.
- Scroll transition = Motion transforms on the pinned 150svh stage. No scaling of the portrait toward the viewer, ever (owner-rejected).
- Pointer parallax attaches only for `(pointer: fine)` and skips under reduced motion; springs normalize pointer position to -1..1.
- `sections.ts` is the IA registry: nav readout, opening indices, About index, and Contact callback all consume it. Update it and the docs together when IA changes.
- Nav is white text + `mix-blend-difference`; do not change to ink/muted colors.
- Motion v13: always explicit 3-point `useTransform` ranges.
- Elements combining CSS entrance animations with Motion styles use nested wrappers (animation fill overrides inline styles).
- No em dashes anywhere (copy, docs, comments).
- Owner inputs needed: real links, real resume PDF, v4 verdict, copy approval.

---

## BROWSER VALIDATION PERFORMED (this session)

- Tooling: playwright-core (temp dir outside repo) driving system Chrome headless against `next start` production build
- Captures: opening early/mid/late frames, settled hero, transition at 45% and 90% scene progress, About, mobile opening + hero, laptop hero, tablet hero, dark hero, reduced motion, returning-visitor overlay check
- Programmatic: overflow-x at 4 widths (all 0), nav readout at #about ("02 / 07 About"), reduced-motion overlay absence + `data-intro` value, returning-visitor overlay display:none
- Issues found and fixed: mobile wordmark wrap (hidden below sm), stale blur-placeholder screenshot (first-request image optimization warm-up; noted as known issue)
- Screenshots live outside the repo: `%LOCALAPPDATA%\Temp\opencode\pv\shots\`
