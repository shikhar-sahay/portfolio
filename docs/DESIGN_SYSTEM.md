# DESIGN_SYSTEM.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Typography

### Font System (EXPERIMENTAL)

| Font             | Role                                      | Status       |
| ---------------- | ----------------------------------------- | ------------ |
| Instrument Sans  | Primary: display, body, metadata          | EXPERIMENTAL |
| Instrument Serif | Accent: italic emphasis words and moments | EXPERIMENTAL |

- Loaded via `next/font/google` as `--font-sans` and `--font-serif` (serif: weight 400, normal + italic)
- Rationale: the two faces were designed as a pair; the high-contrast serif italic creates typographic moments (lede emphasis, statement pronoun, personality word, resume line) without adding a third family
- Rejected earlier candidates: Geist (reads as Vercel template), Space Grotesk (weak at small sizes), Manrope (less distinctive), Satoshi (needs Fontshare self-hosting)

### Type Scale (EXPERIMENTAL)

Fluid, clamp-based (defined in `tailwind.config.ts`):

| Token     | Value                                                    | Use Case                   |
| --------- | -------------------------------------------------------- | -------------------------- |
| `display` | clamp(4.25rem, 16vw, 12.5rem), lh 0.88, ls -0.03em, w600 | Hero name (never wraps)    |
| `lede`    | clamp(1.5rem, 3.4vw, 2.75rem), lh 1.22, ls -0.02em       | Section intros             |
| `micro`   | 0.6875rem, lh 1.2, ls +0.16em uppercase                  | Metadata, nav, labels      |
| statement | clamp(3.5rem, 13vw, 15rem), lh 0.95, ls -0.03em, w600    | Bridge verbs (single line) |
| wordmark  | 9.5vw (footer), 10.2vw static reduced-motion             | Closing marquee            |
| body      | text-sm / text-base defaults                             | Fragments, support         |

Name treatment: line 1 solid ink; line 2 outline only (`-webkit-text-stroke: 1.5px`, transparent fill), indented 8vw (4vw on lg). Both lines are `whitespace-nowrap` and bleed right over the arch edge by grid construction (identity column `min-w-0`); the overlap is curtain-only and face-safe at every width (see Imagery).

### Typography Principles (FINALIZED)

- Typography leads the design - it's the primary visual voice
- Strong hierarchy, clear reading flow
- Editorial quality - magazine-like composition
- Responsive type scaling (fluid/clamp-based preferred)
- Meaningful font weight usage (not just regular/bold)

---

## Color

### Mode Support (FINALIZED)

- **Light mode** - required
- **Dark mode** - required
- System preference detection + manual toggle

### Palette v2 (EXPERIMENTAL - implemented in `globals.css` as CSS variables)

Warm print-inspired identity: cream paper, warm ink, vermilion accent. Dark is an intentional alternate colorway (warm charcoal with caramel undertones), not inverted black/white.

| Role                           | Light   | Dark    | Status       |
| ------------------------------ | ------- | ------- | ------------ |
| Background (`--paper`)         | #F3EFE6 | #161310 | EXPERIMENTAL |
| Surface (`--surface`)          | #E9E2D3 | #211C16 | EXPERIMENTAL |
| Primary Text (`--ink`)         | #1D1915 | #ECE4D4 | EXPERIMENTAL |
| Secondary Text (`--muted`)     | #7C7568 | #998F7E | EXPERIMENTAL |
| Accent, vermilion (`--accent`) | #BC3F1A | #E0643B | EXPERIMENTAL |

- Accent rationale: vermilion reads as print/editorial (ink-stamp red), not "tech blue". Used for: selection, focus ring, eyebrow ticks, fragment labels, scroll cue segment, credit dot, nav hover underline.
- Supersedes the earlier neutral + electric blue palette (DECISIONS.md #16 → #21).
- Error/Success: UNDECIDED (no forms yet).

### Theme System (EXPERIMENTAL)

- Class-based (`html.dark`), Tailwind `darkMode: 'class'`
- Inline head script sets the class before first paint (no FOUC); reads localStorage, falls back to system preference; `?theme=dark|light` query override exists for testing
- `ThemeToggle`: quiet text micro-control in the nav (shows the mode you would switch to)
- Transition: 0.7s ease crossfade of background/color/border on body and `.theme-fade` containers (pure CSS, no JS animation)

### Color Principles (FINALIZED)

- Restrained palette - few colors, used intentionally
- High contrast for accessibility (WCAG AA minimum)
- Semantic color roles (not decorative)
- Smooth mode transitions
- No generic gradients unless purposeful

---

## Spacing

### Direction (EXPERIMENTAL)

- Tailwind default 4px-based scale; no custom spacing tokens
- Section rhythm: `py-[14vh]` standard (About `pt-[12vh]`, Control Center `py-[16vh]`, footer `pt-[14vh]`); content container `max-w-6xl`
- Consistent page gutter: `px-5` mobile, `px-10` from sm up
- Hero scene `h-[120svh]` with `h-dvh` sticky; statements `h-[240svh]` pulled up `-mt-[100dvh]` so its sticky engages the pixel the hero releases
- Formal token scale remains UNDECIDED

---

## Borders & Radius

### Hairlines (FINALIZED)

- 1px divisions in `border-ink/15` (section tops, module grids via `gap-px`, certification rows, footer rules); accent 40px ticks before eyebrow labels; diamond bullets (rotated squares) for timeline markers, module labels, and cert rows.

### Border Radius (EXPERIMENTAL)

- Sharp (0) by default: cards, panels, buttons, tiles.
- `rounded-full`: skill emblem rings, status dots.
- Arch aperture (portrait only): `999px 999px 18px 18px`.

---

## Imagery

### Hero Portrait (FINALIZED - location amended, see DECISIONS.md #19)

- **Source file:** `src/assets/shikhar-hero.jpg` (4032x3024 landscape, owner-provided; static import enables automatic blur placeholder)
- Amended from `public/images/shikhar-hero.jpg` so it can be statically imported (see DECISIONS.md #19).

### Image Treatment: the Arch Aperture (EXPERIMENTAL)

The portrait is never a rectangle beside text and never an avatar. It is an **editorial arch aperture**:

- Arch aperture: `border-radius: 999px 999px 18px 18px`, aspect 3/3.9, image oversized 4% inside for crop latitude, `object-position: 28% 22%` so the face sits right of center (eyeline into the type) at every viewport
- Placement: two-column grid on lg (`1.1fr 0.9fr`), arch max 460px centered with a small rightward nudge on small desktop (`lg:ml-[3vw]`, cleared at xl); the name bleeds over the arch edge by construction. Face-safe overlap verified 1024 to 1920.
- Offset echo arch behind the photograph: 1px vermilion line at 55% strength, translated down-right, countering the photo on pointer parallax
- Photograph sits slightly desaturated (20% grayscale) and resolves to full color on hover
- Pointer parallax (fine pointers only, disabled under reduced motion): the crop drifts toward the cursor (max 10px), the echo arch drifts against it (max 7px), spring-smoothed (stiffness 55, damping 18), resets on pointerleave
- Loading: static import, `priority`, `placeholder="blur"`, AVIF/WebP via next/image
- The face-zoom scroll treatment from v2 is **rejected** (owner directive); the replacement is the ink-veil scene change (see ANIMATION.md)

---

## Responsive Behavior

### Breakpoints (EXPERIMENTAL - Tailwind defaults, mobile-first)

| Name | Width  | Use in this site                                                       |
| ---- | ------ | ---------------------------------------------------------------------- |
| sm   | 640px  | Gutters `px-10`, arch grows, scroll cue appears, cert grid splits      |
| md   | 768px  | Footer contact grid splits two-column                                  |
| lg   | 1024px | Hero two-column grid; timeline alternates sides; control grid 3-column |
| xl   | 1280px | Hero arch nudge cleared                                                |
| 2xl  | 1536px | No special rules                                                       |

### Hero Responsive Behavior (EXPERIMENTAL)

- Below lg: single column, portrait (capped 300-380px) above the name, both centered; name never wraps (`whitespace-nowrap`); sticky frame clips horizontally, body clips globally, so the bleed never scrolls
- lg and up: two-column composition with type/arch interlock; face-safe at every width
- Nav stays a quiet horizontal row at all widths (labels are short enough not to require a hamburger)
- No horizontal overflow (`overflow-x: clip` on body; verified 0px at 1920/1440/768/375)

### Mobile-First Principles (FINALIZED)

- Mobile is a first-class experience, not a shrunken desktop layout
- Touch targets ≥ 44×44px
- Gesture-friendly interactions
- Performance budget stricter on mobile
- Content priority: hero → work → contact

---

## Recurring Motifs (EXPERIMENTAL)

The identity system beyond type and color. Used consistently so sections read as one document. Removed motifs (section index numerals, ghost numerals, `P.01` artifact tags, magnetic pull) are gone everywhere and must not return.

| Motif                  | Implementation                                                             | Where                                      |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Eyebrow labels         | Plain editorial word with 40px accent tick prefix, micro uppercase         | Every section                              |
| Hairline rules         | 1px `border-ink/15` separators and `gap-px` module grids                   | Every section                              |
| Diamond markers        | Small rotated squares; fill vermilion on hover                             | Timeline, module labels, cert rows         |
| Marching dashes        | Dashed SVG edges with slow dash animation, gated by `data-inview`          | Project preview motifs (signal, honeypot)  |
| Serif interventions    | Instrument Serif italic for emphasis words and moments                     | Ledes, statement pronoun, personality word |
| Outline display type   | `-webkit-text-stroke` transparent fill for second name line                | Hero                                       |
| Arch aperture portrait | Arch mask + offset vermilion echo arch (see Imagery)                       | Hero                                       |
| Film grain             | Static SVG turbulence overlay, ~5% opacity, fixed                          | Whole site (`.grain`)                      |
| Drifting light field   | Two fixed radial gradients (~5% opacity), 80s transform drift              | Whole site (`.atmosphere`)                 |
| Ink stages             | Cinematic ink fields (`#1d1915` on paper text) staying dark in both themes | Opening only                               |

## Component Inventory (as built)

- Opening sequence overlay (client, session-gated, ink-stage)
- SiteNav: progress hairline, tuck/reveal, active-section underline, theme toggle (theme-colored links, paper backdrop when compact)
- ThemeToggle (quiet text control in the nav)
- Reveal / WordReveal / Counter / InView primitives (ui)
- InteractiveLetters (pointer spring field, hero + footer wordmark), TechLogo (monochrome brand marks)
- Sections: Hero (arch + interactive name + tagline rule + veil exit), TransitionStatements (vertical accumulation with full-word whisper echoes, themed surfaces), About (reading reveal + meta row), Experience (org timeline + spine), Skills as Toolkit (marquee emblem rows under the Toolkit eyebrow), Certifications (ledger chapter inside Toolkit, mask-wipe rows), Projects (drifting carousel) + ProjectPanel (lazy chunk with SVG motifs), Pieces of Me (fragment instrument + mosaic + full-bleed notes wall, theme-following), ControlCenter (framed utility grid), Contact (footer: contact grid + icon-name social rows + resume row + whole-word marquee wordmark)

## Shadows & Elevation (UNDECIDED)

- Shadow system: UNDECIDED
- Elevation levels: UNDECIDED
- Avoid excessive depth/layering - prefer clean flat design with purposeful elevation

---

## Motion Tokens (Reference - See ANIMATION.md)

| Token              | Duration  | Easing    | Status    |
| ------------------ | --------- | --------- | --------- |
| duration-instant   | UNDECIDED | -         | UNDECIDED |
| duration-fast      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-base      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-slow      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-cinematic | UNDECIDED | UNDECIDED | UNDECIDED |

---

## Component Inventory (remaining)

- Buttons: sharp-cornered filled and outline variants as used in the resume row; no separate button system.
- Footer is the Contact section (formal, not deferred).
- No form elements exist (no contact form, no backend).

---

## Accessibility (FINALIZED)

- Semantic HTML always
- Focus visible and styled
- Color contrast AA minimum
- Reduced motion respected (see ANIMATION.md)
- ARIA labels where needed
- Keyboard navigable
- Screen reader friendly

---

## Icon System (FINALIZED)

- No icon library. Brand marks are vendored CC0 path data (`src/content/techLogos.ts` for tools, `src/content/channelGlyphs.ts` for contact channels), rendered monochrome via `currentColor` by `TechLogo`.
- Solid full-bleed marks (JavaScript, TypeScript, HTML, CSS, Next.js, C++) render one step smaller for matching optical weight; uniform emblem slots; serif-italic monogram fallback only where no genuine mark exists.
- Sizing: mark lives in a fixed emblem core; labels reserve two balanced lines.

---

## Content Width / Layout (FINALIZED)

- Max content width: `max-w-6xl`, centered.
- Container padding: `px-5` mobile, `px-10` from sm up.
- Grid system: Tailwind CSS Grid + Flexbox. Hero uses a `1.1fr 0.9fr` two-column grid on lg.

---

## Notes

This file will evolve as design decisions are finalized. Each section should be updated with `FINALIZED` status once decided, with the actual values documented.

---

## v5.0 Additions (EXPERIMENTAL, 2026-09-07)

- **Statements echoes (supersedes the v4.9 residues below):** the complete verb (BUILD, BREAK, REBUILD), oversized and cropped low-right; subtlety via element opacity (`opacity-[0.06]`, `dark:opacity-[0.09]`), never color opacity modifiers (see DECISIONS.md #39).
- **Pieces of Me (replaces Personality everywhere user-facing):** theme-following chapter, no fixed panel. Solid theme tokens throughout; dotted field and vignette as `color-mix` CSS (`.wall-dots`, `.wall-vignette`); reply rail and accent card borders genuinely vermilion.
- **Toolkit IA:** Skills carries the Toolkit eyebrow, anchor, and aria label; Certifications stays a visual chapter with its deep anchor but no nav entry; nav, footer Pages, and control Navigate share `navLinks` (About, Experience, Toolkit, Projects, Pieces of Me, Contact). Header holds one row from md up and collapses to a disclosure menu below md.
- **Inverted panel motif retired:** the fixed-dark `.panel-ink` scope is deleted (owner ruled the dark-in-light rendering a bug).

## v4.9 Additions (EXPERIMENTAL, 2026-09-07)

- **Hero tagline (replaces the v4.8 afterimage):** a 2px vermilion rule draws beneath the serif word with a 7px diamond riding to the cursor; movement glides the marker, leave retracts. Springs only, aria-hidden, absent under reduced motion.
- **Statements scene (v4.9 residues, superseded by the v5.0 full-word echoes above):** echoes were same-word trailing residues (LD/AK/LD), low-right, cropped by the frame; verbs at `clamp(4rem, 12.5vw, 14rem)`. Theme-deliberate: paper plus ink in light, deep warm charcoal plus cream in dark; veil and tail match per theme.
- **Certifications chapter:** own section after Skills (eyebrow, serif lede, 20vh break, hairline ledger, featured first row, boxed Verify links); rows arrive with a scroll mask wipe.
- **Footer wordmark:** whole-word velocity lean plus stretch, tracking breath, narrow vermilion sheen band at the cursor; 0.16em diamond separators with 0.7em air; seamless -50% loop.
- **Panel scope (retired in v5.0, see above):** `.panel-ink` pinned light token values for the Personality subtree, so the inverted panel never became a light island in dark mode.
- **Notes wall:** full-bleed section-width surface (no box, no world boundary); mosaic statement plus hint microcopy; cursor-following placement ghost; Recenter replaced by Latest (global lookup, camera flight, thread on arrival).
- **Theme toggle:** state-driven 180-degree icon rotation.

## v4.8 Additions (EXPERIMENTAL, 2026-09-06)

- **Hero tagline (v4.8 afterimage, superseded by the v4.9 rule above):** the serif word kept a vermilion afterimage, removed after it read as misregistration.
- **Statements scene:** verbs at `clamp(4rem, 12.5vw, 14rem)`; each row carries a giant cropped echo of the neighboring verb (21vw, 7% paper, off-canvas right, static CSS on the shared stack); rows cascade diagonally (flush mobile, progressive offsets from sm up); reduced-motion stack keeps echoes.
- **Notes wall:** deterministic tilt (minus 2.2 to 2.2 degrees from id hash) plus restrained widths (standard, narrow, wide, occasional large); pin-diamond metadata; tactile shadows that deepen on hover/focus while the card straightens; dotted field plus vignette plus dashed world boundary with accent corner ticks; docked instrument cluster (leave a note, recenter, count); serif composer card; narrow thread slip with vermilion reply rail; focus moves into thread/composer on open.
- **Footer Elsewhere:** icon plus name rows with real monochrome brand marks (whole row links, no handles); hover lifts the mark, shifts the row, reveals an arrow; Discord is a visually identical copy row (copy icon, "copy"/"copied" micro).
- **Resume:** `public/resume.pdf` is the real owner-supplied file (placeholder retired).

## v4.7 Additions (EXPERIMENTAL, 2026-09-06)

- **Statements scene (v4.7 base, widened in v4.8 above):** one vertical composition traveling upward with scroll; three thoughts share the ride with emphasis following distance from center while inactive thoughts persist as dimmed history; serif pronoun leads each line.
- **Footer contact (v4.7, superseded by v4.8 rows above):** Elsewhere channels carried meaning glyphs with dim handles; Discord was a copy action; Pages and control Navigate links use arrow markers.
- **Notes wall (Personality, reworked v4.8, see v4.8 Additions):** hairline-framed dotted canvas (2400 by 1600 world); paper/ink/accent note variants; composer, thread slip, and micro-typographic metadata; local-first with shared API.

- **Statements scene (v4.6, superseded by v4.7 vertical accumulation above):** full-viewport sliding panels with shared crossfade windows and oversized ink bleed; verbs at 17vw with explicit paper color.
- **Skills emblems:** monogram cores render in ink like the marks (uniform beige family); solid full-bleed marks render one step smaller; labels reserve two balanced lines.
- **Footer contact:** Elsewhere channels carry meaning glyphs (code, diamond, document) plus a mail glyph on Email; Pages and control Navigate links use arrow markers; all decorative symbols are aria-hidden.
- **Mark wall (Personality):** hairline-framed dotted field; geometric glyph picker; stamps pop via independent `scale`; localStorage persistence with memory fallback; 150-mark cap.

## v4.5 Additions (EXPERIMENTAL, 2026-09-05)

- **Hero composition:** display cap 12.5rem; identity column `min-w-0` so the name bleeds over the arch by construction; arch max 460px with small-desktop rightward nudge; portrait crop `28% 22%` (face right of center).
- **Statements composition:** shared left-aligned stage; serif "I" (`clamp(2.5rem,6vw,6rem)` italic) over the verb (`clamp(3.5rem,13vw,15rem)`); micro notes; each phase carries its own ink.

## v4.4 Additions (EXPERIMENTAL, 2026-09-04)

- **Skills emblems:** solid full-bleed marks render one step smaller; labels reserve two balanced lines so every slot is uniform.
- **Project cards:** the existing `role` field renders as a muted micro line; stack naming unified.
- **Footer contact:** Elsewhere items are real list items; placeholders are plain text, never anchors.

## v4.3 Additions (EXPERIMENTAL, 2026-09-04)

- **Hero name interaction:** 2D gaussian field (sigma X 130px, sigma Y 85px), lift 0.12em, per-letter springs; rows carry overflow-visible boundaries plus a 0.05em airspace gap; footer marquee carries 0.18em vertical bleed inside its mask. Reduced motion never pins the hero scene.
- **Statements bridge type (v4.3, superseded by v4.5 phases above):** per-line sizes (BUILD 11vw, BREAK 12vw, REBUILD 11vw, same clamp ends), flush-left / flush-right / indented registers, controlled row overlap, activation scale 0.94 to 1.
- **Skills emblems:** real CC0 brand marks rendered monochrome via currentColor (19 of 23 tools); monogram fallback only where no genuine mark exists; hover tints the mark to accent at 1.1 scale.
- **Placeholder links:** client components swallow the click; server components render plain text; every placeholder carries a "coming soon" label.
- **Favicon:** `src/app/icon.svg`, ink field with vermilion diamond.

## v4.2 Additions (EXPERIMENTAL, 2026-08-26)

- **.ink-stage** (globals.css): cinematic ink fields (opening overlay, statements bridge) render #1d1915 on #f3efe6 in BOTH themes so the dark colorway never flashes to cream mid-story. Accent stays ar(--accent).
- **Statements bridge type:** clamp(3.2rem, 10.5vw, 13rem), weight 600, leading 0.95, tracking -0.03em, uppercase; accent trailing period; micro notes at #f3efe6/60. (v4.3: per-line sizes 11/12/11vw with flush-left, flush-right, indented registers; see v4.3 Additions.)
- **Skills marquee rows:** serif italic group headings (existing), gold emblems enlarged to 80px with a logo-ready core slot; rows drift with edge fade masks; certifications keep the hairline register with diamond bullets. (v4.3: the slot now holds real CC0 brand marks for 19 of 23 tools; see v4.3 Additions.)
- **Experience timeline:** central spine (g-ink/15 hairline + accent fill), 45deg-square diamond markers, org blocks at ext-xl/2xl, role periods in accent micro tabular numerals, one-line summaries in muted.
- **Control panel:** outer frame with 6px accent corner ticks, title strip (shikharsahay / control + live status), modules divided by gap-px hairlines with underlined accent labels, footer strip (Vellore, India · UTC +05:30).
- **Footer:** compact contact grid (serif italic Let's talk + structured Elsewhere/Pages columns with meaning glyphs on channels and arrows on page links), slim resume row, closing velocity-wave marquee at 9.5vw with accent diamond separators and edge fades.
- **Removed from the system:** Magnetic component (deleted), P.0x artifact tags, the large Say hello block and footer link rows.
