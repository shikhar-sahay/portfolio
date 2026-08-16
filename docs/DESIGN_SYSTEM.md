# DESIGN_SYSTEM.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Typography

### Font Candidates (UNDECIDED)

| Font            | Status    | Notes                                |
| --------------- | --------- | ------------------------------------ |
| Geist           | UNDECIDED | Vercel's font, clean, technical feel |
| Satoshi         | UNDECIDED | Strong geometric sans, good weights  |
| Space Grotesk   | UNDECIDED | Distinctive, editorial quality       |
| Instrument Sans | UNDECIDED | Clean, highly legible                |
| Manrope         | UNDECIDED | Modern, versatile                    |

**Decision needed:** Primary display font, body font, mono font (if separate)

### Type Scale (UNDECIDED)

- Display / Hero: UNDECIDED
- H1: UNDECIDED
- H2: UNDECIDED
- H3: UNDECIDED
- Body: UNDECIDED
- Small / Caption: UNDECIDED

### Typography Principles (FINALIZED)

- Typography leads the design — it's the primary visual voice
- Strong hierarchy, clear reading flow
- Editorial quality — magazine-like composition
- Responsive type scaling (fluid/clamp-based preferred)
- Meaningful font weight usage (not just regular/bold)

---

## Color

### Mode Support (FINALIZED)

- **Light mode** — required
- **Dark mode** — required
- System preference detection + manual toggle

### Palette (UNDECIDED)

| Role             | Light     | Dark      | Status    |
| ---------------- | --------- | --------- | --------- |
| Background       | UNDECIDED | UNDECIDED | UNDECIDED |
| Surface / Card   | UNDECIDED | UNDECIDED | UNDECIDED |
| Primary Text     | UNDECIDED | UNDECIDED | UNDECIDED |
| Secondary Text   | UNDECIDED | UNDECIDED | UNDECIDED |
| Accent / Primary | UNDECIDED | UNDECIDED | UNDECIDED |
| Accent Hover     | UNDECIDED | UNDECIDED | UNDECIDED |
| Border / Divider | UNDECIDED | UNDECIDED | UNDECIDED |
| Focus Ring       | UNDECIDED | UNDECIDED | UNDECIDED |
| Error            | UNDECIDED | UNDECIDED | UNDECIDED |
| Success          | UNDECIDED | UNDECIDED | UNDECIDED |

### Color Principles (FINALIZED)

- Restrained palette — few colors, used intentionally
- High contrast for accessibility (WCAG AA minimum)
- Semantic color roles (not decorative)
- Smooth mode transitions
- No generic gradients unless purposeful

---

## Spacing

### Base Unit (UNDECIDED)

- Likely 4px or 8px base — UNDECIDED

### Spacing Scale (UNDECIDED)

| Token     | Value     | Use Case                    |
| --------- | --------- | --------------------------- |
| space-xs  | UNDECIDED | Tight inline gaps           |
| space-sm  | UNDECIDED | Component internal          |
| space-md  | UNDECIDED | Default component gap       |
| space-lg  | UNDECIDED | Section internal            |
| space-xl  | UNDECIDED | Section separation          |
| space-2xl | UNDECIDED | Major section breaks        |
| space-3xl | UNDECIDED | Hero/landing breathing room |

---

## Borders & Radius

### Border Width (UNDECIDED)

- Hairline (1px) — UNDECIDED
- Standard (2px) — UNDECIDED

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

### Hero Portrait (FINALIZED)

- **Path:** `public/images/shikhar-hero.jpg`
- **Source:** Second portrait provided by project owner
- **Status:** File does not exist yet — will be added later

### Image Treatment (UNDECIDED)

- Aspect ratios: UNDECIDED
- Cropping strategy: UNDECIDED
- Loading: UNDECIDED (likely native lazy + blur placeholder)
- Formats: UNDECIDED (AVIF/WebP with fallbacks)

---

## Responsive Behavior

### Breakpoints (UNDECIDED — Likely Tailwind Defaults)

| Name | Width  | Status    |
| ---- | ------ | --------- |
| sm   | 640px  | UNDECIDED |
| md   | 768px  | UNDECIDED |
| lg   | 1024px | UNDECIDED |
| xl   | 1280px | UNDECIDED |
| 2xl  | 1536px | UNDECIDED |

### Mobile-First Principles (FINALIZED)

- Mobile is a first-class experience, not a shrunken desktop layout
- Touch targets ≥ 44×44px
- Gesture-friendly interactions
- Performance budget stricter on mobile
- Content priority: hero → work → contact

---

## Shadows & Elevation (UNDECIDED)

- Shadow system: UNDECIDED
- Elevation levels: UNDECIDED
- Avoid excessive depth/layering — prefer clean flat design with purposeful elevation

---

## Motion Tokens (Reference — See ANIMATION.md)

| Token              | Duration  | Easing    | Status    |
| ------------------ | --------- | --------- | --------- |
| duration-instant   | UNDECIDED | —         | UNDECIDED |
| duration-fast      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-base      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-slow      | UNDECIDED | UNDECIDED | UNDECIDED |
| duration-cinematic | UNDECIDED | UNDECIDED | UNDECIDED |

---

## Component Inventory (UNDECIDED — To Be Built)

- Button (primary, secondary, ghost, link)
- Link / Anchor styles
- Navigation / Header
- Footer
- Project card / showcase
- Section containers
- Scroll indicators
- Image components
- Form elements (contact)
- Focus states (global)

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
