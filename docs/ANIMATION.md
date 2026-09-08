# ANIMATION.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Motion Philosophy (FINALIZED)

| Principle               | Description                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| **Purposeful**          | Every animation serves a function: hierarchy, feedback, narrative, orientation, delight. No decoration. |
| **Restrained**          | Fewer, better animations. Subtle by default. Dramatic only when earned.                                 |
| **Smooth**              | 60fps minimum. No jank, no layout shift. Prefer transform/opacity over layout-triggering properties.    |
| **Cohesive**            | Shared easing, duration scales, and choreography across the site. Feels like one system.                |
| **Cinematic in places** | Select moments can be dramatic - hero entrance, signature experience, section transitions.              |
| **Clean at rest**       | Static state is calm. Motion reveals depth on interaction/scroll.                                       |
| **Respectful**          | Honor `prefers-reduced-motion`. Provide meaningful static alternatives.                                 |

---

## Easing (EXPERIMENTAL)

### Adopted in M1 prototype

| Name            | CSS Value                        | Use Case                                      | Status       |
| --------------- | -------------------------------- | --------------------------------------------- | ------------ |
| `ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | **Primary** - all entrance reveals and drifts | EXPERIMENTAL |
| `ease`          | CSS default                      | Nav/cue fade-in only                          | EXPERIMENTAL |

Remaining candidates remain UNDECIDED until more patterns exist.

| Name               | CSS / JS Value                        | Use Case                       | Status    |
| ------------------ | ------------------------------------- | ------------------------------ | --------- |
| `ease-out-circ`    | `cubic-bezier(0.075, 0.82, 0.165, 1)` | Smooth deceleration            | UNDECIDED |
| `ease-out-quart`   | `cubic-bezier(0.25, 1, 0.5, 1)`       | Standard UI transitions        | UNDECIDED |
| `ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)`      | Full transitions, page changes | UNDECIDED |

---

## Duration Scale (EXPERIMENTAL)

| Token                | Value       | Use Case                            | Status       |
| -------------------- | ----------- | ----------------------------------- | ------------ |
| `duration-fast`      | ~300ms      | Hover/color transitions in nav      | EXPERIMENTAL |
| `duration-base`      | 900ms       | Fade-rise reveals                   | EXPERIMENTAL |
| `duration-slow`      | 1050ms      | Mask-rise type reveals              | EXPERIMENTAL |
| `duration-cinematic` | 1150-1800ms | Portrait clip reveal / scale settle | EXPERIMENTAL |

---

## Implemented Patterns (as built)

### Opening: signal-line loader (`Opening.tsx`)

An ink-field loader, ~1.6s, once per session.

| t       | Beat                                                                                        |
| ------- | ------------------------------------------------------------------------------------------- |
| 0.00s   | Ink field, quiet. Micro "shikhar sahay" top-left, serif "2026" bottom-right                 |
| 0-1.05s | A hairline draws left to right while a vermilion marker rides its tip (rAF, cubic ease-out) |
| 1.05s   | Micro "Ready" appears; field lifts translateY(-100%), 850ms ease-expo; session flagged      |
| 1.9s    | Overlay unmounts                                                                            |

No counters, no percentage, no spinner. The hero boots beneath via the
`--intro-delay` mechanism (head script sets `html[data-intro]` and
`--intro-delay`; skipped pre-paint for returning visitors and reduced
motion).

### Hero entrance (time-based CSS, `forwards` fill where needed)

Runs on page load; no JS required. Easing `ease-out-expo` unless noted;
delays stack on `--intro-delay` (0s for returning visitors and reduced
motion, where everything lands instantly).

| Delay  | Element                       | Motion                                                               |
| ------ | ----------------------------- | -------------------------------------------------------------------- |
| +0.25s | Name letters (staggered 45ms) | Fade-and-rise per letter (never a mask, never clips)                 |
| +0.25s | Arch aperture                 | Clip-path wipe bottom-to-top (1.25s); photo settles from 1.14x scale |
| +0.6s  | Statement lede                | Fade-rise                                                            |
| +0.8s  | Context row                   | Fade-rise                                                            |
| +1.4s  | Scroll cue                    | Fade-in, then continuous cue-travel loop (accent segment, 2.2s)      |

### Hero portrait motion (arch aperture)

- Boot: the arch reveals via clip-path wipe bottom-to-top (1.25s) while the photograph settles from 1.14x scale and 20% grayscale (stays desaturated until hovered to full color).
- Ambient: none. The portrait is calm at rest; the only ambient layers are the site-wide grain and light field.
- Pointer parallax (fine pointers, reduced-motion-gated): crop drifts up to 10px toward the cursor, echo arch up to 7px against it, spring-smoothed (stiffness 55, damping 18), resets on pointerleave.
- The face-zoom scroll treatment from v2 is explicitly rejected (owner directive). The replacement is the ink-veil scene change below.

### Hero scene change (scroll-scrubbed, 120svh scene, `Hero.tsx`)

One `useScroll` progress drives every layer; all input ranges end at 1.0 (see the binding rule in v4.5):

- Composition separates while the frame stays full: "SHIKHAR" travels up-left, "SAHAY" (outline) travels down-right, both fading late; the arch exits laterally with a whisper of rotation and fades last.
- An ink veil rises from the bottom carrying the opening statement ("I build." plus caption) and hands a full ink frame to the statements bridge. Late opacity fades happen behind the veil, never on their own.
- An ink tail block covers exactly the transparent zone below the sticky frame so the post-release scroll never flashes paper.
- A handoff hairline draws at the stage bottom; the scroll cue fades almost immediately.
- Reduced motion: the scene never pins (renders as a normal section); no veil is rendered.

### Statements bridge (vertical accumulation with residual echoes, `TransitionStatements.tsx`)

The section overlaps the hero by exactly one viewport so its sticky engages the pixel the hero releases. Each thought phase carries its own ink over a transparent stage (the bridge is pointer-transparent so hero hover survives underneath).

- One thought on stage at a time in a shared left-aligned composition: serif "I", then the verb unmasking bottom-up with a rise, then the micro note. BUILD [0, 0.08]/[0.28, 0.36], BREAK [0.28, 0.36]/[0.6, 0.68], REBUILD [0.6, 0.68] holding to release. Crossfade windows are shared, so one thought always leads and two never collide.
- The finale never exits: it holds its frame while About enters beneath it.
- Reduced motion: a static stacked block with matching alignment, full ink.

### Word-by-word reading reveal (`WordReveal.tsx`)

Used in About and Experience ledes. Words start at 18% opacity and brighten to full ink in reading order, driven by one scroll progress value; each word is a motion.span with a per-word range (`[i/n, min(1, (i+1.5)/n)]`). Reduced motion and no-JS: fully inked plain text.

### Experience timeline

- The vertical hairline draws downward (accent scaleY on a scroll spring, origin top); a base hairline sits beneath it. Both are 1px, centered so the axis passes through every marker center.
- Org blocks reveal once (rise + fade); roles inside stagger; diamond markers pop in once and fill vermilion plus rotate on hover. One line of summary per role.

### Skill emblems

Each tool is a gold-ring emblem with a monochrome core (real brand mark, or a serif monogram in the same ink where no genuine mark exists); the core tints to accent at 1.1 scale on hover. The ring rotates 90 degrees and a dashed orbit wakes on hover. Emblem rows drift as infinite CSS marquee loops (alternate directions, pause on hover, edge fade). Gold exists only in rings and the Certifications register.

### Project carousel (`Projects.tsx`, lazy `ProjectPanel.tsx`)

- Single rAF loop owns a two-copy track: auto-drift 40px/s until the first interaction (drag, swipe, arrows, keys), then manual for the session. Arrow/keyboard targets tween toward the card grid (lerp 0.16); drag writes the offset directly; release settles to the grid; clicks after drags are suppressed. Offset wraps modulo one exactly measured copy width. The loop pauses offscreen via IntersectionObserver.
- Forward (Next, ArrowRight, drift) is negative offset. Placeholder links are inert so clicks and drag releases never navigate.
- Cards are uniform (fixed preview surface, clamped description, pinned stack/links rows); preview motifs animate via the `data-inview` gate. Reduced motion: native scroll row with instant arrow scrolls.

### Footer wordmark (`FooterWordmark.tsx`, rebuilt v4.9 as one object)

The name as a slow infinite marquee (two identical groups, -50% loop, pauses on hover). Pointer velocity leans every copy identically (uniform skew plus a breath of stretch), tracking widens slightly inside, and a narrow vermilion sheen band follows the cursor across per-copy accent overlays. No letter moves alone. One rAF loop runs only while the pointer is inside or settling, with zero per-frame layout reads. Separators are 0.16em diamonds with 0.7em air. Reduced motion: a single static fitted wordmark.

### Header (`SiteNav.tsx`)

- Transparent with generous padding at top; compact with a paper backdrop, blur, and hairline edge past 64px; tucks away scrolling down past the hero, returns on scroll up.
- Active section carries an accent underline (IntersectionObserver); a progress hairline (accent scaleX) runs along the very top. Theme-colored links (no blend modes). All time-based motion uses the shared expo easing.
- Six destinations share one row from md up; below md a disclosure menu carries them (Escape or selection closes; selection jumps after the panel unmount settles; focus moves into the panel on open).

### Pieces of Me fragment instrument (`Personality.tsx`)

- Selecting a fragment (hover, focus, or click/tap) swaps the large serif word and caption instantly (no transition choreography; `aria-live` announces the change). Active button fills vermilion. No backend, no persistence: selection is local state only. The word column has a fixed width so swaps never reflow the buttons (a past hover feedback loop).

### Mark wall (SUPERSEDED by the notes wall below; `MarkWall.tsx` deleted)

### Notes wall (`NotesWall.tsx`, opened up v4.9)

- Full-bleed section-width surface (no box, no boundary): dotted field plus vignette only. Pan is direct manipulation: pointer drag writes a clamped canvas transform through rAF (no React state during pan); wheel always scrolls the page, never the wall; touch keeps vertical page scroll (`touch-pan-y`) with horizontal drag panning; arrow keys pan when focused; a docked Latest button flies the camera to the newest global note (650ms expo flight, jump under reduced motion) and opens its thread.
- Cards rest tilted (deterministic per id) and straighten plus lift on hover and keyboard focus (500ms expo; instant under reduced motion); placed notes arrive with a short fade-rise settle. Composing shows a cursor-following placement ghost written straight to the DOM (no re-renders). No continuous animation anywhere.
- Opening the thread slip or composer moves focus inside it (no scroll), so Escape and Tab continue from the wall.
- Virtualized: only notes near the viewport render (capped at 150); visibility recomputes on pan end and data change, never per frame.

### Control center micro-motion

- Modules warm to surface on hover; module diamonds rotate; channel tiles lift for real links; navigation arrows nudge on hover. IST clock and session uptime tick once per second (the only per-second React state on the page).

### Theme crossfade

- 0.7s CSS transition of background-color/color/border-color on body and `.theme-fade` containers; no JS animation. Cinematic ink fields (`.ink-stage`) stay dark in both themes.

### Motion language: ARRIVE / DISCOVER / TRANSFORM / SETTLE / DEPART

| Verb      | Meaning                              | Patterns in this site                                                     |
| --------- | ------------------------------------ | ------------------------------------------------------------------------- |
| ARRIVE    | A thing enters with intention        | Loader lift, letter stagger, masked verb reveals, emblem rows drifting in |
| DISCOVER  | Content reveals itself progressively | Word-by-word reading, counters, signal motifs staggering in on view       |
| TRANSFORM | State changes as you travel          | Hero scene change, veil handoff, thought crossfades, fragment word swap   |
| SETTLE    | The page comes to rest, calm         | REBUILD hold, pinned finale frames, quiet section padding                 |
| DEPART    | The journey closes the loop          | REBUILD resolving into About, marquee wordmark closing the page           |

### Reduced Motion (as built)

- Opening overlay: never rendered (`data-intro="skip"` set pre-paint).
- Hero: never pinned; entrance collapses instantly; no parallax; no veil.
- Statements: static stacked block (no pin, no overlap pull-up).
- Carousel: native scroll row, instant arrows.
- Footer: static fitted wordmark, no marquee.
- Pieces of Me, control panel, timeline: instant state changes, ticking clocks render (time itself is not motion).
- Global CSS collapses all animation/transition durations; `useMountedReducedMotion` gates every client branch post-mount so SSR and hydration markup match.
- Verified via `reducedMotion: 'reduce'` emulation: no hydration errors, complete static page.

---

## Transition Patterns (as built)

### Entrance / Reveal

| Pattern                | Description                                                     | Where                               |
| ---------------------- | --------------------------------------------------------------- | ----------------------------------- |
| **Fade + rise**        | `opacity: 0 → 1`, `translateY: 14-28px → 0`, ease-expo, 0.9s    | Hero boot, `Reveal` everywhere      |
| **Per-letter stagger** | 45ms stagger, fade-and-rise, no masks                           | Hero name entrance                  |
| **Clip-path wipe**     | Arch reveals bottom-to-top 1.25s; verb masks travel with scroll | Portrait boot, statement verbs      |
| **Line draw**          | Hairline scaleX + traveling cue segment                         | Opening loader, handoff, scroll cue |

### Scroll-Driven

| Pattern            | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| **Pinned scenes**  | `sticky top-0 h-dvh` inside a taller section; native pinning, no hijack |
| **Scrub**          | One `useScroll` progress per scene, pure `useTransform` mapping         |
| **Terminal stops** | Every input range ends at 1.0 (binding Motion v13 rule)                 |

### Interaction

| Pattern          | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **Spring rise**  | Per-letter underdamped springs (170/15) in a 2D pointer field            |
| **Hover states** | Tint/scale/rotate transitions (300-700ms expo); tiles lift; ticks extend |
| **Drag**         | Pointer-driven carousel offset with grid settle and click suppression    |
| **Focus**        | Global accent focus-visible ring; no animated focus traps                |

---

## Choreography Principles (as built)

### Stagger

- Hero letters: 45ms per letter. Role rows: 90ms per role. Motif nodes: 40-150ms via inline transition delays. Eyebrow/lede pairs: 80ms `delay`.

### Sequencing

- Hero entrance: eyebrow, name, arch, lede, context row, cue (delays stack on `--intro-delay`).
- Section entrance: eyebrow, lede, content (Reveal `delay` per block).
- Statement phases: pronoun, verb mask, note; outgoing masks away before the incoming verb completes.

### Coordination

- Scroll-driven motion is deterministic: state is always a pure function of scroll progress (identical forward and reverse). No observers gate visibility; no timeouts drive choreography.
- Reduced motion: all choreography has a complete static equivalent (see below).

---

## Reduced Motion (FINALIZED)

### Requirements

- Detect `prefers-reduced-motion: reduce` via CSS media query and JS `matchMedia`
- **All** animations must have a reduced-motion variant
- Reduced variant: **instant** (0ms) or **single fade** (150ms max)
- No parallax, no scrub, no stagger, no auto-play motion
- Scroll-driven animations → static final state
- Canvas/WebGL experiences → static fallback image or simplified static render

### Implementation Strategy

```css
/* Global reduced motion (globals.css) */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// JS gate: useMountedReducedMotion (hydration-safe; server and first
// client render agree, the flag flips after mount). Every client branch
// (pinned scenes, veils, loops, marquees, parallax) keys off this hook.
```

### Exceptions

- **Ticking clocks** (IST, session uptime) keep ticking: time display is information, not motion.
- **Instant state changes** (fragment swap, theme switch, carousel arrows) stay functional with zero animation.

---

## Performance Guidelines (FINALIZED)

| Rule                           | Description                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| **Transform/Opacity only**     | Prefer `transform`, `opacity`, `clip-path` - they avoid layout work                    |
| **Will-change sparingly**      | Presentational `will-change-transform` on animated tracks and letters                  |
| **Layout thrashing avoidance** | Batch reads/writes; centers cached, never read per frame (`InteractiveLetters`)        |
| **Bundle size**                | Motion v13 is the only animation dependency (~15 KB gzipped); nothing else installed   |
| **Lazy load heavy animation**  | `next/dynamic` with `ssr: false` for the below-fold `ProjectPanel` chunk               |
| **IntersectionObserver**       | Carousel offscreen pause, nav active section, Motion `whileInView`/`useInView` reveals |

---

## Animation Library Usage (FINALIZED)

### Motion (the `motion` package, v13; installed)

- Scroll animations (`useScroll`, `useTransform`) for all scene choreography
- `whileInView` reveals, springs (`useSpring`), scroll events (`useMotionValueEvent`)
- Gestures are hand-rolled pointer handlers, not Motion gestures (no `whileHover`/`drag` in the codebase)

### Not used (excluded unless a documented reason emerges)

- GSAP, Lenis, Three.js / React Three Fiber: none installed, none needed so far

---

## Accessibility (FINALIZED)

- **Never** animate content that conveys information without text alternative
- **Never** use animation as sole indicator of state (combine with color/shape/text)
- **Always** provide reduced-motion equivalent
- **Respect** `prefers-reduced-motion` at OS/browser level
- **Avoid** flashing > 3Hz (WCAG 2.3.1)
- **Ensure** focus indicators are visible during/after animations

---

## Testing Checklist

- [x] `prefers-reduced-motion: reduce` - complete static page, no hydration errors (emulation verified)
- [x] `prefers-reduced-motion: no-preference` - full experience
- [ ] Low-end device (throttled CPU) - not measured
- [x] Mobile touch - pointer interactions disabled, full content present
- [x] Keyboard navigation - focus visible, carousel arrows wired, no motion traps
- [ ] Screen reader - landmarks and labels in place; no dedicated screen-reader audit yet
- [x] Chrome desktop/mobile widths (1920/1440/768/375) plus emulation; Firefox/Safari/Edge not tested

---

## Token Reference (as built)

```typescript
// Easing: ease-out-expo everywhere motion eases.
export const expo = [0.19, 1, 0.22, 1] as const; // CSS cubic-bezier(0.19, 1, 0.22, 1)
```

| Use                        | Duration                  | Notes                                 |
| -------------------------- | ------------------------- | ------------------------------------- |
| CSS entrance (fade/rise)   | 0.9-1.05s                 | `anim-fade-rise`, letter stagger 45ms |
| Arch reveal / photo settle | 1.25-1.9s                 | Clip wipe + scale settle              |
| Opening lift               | 850ms                     | Field translateY(-100%)               |
| Hover transitions          | 300-700ms                 | Tint, scale, rotate, tick extension   |
| Carousel arrow tween       | lerp 0.16/frame           | Settles in ~0.5s                      |
| Letter springs             | stiffness 170, damping 15 | Slightly underdamped                  |
| Nav tuck                   | 450ms                     | Header translate                      |
| Theme crossfade            | 700ms                     | CSS only                              |

---

## Notes

Motion values are now concrete (see Implemented Patterns and Token Reference above). Open motion work: M6 signature experience concept (must justify any new dependency), low-end device profiling, screen-reader audit.

**Key rule:** If you add a new animation pattern, document it here with its easing, duration, and reduced-motion behavior.

---

## v4.5 Opening Choreography (EXPERIMENTAL, 2026-09-05)

### Motion range rule (binding)

- Every scroll-driven `useTransform` input range MUST end at 1.0. Verified empirically: a flat terminal segment whose last input sits below 1.0 (e.g. `[0.5, 0.72, 0.9]` to `[0, 1, 1]`) collapses once progress passes the last keyframe (the exit-veil text read opacity 0 at progress 1 and caused the blank post-hero frame). Rising terminal segments tolerate overrun; flat ones do not. When in doubt, append a terminal stop (`[0.5, 0.72, 0.9, 1]` to `[0, 1, 1, 1]`).

### Hero exit plus bridge overlap

- The hero scene keeps its 120svh pin; an ink tail block (`h-[calc(120svh-100dvh)]`, pinned only) covers exactly the transparent zone below the sticky frame so the post-release scroll never flashes paper.
- The statements section is pulled up `-mt-[100dvh]` so its sticky engages the exact pixel the hero releases: the wipe is veil against incoming thought, with no tail and no gap. Each thought phase carries its own ink (the stage is transparent), so the hero stays pristine underneath until the first thought arrives; the bridge is pointer-transparent so hero hover survives the overlap.
- Phase crossfades share windows (outgoing exit equals incoming enter) so some thought is always present; verb masks travel bottom-up on entry and top-down on exit.

### Statements scene (v4.7 vertical accumulation, corrected v5.0; supersedes sliding panels)

- One typographic composition travels upward with scroll (stack offset 42vh to minus 50vh over the section): three thoughts share the ride, and emphasis follows distance from center while inactive thoughts persist as dimmed, slightly smaller history above and below. Serif "I" leads each line slightly, the note trails; verbs at `clamp(4rem, 12.5vw, 14rem)` in theme ink.
- Each row carries its static full-word echo (the complete verb, 21vw, low-right, cropped by the frame edge) and a progressive left offset (diagonal cascade, flush on mobile): no extra motion state, so determinism is unchanged. Subtlety is element opacity (`opacity-[0.06]`, `dark:opacity-[0.09]`): the v4.9 two-letter residues existed because full words at full strength stacked into mud, and color opacity modifiers do not compile against the bare `var()` tokens (see DECISIONS.md #39).
- Theme-deliberate surfaces: paper in light, deep warm charcoal in dark; hero veil and tail match per theme so both handoffs stay seamless.
- Travel matches scroll direction, so motion always feels caused. The finale holds strong through release while About enters beneath it. All ranges end at 1.0; every state is a pure function of progress (identical forward and reverse).
- Reduced motion: static stacked block with matching alignment and residues.

### Hero tagline rule (`TaglineRule` in `Hero.tsx`, v4.9; supersedes the v4.8 afterimage)

- A 2px vermilion rule draws beneath the serif word on enter (scaleX spring) while a 7px diamond rides to the cursor (position spring); movement glides the marker, leave retracts the rule and fades the marker. Touch taps hold 900ms before release (enter/leave batch in one frame otherwise).
- No loop runs: springs settle on leave, every value returns to rest. No layout (absolute), no tab stop, single AT reading. Absent entirely under reduced motion.

## v4.3 Patterns (EXPERIMENTAL, 2026-09-04)

### InteractiveLetters (per-letter pointer reactivity, hero)

- Each letter owns an independent spring (stiffness 170, damping 15) driven by a two-dimensional gaussian proximity field around the pointer (sigma X 130px, sigma Y 85px; lift default 0.12em). The tight vertical falloff keeps stacked rows independent: hovering one row leaves the other at rest.
- Containers never wrap (`whitespace-nowrap`) so display type stays on one line at any width.
- Accent wash strength is tunable per use (`tintStrength`, default 85).
- One rAF loop per instance; letter centers cached in viewport coordinates on pointerenter and refreshed on scroll while the pointer is inside (scroll-driven transforms move the letters), so the loop never reads layout per frame.
- Clip-free by construction: overflow visible through the whole ancestor chain except the viewport-sized sticky frame; hero rows separated by a small top margin.
- Fine pointers only; static under reduced motion and on touch. Used by the hero name (and the static reduced-motion footer wordmark with tint off).

### Footer wordmark (SUPERSEDED in v4.9 by the one-object response above)

- v4.6/v4.8: velocity wave with per-letter rise, lean, and swell. Removed after it read as childish; the whole-word lean plus sheen replaces it. History in git and DECISIONS.md.

### Hero exit (surface-matched veil handoff, themed v4.9)

- Two beats over a 120svh scene: the composition separates (name lines sweep apart, portrait exits laterally) while the frame stays full, then a veil in the statements surface rises from the bottom (paper in light, deep warm charcoal in dark) and hands a full frame to the bridge. The veil carries no text: the bridge owns every word, so nothing can duplicate across the handoff. Late opacity fades happen behind the veil, never on their own.
- Reduced motion: the scene never pins (static section scrolls normally); no veil is rendered.

### Statements bridge (SUPERSEDED by the v4.5 phased composition above)

- v4.2/v4.3: all three statements shared one sticky stage with scroll-driven emphasis (inactive at 0.16 opacity); v4.3 arranged them in interlocked full-width registers. Replaced in v4.5 by one-thought-at-a-time phases with masked reveals. History in git and DECISIONS.md.

### Experience spine

- Accent line scaleY bound to section scroll progress via useSpring (stiffness 70, damping 22), origin top. Diamond markers scale in once per org block (whileInView).

### Experience artifacts (`ExperienceArtifacts.tsx`)

- Shared foundation, distinct physical personalities. One normalized pointer position per object, one 900px perspective stage, spring return to identity, still at rest. Per-org specs set tilt range (1.5 to 5 degrees), drift (2 to 4px), settle scale, lift, twist, radial give (GDG only), press dip (tile and badge), and spring voice (heavy 120/20 for the shield, snappy 220/14 for the coin). Baked PNG lighting carries all material response: no sweep overlays, no traveling highlights, no shine layers anywhere (removed as a system rule). No loops, no continuous animation; transform and opacity only; mouse-only tracking so touch scrolling stays clean.
- Keyboard: focusing an org link wakes its artifact with the same gentle engagement (no extra tab stops; figures stay decorative and unfocused). Reduced motion: fully visible static figures, no tilt, no press, no entrance.
- Scroll entrance is shared, once: opacity 0 to 1, 14px rise, 0.98 to 1 scale, 0.8s expo. Personality comes from interaction, never from the entrance.

### Skills marquee

- CSS translate3d keyframe loop, width: max-content, two identical halves, uniform item slots (margins, not gap) so -50% is seamless. 20 to 50s per row, alternate rows reversed, animation-play-state: paused on hover, none under reduced motion, edge fade via mask-image.

### Projects carousel

- Single rAF loop owns the track: drift 40px/s; arrow/keyboard targets tween at lerp 0.16; drag writes offset directly; on release the offset eases to the nearest card boundary. Offset wraps modulo one copy width (two copies rendered). Loop pauses via IntersectionObserver when offscreen. Reduced motion: no loop, native overflow scroll, instant arrow scrolls.
- Forward (Next, ArrowRight, drift) is negative offset. One copy width is summed from slide offsetWidth plus margin (scrollWidth drops the trailing margin and would put every wrap 24px off grid). Placeholder links are inert (client preventDefault; server components render plain text) so clicks and drag releases never navigate.
