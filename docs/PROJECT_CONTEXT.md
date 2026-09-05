# PROJECT_CONTEXT.md

## The Person

**Shikhar Sahay**: Computer Science student, cybersecurity enthusiast, builder of memorable things.

**Traits:** Curious, creative, ambitious, technically focused, strongly motivated by building memorable experiences.

**Interests outside tech:** Writing, music, football, theatre. These inform personality but should not be awkwardly forced into visual design.

## Project Purpose

Create a personal portfolio website that is:

1. **Immediately professional and functional**: visitors understand who Shikhar is and what he does within seconds
2. **Genuinely memorable**: elicits the reaction:
   > "Holy shit."
   > "This person is actually technically impressive."

The website is a **portfolio first, an experience second, and a story third**.

## Desired Visitor Reaction

- **First impression:** "Holy shit." (visual/technical impact)
- **Second impression:** "This person is actually technically impressive." (substance backing the style)
- **Outcome:** Visitor understands Shikhar's capabilities, sees his work, remembers the experience

## Creative Direction

| Attribute                                  | Description                                         |
| ------------------------------------------ | --------------------------------------------------- |
| **Smooth**                                 | No jank, no layout shift, buttery interactions      |
| **Suave**                                  | Confident, polished, not trying too hard            |
| **Refined**                                | Every detail considered, nothing arbitrary          |
| **Premium**                                | Feels high-quality, not template-like               |
| **Editorial**                              | Strong typographic voice, magazine-like composition |
| **Personal**                               | Feels like a person, not a corporation              |
| **Interactive**                            | Rewards exploration, not passive consumption        |
| **Typographically strong**                 | Typography leads the design                         |
| **Cinematic in places**                    | Moments of drama, narrative pacing                  |
| **Clean at rest, extraordinary in motion** | Static state is calm; motion reveals depth          |

## What This Is NOT

- A cybersecurity portfolio aesthetic
- A stereotypical developer portfolio
- A dashboard or card-based layout
- Visual chaos or loud experimentation
- Animations for the sake of animations

## References (For Inspiration Only: Do NOT Copy)

- https://old.aryanranderiya.com/
- https://aryanranderiya.com/
- https://www.devansharora.in/
- https://swayam.li/

**What the owner likes from these:**

- Strong typography
- Continuous/infinite scrolling
- Smooth animation
- Visual storytelling
- Cohesive visual identity
- Memorable interactions

## Things to Explicitly AVOID

- Cyberpunk / Matrix effects / neon hacker aesthetics
- Fake terminal interfaces
- Excessive glassmorphism
- Generic gradients
- Particle backgrounds
- Generic developer portfolio layouts
- Excessive cards / dashboard-like layouts
- Loud/funky experimentation
- Visual chaos
- Animations for the sake of animations

## Conceptual Flow (finalized IA; numbers below are order only, never rendered)

```
OPENING (signal-line loader)
  → IDENTITY (arch portrait + interactive name + veil exit)
  → STATEMENTS (phased kinetic typography: BUILD, BREAK, REBUILD)
  → ABOUT (reading reveal + meta row)
  → EXPERIENCE (org-grouped timeline)
  → SKILLS (marquee emblem rows + certifications)
  → PROJECTS (drifting carousel)
  → PERSONALITY (fragment instrument, inverted panel)
  → CONTROL CENTER (utility grid)
  → CONTACT + FOOTER (contact grid, resume row, marquee wordmark)
```

**Constraints on flow:**

- Ultimately a continuous/long-scroll experience
- Storytelling must remain concise
- Visitors should understand Shikhar and reach his work quickly

## Hero Requirements (Eventual)

The hero should contain:

- Shikhar's name (oversized, pointer-reactive, never wrapping)
- A striking statement ("I build things worth remembering.", provisional copy)
- His portrait (`src/assets/shikhar-hero.jpg`, arch aperture, static import)
- What he does (CS @ VIT Vellore; software, security and the web)
- An invitation to continue (scroll cue)

**Hero should feel:** Editorial and distinctive

## Technical Direction (as built)

- **Framework:** Next.js 14 (App Router, fully static)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3 + CSS variables
- **Animation:** Motion v13 (the only animation library)
- **Advanced animation / smooth scroll / 3D:** none (GSAP, Lenis, Three.js excluded by rule unless a documented reason emerges)
- **Backend / persistence:** none (static site; theme in localStorage, intro flag in sessionStorage only)
- **Deployment:** Vercel (planned, not yet deployed)

## Performance Requirement

**Hard requirement:** The website must look impressive without becoming slow.

## Mobile Requirement

**First-class experience**, not a shrunken desktop layout.

## Documentation Status

This file is **FINALIZED** as the project context source of truth. Other docs track decisions as they're made.
