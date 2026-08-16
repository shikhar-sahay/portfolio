# CLAUDE.md

This file contains permanent instructions for every Claude Code session working on this repository.

## Project Overview

Personal portfolio website for Shikhar Sahay. The goal is a portfolio that is immediately professional and functional but also genuinely memorable — eliciting "Holy shit." followed by "This person is actually technically impressive."

## Core Constraints

- **Do NOT** build cyberpunk/hacker/neon aesthetics — cybersecurity is content, not visual identity
- **Do NOT** use fake terminals, excessive glassmorphism, generic gradients, particle backgrounds
- **Do NOT** animate for animation's sake — motion must be purposeful
- **Mobile-first** — not a shrunken desktop layout
- **Performance is a hard requirement** — impressive without being slow

## Documentation Protocol

Every session MUST:

1. Read `CLAUDE.md` (this file)
2. Read `docs/HANDOFF.md` for current state
3. Read `docs/ROADMAP.md` for milestone context
4. Read relevant design/architecture docs before making changes
5. Inspect existing code before modifying
6. Preserve FINALIZED decisions (marked in docs)
7. Avoid major undocumented design decisions
8. Update documentation after meaningful work
9. Leave the repository runnable

## Decision Status Markers

- `FINALIZED` — Decided, documented, do not change without discussion
- `EXPERIMENTAL` — Being tested, may change
- `UNDECIDED` — Not yet decided, explicitly documented as such

## Tech Direction (Not Finalized)

Likely: Next.js, TypeScript, Tailwind CSS, Motion for React, GSAP (when necessary), Lenis (if justified), Three.js/R3F (for specific high-value experiences), Vercel deployment.

## Current Milestone

See `docs/HANDOFF.md` and `docs/ROADMAP.md`

## Key Files

- `docs/PROJECT_CONTEXT.md` — Person, purpose, creative direction
- `docs/DESIGN_SYSTEM.md` — Typography, colors, spacing, visual decisions
- `docs/ARCHITECTURE.md` — Framework, structure, rendering strategy
- `docs/ROADMAP.md` — Milestones 0–8
- `docs/DECISIONS.md` — Important decisions and rationale
- `docs/ANIMATION.md` — Motion philosophy, easing, reduced-motion
- `docs/CONTENT.md` — Portfolio content source of truth
- `docs/PERFORMANCE.md` — Performance principles and measurements
- `docs/HANDOFF.md` — Session-to-session state (CRITICAL)
- `docs/AGENTS.md` — Multi-agent working guidelines
