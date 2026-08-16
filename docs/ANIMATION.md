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
| **Cinematic in places** | Select moments can be dramatic — hero entrance, signature experience, section transitions.              |
| **Clean at rest**       | Static state is calm. Motion reveals depth on interaction/scroll.                                       |
| **Respectful**          | Honor `prefers-reduced-motion`. Provide meaningful static alternatives.                                 |

---

## Easing (UNDECIDED)

### Candidate Easing Functions

| Name               | CSS / JS Value                                          | Use Case                       | Status    |
| ------------------ | ------------------------------------------------------- | ------------------------------ | --------- |
| `ease-out-expo`    | `cubic-bezier(0.19, 1, 0.22, 1)` / `[0.19, 1, 0.22, 1]` | Default exit, reveals          | UNDECIDED |
| `ease-out-circ`    | `cubic-bezier(0.075, 0.82, 0.165, 1)`                   | Smooth deceleration            | UNDECIDED |
| `ease-out-quart`   | `cubic-bezier(0.25, 1, 0.5, 1)`                         | Standard UI transitions        | UNDECIDED |
| `ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)`                        | Full transitions, page changes | UNDECIDED |
| `ease-spring`      | `spring({ stiffness: 300, damping: 30 })`               | Motion for React spring        | UNDECIDED |
| `ease-bounce`      | `spring({ stiffness: 400, damping: 20 })`               | Playful micro-interactions     | UNDECIDED |

**Decision Needed:** Select 3-4 primary easings: default, expressive, spring, cinematic.

---

## Duration Scale (UNDECIDED)

| Token                | Range      | Use Case                                  | Status    |
| -------------------- | ---------- | ----------------------------------------- | --------- |
| `duration-instant`   | 0–50ms     | Immediate feedback (tap, hover)           | UNDECIDED |
| `duration-fast`      | 100–150ms  | Micro-interactions, hover, focus          | UNDECIDED |
| `duration-base`      | 200–300ms  | Standard transitions, reveals             | UNDECIDED |
| `duration-slow`      | 400–600ms  | Section transitions, complex choreography | UNDECIDED |
| `duration-cinematic` | 800–1200ms | Hero entrance, signature moments          | UNDECIDED |

**Decision Needed:** Exact values per token. Prefer consistent scale (e.g., 1.5x or 2x steps).

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
| **Hover Scale** | `scale: 1.02–1.05`                | UNDECIDED |
| **Tap Press**   | `scale: 0.97–0.98` on press       | UNDECIDED |
| **Focus Ring**  | Animated focus outline            | UNDECIDED |
| **Magnetic**    | Element follows cursor slightly   | UNDECIDED |

---

## Choreography Principles (UNDECIDED)

### Stagger

- **Default stagger:** UNDECIDED (e.g., 50–100ms per item)
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
| **Transform/Opacity only**     | Prefer `transform` and `opacity` — they run on compositor thread                         |
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

- [ ] `prefers-reduced-motion: reduce` — all motion disabled/instant
- [ ] `prefers-reduced-motion: no-preference` — full experience
- [ ] Low-end device (throttled CPU) — 60fps maintained
- [ ] Mobile touch — no hover-only interactions
- [ ] Keyboard navigation — focus visible, no motion traps
- [ ] Screen reader — no announcements for decorative animation
- [ ] Cross-browser — Chrome, Firefox, Safari, Edge

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
