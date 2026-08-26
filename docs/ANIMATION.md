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

## Implemented Patterns (v5 - EXPERIMENTAL)

### Opening: signal-line loader (`Opening.tsx`)

An ink-field loader, ~1.6s, once per session. Replaces the v4 title
sequence (owner feedback: it read as a blank title card).

| t     | Beat                                                                                          |
| ----- | --------------------------------------------------------------------------------------------- |
| 0.00s | Ink field, quiet. Micro "shikhar sahay" top-left, serif "2026" bottom-right                    |
| 0-1.05s | A hairline draws left to right while a vermilion marker rides its tip (rAF, cubic ease-out) |
| 1.05s | Micro "Ready" appears; field lifts translateY(-100%), 850ms ease-expo; session flagged         |
| 1.9s  | Overlay unmounts                                                                              |

No counters, no percentage, no spinner. The hero boots beneath via the
`--intro-delay` mechanism (head script sets `html[data-intro]` and
`--intro-delay`; skipped pre-paint for returning visitors and reduced
motion).

### Statements bridge (hero to About, `TransitionStatements.tsx`)

A pinned 300svh ink-field section between hero and About. Three large
statements reveal in sequence with scroll: "I build." / "I break." /
"I rebuild.", each with a micro caption, middle line indented. Earlier
lines dim to 30% as the next arrives; the stage fades into About.
Reduced motion: a static stacked block.

### Word-by-word reading reveal (`WordReveal.tsx`)

Used in About and Experience ledes. Words start at 18% opacity and
brighten to full ink in reading order, driven by one scroll progress
value; each word is a motion.span with a per-word range. Reduced motion
and no-JS: fully inked plain text.

### Experience timeline

The vertical hairline draws downward (scaleY, whileInView once). Entries
reveal with stagger. Markers are small rotated squares that fill
vermilion on hover (no dots). One line of summary per role.

### Skill emblems

Each tool is a gold-ring emblem with a serif italic monogram; the ring
rotates 90 degrees and a dashed orbit wakes on hover. Gold exists only in
Skills and Certifications.

### Project carousel

Looping horizontal carousel: duplicated list, translateX by slide step,
silent snap after crossing the clone boundary; prev/next buttons, arrow
keys, touch swipe. Panels are code-split (dynamic, ssr:false) with a
fixed-height skeleton.

### Footer wordmark

Per-letter spans: hover/touch lifts a letter 8px, rotates 3 degrees, and
shifts it to the accent. Fitted with viewport-relative sizing; no
overflow at any width.

### Older patterns (v4 and earlier)

The v4 title sequence, circular instrument, and aperture-zoom history are
documented in git history and DECISIONS.md; they are superseded.

### Portrait motion (v4.1 arch; the v3 ring instrument is removed)

- Boot: the arch reveals via clip-path inset bottom-to-top (1.25s) while the photograph settles from 1.14x scale and 20% grayscale
- Ambient: none. The portrait is calm at rest; the only ambient layers are the site-wide grain and light field
- Pointer parallax (fine pointers, reduced-motion-gated): crop drifts up to 10px toward the cursor, echo arch up to 7px against it, spring-smoothed (stiffness 55, damping 18), resets on pointerleave

### Scene-change scroll transition (replaces the rejected face zoom)

The v2 full-bleed face zoom is **explicitly rejected** (owner directive). The hero pins for 150svh and the scene changes:

- Typography separates into layers: "SHIKHAR" travels up-left, "SAHAY" (outline) travels down-right, both fading by p=0.55
- The instrument exits laterally: x 0 to 22vw, y to -8svh, scale to 0.72, fading at the end
- A hairline draws left-to-right (p 0.35 to 0.8) at the stage bottom, becoming the boundary into About
- Statement/context/cue fade early; the handoff reads as a scene change, never a camera move

### Reduced Motion (v4 status)

- Opening overlay: never rendered (`data-intro="skip"` set pre-paint)
- Hero: `--intro-delay` is 0s; entrance animations collapse via the global duration rule; portrait/rings/labels render in final state
- Ring rotation, atmosphere drift, cue travel: stopped by the global rule (iteration-count 1, duration 0.01ms)
- Pointer parallax: not attached under reduced motion
- Verified via Playwright `reducedMotion: 'reduce'`: overlay absent, hero complete

### Motion language: ARRIVE / DISCOVER / TRANSFORM / SETTLE / DEPART

| Verb      | Meaning                              | Patterns                                                              |
| --------- | ------------------------------------ | --------------------------------------------------------------------- |
| ARRIVE    | A thing enters with intention        | Opening curtain-lift, masked type rises, clip/curtain reveals         |
| DISCOVER  | Content reveals itself progressively | Counters count up on view, signal map flows in, manifest rows stagger |
| TRANSFORM | State changes as you travel          | Aperture expansion, sticky era year/mood swap, fragment word swap     |
| SETTLE    | The page comes to rest, calm         | Full-bleed photo hold, sticky index, quiet section padding            |
| DEPART    | The journey closes the loop          | Contact callback to opening indices, "fin."                           |

### Opening Sequence v3 (SUPERSEDED by v4 above; kept for history)

- Full-screen paper overlay: name top-left, "A portfolio, in seven parts" top-right, giant ticking index `01` to `07` with serif "/ 07", accent progress hairline, "Establishing / 2026" footer
- Numbers tick every 115ms (7 ticks, ~900ms), exit at 1150ms via translateY(-100%) 700ms ease-expo, unmount at 1850ms
- Scroll locked during the sequence
- Skipped entirely when `prefers-reduced-motion: reduce` or when `sessionStorage.opened` is set (repeat visits in the same session see nothing)
- Total cost: ~1.6s once per session; no media, no layout shift (overlay is fixed)

### Section patterns (new in v3)

| Pattern               | Section    | Implementation                                                                                                                                                        |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial index       | Intro      | Sticky list; hover/focus reveals note, name nudges x (CSS only)                                                                                                       |
| Contextual counters   | Work       | `Counter` counts up on first view (rAF, quartic ease-out, 1400ms); static under reduced motion                                                                        |
| Signal flow           | Work       | `InView` sets `data-inview`; nodes transition in staggered, dashed edges run `signal-flow` (marching dashes, 1.6s linear infinite)                                    |
| Manifest stagger      | Work       | HolmesKit rows fade-rise staggered 80ms via the same `data-inview` gate                                                                                               |
| Sticky era chronology | Experience | IntersectionObserver updates sticky year + serif mood; era indicator lines switch accent                                                                              |
| Fragment instrument   | Outside    | Hover/focus/click swaps large serif word + caption (aria-live polite)                                                                                                 |
| Navigation instrument | Global     | Progress hairline (scaleX via scrollYProgress), live `NN / 07 Name` readout (IO), difference-blend white links so the nav survives the inverted panel and both themes |
| Ending callback       | Contact    | Static `01 02 03 04 05 06 07` row + serif "fin." echoes the opening                                                                                                   |

### Hero scene (revised in v3)

- Scene length history: 240svh (v2) to 180svh (v3) to 150svh (v4); the full-bleed zoom was removed entirely in v4
- All v2 aperture mechanics unchanged (see decision history); drift constants re-validated after shortening

### Reduced Motion (v3 status, superseded by v4 above)

- Opening overlay: skipped entirely (immediate portfolio)
- Counters: render final values statically
- Signal map / manifest: `data-inview` still applied; global duration collapse makes transitions instant; marching-ants loop collapses (iteration-count 1)
- Era tracking, fragment swap, nav readout: functional without motion (state changes are instant)
- Verified via Playwright `reducedMotion: 'reduce'` emulation: overlay absent, page fully composed

### Hero/aperture details (v2, retained)

### Animation Library (added this session)

**Motion for React** (package `motion`, ~15 KB gzipped) is now installed and used for:

- Scroll-scrubbed choreography (`useScroll` + `useTransform`) in the hero scene
- `whileInView` reveals in the introduction
- Nav fade tied to scroll position

Rationale: the aperture sequence needs multi-phase, scroll-scrubbed interpolation of transform values. Hand-rolled CSS custom-property math was brittle to tune; Motion provides reliable scrubbing with built-in `useReducedMotion`. This matches the architecture principle (Motion is the planned primary animation library). Entrance choreography remains pure CSS (works pre-hydration).

> **IMPORTANT for future agents (Motion v13 quirk):** 2-point `useTransform` ranges did not hold their end value beyond the range in testing (opacity mirrored back toward its start value). Always use explicit 3-point ranges with a terminal stop, e.g. `useTransform(p, [0.16, 0.36, 1], [1, 0, 0])`.

### Entrance Sequence (time-based, CSS-only keyframes, `forwards` fill)

Runs on page load; no JS required. All easing `ease-out-expo` unless noted.

| t (delay) | Element                 | Motion                                                                                   |
| --------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| 0.15s     | Portrait aperture       | "Curtain" opens: outer scaleX 0.02 → 1 with counter-scaled inner (no distortion), 1400ms |
| 0.75s     | Name line 1 ("SHIKHAR") | Mask rise: translateY(115%) → 0 inside overflow-hidden span, 1100ms                      |
| 0.92s     | Name line 2 ("SAHAY")   | Mask rise (outline stroke treatment), 1100ms                                             |
| 1.10s     | Statement               | Fade-rise (opacity 0→1, translateY 14px→0), 900ms                                        |
| 1.25s     | Corner meta             | Fade-rise                                                                                |
| 1.50s     | Navigation              | Fade-in                                                                                  |
| 1.90s     | Scroll cue              | Fade-in, then continuous cue-travel loop (accent segment sliding down a hairline, 2.2s)  |

### Scroll Sequence (hero → full-bleed photograph → introduction)

- Scene wrapper was `240svh` in v2, `180svh` in v3, `150svh` in v4 with a `sticky top-0 h-dvh` stage: native pinning, no scroll hijacking
- `useScroll({ offset: ['start start', 'end end'] })` drives `scrollYProgress` (p)
- Phases:
  - p 0 → 0.08: scroll cue fades
  - p 0 → 0.22: statement and corner meta fade out
  - p 0.04 → 0.62: aperture scales 1 → 4.35 with compensating x/y drift so the face lands centered at full bleed (desktop drift: -30vw, +56svh; mobile: -34vw, +36svh; chosen via matchMedia)
  - p 0.16 → 0.36: display title scales to 1.32, rises 30svh, fades out (pushed "past the camera")
  - p 0.42 → 0.56: photo credit ("Shikhar Sahay · 2026", accent dot) fades in bottom-right
  - p 0.62 → 1: full-bleed hold with slow inner zoom (1 → 1.09) and upward photo drift; then the stage unpins and the introduction slides over
- Inner photo has constant counter-parallax (drifts -9% over the scene)
- Transform/opacity only; compositor-friendly

### Navigation Fade

- Nav fades out (opacity + slight rise) over scrollY 140 → 460px: once the aperture takes the viewport, fixed nav text would sit illegibly on the photograph
- `pointer-events: none` when hidden; nav behavior is revisited in M2

### Introduction Reveals

- `whileInView` (IntersectionObserver via Motion), once per element, 12% viewport margin
- Staggered: eyebrow, lede statement, then fragment columns (+0.08s each)
- ease-out-expo, y 28px → 0

### Theme Crossfade

- 0.7s CSS transition of background-color/color/border-color on body and `.theme-fade` containers; no JS animation

### Reduced Motion Behavior (implemented)

- Global media query collapses all CSS animation/transition durations to 0.01ms → elements jump to final visible state instantly
- `useReducedMotion()` from Motion: all scroll-driven styles are omitted (scene renders in resting composed state; content complete and coherent)
- Cue travel loop is disabled by the global duration collapse
- Theme crossfade collapses to instant switch

---

## Transition Patterns (UNDECIDED)

### Entrance / Reveal

| Pattern                | Description                               | Status    |
| ---------------------- | ----------------------------------------- | --------- |
| **Fade + Slide Up**    | `opacity: 0 → 1`, `translateY: 20px → 0`  | UNDECIDED |
| **Fade + Scale**       | `opacity: 0 → 1`, `scale: 0.95 → 1`       | UNDECIDED |
| **Staggered Children** | Parent triggers children with delay       | UNDECIDED |
| **Clip Path Reveal**   | `clip-path: inset(100% 0 0 0) → inset(0)` | UNDECIDED |
| **Line Draw**          | Stroke dash offset for SVG lines          | UNDECIDED |

### Scroll-Driven

| Pattern             | Description                                      | Status    |
| ------------------- | ------------------------------------------------ | --------- |
| **Progress Reveal** | Element animates based on scroll progress        | UNDECIDED |
| **Parallax**        | Background moves slower than foreground          | UNDECIDED |
| **Pin & Animate**   | Section pins while internal animation plays      | UNDECIDED |
| **Scrub**           | Animation timeline directly controlled by scroll | UNDECIDED |

### Interaction

| Pattern         | Description                       | Status    |
| --------------- | --------------------------------- | --------- |
| **Hover Lift**  | `translateY: -4px`, subtle shadow | UNDECIDED |
| **Hover Scale** | `scale: 1.02-1.05`                | UNDECIDED |
| **Tap Press**   | `scale: 0.97-0.98` on press       | UNDECIDED |
| **Focus Ring**  | Animated focus outline            | UNDECIDED |
| **Magnetic**    | Element follows cursor slightly   | UNDECIDED |

---

## Choreography Principles (UNDECIDED)

### Stagger

- **Default stagger:** UNDECIDED (e.g., 50-100ms per item)
- **Max stagger:** UNDECIDED (e.g., 300ms total for a group)
- **Direction:** Top-to-bottom, left-to-right, or center-out

### Sequencing

- **Hero entrance:** Name → Statement → Portrait → Invitation (staggered)
- **Section entrance:** Title → Content → Media (staggered)
- **Exit/transition:** Reverse of entrance or crossfade

### Coordination

- **Scroll + Time:** Scroll-triggered animations should feel temporal, not mechanical
- **Reduced motion:** All choreography collapses to instant or single fade

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
/* Global reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```typescript
// JS hook for conditional logic
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### Exceptions

- **User-triggered** animations (e.g., click to expand) may still animate but faster
- **Loading/progress** indicators may pulse (accessibility: indicate activity)
- **Signature experience** must have a designed static equivalent, not just "turned off"

---

## Performance Guidelines (FINALIZED)

| Rule                           | Description                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **Transform/Opacity only**     | Prefer `transform` and `opacity` - they run on compositor thread                         |
| **Will-change sparingly**      | Only on elements actively animating; remove after                                        |
| **Layout thrashing avoidance** | Batch reads/writes; use `requestAnimationFrame`                                          |
| **GPU layers**                 | Promote animated elements (`transform: translateZ(0)`) but don't overdo                  |
| **Bundle size**                | Motion for React ~15KB gzipped. GSAP ~35KB. Three.js ~100KB+. Budget in `PERFORMANCE.md` |
| **Lazy load heavy animation**  | `next/dynamic` with `ssr: false` for GSAP/Three.js components                            |
| **IntersectionObserver**       | For scroll-triggered reveals (native, performant)                                        |

---

## Animation Library Usage (UNDECIDED)

### Motion for React (Primary)

- Layout animations (`layout` prop)
- Presence animations (`AnimatePresence`)
- Gestures (`whileHover`, `whileTap`, `drag`)
- Scroll animations (`useScroll`, `useTransform`)
- Variants for choreography

### GSAP (When Necessary)

- Complex timelines with multiple coordinated elements
- ScrollTrigger for pin/scrub patterns Motion can't do performantly
- Text animation (SplitText)
- Morphing, FLIP animations
- **Only import what you use:** `gsap/core`, `gsap/ScrollTrigger`, etc.

### Lenis (If Justified)

- Smooth scroll only if native + `scroll-behavior: smooth` + scroll-driven animations feel insufficient
- Must integrate with GSAP ScrollTrigger / Motion `useScroll`
- Lightweight (~3KB) but adds complexity

### Three.js / React Three Fiber (Signature Experience Only)

- Only for M6 signature experience
- Lazy-loaded, code-split, `ssr: false`
- Reduced motion: static render or fallback image

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

- [ ] `prefers-reduced-motion: reduce` - all motion disabled/instant
- [ ] `prefers-reduced-motion: no-preference` - full experience
- [ ] Low-end device (throttled CPU) - 60fps maintained
- [ ] Mobile touch - no hover-only interactions
- [ ] Keyboard navigation - focus visible, no motion traps
- [ ] Screen reader - no announcements for decorative animation
- [ ] Cross-browser - Chrome, Firefox, Safari, Edge

---

## Token Reference (To Be Finalized in DESIGN_SYSTEM.md)

```typescript
// lib/animations.ts (proposed)
export const easing = {
  // UNDECIDED
};

export const duration = {
  // UNDECIDED
};

export const variants = {
  // Reusable variant objects for Motion
  // UNDECIDED
};
```

---

## Notes

This file will be populated with concrete values as milestones progress. M1 (Hero) will finalize entrance choreography. M2 (Scroll) will finalize scroll-driven patterns. M6 (Signature Experience) may introduce new patterns.

**Key rule:** If you add a new animation pattern, document it here with its easing, duration, and reduced-motion behavior.
