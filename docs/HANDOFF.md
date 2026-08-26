# HANDOFF.md

> **CRITICAL:** Every session MUST read this file first, then update it at the end of their work.
> This is the single source of truth for session-to-session continuity.

---

## CURRENT STATE

**Milestone:** v4.2 interaction + rhythm pass (owner design brief: opening, experience, skills, carousel, control panel, footer)
**Status:** IMPLEMENTED and browser-validated; awaiting owner review
**Last Updated:** 2026-08-26

### What Exists

- **Canonical root `AGENTS.md`** (CLAUDE.md points to it; docs/AGENTS.md is protocol detail)
- **Opening:** ink-field title sequence (now theme-proof via `.ink-stage`: stays dark in both themes); session-gated with pre-paint gating; skipped for reduced motion and returning visitors
- **Hero (Identity):** editorial arch aperture portrait (rounded crown, offset vermilion echo arch, pointer parallax), display type overlapping the arch, statement, compact context row; the name reacts letter by letter under the pointer (`InteractiveLetters`: gaussian rise field + accent tint, rAF-lerped, fine pointers only); scene-change scroll transition compressed to 130svh with every layer holding the frame until late (no dead scroll)
- **Statements bridge:** three oversized statements (up to 13rem) share one sticky ink stage from the first pixel; scroll moves emphasis down the stack (inactive lines recede to 0.16 opacity); lateral drift throughout; 240svh; releases directly into About with no blank screens
- **Persistent header:** transparent at top, compact with paper backdrop after 64px, tucks/reveals, active link underline, theme toggle, progress hairline (magnetic pull removed from nav to reclaim first-load budget)
- **About:** word-by-word reading reveal, meta row, no index
- **Experience:** one visual timeline grouped by organization (Cyber Defenders, Recipharm, GDG, CodeChef-VIT, Skilledity, Team Shade; roles nested, owner-mandated order); central spine whose accent fill draws with scroll; org blocks alternate sides on lg, stack along the spine below lg; diamond markers; compact one-line role summaries
- **Skills:** three drifting marquee rows of golden emblems (alternate directions, pause on hover, edge fade); no counts; emblem core is a slot ready for real technology logos; certifications as their own hairline register
- **Projects:** infinite drifting carousel (rAF-owned track, two copies, offset wraps modulo one copy width); auto-drift 40px/s until any interaction (drag, swipe, arrows, keys) stops it permanently for the session; pointer drag with gentle grid settle and click-suppression after drags; uniform cards (fixed preview surface h-44, clamped description, pinned stack/links rows); no P.01 tags; reduced motion gets a native scroll row
- **Personality:** inverted panel, fragment word-swap instrument (unchanged)
- **Control center:** framed instrument panel with accent corner ticks, title strip (live status dot), six hairline-divided modules (Now, IST clock, Studying, Toolbox, Direct lines, Navigate), footer strip (Vellore, India · UTC +05:30)
- **Footer:** compact contact grid (Let's talk gesture + Email, Elsewhere, Pages columns), slim resume row (Everything, condensed.), closing marquee wordmark (SHIKHAR SAHAY ✦ repeating, letters reactive, pauses on hover, static fitted wordmark under reduced motion), designed-and-built meta
- **Removed everywhere:** coordinates, CGPA, `NN / 07` counters, `P.01` artifact tags, "Say hello" display block, large footer link rows, ghost numerals
- **Atmosphere:** grain + slow drifting light field

### What Does NOT Exist Yet

- Real links (email, GitHub, LinkedIn, project URLs) and the real resume PDF (placeholder at `public/resume.pdf`)
- Technology logos in the skills emblems (slot is ready)
- Case studies, blog, depth passes on About
- CI/CD, Lighthouse measurement, real-device testing
- Final copy approval

---

## RECENT CHANGES (v4.2)

| Date       | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-26 | Owner design brief implemented: per-letter interactive hero name (`InteractiveLetters`); opening compressed (hero 130svh, layers hold until late); statements bridge redesigned as a shared stage with scroll-driven emphasis (no dead zones, stage stays opaque, releases into About); experience content restructured by organization with nested roles (Skilledity intern listed without dates: owner source gives none); timeline rebuilt around a scroll-drawn spine with alternating org blocks; skills rebuilt as drifting marquee emblem rows (no counts, logo slot, certifications register); projects rebuilt as an infinite drifting carousel (auto until touched, drag/swipe/arrows, uniform cards, no P.0x); control center framed with corner ticks, strips, hairline modules; footer rebuilt compact (Let's talk grid, slim resume row, marquee wordmark with reactive letters); dark-mode ink stage fix (`.ink-stage`); hydration-safe reduced motion via `useMountedReducedMotion` (fixes React #418/#423); reduced-motion carousel arrows use instant scroll (Chrome drops smooth scroll under forced reduce); nav magnetic pull removed; `Magnetic` deleted (unused) |

---

## DECISIONS (v4.2, see docs/DECISIONS.md #30+)

1. Opening sequence compressed; no blank stages anywhere in hero → bridge → About
2. Statements share one sticky stage; emphasis moves with scroll; stage stays opaque to the end
3. Experience grouped by organization in the owner's mandated order; Skilledity intern has no dates (none supplied)
4. Skills: marquee emblem rows, no numeric counts, logo-ready emblem slot, certifications separate
5. Projects: continuous auto-drift that permanently stops on first user interaction; seamless wrap via two-copy track with modulo offset
6. Footer: name marquee is the dominant closing element; contact area compact and structured; no large link list
7. `.ink-stage` utility: cinematic ink fields stay dark in both themes
8. Reduced-motion variants render after mount (`useMountedReducedMotion`) to keep SSR/hydration markup identical

---

## KNOWN ISSUES

| Issue                                                                       | Severity | Notes                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placeholder links (email, GitHub, LinkedIn, project Live/GitHub/Case study) | High     | Rendered muted with "coming soon" titles; replace in `src/content/profile.ts` and `projects.ts`                                                                                                                              |
| `public/resume.pdf` placeholder                                             | High     | Owner PDF could not be read by the agent; drop the real file in place                                                                                                                                                        |
| First Load JS ~151 kB, budget 150 kB                                        | Medium   | +1 kB over the 150 line (baseline at checkpoint was already 150, the "~145" figure was stale). Reclaim by replacing the InteractiveLetters accent tint with a cheaper effect or trimming carousel logic when real links land |
| Copy provisional                                                            | Medium   | Owner-supplied facts, wording unapproved                                                                                                                                                                                     |
| Skilledity Social Media Management Intern has no dates                      | Low      | Owner source supplies none; rendered without a period until dates arrive                                                                                                                                                     |
| Reduced motion verified via emulation                                       | Low      | Human check recommended                                                                                                                                                                                                      |
| `sharp` warning at build                                                    | Low      | Vercel provides sharp                                                                                                                                                                                                        |

---

## NEXT STEPS

1. Owner review (desktop + mobile, light + dark, reduced motion)
2. Real links + real resume PDF
3. Copy approval
4. Depth passes (About, case studies) and M6 signature experience
5. Lighthouse + real-device checks (M8)

---

## FILES TO KNOW

| File                                               | Purpose                                                                     |
| -------------------------------------------------- | --------------------------------------------------------------------------- |
| `AGENTS.md`                                        | CANONICAL instructions                                                      |
| `docs/HANDOFF.md`                                  | This file                                                                   |
| `src/content/*.ts`                                 | All content (profile, sections, projects, experience, systems, personality) |
| `src/components/layout/Opening.tsx`                | Title sequence (client, ink-stage)                                          |
| `src/components/layout/SiteNav.tsx`                | Persistent header (client)                                                  |
| `src/components/layout/ThemeToggle.tsx`            | Theme control (header)                                                      |
| `src/components/sections/Hero.tsx`                 | Identity: arch portrait + interactive name + scene change (client)          |
| `src/components/sections/TransitionStatements.tsx` | Statements bridge: shared stage, scroll emphasis (client)                   |
| `src/components/sections/About.tsx`                | About + word reveal (client)                                                |
| `src/components/sections/Experience.tsx`           | Org timeline with scroll-drawn spine (client)                               |
| `src/components/sections/Skills.tsx`               | Marquee emblem rows + certifications (server)                               |
| `src/components/sections/Projects.tsx`             | Infinite drifting carousel (client)                                         |
| `src/components/sections/ProjectPanel.tsx`         | Uniform artifact card + preview motifs (lazy chunk)                         |
| `src/components/sections/Personality.tsx`          | Fragment instrument (client)                                                |
| `src/components/sections/ControlCenter.tsx`        | Framed utility panel + IST clock (client)                                   |
| `src/components/sections/Contact.tsx`              | Footer: compact contact + resume row (server)                               |
| `src/components/sections/FooterWordmark.tsx`       | Marquee wordmark with reactive letters (client)                             |
| `src/components/ui/InteractiveLetters.tsx`         | Per-letter pointer rise field (client)                                      |
| `src/hooks/useMountedReducedMotion.ts`             | Hydration-safe reduced-motion flag                                          |
| `src/components/ui/*`                              | Reveal, Counter, InView, WordReveal                                         |
| `public/resume.pdf`                                | PLACEHOLDER                                                                 |

---

## TESTING STATUS

| Test                     | Status    | Notes                                                                                                                                   |
| ------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| typecheck/lint/format    | Pass      |                                                                                                                                         |
| build                    | Pass      | Static; First Load JS ~151 kB (budget 150, see KNOWN ISSUES)                                                                            |
| Browser validation       | Performed | 30+ screenshots: hero, bridge (4 scroll depths), all sections, light + dark, 1920/1440/768/375, reduced motion                          |
| Carousel                 | Verified  | auto-drift 40px/s, next/prev arrows (seamless wrap verified numerically), mouse drag with settle, auto permanently stops on interaction |
| Hero/footer letters      | Verified  | gaussian rise field active on fine pointers; static on touch/reduced motion                                                             |
| Dead scroll audit        | Clean     | hero → bridge → About continuous; bridge stage opaque to the end; About padding tightened                                               |
| Dark mode                | Verified  | both themes polished; ink stage stays dark in dark mode (no cream flash)                                                                |
| Reduced motion           | Verified  | no hydration errors (#418/#423 fixed); static bridge/footer, native-scroll carousel, working arrows                                     |
| Overflow-x               | 0 px      | 1920/1440/768/375                                                                                                                       |
| Em dash audit            | Clean     | src + docs                                                                                                                              |
| `NN / 07` / `P.01` audit | Clean     | no visible section counters or artifact tags                                                                                            |
| CGPA / coordinates       | Removed   |                                                                                                                                         |
| Keyboard navigation      | Partial   | links/buttons focusable; carousel arrow keys wired; full audit pending                                                                  |
| Lighthouse/real device   | Pending   | M8                                                                                                                                      |

---

## AGENT NOTES FOR NEXT SESSION

> **Read order:** `AGENTS.md` > `docs/HANDOFF.md` > `docs/CONTENT.md` > `docs/DESIGN_SYSTEM.md` > `docs/ANIMATION.md` > `docs/DECISIONS.md`

- Intro gating: head script sets `html[data-intro]` + `--intro-delay` before paint; hero delays use `calc(var(--intro-delay) + Ns)`.
- Motion v13: explicit 3-point `useTransform` ranges only, strictly increasing inputs inside [0,1]; negative or boundary-touching inputs throw `Offsets must be monotonically non-decreasing` at mount.
- Reduced-motion branches MUST gate on `useMountedReducedMotion` (not `useReducedMotion`) or SSR/hydration markup diverges (React #418).
- Chrome drops `behavior: 'smooth'` scrolling entirely under forced reduced motion: use `'auto'` there.
- Marquee/carousel loops: uniform item slots (margins, not flex gap) so a -50% (or modulo) translate is seamless.
- `data-inview` motifs come from `<InView>`; `[data-sweep]` reading highlight from `<HighlightSweep>`.
- Inline tool lists MUST include breakable spaces around separators (overflow lesson from v4.1).
- Nav is theme-colored (no blend); the compact state adds a paper backdrop.
- No visible section numbering, no CGPA, no coordinates, no em dashes. Ever.
- Owner inputs needed: real links, real resume PDF, copy approval, Skilledity intern dates.
