# Shikhar Sahay - Portfolio

> I wanted a portfolio that felt less like a résumé with CSS and more like something worth exploring.

This repository powers my interactive portfolio at **https://shikharsahay.vercel.app/**. It is one continuous long-scroll page: an opening signal line, an editorial hero, a statements bridge, and chapters for About, Experience, Toolkit, Projects, Pieces of Me, and Contact. Warm paper, warm charcoal ink, one vermilion accent. No hacker clichés anywhere; security is what I do, not what the site looks like.

## Why it exists

Recruiters should get the facts in seconds. Everyone else should get a small experience: type that reacts to the pointer, a spine that draws itself down my work history, a carousel of real projects that drifts until you grab it, and a wall where visitors leave notes that persist in Postgres. Clean at rest, extraordinary in motion.

## Notable interactions

- Pointer-reactive display type (hero letter springs, footer wordmark lean with a cursor sheen)
- Scroll-scrubbed scenes: hero exit veil, vertical statements accumulation, timeline spine fill
- Toolkit emblem marquees with real monochrome technology marks
- Infinite projects carousel: slow auto-drift, drag/swipe/arrows/keyboard, truthful Live/GitHub actions
- Certifications ledger: one-open-at-a-time rows unfolding the real certificate in place
- Full-bleed spatial Notes Wall: pan, composer, replies, Latest/Random/Center discovery
- Light and dark colorways with a persisted toggle; the Email action opens Gmail compose

## Stack

Next.js 14 (App Router), React 18, TypeScript strict, Tailwind CSS 3, Motion (the only animation library). Postgres via `@neondatabase/serverless` for the wall API only. No GSAP, Lenis, Three.js, icon libraries, or UI kits. Package manager: pnpm 9.

## Project structure

```
src/
  app/            layout (metadata, theme script), page, not-found,
                  globals.css, icon.svg, apple-icon.tsx, opengraph-image.tsx,
                  api/notes (wall API)
  assets/         hero portrait, project artwork, org logos, certificate PNGs
  components/
    layout/       Opening, SiteNav, ThemeToggle
    sections/     Hero, TransitionStatements, About, Experience (+Eggs, +Artifacts),
                  Skills, Certifications, Projects (+lazy ProjectPanel),
                  Personality (Pieces of Me), NotesWall, Contact, FooterClock, FooterWordmark
    ui/           InteractiveLetters, TechLogo, Reveal, WordReveal
  content/        profile, sections, projects, experience, systems,
                  personality, wall, techLogos, channelGlyphs
  hooks/          useMountedReducedMotion
db/               001_wall_notes.sql (wall schema)
public/           resume.pdf
docs/             design system, architecture, animation, content, performance,
                  roadmap, decisions, handoff, agent protocol
```

## Local development

```bash
pnpm install
pnpm dev      # start development server
pnpm build    # production build
pnpm start    # serve production build
pnpm typecheck
pnpm lint
pnpm format:check
```

`pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm build` must all pass before committing. Read `AGENTS.md`, then `docs/HANDOFF.md`, before changing anything.

## Environment variables

| Variable            | Purpose                                | Required             |
| ------------------- | -------------------------------------- | -------------------- |
| `DATABASE_URL`      | Postgres connection for the Notes Wall | For wall persistence |
| `WALL_ADMIN_SECRET` | Secret gating the moderation endpoint  | For moderation only  |

Without `DATABASE_URL` the wall API returns a setup error and the wall shows a plain note count. Never expose either value to the client.

## Notes Wall setup

1. Create a Postgres database (Neon is the production fit for Vercel).
2. Run `db/001_wall_notes.sql`.
3. Set `DATABASE_URL` locally and in production.
4. Set `WALL_ADMIN_SECRET` to enable moderation.

## Accessibility and reduced motion

Semantic landmarks, full keyboard flow with visible focus, aria labels on icon-only controls. Every animation has a reduced-motion equivalent via `useMountedReducedMotion` (gated post-mount so SSR and hydration match): static hero, static statement stack, native-scroll carousel, instant opens, static wordmark. Touch devices get the complete experience without pointer-only interactions.

## Deployment

Vercel, at https://shikharsahay.vercel.app/. No CI, no analytics, no custom domain yet. Budget: 150 kB First Load JS; currently 165 kB (see `docs/PERFORMANCE.md`).

## Current status

Shipped and stable; copy is provisional until approved. Still open: Pieces of Me detail content, the deferred top-left identity mark, JSON-LD, Lighthouse plus real-device measurement, and the final performance QA pass. See `docs/ROADMAP.md` and `docs/HANDOFF.md`.

## License

MIT
