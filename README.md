# Shikhar Sahay — Portfolio

Personal portfolio website for Shikhar Sahay. Built to be immediately professional and functional while remaining genuinely memorable — eliciting "Holy shit." followed by "This person is actually technically impressive."

## Philosophy

- **Cybersecurity is content, not visual identity** — No cyberpunk, neon, fake terminals, or genre tropes
- **Performance is a hard requirement** — Impressive without being slow
- **Mobile-first** — First-class experience, not a shrunken desktop layout
- **Motion with purpose** — No animations for animation's sake

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3
- **Package Manager:** pnpm 9
- **Deployment:** Vercel (planned)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Check formatting
pnpm format:check

# Format code
pnpm format

# Type check
pnpm typecheck
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles + CSS variables
├── components/
│   ├── ui/                # Primitive components
│   ├── sections/          # Page sections
│   ├── layout/            # Header, Footer, Navigation
│   └── effects/           # Visual effects (3D, canvas)
├── lib/                   # Utilities, constants, animations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── content/               # Content data (projects, experience)
public/
└── images/                # Static images
```

## Documentation

Project documentation lives in `docs/`:

- `PROJECT_CONTEXT.md` — Person, purpose, creative direction
- `DESIGN_SYSTEM.md` — Typography, color, spacing, visual decisions
- `ARCHITECTURE.md` — Technical architecture decisions
- `ROADMAP.md` — Milestone plan (M0–M8)
- `DECISIONS.md` — Decision log with rationale
- `ANIMATION.md` — Motion philosophy and tokens
- `CONTENT.md` — Content schemas
- `PERFORMANCE.md` — Performance budgets and strategies
- `HANDOFF.md` — Session-to-session state
- `AGENTS.md` — Multi-agent working guidelines

## Milestones

| #   | Milestone                               | Status      |
| --- | --------------------------------------- | ----------- |
| 0   | Documentation & Project Foundation      | ✅ Complete |
| 1   | Entrance + Hero                         | 🔄 Next     |
| 2   | Navigation + Scroll Architecture        | ⏳          |
| 3   | Selected Projects                       | ⏳          |
| 4   | Experience / Journey                    | ⏳          |
| 5   | Personality / Human Layer               | ⏳          |
| 6   | Signature Interactive Experience        | ⏳          |
| 7   | Final Polish                            | ⏳          |
| 8   | Performance, Accessibility & Deployment | ⏳          |

## License

MIT
