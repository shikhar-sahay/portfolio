# PROJECT_CONTEXT.md

## The Person

**Shikhar Sahay** — Computer Science student, cybersecurity enthusiast, builder of memorable things.

**Traits:** Curious, creative, ambitious, technically focused, strongly motivated by building memorable experiences.

**Interests outside tech:** Writing, music, football, theatre. These inform personality but should not be awkwardly forced into visual design.

## Project Purpose

Create a personal portfolio website that is:

1. **Immediately professional and functional** — visitors understand who Shikhar is and what he does within seconds
2. **Genuinely memorable** — elicits the reaction:
   > "Holy shit."
   > "This person is actually technically impressive."

The website is a **portfolio first, an experience second, and a story third**.

## Desired Visitor Reaction

- **First impression:** "Holy shit." — visual/technical impact
- **Second impression:** "This person is actually technically impressive." — substance backing the style
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

## References (For Inspiration Only — Do NOT Copy)

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

## Conceptual Flow (Placeholders, Not Finalized Section Names)

```
ARRIVAL
  → INTRODUCTION
  → SELECTED WORK
  → EXPERIENCE / JOURNEY
  → PERSONALITY
  → INTERACTIVE EXPERIENCE
  → CONTACT
```

**Constraints on flow:**

- Ultimately a continuous/long-scroll experience
- Storytelling must remain concise
- Visitors should understand Shikhar and reach his work quickly

## Hero Requirements (Eventual)

The hero should contain:

- Shikhar's name
- A striking statement (NOT generic copy like "Hi, I'm Shikhar, a passionate Computer Science student...")
- His portrait (second portrait provided by owner → `public/images/shikhar-hero.jpg`)
- Clear indication of what he does
- Clear invitation to continue exploring

**Hero should feel:** Editorial and distinctive

## Technical Direction (Likely, Not Finalized)

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Motion for React (Framer Motion)
- **Advanced animation:** GSAP only when genuinely necessary
- **Smooth scroll:** Lenis only if justified
- **3D/WebGL:** Three.js / React Three Fiber only for specific high-value experiences
- **Deployment:** Vercel

## Performance Requirement

**Hard requirement:** The website must look impressive without becoming slow.

## Mobile Requirement

**First-class experience** — not a shrunken desktop layout.

## Documentation Status

This file is **FINALIZED** as the project context source of truth. Other docs track decisions as they're made.
