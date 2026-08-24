# AGENTS.md

> **CANONICAL agent instructions for this repository.** > `CLAUDE.md` is a pointer to this file (kept for tooling compatibility).
> `docs/AGENTS.md` extends this file with multi-agent session protocol details.
> Every agent MUST read this file plus `docs/HANDOFF.md` before making changes.

---

## 1. Project Purpose

Personal portfolio website for **Shikhar Sahay**: Computer Science student (VIT Vellore, Cybersecurity major), builder across software, security, and the web.

The goal is a directed digital experience that feels personal, cinematic, and technically crafted. Success is "that is a really well-designed personal website", never "nice portfolio". It must stay professional enough for recruiters and placement committees.

## 2. Current Visual Direction

- **Identity system:** warm print-editorial. Cream paper / warm charcoal ink / vermilion accent (single accent, semantic uses only). Instrument Sans (workhorse) + Instrument Serif italic (accent moments). Themeable: intentional light and dark colorways, system default, persisted toggle in the header.
- **Signature motifs** (recurring, keep consistent): section eyebrows as plain editorial labels (e.g. `Experience`), hairline rules with accent ticks, ghost serif numerals (decorative only), numbered artifact tags (e.g. `P.01`), film grain, drifting light field, outline display type.
- **Portrait treatment:** an editorial arch aperture (rounded crown, straight base) with an offset vermilion echo arch behind it, overlapping the display type. Subtle pointer parallax. Never a rectangle beside text, never a circular avatar, never a zoom-on-scroll.
- **Opening:** a title sequence on an ink field; the name renders at the hero's exact position and scale so the lift reads as one continuous composition. Once per session, skipped pre-paint for returning visitors and reduced motion.
- **Atmosphere:** static film grain plus a very slow drifting light field. Nothing space-like, nothing neon.
- Full status and values: `docs/DESIGN_SYSTEM.md`.

## 3. Design Constraints (hard rules)

- No cyberpunk, hacker, terminal, neon, matrix aesthetics. Security is content, not visual identity.
- No generic SaaS/dashboard/card-grid layouts, no glassmorphism, no particle spam, no random blobs, no gratuitous 3D.
- No scroll behavior that zooms a camera into the portrait's face (explicitly rejected).
- **No visible presentation numbering**: never render `01 / 07` style section counters or "seven parts" language. The registry keeps order internally; the visitor sees a continuous page. Section labels are plain editorial words.
- **No CGPA or academic scores anywhere** in the visible site.
- **No coordinates / latitude-longitude decoration.**
- Mobile is art-directed intentionally, not a shrunken desktop.
- Performance is a hard requirement (see section 7).
- Accessibility is first-class: reduced motion gets a complete, beautiful page.
- Do not invent achievements, employers, metrics, dates, quotes, or personal facts. Content comes from owner-supplied source material in `src/content/` and `docs/CONTENT.md`. Unsupplied links stay as clearly-marked placeholders (`#`, `/resume.pdf`).

## 4. Animation Philosophy

- Motion language: **ARRIVE / DISCOVER / TRANSFORM / SETTLE / DEPART**. Motion communicates structure; it is never decoration.
- Prefer CSS transforms/opacity/clip-path. Motion (the library) only where interaction or scroll scrubbing genuinely requires it.
- No GSAP, Lenis, or Three.js unless a compelling technical reason is documented first.
- Every animation has a reduced-motion equivalent (instant or single short fade). The page must be complete with animations disabled.
- Full rules and implemented patterns: `docs/ANIMATION.md`.
- Known Motion v13 quirk: always use explicit 3-point `useTransform` ranges (2-point ranges do not hold their end value).

## 5. Information Architecture

Long-scroll narrative, in this order:

```
01 / OPENING + IDENTITY   (title sequence, then hero with arch portrait)
02 / ABOUT                (reading-highlight statement, meta, editorial index)
03 / EXPERIENCE           (org-grouped progression, latest first)
04 / SKILLS               (editorial tool index, serif group headings)
05 / PROJECTS             (compact artifact panels with preview motifs)
06 / PERSONALITY          (fragment instrument, inverted panel)
07 / CONTROL CENTER       (utility grid: now, IST clock, toolbox, links)
08 / CONTACT + FOOTER     (resume moment, say hello, large wordmark)
```

Experience precedes Skills; Skills precedes Projects. The section registry in `src/content/sections.ts` drives navigation and the editorial index. Numbers are internal only: the visitor never sees section counters (see section 3).

## 6. Copy Rules

- **No em dashes or en dashes anywhere**: website copy, documentation, comments, UI text. Use commas, colons, parentheses, periods, or line breaks.
- No generic portfolio phrases ("Hi, I'm...", "Welcome", "Passionate about...").
- Copy is provisional until the owner approves it; mark rewrites EXPERIMENTAL in docs.

## 7. Performance Constraints

- Budget: **150 kB First Load JS**. Current: ~145 kB. Audit before adding any client JS.
- Stack is fixed: Next.js 14, React 18, TypeScript, Tailwind, Motion. Do not migrate frameworks or add animation/UI libraries without documented justification.
- Server Components by default; every client component needs a reason (listed in `docs/HANDOFF.md`).
- Animate only transform/opacity/clip-path. No layout-triggering animation, no continuous React state on scroll, no expensive scroll listeners.
- Static-first (SSG). Images via `next/image` with static imports from `src/assets/` (blur placeholder).

## 8. Documentation Protocol

Every agent, every session:

1. Read this file, then `docs/HANDOFF.md`, then `docs/DECISIONS.md`, then topic docs relevant to the task (`DESIGN_SYSTEM`, `ANIMATION`, `ARCHITECTURE`, `CONTENT`, `PERFORMANCE`, `ROADMAP`).
2. Inspect existing code before modifying it. Preserve `FINALIZED` decisions; propose changes through `docs/DECISIONS.md`, never silently.
3. Mark new decisions `EXPERIMENTAL` until the owner approves them. Use the FINALIZED / EXPERIMENTAL / UNDECIDED convention everywhere.
4. After meaningful work: update `docs/HANDOFF.md` (state, changes, decisions, known issues, next steps, testing status) plus the topic docs the work touched.
5. Leave the repository runnable: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` must pass.
6. Validate visual work in a real browser at desktop and mobile widths, including reduced motion and both themes, before claiming completion.
7. Commit messages: `type(scope): description` (e.g. `feat(hero): ring instrument portrait`).

Multi-agent session details and conflict resolution: `docs/AGENTS.md`.

## 9. Before Substantial Changes

Any change that alters the visual concept, information architecture, motion system, or performance profile requires:

1. Reading the full doc set (30 minutes is cheaper than a broken direction).
2. Recording the decision in `docs/DECISIONS.md` with rationale and rejected alternatives.
3. Updating every doc the change touches.

Do not reconstruct design rationale from Git history. It lives here.
