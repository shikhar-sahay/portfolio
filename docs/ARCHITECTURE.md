# ARCHITECTURE.md

> **Status Legend:** `FINALIZED` = Decided, documented, do not change without discussion | `EXPERIMENTAL` = Being tested, may change | `UNDECIDED` = Not yet decided

---

## Framework & Runtime

| Decision            | Status               | Notes                         |
| ------------------- | -------------------- | ----------------------------- |
| **Framework**       | Next.js (App Router) | `FINALIZED`: Next.js 14.2.15  |
| **Language**        | TypeScript           | `FINALIZED`: TypeScript 5.6.3 |
| **Runtime**         | Node.js (Vercel)     | `FINALIZED`: Node.js 20+      |
| **Package Manager** | pnpm                 | `FINALIZED`: pnpm 9.12.0      |

---

## Rendering Strategy

| Aspect                | Status                          | Notes                                         |
| --------------------- | ------------------------------- | --------------------------------------------- |
| **Primary**           | Static Generation (SSG)         | `FINALIZED`: All pages prerendered at build   |
| **Dynamic**           | ISR / On-demand                 | `UNDECIDED`: For content that may update      |
| **Client Components** | Minimal, only for interactivity | `FINALIZED`: "Use client" only when necessary |
| **Streaming**         | `UNDECIDED`                     | For heavy sections (3D, large media)          |

**Principle (FINALIZED):** Default to Server Components. Only use Client Components for genuine interactivity (animation hooks, 3D canvas, forms).

---

## Styling Architecture

| Decision          | Status                     | Notes                                         |
| ----------------- | -------------------------- | --------------------------------------------- |
| **CSS Approach**  | Tailwind CSS               | `FINALIZED`: Tailwind 3.4.14                  |
| **Config**        | `tailwind.config.ts`       | `FINALIZED`: Design tokens as source of truth |
| **CSS Variables** | For theming (light/dark)   | `FINALIZED`: Defined in `globals.css`         |
| **Global Styles** | Minimal: reset + variables | `FINALIZED`: In `src/app/globals.css`         |

---

## Animation Stack

| Library                            | Purpose                                                                                                                       | Status                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Motion** (`motion` package, v13) | Primary and only animation library: scroll scrubbing (`useScroll` + `useTransform`), `whileInView` reveals, springs, gestures | `FINALIZED`: installed, ~15 KB gzipped                           |
| **GSAP**                           | Not used                                                                                                                      | `FINALIZED`: excluded unless a documented reason emerges         |
| **Lenis**                          | Not used (native scroll + sticky pinning)                                                                                     | `FINALIZED`: excluded unless a documented reason emerges         |
| **Three.js / React Three Fiber**   | Not used                                                                                                                      | `FINALIZED`: excluded unless a signature experience justifies it |

**Principle (FINALIZED):** Motion is the only animation library. Binding Motion v13 rule: every scroll-driven `useTransform` input range MUST end at 1.0 (flat terminal segments whose last input sits below 1.0 collapse once progress passes them; see `ANIMATION.md`).

---

## Folder Structure (as built: FINALIZED)

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout: metadata, theme pre-paint script, fonts
│   ├── page.tsx           # Homepage: section order (Opening, Hero, Statements, About,
│   │                       #   Experience, Skills, Projects, Personality, ControlCenter, Contact)
│   ├── globals.css        # Tokens, keyframes, arch/mask/marquee/reduced-motion styles
│   └── icon.svg           # Favicon (ink field, vermilion diamond)
├── assets/                # Static imports (shikhar-hero.jpg; enables blur placeholders)
├── components/
│   ├── ui/                # InteractiveLetters, TechLogo, Reveal, WordReveal, Counter, InView
│   ├── sections/          # Hero, TransitionStatements, About, Experience, Skills,
│   │                       #   Projects, ProjectPanel (lazy chunk), Personality,
│   │                       #   ControlCenter, Contact, FooterWordmark
│   └── layout/            # Opening, SiteNav, ThemeToggle
├── hooks/                 # useMountedReducedMotion (hydration-safe reduced-motion flag)
└── content/               # Typed data: profile, sections, projects, experience,
                            #   systems, personality, techLogos, channelGlyphs
public/
└── resume.pdf             # PLACEHOLDER (owner must drop in the real file)
```

There is no `src/lib/`, `src/types/`, `src/styles/`, `src/components/effects/`, or `public/images/` in the built site. Do not reference them.

---

## Component Architecture

### Component Categories (FINALIZED)

1. **UI primitives**: `InteractiveLetters` (pointer spring field), `TechLogo` (monochrome brand marks), `Reveal` (in-view rise), `WordReveal` (scroll reading reveal), `Counter` (animated metric), `InView` (`data-inview` gate for SVG motifs)
2. **Sections**: Hero, TransitionStatements, About, Experience, Skills, Projects (+ lazy `ProjectPanel`), Personality, ControlCenter, Contact (footer). Each owns its scroll choreography; no shared timeline.
3. **Layout**: Opening (session loader), SiteNav (progress hairline, tuck/reveal, active section, theme toggle), ThemeToggle
4. **Hooks**: `useMountedReducedMotion`: the single hydration-safe reduced-motion flag every client component gates on

### Component Principles (FINALIZED)

- **Server Components by default**: only `"use client"` when needed (current clients: Opening, SiteNav, ThemeToggle, Hero, About, TransitionStatements, Experience, Projects, ProjectPanel, Personality, ControlCenter, FooterWordmark, plus the interactive primitives InteractiveLetters, Reveal, WordReveal, Counter, InView. Server: Skills, Contact, TechLogo)
- **Composition over configuration**: slots/children over props explosion
- **Design tokens via Tailwind**: CSS variables as color source of truth
- **Lazy-load heavy components**: `ProjectPanel` via `next/dynamic` with `ssr: false` (the only lazy chunk)

---

## State Management

| Need                               | Solution                                                         | Status      |
| ---------------------------------- | ---------------------------------------------------------------- | ----------- |
| **Theme**                          | `<html>` class + localStorage, pre-paint head script             | `FINALIZED` |
| **Intro played**                   | sessionStorage flag, read pre-paint                              | `FINALIZED` |
| **Reduced motion**                 | `useMountedReducedMotion` hook (post-mount flag, hydration-safe) | `FINALIZED` |
| **Scroll choreography**            | One `useScroll` progress per scene, pure `useTransform` mapping  | `FINALIZED` |
| **Carousel**                       | Local ref + single rAF loop (no React state on scroll)           | `FINALIZED` |
| **Personality selection**          | Local `useState` (no persistence)                                | `FINALIZED` |
| **Global store / forms / backend** | None exist                                                       | `UNDECIDED` |

**Principle (FINALIZED):** No global state library unless genuinely needed. No backend, no API routes, no database, no analytics. The only browser storage is the theme choice and the intro flag.

---

## Data & Content

| Content Type            | Source                                              | Status      |
| ----------------------- | --------------------------------------------------- | ----------- |
| **Projects**            | `src/content/projects.ts` (5 artifacts, SVG motifs) | `FINALIZED` |
| **Experience/Timeline** | `src/content/experience.ts` (org-grouped)           | `FINALIZED` |
| **Skills / certs**      | `src/content/systems.ts` (+ `techLogos.ts` marks)   | `FINALIZED` |
| **Personal info**       | `src/content/profile.ts`                            | `FINALIZED` |
| **Personality**         | `src/content/personality.ts` (fragments + captions) | `FINALIZED` |
| **Sections/nav**        | `src/content/sections.ts` (order source of truth)   | `FINALIZED` |
| **Images**              | `src/assets/` static imports + `next/image`         | `FINALIZED` |
| **SEO/Metadata**        | `metadata` export in `layout.tsx` + `icon.svg`      | `FINALIZED` |

**Principle (FINALIZED):** Content as data: separate from components. Single source of truth in `src/content/`.

---

## Performance Architecture

| Strategy               | Status                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **Image optimization** | `FINALIZED`: `next/image` with AVIF/WebP formats, blur placeholders                |
| **Font optimization**  | `FINALIZED`: `next/font/google` (Instrument Sans + Serif, latin, swap)             |
| **Lazy loading**       | `FINALIZED`: `ProjectPanel` via `next/dynamic` (`ssr: false`), the only lazy chunk |
| **Script loading**     | `FINALIZED`: no third-party scripts exist                                          |
| **Bundle analysis**    | `UNDECIDED`: no analyzer, no CI gate                                               |
| **Critical CSS**       | `FINALIZED`: Tailwind JIT + Next.js automatic                                      |

---

## Deployment & Infrastructure

| Aspect                  | Decision                           | Status      |
| ----------------------- | ---------------------------------- | ----------- |
| **Platform**            | Vercel (planned, not yet deployed) | `FINALIZED` |
| **Preview deployments** | None configured                    | `UNDECIDED` |
| **Analytics**           | None installed                     | `UNDECIDED` |
| **Error tracking**      | None installed                     | `UNDECIDED` |
| **Edge/ISR**            | Unused (fully static)              | `FINALIZED` |

---

## Developer Experience

| Tool              | Status                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| **Linting**       | `FINALIZED`: ESLint (flat config, Next.js)                                                           |
| **Formatting**    | `FINALIZED`: Prettier + prettier-plugin-tailwindcss                                                  |
| **Type checking** | `FINALIZED`: `tsc --noEmit` (`pnpm typecheck`)                                                       |
| **Git hooks**     | `UNDECIDED`: none configured                                                                         |
| **Testing**       | `UNDECIDED`: no test runner; browser verification via throwaway Playwright harnesses (not committed) |

---

## Open Technical Questions (UNDECIDED)

- [ ] M6 signature experience concept (open ideation; must justify any new dependency)
- [ ] CI/CD pipeline (none exists; typecheck/lint/format/build run locally)
- [ ] Lighthouse measurement and real-device testing (M8)
- [ ] Copy approval, real links, real resume PDF, Skilledity dates (owner inputs)

---

## Notes

Architecture decisions should be made incrementally as milestones progress. See `ROADMAP.md` for milestone order. Each milestone may finalize a subset of these decisions.

**M0 Completion Summary (2026-08-17):**

- Next.js 14.2.15 + TypeScript 5.6.3 + Tailwind 3.4.14 initialized
- ESLint flat config with TypeScript ESLint + Next.js plugin
- Prettier with Tailwind plugin
- Folder structure created per specification
- Static generation working (build produces static pages)
- Dev server starts successfully
- All lint, typecheck, format checks pass
