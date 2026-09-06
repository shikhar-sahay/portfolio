# PERFORMANCE.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Performance Philosophy (FINALIZED)

**Performance is a hard requirement.** The website must look impressive without becoming slow. Every technical decision is evaluated against its performance cost.

> "The site should be impressive _because_ it's fast, not _despite_ being fast."

---

## Performance Budgets (FINALIZED: Targets) and Measured State

| Metric                              | Target         | Measured (2026-09-05, `next build`)                                                                                           |
| ----------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Initial JS (First Load)**         | < 150KB        | ~153 kB (3 kB over; see reclaim below)                                                                                        |
| **LCP (Largest Contentful Paint)**  | < 2.5s         | Not measured (no Lighthouse run yet)                                                                                          |
| **CLS (Cumulative Layout Shift)**   | < 0.1          | Not measured                                                                                                                  |
| **INP (Interaction to Next Paint)** | < 200ms        | Not measured                                                                                                                  |
| **Total Page Weight (initial)**     | < 500KB        | Not measured                                                                                                                  |
| **Hero Portrait**                   | < 150KB served | Source is a 2.7 MB JPEG; served optimized on demand via `next/image` (AVIF/WebP, blur placeholder). Served bytes not measured |
| **Lighthouse (all categories)**     | ≥ 90/95        | Not run yet (M8)                                                                                                              |

### Budget Enforcement

- **CI Gate:** none exists (no CI configured). Enforcement today is the protocol: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` must pass, and First Load JS is read off every build.
- **Bundle Analyzer:** not installed. Reclaim options live in `docs/HANDOFF.md` known issues.
- **Pre-commit:** no hooks configured.

---

## Optimization Strategies (FINALIZED)

### Images

- **Format:** AVIF primary, WebP fallback (configured in `next.config.mjs`)
- **Optimization:** `next/image` with on-demand optimization
- **Hero Portrait:** static import from `src/assets/`, `priority`, blur placeholder, `sizes` for art direction
- **Lazy Loading:** below-fold motifs are inline SVG (no image cost); `ProjectPanel` is the only lazy chunk
- **Dimensions:** explicit `width`/`height` where images render; SVG motifs are resolution-independent

### Fonts

- **Strategy:** `next/font/google` (Instrument Sans + Instrument Serif, latin subset, `display: swap`)
- **Preload:** critical fonts preloaded automatically by `next/font`

### JavaScript

- **Server Components by Default:** Skills, Contact, TechLogo render zero client JS
- **Client Components Only For:** genuine interactivity (see `ARCHITECTURE.md` for the exact list)
- **Code Splitting:** automatic via App Router + `next/dynamic` (`ssr: false`) for `ProjectPanel`
- **No animation/UI libraries** beyond Motion; no icon libraries (vendored paths); no third-party scripts at all
- **No network calls:** fully static, no API routes, no analytics, no fonts fetched at runtime beyond `next/font` self-hosting

### CSS

- **Tailwind JIT:** Only used styles in output
- **Critical CSS:** Inlined automatically by Next.js
- **No Runtime CSS-in-JS**

### Caching

- **Static Assets:** Immutable cache keys (content hash in filename)
- **Fonts/Images:** Long-term immutable cache via Next.js defaults
- **ISR:** Unused (fully static export)

### Third Party Scripts

- There are none: no analytics, no tag managers, no chat widgets, no embeds. Keep it that way; any addition needs a documented justification and a budget check.

---

## Animation Performance (FINALIZED)

| Rule                           | Implementation in this site                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Compositor-only properties** | `transform`, `opacity`, `clip-path` only (plus a grayscale hover transition)                                       |
| **Avoid layout triggers**      | No `width`, `height`, `top`, `left`, `margin`, `padding` animation                                                 |
| **`will-change`**              | Presentational `will-change-transform` on animated tracks and letters                                              |
| **Scroll-driven**              | One `useScroll` progress per scene; no scroll listeners except Motion internals and one passive center re-cache    |
| **IntersectionObserver**       | Carousel offscreen pause; nav active-section tracking; Motion `whileInView`/`useInView` reveals                    |
| **Single rAF loops**           | Carousel (pauses offscreen), one per pointer-letter field (runs only while the pointer is inside), clocks tick 1/s |
| **Reduced motion**             | Complete static equivalents; zero animation cost                                                                   |

---

## Monitoring and Measurement (actual)

### Development

- **Local:** `pnpm dev` + DevTools Performance tab
- **Build:** `pnpm build` reports First Load JS per route (read it every time)
- **Browser verification:** throwaway Playwright harnesses measuring DOM/layout/scroll state (kept out of the repo)

### Not set up

- No Lighthouse runs yet, no bundle analyzer, no CI, no RUM, no alerting, no monthly audits. These are M8 work. Do not claim their numbers anywhere.

---

## Performance Checklist (verified state)

### Done and verified

- [x] `next/font` with latin subset and swap
- [x] `next/image` with AVIF/WebP, blur placeholder, sizes (hero portrait)
- [x] Tailwind JIT (default)
- [x] Entrance animation uses transform/opacity/clip-path only
- [x] Project data static (no API call); carousel is one rAF loop, pauses offscreen
- [x] Timeline data static; reveals via Motion IO primitives
- [x] No layout shifts from fonts/images (fixed display sizes, blur placeholder)
- [x] Focus styles via global `:focus-visible` ring
- [x] Favicon resolves (`src/app/icon.svg`), no console 404s

### Open (M8 and owner inputs)

- [ ] Lighthouse audit (target 90+ performance, 95+ accessibility)
- [ ] Core Web Vitals measurement (LCP, CLS, INP)
- [ ] Bundle size back under 150 kB initial JS (currently ~153 kB)
- [ ] Vercel deployment + custom domain + production measurement
- [ ] Real-device checks (iOS Safari, Chrome Android)
- [ ] Cross-browser checks (Firefox, Safari, Edge; only Chromium verified so far)

---

## Tooling Commands (actual `package.json` scripts)

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "typecheck": "tsc --noEmit"
}
```

There is no `analyze`, `lighthouse`, or `perf:check` script and no GitHub Actions workflow. Those are M8 work.

---

## CI Configuration (not set up)

There is no `.github/` directory and no Lighthouse CI, bundle gate, or deploy pipeline. If one is added later, the budgets at the top of this file are its thresholds.

---

## Notes

- Budgets are **targets**, not guarantees. With no CI, the protocol is the gate: every session reads First Load JS off `pnpm build`.
- If a feature threatens budgets, it must be justified in `DECISIONS.md`.
- `ANIMATION.md` has complementary animation-specific performance rules.

---

## v4.5 Status (2026-09-05)

- First Load JS: still ~153 kB against the 150 kB budget. The opening-architecture rework (overlap, crossfade windows, mask direction) added no measurable JS.
- Reclamation options (unchanged): cheapen the InteractiveLetters tint, trim carousel hint state, or move Counter out of the lazy chunk. Track in HANDOFF known issues.
- Leave-your-mark style features do not exist, so there is no associated network or runtime cost. The only recurring main-thread work is the carousel rAF (offscreen-paused), pointer letter fields (pointer-inside only), and two 1-second clocks.

---

## v4.7 Status (2026-09-06)

- First Load JS: ~158 kB against the 150 kB budget (was ~156 kB at v4.6). The delta covers the NotesWall client UI, the CopyText island, and the larger statement type. API routes add zero client JS.
- The wall renders at most 150 note cards (viewport-filtered, recomputed on pan end and data change, never per frame); pan writes one transform per frame; no loops run idle.
- Reclamation options (unchanged): cheapen the InteractiveLetters tint, trim carousel hint state, or move Counter out of the lazy chunk. Track in HANDOFF known issues.

---

## v4.6 Status (2026-09-05)

- First Load JS: ~156 kB against the 150 kB budget (was ~153 kB at v4.5). The delta covers the MarkWall feature, the marquee velocity wave, and the larger statement type.
- Reclamation options (unchanged): cheapen the InteractiveLetters tint, trim carousel hint state, or move Counter out of the lazy chunk. Track in HANDOFF known issues.
- Leave-your-mark adds no network cost (localStorage only) and renders at most 150 spans with no loops; the wave loop runs only while hovered.

---

## v4.2 Status (2026-08-26)

- First Load JS: ~151 kB against the 150 kB budget. Note: the checkpoint build before this pass already measured 150 kB (the "~145 kB" figure in AGENTS.md was stale). This pass added ~1 kB net (InteractiveLetters, carousel logic, footer marquee) and removed the nav magnetic pull.
- Reclamation options: cheapen the InteractiveLetters tint, trim carousel hint state, or move Counter out of the lazy chunk. Track in HANDOFF known issues.
- Runtime: one rAF loop per marquee is CSS-driven (compositor only); the carousel runs one rAF loop that pauses offscreen via IntersectionObserver; hero/footer letter fields run one rAF loop per instance gated by pointer presence.

---

## v4.3 Status (2026-09-04)

- First Load JS: ~153 kB against the 150 kB budget (was ~151 kB at v4.2). The delta comes from the InteractiveLetters scroll handler, three added brand paths, and the inert-link guards.
- Reclamation options: cheapen the InteractiveLetters tint, trim carousel hint state, or move Counter out of the lazy chunk. Track in HANDOFF known issues.
- Runtime: one rAF loop per marquee is CSS-driven (compositor only); the carousel runs one rAF loop that pauses offscreen via IntersectionObserver; hero/footer letter fields run one rAF loop per instance gated by pointer presence.
