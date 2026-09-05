# HANDOFF.md

> **CRITICAL:** Every session MUST read this file first, then update it at the end of their work.
> This is the single source of truth for session-to-session continuity.

---

## CURRENT STATE

**Milestone:** v4.6 interaction depth pass (footer life, sliding statements, mark wall)
**Status:** IMPLEMENTED and browser-verified; awaiting owner review
**Last Updated:** 2026-09-05

### What Exists

- **Canonical root `AGENTS.md`** (CLAUDE.md points to it; docs/AGENTS.md is protocol detail)
- **Opening:** minimal signal-line loader on an ink field (hairline draws, vermilion marker rides its tip, ~1.6s, once per session); theme-proof via `.ink-stage`; skipped pre-paint for returning visitors and reduced motion
- **Hero (Identity):** editorial arch aperture portrait (right-of-center crop with eyeline into the type, offset vermilion echo arch, pointer parallax), oversized two-line name that never wraps and interlocks with the arch edge (face-safe at every width); the name reacts letter by letter under the pointer (`InteractiveLetters`: 2D gaussian rise field with tight vertical falloff so stacked rows stay independent, per-letter springs, scroll-aware center caching, tunable accent wash, fine pointers only); scene-change scroll transition over a 120svh scene with an ink veil carrying the opening statement plus an exact tail ink block (no dead scroll, no paper flash); reduced motion never pins the scene
- **Statements bridge:** continuous leftward slide on a transparent stage pulled up exactly one viewport (sticky engages the pixel the hero releases; pointer-transparent so hero hover survives): full-viewport panels travel plus 60vw to minus 60vw with shared crossfade windows, scale and rotation following travel, opacity fades at travel end, oversized per-panel ink bleed; verbs at 17vw capped for viewport fit with explicit paper color; the finale holds its frame into About; 240svh; reduced motion gets a static stacked block
- **Persistent header:** transparent at top, compact with paper backdrop after 64px, tucks/reveals, active link underline, theme toggle, progress hairline (magnetic pull removed from nav to reclaim first-load budget)
- **About:** word-by-word reading reveal, meta row, no index
- **Experience:** one visual timeline grouped by organization (Cyber Defenders, Recipharm, GDG, CodeChef-VIT Student Chapter, Skilledity, Team Shade; roles nested, owner-mandated order); central spine whose accent fill draws with scroll (geometry verified numerically: spine centered 0.00px, markers on spine 0.00px); org blocks alternate sides on lg, stack along the spine below lg; diamond markers; compact one-line role summaries
- **Skills:** three drifting marquee rows of golden emblems (alternate directions, pause on hover, edge fade); no counts; every core resolves to one beige family (real CC0 brand marks plus ink monograms where no genuine mark exists); solid marks render one step smaller; labels reserve two balanced lines; certifications as their own hairline register
- **Projects:** infinite drifting carousel (rAF-owned track, two copies, offset wraps modulo an exactly measured copy width); forward travel is negative offset for drift, arrows, keys, and reduced-motion scrolls alike; auto-drift 40px/s until any interaction stops it permanently for the session; pointer drag with gentle grid settle and click-suppression after drags; placeholder links inert everywhere (client preventDefault, server plain text); uniform cards (fixed preview surface h-44, clamped description, pinned stack/links rows); reduced motion gets a native scroll row
- **Personality:** inverted panel, fragment word-swap instrument (fixed word column, no hover feedback loop), plus a leave-your-mark wall (glyph picker, stamp field, localStorage persistence, 150 cap, keyboard path, instant under reduced motion)
- **Control center:** framed instrument panel with accent corner ticks, title strip (live status dot), six hairline-divided modules (Now, IST clock, Studying, Toolbox, Channels, Navigate with arrow markers), footer strip (Vellore, India · UTC +05:30, session uptime)
- **Footer:** compact contact grid (Let's talk gesture + Email with mail glyph, Elsewhere channels with meaning glyphs, Pages with arrows; server placeholders are plain text, never anchors), slim resume row (Everything, condensed.), closing velocity-wave marquee (rise plus directional lean, zero cost idle, pauses on hover, static fitted wordmark under reduced motion), designed-and-built meta
- **Favicon:** `src/app/icon.svg` (ink field, vermilion diamond)
- **Removed everywhere:** coordinates, CGPA, `NN / 07` counters, `P.01` artifact tags, "Say hello" display block, large footer link rows, ghost numerals
- **Atmosphere:** grain + slow drifting light field

### What Does NOT Exist Yet

- Real links (email, GitHub, LinkedIn, project URLs) and the real resume PDF (placeholder at `public/resume.pdf`)
- Brand marks for SQL, Nmap, CrowdStrike Falcon, Beelzebub (no genuine CC0 mark found; ink monograms stand in)
- Shared mark-wall persistence (visitor marks keep in their own browser only; no backend exists)
- Case studies, blog, depth passes on About
- CI/CD, Lighthouse measurement, real-device testing
- Final copy approval

---

## RECENT CHANGES (v4.2, v4.3)

| Date       | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-26 | Owner design brief implemented: per-letter interactive hero name (`InteractiveLetters`); opening compressed (hero scene with layers holding until late); statements bridge redesigned as a shared stage with scroll-driven emphasis (no dead zones, stage stays opaque, releases into About); experience content restructured by organization with nested roles (Skilledity intern listed without dates: owner source gives none); timeline rebuilt around a scroll-drawn spine with alternating org blocks; skills rebuilt as drifting marquee emblem rows (no counts, logo slot, certifications register); projects rebuilt as an infinite drifting carousel (auto until touched, drag/swipe/arrows, uniform cards, no P.0x); control center framed with corner ticks, strips, hairline modules; footer rebuilt compact (Let's talk grid, slim resume row, marquee wordmark with reactive letters); dark-mode ink stage fix (`.ink-stage`); hydration-safe reduced motion via `useMountedReducedMotion` (fixes React #418/#423); reduced-motion carousel arrows use instant scroll (Chrome drops smooth scroll under forced reduce); nav magnetic pull removed; `Magnetic` deleted (unused)                                                        |
| 2026-09-04 | v4.3 eight-issue sweep, one issue at a time, verified with DOM/bbox/scroll-state harnesses on the production build (no screenshot loops). Hero letters: 2D proximity field with tight vertical falloff (0.000 crosstalk between SHIKHAR and SAHAY), scroll-aware center caching, overflow-visible rows, footer marquee bleed. Hero exit: kept the ink veil handoff (frame-by-frame verified, no dead viewport or paper gap); reduced motion no longer pins the scene. Statements: full-width interlocked registers (flush-left BUILD, flush-right larger BREAK, indented REBUILD) with overlap, per-line sizes, unified scale. Timeline: geometry verified numerically (0.00px throughout); org renamed to CodeChef-VIT Student Chapter; Cyber Defenders content untouched. Skills: real CC0 marks for 19/23 tools (added C, C++, R; plusplus key rule); SQL, Nmap, CrowdStrike Falcon, Beelzebub keep monograms. Carousel: travel direction corrected (forward is negative offset), exact copy width from slide metrics (grid-exact wraps), placeholder links inert. Control panel and footer placeholders never navigate (client preventDefault, server plain text). Favicon added (`src/app/icon.svg`). First Load JS ~153 kB (see KNOWN ISSUES). |
| 2026-09-04 | v4.4 visual polish pass (see DECISIONS.md #33). Hero name no longer wraps mid-word at large widths (nowrap plus min-w-0 column; type interlocks with the arch, face clear). Footer marquee quieted (tint strength 45, lift 0.10). Skills optical sizes normalized and label heights unified. Project role lines rendered; stack naming unified. Footer Elsewhere list items wrapped in `li`. Skilledity intern keeps a "Details coming soon" line. Metadata spacing cleaned. Full regression green (11/11, 5/5, 10/10, 14/14, 10/10, 19/19, 26/26). First Load JS unchanged at ~153 kB.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-05 | v4.5 opening choreography pass (see DECISIONS.md #34). Audit-traced the full opening scroll: root-caused the blank post-hero frame (exit-veil text range ended at 0.9, Motion drops flat terminal segments past the last keyframe). Binding rule: all scroll ranges end at 1.0. Hero composition made deterministic and face-safe (12.5rem cap, face-right crop, small-desktop nudge; verified 1024 to 1920). Statements overlap the hero by exactly one viewport with self-opaquing phases and shared crossfade windows; bridge is pointer-transparent. Statements rebuilt as phased in-place kinetic typography (I, verb mask reveal, note; REBUILD holds into About). Regression green everywhere; production e2e 12/12 on the final build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-09-05 | Documentation refresh: audited every doc against the built code. Rewrote README as a current project overview; refreshed ARCHITECTURE, DESIGN_SYSTEM, ANIMATION, CONTENT, PERFORMANCE, ROADMAP, PROJECT_CONTEXT to the as-built state; removed aspirational claims (CI, Lighthouse, analyzer, backend, forms) and stale pattern catalogs; recorded that no leave-your-mark feature or backend exists.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-09-05 | v4.6 interaction depth pass (see DECISIONS.md #35). Uniform beige emblem cores; footer channel glyphs; velocity-wave marquee; fixed Personality hover feedback loop (fixed word column); sliding statement panels with fade-last opacity and oversized ink bleed; arrow/status link markers; leave-your-mark wall (local-only persistence). Full regression green. First Load JS ~156 kB.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

---

## DECISIONS (v4.2, see docs/DECISIONS.md #30+; v4.3, see #32)

1. Opening sequence compressed; no blank stages anywhere in hero → bridge → About
2. Statements play as phased kinetic typography on an overlapped sticky (see DECISIONS.md #34); one thought leads at a time, finale holds into About
3. Experience grouped by organization in the owner's mandated order; Skilledity intern has no dates (none supplied)
4. Skills: marquee emblem rows, no numeric counts, real monochrome brand marks with monogram fallback, certifications separate
5. Projects: continuous auto-drift that permanently stops on first user interaction; seamless wrap via two-copy track with modulo offset
6. Footer: name marquee is the dominant closing element; contact area compact and structured; no large link list
7. `.ink-stage` utility: cinematic ink fields stay dark in both themes
8. Reduced-motion variants render after mount (`useMountedReducedMotion`) to keep SSR/hydration markup identical

---

## KNOWN ISSUES

| Issue                                                                       | Severity | Notes                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placeholder links (email, GitHub, LinkedIn, project Live/GitHub/Case study) | High     | Rendered muted with "coming soon" titles; replace in `src/content/profile.ts` and `projects.ts`                                                                                                                                                                       |
| `public/resume.pdf` placeholder                                             | High     | Owner PDF could not be read by the agent; drop the real file in place                                                                                                                                                                                                 |
| First Load JS ~156 kB, budget 150 kB                                        | Medium   | +6 kB over the 150 line (was ~153 at v4.5; delta covers the mark wall, marquee wave, and larger statement type). Reclaim by replacing the InteractiveLetters accent tint with a cheaper effect, trimming carousel hint state, or moving Counter out of the lazy chunk |
| Copy provisional                                                            | Medium   | Owner-supplied facts, wording unapproved                                                                                                                                                                                                                              |
| Skilledity Social Media Management Intern has no dates                      | Low      | Owner source supplies none; rendered without a period until dates arrive                                                                                                                                                                                              |
| Reduced motion verified via emulation                                       | Low      | Human check recommended                                                                                                                                                                                                                                               |
| `sharp` warning at build                                                    | Low      | Vercel provides sharp                                                                                                                                                                                                                                                 |

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
| `src/components/sections/TransitionStatements.tsx` | Statements bridge: phased kinetic typography, overlapped handoff (client)   |
| `src/components/sections/About.tsx`                | About + word reveal (client)                                                |
| `src/components/sections/Experience.tsx`           | Org timeline with scroll-drawn spine (client)                               |
| `src/components/sections/Skills.tsx`               | Marquee emblem rows + certifications (server)                               |
| `src/components/sections/Projects.tsx`             | Infinite drifting carousel (client)                                         |
| `src/components/sections/ProjectPanel.tsx`         | Uniform artifact card + preview motifs (lazy chunk)                         |
| `src/components/sections/Personality.tsx`          | Fragment instrument + mark wall host (client)                               |
| `src/components/sections/MarkWall.tsx`             | Leave-your-mark wall: glyph stamps, local store (client)                    |
| `src/components/sections/ControlCenter.tsx`        | Framed utility panel + IST clock (client)                                   |
| `src/components/sections/Contact.tsx`              | Footer: compact contact + resume row (server)                               |
| `src/app/icon.svg`                                 | Favicon (ink field, vermilion diamond)                                      |
| `src/components/sections/FooterWordmark.tsx`       | Velocity-wave marquee (client)                                              |
| `src/components/ui/InteractiveLetters.tsx`         | Per-letter pointer rise field (client)                                      |
| `src/hooks/useMountedReducedMotion.ts`             | Hydration-safe reduced-motion flag                                          |
| `src/components/ui/*`                              | Reveal, Counter, InView, WordReveal                                         |
| `public/resume.pdf`                                | PLACEHOLDER                                                                 |

---

## TESTING STATUS

| Test                     | Status    | Notes                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| typecheck/lint/format    | Pass      |                                                                                                                                                                                                                                                                                                                                |
| build                    | Pass      | Static; First Load JS ~156 kB (budget 150, see KNOWN ISSUES)                                                                                                                                                                                                                                                                   |
| Browser validation       | Performed | Production build, DOM/bbox/scroll-state harnesses (no screenshot loops): hero letters 11/11, hero exit 6/6, statements 7/7, timeline 14/14, skills 10/10, carousel 19/19, control+footer 26/26, overlap handoff 4/4, footer wave 7/7, personality stress 7/7, mark wall 11/11, full Hero-About sequence clean, final e2e 12/12 |
| Carousel                 | Verified  | auto-drift 40px/s, next/prev arrows travel forward/backward correctly, seamless grid-exact wrap, mouse drag with settle, keyboard arrows, auto permanently stops on interaction, placeholder links inert                                                                                                                       |
| Hero/footer letters      | Verified  | 2D gaussian rise field active on fine pointers (0.000 crosstalk between rows); static on touch/reduced motion; footer marquee bleed verified                                                                                                                                                                                   |
| Dead scroll audit        | Clean     | hero veil to bridge ink continuous; bridge stage opaque to the end; About padding tightened; reduced motion never pins the hero                                                                                                                                                                                                |
| Dark mode                | Verified  | both themes polished (?theme=dark override); ink stage stays dark in dark mode (no cream flash)                                                                                                                                                                                                                                |
| Reduced motion           | Verified  | no hydration errors; static hero (no pin), bridge, footer; native-scroll carousel with instant arrows                                                                                                                                                                                                                          |
| Overflow-x               | 0 px      | full-scroll sweep at 1920/1440/768/375                                                                                                                                                                                                                                                                                         |
| Favicon                  | Added     | `src/app/icon.svg` (ink field, vermilion diamond); browsers resolve it via the generated icon link, no more console 404s in normal browsing                                                                                                                                                                                    |
| Em dash audit            | Clean     | src + docs                                                                                                                                                                                                                                                                                                                     |
| `NN / 07` / `P.01` audit | Clean     | no visible section counters or artifact tags                                                                                                                                                                                                                                                                                   |
| CGPA / coordinates       | Removed   |                                                                                                                                                                                                                                                                                                                                |
| Keyboard navigation      | Partial   | links/buttons focusable; carousel arrow keys wired; full audit pending                                                                                                                                                                                                                                                         |
| Lighthouse/real device   | Pending   | M8                                                                                                                                                                                                                                                                                                                             |

---

## AGENT NOTES FOR NEXT SESSION

> **Read order:** `AGENTS.md` > `docs/HANDOFF.md` > `docs/CONTENT.md` > `docs/DESIGN_SYSTEM.md` > `docs/ANIMATION.md` > `docs/DECISIONS.md`

- Intro gating: head script sets `html[data-intro]` + `--intro-delay` before paint; hero delays use `calc(var(--intro-delay) + Ns)`.
- Motion v13: every scroll-driven `useTransform` input range MUST end at 1.0 (flat terminal segments whose last input sits below 1.0 collapse once progress passes them). All ranges in the codebase comply; re-verify after any choreography change.
- Reduced-motion branches MUST gate on `useMountedReducedMotion` (not `useReducedMotion`) or SSR/hydration markup diverges (React #418).
- Chrome drops `behavior: 'smooth'` scrolling entirely under forced reduced motion: use `'auto'` there.
- Marquee/carousel loops: uniform item slots (margins, not flex gap) so a -50% (or modulo) translate is seamless.
- `data-inview` motifs come from `<InView>` (project preview SVG animations).
- Inline tool lists MUST include breakable spaces around separators (overflow lesson from v4.1).
- Nav is theme-colored (no blend); the compact state adds a paper backdrop.
- No visible section numbering, no CGPA, no coordinates, no em dashes. Ever.
- Owner inputs needed: real links, real resume PDF, copy approval, Skilledity intern dates.
