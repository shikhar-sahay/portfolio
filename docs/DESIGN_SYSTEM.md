# DESIGN_SYSTEM.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Typography

### Font System (EXPERIMENTAL)

| Font             | Role                                    | Status       |
| ---------------- | --------------------------------------- | ------------ |
| Instrument Sans  | Primary: display, body, metadata        | EXPERIMENTAL |
| Instrument Serif | Accent: italic emphasis, ghost numerals | EXPERIMENTAL |

- Loaded via `next/font/google` as `--font-sans` and `--font-serif` (serif: weight 400, normal + italic)
- Rationale: the two faces were designed as a pair; the high-contrast serif italic creates typographic moments (emphasized words, the ghost 01 numeral) without adding a third family
- Rejected earlier candidates: Geist (reads as Vercel template), Space Grotesk (weak at small sizes), Manrope (less distinctive), Satoshi (needs Fontshare self-hosting)

### Type Scale (EXPERIMENTAL)

Fluid, clamp-based (defined in `tailwind.config.ts`):

| Token     | Value                                                  | Use Case              |
| --------- | ------------------------------------------------------ | --------------------- |
| `display` | clamp(4.25rem, 16vw, 14rem), lh 0.88, ls -0.03em, w600 | Hero name             |
| `lede`    | clamp(1.5rem, 3.4vw, 2.75rem), lh 1.22, ls -0.02em     | Statements/intros     |
| `micro`   | 0.6875rem, ls +0.16em uppercase                        | Metadata, nav, labels |
| body      | text-sm / text-base defaults                           | Fragments, support    |

Name treatment: line 1 solid ink; line 2 outline only (`-webkit-text-stroke: 1.5px`, transparent fill), indented 9vw so it intersects the portrait window edge.

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

- Tailwind default 4px-based scale; no custom spacing tokens yet
- Generous negative space: hero is full-viewport (`100dvh`); section padding `py-[16vh]`-`py-[22vh]`
- Consistent page gutter: `px-5` mobile → `px-10` sm+
- Formal token scale remains UNDECIDED

---

## Borders & Radius

### Border Width (UNDECIDED)

- Hairline (1px) - UNDECIDED
- Standard (2px) - UNDECIDED

### Border Radius (UNDECIDED)

| Token       | Value     | Use Case                      |
| ----------- | --------- | ----------------------------- |
| radius-none | 0         | Sharp corners                 |
| radius-sm   | UNDECIDED | Small elements (badges, tags) |
| radius-md   | UNDECIDED | Buttons, inputs, cards        |
| radius-lg   | UNDECIDED | Larger containers             |
| radius-full | 9999px    | Pills, avatars, full round    |

---

## Imagery

### Hero Portrait (FINALIZED - location amended, see DECISIONS.md #19)

- **Source file:** `src/assets/shikhar-hero.jpg` (3024×4032, owner-provided)
- Amended from `public/images/shikhar-hero.jpg` so it can be statically imported (enables automatic blur placeholder). Served URL is unchanged in spirit; next/image optimizes on demand.

### Image Treatment v4.1: the Arch Aperture (EXPERIMENTAL; supersedes the v3 circular instrument)

The portrait is never a rectangle beside text and never an avatar. It is an **editorial arch aperture**:

- Arch aperture: `border-radius: 999px 999px 18px 18px`, aspect 3/3.9, image oversized 4% inside for crop latitude, `object-position: center 22%` so the face stays composed at every viewport
- Offset echo arch behind the photograph: 1px vermilion line at 55% strength, translated 20px down-right, countering the photo on pointer parallax
- Photograph sits slightly desaturated (20% grayscale) and resolves to full color on hover
- Pointer parallax (fine pointers only, disabled under reduced motion): the crop drifts toward the cursor (max 10px), the echo arch drifts against it (max 7px), spring-smoothed
- The name's display type overlaps the arch edge: image and typography share the composition
- Loading: static import, `priority`, `placeholder="blur"`, AVIF/WebP via next/image
- The face-zoom scroll treatment from v2 is **rejected** (owner directive); see ANIMATION.md for the replacement scene-change transition

---

## Responsive Behavior

### Breakpoints (EXPERIMENTAL - Tailwind defaults, mobile-first)

| Name | Width  | Status                                  |
| ---- | ------ | --------------------------------------- |
| sm   | 640px  | EXPERIMENTAL - primary hero breakpoint  |
| md   | 768px  | UNDECIDED                               |
| lg   | 1024px | EXPERIMENTAL - portrait narrows to 31vw |
| xl   | 1280px | UNDECIDED                               |
| 2xl  | 1536px | UNDECIDED                               |

### Hero Responsive Behavior (EXPERIMENTAL)

- Mobile: portrait bleeds off right edge in upper area; statement sits mid; display name anchored bottom with staggered second line; scroll cue hidden on smallest widths
- sm+: portrait grows to right-anchored column (~36vw); cue visible
- Nav stays a quiet horizontal row at all widths (labels are short enough not to require a hamburger)
- No horizontal overflow (`overflow-x: clip` on body)

### Mobile-First Principles (FINALIZED)

- Mobile is a first-class experience, not a shrunken desktop layout
- Touch targets ≥ 44×44px
- Gesture-friendly interactions
- Performance budget stricter on mobile
- Content priority: hero → work → contact

---

## Recurring Motifs (EXPERIMENTAL, v2)

The identity system beyond type and color. Used consistently so sections read as one document:

| Motif                  | Implementation                                                               | Where                                           |
| ---------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| Section indices        | `01` to `07` micro numerals, tabular-nums, accent tick prefix                | Eyebrows, nav, opening, index, contact callback |
| Hairline rules         | 1px `border-ink/15` row separators; accent 40px tick before labels           | Every section                                   |
| Ghost numerals         | Oversized serif italic section number at ~5% opacity                         | About (02), Personality (06)                    |
| Measurement/flow lines | Dashed SVG edges with slow marching-ants animation                           | HawkEye signal map                              |
| Numbered tags          | Bordered micro tags with running index numbers                               | Stack labels, skill items                       |
| Film grain             | Static SVG turbulence overlay, ~5% opacity, fixed                            | Whole site                                      |
| Serif interventions    | Instrument Serif italic for emphasis words, era moods, roles, ghost numerals | Statements, timeline, resume                    |
| Inverted panel         | Single full-tone shift: Personality section uses `bg-ink` + `text-paper`     | Section 06 (inverts per theme)                  |
| Drifting light field   | Two fixed radial gradients (~5% opacity), 80s transform drift                | Whole site (`.atmosphere`)                      |
| Arch aperture portrait | Arch mask + offset vermilion echo arch (see Imagery)                         | Hero (01)                                       |
| Outline display type   | `-webkit-text-stroke` transparent fill for second name line                  | Hero                                            |

## Component Inventory (implemented v2)

- Opening sequence overlay (client, session-gated)
- SiteNav: progress hairline, live section readout, difference-blend links
- ThemeToggle (quiet text control, lives in Contact)
- Reveal / Counter / InView primitives (ui)
- Sections: Hero (aperture), Intro (+ editorial index), Work (3 artifact treatments), Experience (sticky era chronology), Systems (inventory + education + credentials), Outside (fragment instrument), Resume (sheet + PDF actions), Contact (ending with opening callback)

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

## Component Inventory (remaining, UNDECIDED)

- Button variants (primary exists in Resume; ghost/link styles informal)
- Footer exists as Contact section; formal footer deferred
- Form elements (contact): UNDECIDED until contact method is real

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

## Icon System (UNDECIDED)

- Library: UNDECIDED (Lucide, Phosphor, custom SVG, etc.)
- Sizing: UNDECIDED
- Stroke weight: UNDECIDED

---

## Content Width / Layout (UNDECIDED)

- Max content width: UNDECIDED
- Container padding: UNDECIDED
- Grid system: UNDECIDED (likely CSS Grid + Flexbox, no heavy framework)

---

## Notes

This file will evolve as design decisions are finalized. Each section should be updated with `FINALIZED` status once decided, with the actual values documented.

---

## v4.2 Additions (EXPERIMENTAL, 2026-08-26)

- **.ink-stage** (globals.css): cinematic ink fields (opening overlay, statements bridge) render #1d1915 on #f3efe6 in BOTH themes so the dark colorway never flashes to cream mid-story. Accent stays ar(--accent).
- **Statements bridge type:** clamp(3.2rem, 10.5vw, 13rem), weight 600, leading 0.95, tracking -0.03em, uppercase; accent trailing period; micro notes at #f3efe6/60.
- **Skills marquee rows:** serif italic group headings (existing), gold emblems enlarged to 80px with a logo-ready core slot; rows drift with edge fade masks; certifications keep the hairline register with diamond bullets.
- **Experience timeline:** central spine (g-ink/15 hairline + accent fill), 45deg-square diamond markers, org blocks at ext-xl/2xl, role periods in accent micro tabular numerals, one-line summaries in muted.
- **Control panel:** outer frame with 6px accent corner ticks, title strip (shikharsahay / control + live status), modules divided by gap-px hairlines with underlined accent labels, footer strip (Vellore, India · UTC +05:30).
- **Footer:** compact contact grid (serif italic Let's talk + structured Elsewhere/Pages columns), slim resume row, closing marquee wordmark at 9.5vw with accent diamond separators and edge fades.
- **Removed from the system:** Magnetic component (deleted), P.0x artifact tags, the large Say hello block and footer link rows.
