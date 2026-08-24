# HANDOFF.md

> **CRITICAL:** Every session MUST read this file first, then update it at the end of their work.
> This is the single source of truth for session-to-session continuity.

---

## CURRENT STATE

**Milestone:** v4.1 art direction + interaction pass (ROADMAP M1/M2/M3 scope)
**Status:** IMPLEMENTED and browser-validated; awaiting owner review; PUSHED to GitHub
**Last Updated:** 2026-08-24

### What Exists

- **Canonical root `AGENTS.md`** (CLAUDE.md points to it; docs/AGENTS.md is protocol detail)
- **Opening:** ink-field title sequence; the name renders at the hero's exact position/scale so the lift is one continuous composition; vermilion sweep under the name; ~2.1s; session-gated with pre-paint `data-intro`/`--intro-delay` gating; skipped for reduced motion and returning visitors
- **Hero (Identity):** editorial arch aperture portrait (rounded crown, offset vermilion echo arch, 20% grayscale resolving to color on hover, pointer parallax with counter-drifting echo), display type overlapping the arch, statement, compact context row; scene-change scroll transition (typography separates into layers, arch exits laterally, hairline handoff into About). Face zoom: REMOVED and prohibited
- **Persistent header:** transparent at top, compact with paper backdrop + hairline after 64px, tucks away scrolling down past the hero, returns on scroll up, active link accent underline (IO), magnetic links, theme toggle in header, progress hairline
- **02 About:** reading-highlight statement (scroll-driven ink sweep via `HighlightSweep`), meta (location/studying/otherwise), editorial site index (no numbers)
- **03 Experience:** organizations appear once, latest first (GDG, Cyber Defenders, Recipharm, CodeChef, skilledity, Team Shade); multiple roles at one org render as a progression down a shared line with filled/hollow markers; hover interactions
- **04 Skills:** editorial tool index (serif group headings, flowing inline tool lists with hover accents); education + credentials sidebar; no CGPA
- **05 Projects:** three compact artifact panels with per-project SVG preview motifs (paper grid, signal map, manifest toggles), count-up metrics on Papers, tech lists, structured placeholder links (Live/GitHub/Case study)
- **06 Personality:** inverted panel, fragment word-swap instrument
- **07 Control center:** utility grid: Now (recent roles), live IST clock, Studying, Toolbox, Direct lines, Navigate
- **Footer:** resume moment (Everything, condensed. + View/Download), Say hello gesture, link rows with magnetic pull, giant SHIKHAR SAHAY wordmark, designed-and-built meta
- **Removed everywhere:** coordinates, CGPA, `NN / 07` counters, "seven parts" language, ghost numerals, numbered eyebrows
- **Atmosphere:** grain + slow drifting light field

### What Does NOT Exist Yet

- Real links (email, GitHub, LinkedIn, project URLs) and the real resume PDF (placeholder at `public/resume.pdf`)
- Case studies, blog, depth passes on About
- CI/CD, Lighthouse measurement, real-device testing
- Final copy approval

---

## RECENT CHANGES (v4.1)

| Date       | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-08-24 | Removed coordinates, CGPA, `NN / 07` counters, "seven parts" copy, ghost numerals, numbered eyebrows; persistent header rebuild (tuck/reveal, compact state, active link, theme toggle, magnetic links); opening v4.1 (name at hero position, sweep line, no counters); portrait reworked from circular instrument to arch aperture with echo; About reading-highlight; Experience rebuilt as org progression (latest first); Skills as editorial tool index; Projects as compact artifact panels with SVG preview motifs and placeholder links; Control center added; Footer closing scene with giant wordmark; overflow fixes (unbreakable inline lists, mobile nav); docs updated |

---

## DECISIONS (v4.1, see docs/DECISIONS.md #29)

1. Presentation numbering prohibited in the visible UI (registry stays internal)
2. CGPA and coordinates removed entirely
3. Persistent header with tuck/reveal and compact scrolled state; theme toggle in header
4. Portrait: arch aperture + echo arch (circular instrument retired)
5. Experience grouped by organization, latest first, roles as progressions
6. Skills as editorial inline tool index (no pills)
7. Projects as compact artifact panels with preview motifs and structured placeholder links
8. Control center section added before the footer
9. Footer closing scene with giant wordmark

---

## KNOWN ISSUES

| Issue                                                                       | Severity | Notes                                                                                           |
| --------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| Placeholder links (email, GitHub, LinkedIn, project Live/GitHub/Case study) | High     | Rendered muted with "coming soon" titles; replace in `src/content/profile.ts` and `projects.ts` |
| `public/resume.pdf` placeholder                                             | High     | Owner PDF could not be read by the agent; drop the real file in place                           |
| First Load JS ~149 kB of 150 kB budget                                      | Medium   | No headroom; audit before adding client JS                                                      |
| Copy provisional                                                            | Medium   | Owner-supplied facts, wording unapproved                                                        |
| Reduced motion verified via emulation                                       | Low      | Human check recommended                                                                         |
| `sharp` warning at build                                                    | Low      | Vercel provides sharp                                                                           |
| Parallax/ring constants hand-tuned                                          | Low      | Re-tune if the arch size changes                                                                |

---

## NEXT STEPS

1. Owner review (desktop + mobile, light + dark, reduced motion)
2. Real links + real resume PDF
3. Copy approval
4. Depth passes (About, case studies) and M6 signature experience
5. Lighthouse + real-device checks (M8)

---

## FILES TO KNOW

| File                                        | Purpose                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `AGENTS.md`                                 | CANONICAL instructions                                                      |
| `docs/HANDOFF.md`                           | This file                                                                   |
| `src/content/*.ts`                          | All content (profile, sections, projects, experience, systems, personality) |
| `src/components/layout/Opening.tsx`         | Title sequence (client)                                                     |
| `src/components/layout/SiteNav.tsx`         | Persistent header (client)                                                  |
| `src/components/layout/ThemeToggle.tsx`     | Theme control (header)                                                      |
| `src/components/sections/Hero.tsx`          | Identity: arch portrait + scene change (client)                             |
| `src/components/sections/About.tsx`         | About + reading highlight + index (client)                                  |
| `src/components/sections/Experience.tsx`    | Org progression (client)                                                    |
| `src/components/sections/Skills.tsx`        | Editorial tool index (server)                                               |
| `src/components/sections/Projects.tsx`      | Artifact panels + preview motifs (client)                                   |
| `src/components/sections/Personality.tsx`   | Fragment instrument (client)                                                |
| `src/components/sections/ControlCenter.tsx` | Utility grid + IST clock (client)                                           |
| `src/components/sections/Contact.tsx`       | Footer: resume moment + wordmark (server)                                   |
| `src/components/ui/*`                       | Reveal, Counter, InView, Magnetic, HighlightSweep                           |
| `public/resume.pdf`                         | PLACEHOLDER                                                                 |

---

## TESTING STATUS

| Test                   | Status    | Notes                                                                                                                                    |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| typecheck/lint/format  | Pass      |                                                                                                                                          |
| build                  | Pass      | Static; First Load JS ~149 kB (budget 150)                                                                                               |
| Browser validation     | Performed | 19+ screenshots: opening, hero, transition, all sections, control center, footer, light mode, mobile (5), laptop, tablet, reduced motion |
| Overflow-x             | 0 px      | 1440/1024/768/390 after unbreakable-list fixes                                                                                           |
| Header tuck/reveal     | Verified  | top -54 scrolling down, 0 scrolling up                                                                                                   |
| Opening gating         | Verified  | skip for reduced motion + returning visitors                                                                                             |
| Em dash audit          | Clean     | src + docs                                                                                                                               |
| `NN / 07` audit        | Clean     | no visible section counters                                                                                                              |
| CGPA / coordinates     | Removed   |                                                                                                                                          |
| Keyboard navigation    | Partial   | links/buttons focusable; full audit pending                                                                                              |
| Lighthouse/real device | Pending   | M8                                                                                                                                       |

---

## AGENT NOTES FOR NEXT SESSION

> **Read order:** `AGENTS.md` > `docs/HANDOFF.md` > `docs/CONTENT.md` > `docs/DESIGN_SYSTEM.md` > `docs/ANIMATION.md` > `docs/DECISIONS.md`

- Intro gating: head script sets `html[data-intro]` + `--intro-delay` before paint; hero delays use `calc(var(--intro-delay) + Ns)`.
- Motion v13: explicit 3-point `useTransform` ranges only.
- CSS entrance + Motion styles on the same element conflict (animation fill wins): use nested wrappers.
- `data-inview` motifs come from `<InView>`; `[data-sweep]` reading highlight from `<HighlightSweep>`.
- Inline tool lists MUST include breakable spaces around separators (overflow lesson from v4.1).
- Nav is theme-colored (no blend); the compact state adds a paper backdrop.
- No visible section numbering, no CGPA, no coordinates, no em dashes. Ever.
- Owner inputs needed: real links, real resume PDF, copy approval.
