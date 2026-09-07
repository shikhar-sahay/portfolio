# Shikhar Sahay, Portfolio

Personal portfolio website for Shikhar Sahay: Computer Science student (VIT Vellore, Cybersecurity major), builder across software, security, and the web.

A directed long-scroll experience that feels personal, cinematic, and technically crafted. Warm print-editorial identity (cream paper, warm charcoal ink, single vermilion accent), oversized Instrument type, scroll-choreographed scenes. Professional enough for recruiters and placement committees.

## Design and art direction

- **Identity:** warm print-editorial. Cream paper `#F3EFE6`, warm charcoal ink `#1D1915`, one vermilion accent (`#BC3F1A` light, `#E0643B` dark). Instrument Sans (workhorse) plus Instrument Serif italic (accent moments). Intentional light and dark colorways with a persisted header toggle.
- **Signature motifs:** plain editorial section eyebrows, hairline rules with accent ticks, diamond markers, film grain, slow drifting light field, outline display type, arch portrait aperture with vermilion echo.
- **Security is content, not visual identity.** No cyberpunk, hacker, terminal, or neon aesthetics anywhere.
- Full system: `docs/DESIGN_SYSTEM.md`.

## Sections and features (top to bottom)

1. **Opening:** minimal signal-line loader on an ink field (~1.6s, once per session, skipped for returning visitors and reduced motion).
2. **Hero:** arch portrait with pointer parallax plus an oversized two-line name that reacts letter by letter to the pointer (2D spring field, fine pointers only). The tagline keeps an accent rule: a vermilion hairline draws beneath the serif word with a diamond riding to the cursor. Scroll exit is a two-beat scene change into a surface-matched veil (the bridge owns every word, so nothing duplicates). Never zooms the face.
3. **Statements bridge:** one vertical composition traveling upward with scroll, deliberately themed (paper plus ink in light, warm charcoal plus cream in dark). Three thoughts share the ride with emphasis following distance from center while inactive thoughts persist as dimmed history; each row carries a cropped full-word echo at whisper element opacity and the rows cascade diagonally, so the full viewport reads as composition; the finale holds its frame into About.
4. **About:** word-by-word reading reveal plus a small meta row (based in, studying, otherwise).
5. **Experience:** org-grouped timeline (Cyber Defenders, Recipharm, GDG On Campus, CodeChef-VIT Student Chapter, Skilledity, Team Shade) on a mathematically centered spine with a scroll-drawn accent fill and diamond markers.
6. **Toolkit:** one navigational destination with the Skills emblems (three drifting marquee rows of golden emblems with real monochrome technology marks: 19 of 23, ink monograms where no genuine mark exists, no proficiency levels) plus the Certifications ledger chapter (eyebrow, serif lede, hairline rows, featured first credential, boxed Verify links), rows arriving with a scroll mask wipe.
7. **Projects:** infinite drifting carousel (auto until first touch, then manual forever), drag/swipe/arrows/keyboard, five artifact cards with SVG preview motifs and inert placeholder links.
8. **Pieces of Me:** theme-following chapter with a fragment word-swap instrument (buttons, keyboard accessible), a mosaic statement, plus a full-bleed notes wall (tilted tactile cards, docked instrument with Latest flight, placement preview, serif composer, thread slip with one-level replies, keyboard parity, calm reduced motion). Captions are voice lines, not factual claims.
9. **Control center:** framed utility grid (Now, IST clock, Studying, Toolbox, Channels, Navigate) with live status, session uptime, and brand channel tiles.
10. **Footer:** compact contact grid (icon plus name social rows with real brand marks, Discord copy row, arrow-marked page links), slim resume row (Drive view plus local download), and a closing SHIKHAR SAHAY marquee that leans as one object with a cursor-following vermilion sheen (zero cost at idle).

## Interaction highlights

- Pointer-reactive display type (hero letter springs; footer wordmark leans as one object with a sheen sweep).
- Scroll-scrubbed scene choreography with one coherent progress model per scene; every range ends at 1.0 (Motion v13 drops flat terminal segments past the last keyframe).
- Theme toggle persisted to localStorage; intro flag in sessionStorage; wall cache in localStorage. The only backend is the notes wall API (validation plus rate limits, in-memory store with a documented KV path).

## Tech stack

Next.js 14 (App Router, static export), React 18, TypeScript (strict), Tailwind CSS 3, Motion (the only animation library). No GSAP, Lenis, Three.js, icon libraries, or UI kits. Package manager: pnpm 9.

## Local development

```bash
pnpm install
pnpm dev      # start development server
pnpm build    # production build (static)
pnpm start    # serve production build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm format
```

`pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm build` must all pass before committing.

## Project structure

```
src/
├── app/                    # App Router: layout (metadata, theme script), page (section order), not-found (404 scene), globals.css, icon.svg
├── assets/                 # Static imports (hero portrait; enables blur placeholders)
├── components/
│   ├── layout/             # Opening, SiteNav (header + progress + active section + mobile menu), ThemeToggle
│   ├── sections/           # Hero, TransitionStatements, About, Experience, Skills (Toolkit),
│   │                       #   Certifications (ledger chapter inside Toolkit), Projects,
│   │                       #   ProjectPanel (lazy chunk), Personality (Pieces of Me),
│   │                       #   NotesWall (open surface), ControlCenter,
│   │                       #   Contact (footer), FooterWordmark
│   └── ui/                 # InteractiveLetters, TechLogo, Reveal, WordReveal,
│                           #   Counter, InView, CopyText
├── content/                # Typed data modules: profile, sections, projects,
│                           #   experience, systems, personality, wall, techLogos, channelGlyphs
└── hooks/                  # useMountedReducedMotion (hydration-safe reduced-motion flag)
public/
└── resume.pdf              # Real owner-supplied resume
docs/                       # Design system, architecture, animation, content, performance,
                            #   roadmap, decisions, handoff, agent protocol
```

## Accessibility and reduced motion

- Semantic landmarks, complete keyboard flow with visible focus rings, aria labels on icon-only controls, `aria-hidden` on duplicated carousel/marquee copies.
- Every animation has a reduced-motion equivalent via `useMountedReducedMotion` (gated post-mount so SSR and hydration markup match): static hero (never pinned), static statement stack with residues, native-scroll carousel with instant arrows, static cert ledger, static footer wordmark, Latest jumps instead of flying, collapsed CSS motion globally.
- Touch devices get the complete static experience (pointer interactions are fine-pointer only).

## Performance philosophy

Performance is a hard requirement. Server Components by default, one small lazy chunk (`ProjectPanel`), compositor-only animation (transform/opacity/clip-path), single rAF loops gated by pointer presence or viewport visibility, static-first build. Budget: 150 kB First Load JS; current ~160 kB (see `docs/PERFORMANCE.md` for the measured state and reclaim options).

## Persistence and backend status

There is no traditional backend: no database, no analytics, no contact form backend. The notes wall exposes API routes (`/api/notes`: list/create, replies, secret-gated moderation, global-latest lookup) backed by an in-memory store with validation and rate limiting; on serverless hosts each instance sees its own wall until the documented KV swap is configured. Browser storage holds the theme choice (localStorage), the intro-played flag (sessionStorage), and a wall cache. Any future shared persistence needs an API route plus a tiny store with server allow-listing and rate limiting; the wall's storage interface is shaped for exactly that swap.

## Known placeholders (owner input needed)

- Contact links: email, GitHub, LinkedIn, Instagram, Medium, X, Spotify, and Drive resume are real and wired; Discord is a copy action (no public URL exists)
- Resume PDF is the real owner-supplied file (Drive link remains canonical for viewing)
- Project Live/GitHub/Case study links (`#` in `src/content/projects.ts`)
- Skilledity Social Media Management Intern: no dates or summary supplied
- Four skills keep monogram emblems (SQL, Nmap, CrowdStrike Falcon, Beelzebub: no genuine CC0 mark found)
- All copy is provisional until the owner approves it

Placeholders never navigate: client components swallow the click, server components render plain text, every placeholder carries a "coming soon" label.

## Documentation map

- `AGENTS.md` (repo root) is the canonical agent instruction set. `CLAUDE.md` points to it.
- `docs/HANDOFF.md`: current state, the read-first/write-last sync point.
- `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/ANIMATION.md`: the built system as it exists.
- `docs/CONTENT.md`: content schemas and placeholder inventory.
- `docs/PERFORMANCE.md`: budgets and measured state.
- `docs/ROADMAP.md`: milestone history and what remains (signature experience, launch).
- `docs/DECISIONS.md`: decision log with rationale.
- `docs/PROJECT_CONTEXT.md`: person, purpose, direction.
- `docs/AGENTS.md`: multi-agent session protocol.

## Development rules that matter

- `AGENTS.md` is canonical; `docs/HANDOFF.md` is the sync point. Read both before changing anything.
- Never silently override a `FINALIZED` decision; propose via `docs/DECISIONS.md`.
- No em dashes anywhere (copy, docs, comments, UI). No CGPA, no coordinates, no invented facts, no visible section numbering, no ghost numerals, no face zoom.
- Server Components by default; justify every client component and every new dependency.
- Validate visual work in a real browser (desktop + mobile, both themes, reduced motion) before claiming completion.

## License

MIT
