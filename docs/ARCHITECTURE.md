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
│   │                       #   Experience, Toolkit, Projects, Pieces of Me, Contact)
│   ├── not-found.tsx      # 404 scene: You BROKE. plus REBUILD (client, CSS transitions only)
│   ├── globals.css        # Tokens, keyframes, arch/mask/marquee/reduced-motion styles
│   ├── icon.png           # Canonical icon artwork (cropped 256px)
│   ├── apple-icon.tsx     # Apple touch icon (edge-rendered PNG: diamond on ink)
│   ├── opengraph-image.tsx # Social preview 1200x630 (edge-rendered PNG, real copy)
│   └── api/notes/         # Wall API: Postgres list/create, replies, rate gates, secret-gated moderation
├── assets/                # Static imports (shikhar-hero.jpg; enables blur placeholders)
├── components/
│   ├── ui/                # InteractiveLetters, TechLogo, Reveal, WordReveal
│   ├── sections/          # Hero, TransitionStatements, About, Experience, Skills (Toolkit),
│   │                       #   Certifications (disclosure stack), Projects, ProjectPanel (lazy chunk),
│   │                       #   Personality (Pieces of Me), NotesWall,
│   │                       #   FooterClock, Contact, FooterWordmark
│   └── layout/            # Opening, SiteNav, ThemeToggle
├── hooks/                 # useMountedReducedMotion (hydration-safe reduced-motion flag)
└── content/               # Typed data: profile, sections, projects, experience,
                             #   systems, personality, wall, techLogos, channelGlyphs
db/
├── 001_wall_notes.sql      # Fresh Postgres schema and indexes for the wall
└── 003_wall_post_events.sql # Existing-db migration for durable wall rate events
public/
├── favicon.ico            # Conventional /favicon.ico alias for the icon artwork
└── resume.pdf             # Real owner-supplied resume
```

There is no `src/lib/`, `src/types/`, `src/styles/`, `src/components/effects/`, or `public/images/` in the built site. Do not reference them. `.claude/` and `src/app/probex9/` are local-only and ignored so tool settings and protected experiments are not released.

---

## Component Architecture

### Component Categories (FINALIZED)

1. **UI primitives**: `InteractiveLetters` (pointer spring field), `TechLogo` (monochrome brand marks), `Reveal` (in-view rise), `WordReveal` (scroll reading reveal)
2. **Sections**: Hero, TransitionStatements, About, Experience, Skills (Toolkit anchor), Certifications (disclosure stack inside Toolkit), Projects (+ lazy `ProjectPanel`), Personality (Pieces of Me), Contact (footer with the `FooterClock` island). Each owns its scroll choreography; no shared timeline. Hero and TransitionStatements share responsive handoff assumptions through CSS classes and one Motion scroll progress, with short landscape handled by media query rather than a new component.
3. **Layout**: Opening (session loader), SiteNav (progress hairline, tuck/reveal, active section, theme toggle, mobile disclosure menu), ThemeToggle
4. **Not found**: `not-found.tsx` (genuine 404 route; misregistered BROKE. composition, REBUILD settles letters then routes home; reuses ThemeToggle)
5. **Hooks**: `useMountedReducedMotion`: the single hydration-safe reduced-motion flag every client component gates on

### Component Principles (FINALIZED)

- **Server Components by default**: only `"use client"` when needed (current clients: Opening, SiteNav, ThemeToggle, Hero, About, TransitionStatements, Experience, ExperienceEggs (prose Easter eggs), Projects, ProjectPanel, Personality, NotesWall, FooterClock, FooterWordmark, Certifications (disclosure state plus mask wipe), plus the interactive primitives InteractiveLetters, Reveal, WordReveal. Server: Skills, Contact, TechLogo)
- **Composition over configuration**: slots/children over props explosion
- **Design tokens via Tailwind**: CSS variables as color source of truth
- **Lazy-load heavy components**: `ProjectPanel` via `next/dynamic` with `ssr: false` (the only lazy chunk)

---

## State Management

| Need                       | Solution                                                                                                                                                                                                              | Status         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Theme**                  | `<html>` class + localStorage, pre-paint head script                                                                                                                                                                  | `FINALIZED`    |
| **Intro played**           | sessionStorage flag, read pre-paint                                                                                                                                                                                   | `FINALIZED`    |
| **Reduced motion**         | `useMountedReducedMotion` hook (post-mount flag, hydration-safe)                                                                                                                                                      | `FINALIZED`    |
| **Scroll choreography**    | One `useScroll` progress per scene, pure `useTransform` mapping                                                                                                                                                       | `FINALIZED`    |
| **Carousel**               | Local ref + single rAF loop (no React state on scroll)                                                                                                                                                                | `FINALIZED`    |
| **Pieces of Me selection** | Local `useState` (no persistence)                                                                                                                                                                                     | `FINALIZED`    |
| **Wall persistence**       | `/api/notes` routes backed by Postgres through `@neondatabase/serverless`; list/create, one-level replies, moderation, latest, random, viewport-bounded reads, durable per-IP rate events, and exact duplicate checks | `EXPERIMENTAL` |
| **Global store / forms**   | None exist                                                                                                                                                                                                            | `UNDECIDED`    |

**Principle (FINALIZED):** No global state library unless genuinely needed. Browser storage holds the theme choice and intro flag. The notes wall is the only database-backed feature: credentials stay server-only in `DATABASE_URL`, with `WALL_ADMIN_SECRET` for moderation. Notes rate limiting is server-side only and uses Postgres event rows, not client storage or process memory.

---

## Data & Content

| Content Type            | Source                                                                                                                                              | Status      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Projects**            | `src/content/projects.ts` (5 owner-supplied artifacts, real links, project artwork metadata)                                                        | `FINALIZED` |
| **Experience/Timeline** | `src/content/experience.ts` (org-grouped)                                                                                                           | `FINALIZED` |
| **Skills / certs**      | `src/content/systems.ts` (+ `techLogos.ts` marks)                                                                                                   | `FINALIZED` |
| **Personal info**       | `src/content/profile.ts`                                                                                                                            | `FINALIZED` |
| **Pieces of Me**        | `src/content/personality.ts` (five provisional fragments + captions)                                                                                | `FINALIZED` |
| **Sections/nav**        | `src/content/sections.ts` (order source of truth; visible nav is About/Experience/Toolkit/Projects/Pieces of Me/Contact)                            | `FINALIZED` |
| **Images**              | `src/assets/` static imports + `next/image`                                                                                                         | `FINALIZED` |
| **SEO/Metadata**        | `metadata` export in `layout.tsx` (canonical title, description, OG/Twitter, canonical URL) + `icon.png` + generated `opengraph-image`/`apple-icon` | `FINALIZED` |

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

| Aspect                  | Decision                                                                               | Status         |
| ----------------------- | -------------------------------------------------------------------------------------- | -------------- |
| **Platform**            | Vercel (deployed: https://shikharsahay.vercel.app/)                                    | `FINALIZED`    |
| **Wall database**       | Neon Postgres via `DATABASE_URL`                                                       | `EXPERIMENTAL` |
| **Preview deployments** | None configured                                                                        | `UNDECIDED`    |
| **Analytics**           | None installed                                                                         | `UNDECIDED`    |
| **Error tracking**      | None installed                                                                         | `UNDECIDED`    |
| **Edge/ISR**            | Icon/image routes render on demand (edge); notes API is dynamic; homepage stays static | `FINALIZED`    |

### Security Headers

`next.config.mjs` sets the production security baseline for every route: a source-specific Content Security Policy, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a deny-by-default Permissions-Policy for sensitive device features, and HSTS for the HTTPS-only Vercel deployment. The CSP allows self-hosted scripts plus inline scripts required by Next's production bootstrap and RSC payloads, self images plus data/blob and Spotify artwork from `i.scdn.co`, self connections, self fonts, inline styles for Next and Tailwind runtime style tags, and no object or media embeds.

Public JSON write routes use a shared bounded body reader before validation. Notes, replies, and show recommendations reject non-JSON or oversized payloads without trusting `content-length` alone. User content remains rendered as plain React text nodes, with no user-controlled HTML injection.

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
- [ ] Copy approval and Skilledity dates (owner inputs; project links, social links, cert verifications, and resume PDF are real)

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
