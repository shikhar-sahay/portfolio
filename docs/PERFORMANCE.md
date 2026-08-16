# PERFORMANCE.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Performance Philosophy (FINALIZED)

**Performance is a hard requirement.** The website must look impressive without becoming slow. Every technical decision is evaluated against its performance cost.

> "The site should be impressive _because_ it's fast, not _despite_ being fast."

---

## Performance Budgets (FINALIZED — Targets)

| Metric                              | Target  | Measurement                            |
| ----------------------------------- | ------- | -------------------------------------- |
| **LCP (Largest Contentful Paint)**  | < 2.5s  | Lighthouse, Real User Monitoring       |
| **CLS (Cumulative Layout Shift)**   | < 0.1   | Lighthouse, Web Vitals                 |
| **INP (Interaction to Next Paint)** | < 200ms | Lighthouse, Web Vitals                 |
| **Initial JS (gzipped)**            | < 150KB | Bundle analyzer, webpack/Next.js stats |
| **Total Page Weight (initial)**     | < 500KB | DevTools Network (excl. hero portrait) |
| **Hero Portrait**                   | < 150KB | Optimized AVIF/WebP                    |
| **Lighthouse Performance**          | ≥ 90    | Lighthouse CI                          |
| **Lighthouse Accessibility**        | ≥ 95    | Lighthouse CI                          |
| **Lighthouse Best Practices**       | ≥ 90    | Lighthouse CI                          |
| **Lighthouse SEO**                  | ≥ 90    | Lighthouse CI                          |

### Budget Enforcement

- **CI Gate:** Lighthouse CI runs on every PR — fails if budgets not met
- **Bundle Analyzer:** `@next/bundle-analyzer` in CI — fails if initial JS > 150KB
- **Pre-commit:** Local bundle size check via `pnpm build && pnpm analyze`

---

## Optimization Strategies (FINALIZED)

### Images

- **Format:** AVIF primary, WebP fallback, JPEG/PNG last resort
- **Optimization:** `next/image` with automatic optimization
- **Hero Portrait:** Pre-optimized at build time (not on-demand), multiple widths
- **Blur Placeholders:** `blurDataURL` for all above-fold images
- **Lazy Loading:** Native `loading="lazy"` for below-fold; `priority` for hero
- **Dimensions:** Explicit `width`/`height` to prevent CLS
- **Responsive:** `sizes` attribute for art direction

### Fonts

- **Strategy:** `next/font` — self-hosted, variable fonts, preload
- **Variable Fonts:** Single file for multiple weights (preferred)
- **Subsetting:** Unicode-range subset for Latin only (if applicable)
- **Display:** `font-display: swap` (default in `next/font`)
- **Preload:** Critical font preloaded in `<head>`

### JavaScript

- **Server Components by Default:** Zero client JS for static content
- **Client Components Only For:** Interactivity (animations, forms, 3D, scroll effects)
- **Code Splitting:** Automatic via Next.js App Router + `next/dynamic` for heavy libs
- **Lazy Load:** GSAP, Three.js, Lenis — only when section enters viewport
- **Tree Shaking:** Import only what's used (ESM, side-effect-free libs)
- **Third Party:** Minimize. Analytics = lightweight (Plausible/Vercel). No heavy widgets.

### CSS

- **Tailwind JIT:** Only used styles in output
- **Critical CSS:** Inlined automatically by Next.js
- **No Runtime CSS-in-JS:** Avoid styled-components, emotion (bundle + runtime cost)

### Caching

- **Static Assets:** Immutable cache keys (content hash in filename)
- **HTML:** `Cache-Control: public, max-age=0, must-revalidate` (Vercel default)
- **Fonts/Images:** Long-term immutable cache
- **ISR:** For any dynamic content (revalidate on deploy)

### Third Party Scripts

- **Strategy:** `next/script` with `strategy: "lazyOnload"` or `afterInteractive`
- **Analytics:** Vercel Analytics (zero-config, no script) or Plausible (<1KB)
- **No:** Google Tag Manager, heavy chat widgets, social embeds

---

## Animation Performance (FINALIZED)

| Rule                           | Implementation                                                              |
| ------------------------------ | --------------------------------------------------------------------------- |
| **Compositor-only properties** | `transform`, `opacity`, `filter` (sometimes)                                |
| **Avoid layout triggers**      | No `width`, `height`, `top`, `left`, `margin`, `padding` animation          |
| **`will-change`**              | Set before animation, remove after (`onAnimationComplete`)                  |
| **GPU promotion**              | `transform: translateZ(0)` or `backface-visibility: hidden` sparingly       |
| **Scroll-driven**              | Prefer native CSS `animation-timeline: scroll()` / `view()` where supported |
| **IntersectionObserver**       | For trigger-based reveals (not scroll-position polling)                     |
| **Reduced motion**             | All animations instant/disabled — zero cost                                 |

---

## Monitoring & Measurement

### Development

- **Local:** `pnpm dev` + DevTools Performance tab
- **Bundle Analysis:** `pnpm build && pnpm analyze` (`@next/bundle-analyzer`)
- **Lighthouse:** `pnpm lighthouse` (local CI simulation)

### CI/CD

- **Lighthouse CI:** Runs on every PR (GitHub Actions)
- **Bundle Size Check:** Fails PR if initial JS > 150KB
- **Core Web Vitals:** Tracked via Vercel Analytics / Web Vitals library

### Production (Post-Launch)

- **Real User Monitoring:** Vercel Speed Insights / Web Vitals
- **Alerting:** If LCP > 2.5s or CLS > 0.1 for 7-day rolling avg
- **Monthly Audit:** Manual Lighthouse + bundle review

---

## Performance Checklist Per Milestone

### M0 (Foundation)

- [ ] `next/font` configured with variable font
- [ ] `next/image` configured with remote patterns / loader
- [ ] Tailwind JIT enabled (default)
- [ ] Bundle analyzer script in `package.json`

### M1 (Hero)

- [ ] Hero portrait optimized (AVIF/WebP, multiple widths, blur placeholder)
- [ ] Hero font preloaded
- [ ] Entrance animation uses transform/opacity only
- [ ] No layout shift during hero load (explicit dimensions)

### M2 (Nav + Scroll)

- [ ] Navigation is Server Component (no client JS)
- [ ] Smooth scroll (if Lenis) lazy-loaded
- [ ] Scroll-driven animations use native CSS or IntersectionObserver
- [ ] No scroll listeners on main thread

### M3 (Projects)

- [ ] Project images optimized + lazy + blur placeholder
- [ ] Project data as static JSON/TS (no API call)
- [ ] Carousel/grid uses CSS scroll-snap or minimal JS
- [ ] Modal/detail view lazy-loaded

### M4 (Experience)

- [ ] Timeline data static
- [ ] Scroll reveals via IntersectionObserver (not scroll listener)
- [ ] No heavy animation library for simple reveals

### M5 (Personality)

- [ ] Content static
- [ ] Minimal JS (if any)

### M6 (Signature Experience)

- [ ] **Lazy-loaded** — `next/dynamic(..., { ssr: false, loading: ... })`
- [ ] Code-split — separate chunk, not in main bundle
- [ ] Three.js/GSAP only imported here
- [ ] Reduced motion: static fallback image/component
- [ ] Performance profiled on low-end device

### M7 (Polish)

- [ ] All images have explicit dimensions
- [ ] No layout shifts anywhere
- [ ] Focus styles instant (no transition)
- [ ] Preload critical resources

### M8 (Ship)

- [ ] Lighthouse CI passing on main branch
- [ ] Bundle size < 150KB initial JS
- [ ] Core Web Vitals measured in production
- [ ] Vercel Speed Insights enabled
- [ ] Performance budget documented and met

---

## Tooling Commands (To Be Added to package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "analyze": "ANALYZE=true next build",
    "lighthouse": "lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json",
    "lighthouse:ci": "lhci autorun",
    "perf:check": "pnpm build && pnpm analyze && pnpm lighthouse:ci"
  }
}
```

---

## CI Configuration (GitHub Actions — To Be Created)

```yaml
# .github/workflows/performance.yml
name: Performance
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm analyze
      - uses: treosh/lighthouse-ci-action@v11
        with: { urls: 'http://localhost:3000', budgetPath: './lighthouse-budget.json' }
```

---

## Notes

- Budgets are **targets**, not guarantees — but CI enforces them
- If a feature threatens budgets, it must be justified in `DECISIONS.md`
- Performance is everyone's responsibility — every milestone includes perf checklist
- `ANIMATION.md` has complementary animation-specific performance rules
