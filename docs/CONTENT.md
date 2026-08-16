# CONTENT.md

> **Status:** This file is the eventual source of truth for all portfolio content.
> Currently **EMPTY** — content will be populated during relevant milestones.
> **Format:** Structured data (TypeScript/JSON) preferred over markdown for programmatic use.

---

## Content Structure Overview

```
content/
├── hero.ts              # Hero copy, portrait reference
├── projects.ts          # Selected work — full project data
├── experience.ts        # Career/education timeline
├── personality.ts       # Human layer — interests, writing, etc.
├── contact.ts           # Contact info, social links
└── meta.ts              # SEO, Open Graph, site metadata
```

---

## Hero Content (M1)

### Data Structure (UNDECIDED)

```typescript
// content/hero.ts
export const heroContent = {
  name: 'Shikhar Sahay',
  // Striking statement — NOT "Hi, I'm Shikhar, a passionate Computer Science student..."
  statement: 'UNDECIDED',
  // Role indication — what he does
  role: 'UNDECIDED',
  // Invitation to continue
  cta: 'UNDECIDED',
  // Portrait
  portrait: '/images/shikhar-hero.jpg',
  // Alt text for accessibility
  portraitAlt: 'UNDECIDED',
};
```

### Copy Guidelines (FINALIZED)

- **No generic intros** — "Hi, I'm...", "Passionate...", "Aspiring..."
- **Editorial voice** — confident, distinctive, memorable
- **Concise** — hero is scanned in seconds
- **Action-oriented** — invitation to explore, not just consume

---

## Projects Content (M3)

### Data Structure (UNDECIDED)

```typescript
// content/projects.ts
export interface Project {
  id: string;
  title: string;
  shortDescription: string; // Card preview
  longDescription: string; // Detail view
  role: string; // "Full-stack developer", "Security researcher", etc.
  tech: string[]; // Tech stack tags
  category: 'featured' | 'selected' | 'other';
  // Links
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  // Media
  heroImage: string; // Optimized, multiple formats
  heroImageAlt: string;
  galleryImages?: string[]; // Additional screenshots
  // Metadata
  startDate: string; // ISO date
  endDate?: string; // ISO date or "Present"
  isOngoing: boolean;
  // Highlights
  highlights: string[]; // Key achievements, metrics, challenges
}
```

### Projects To Populate (UNDECIDED)

- [ ] Project 1
- [ ] Project 2
- [ ] Project 3
- [ ] ... (owner to provide)

### Content Guidelines (FINALIZED)

- **Show, don't just tell** — metrics, outcomes, specific technical challenges
- **Security work** — describe impact without sensitive details
- **Images** — hero + gallery, optimized, with descriptive alt text
- **Links** — live demo preferred, repo if public, case study if written

---

## Experience Content (M4)

### Data Structure (UNDECIDED)

```typescript
// content/experience.ts
export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education' | 'research' | 'leadership' | 'side-project';
  title: string;
  organization: string;
  location: string; // City, Country / Remote
  startDate: string; // ISO date
  endDate?: string; // ISO date or "Present"
  isCurrent: boolean;
  description: string; // 2-3 sentences
  highlights: string[]; // Bullet points: achievements, scope, tech
  skills: string[]; // Key skills demonstrated
  // Optional
  logo?: string; // Organization logo path
  url?: string; // Org website
}
```

### Entries To Populate (UNDECIDED)

- [ ] Education (CS degree)
- [ ] Internships / Work experience
- [ ] Research / Publications
- [ ] Leadership / Community
- [ ] Notable side projects

### Content Guidelines (FINALIZED)

- **Reverse chronological** (most recent first)
- **Impact over duties** — "Built X that achieved Y" not "Responsible for X"
- **Technical specificity** — name tools, languages, scale, constraints
- **Security context** — frame cybersecurity work technically, not aesthetically

---

## Personality Content (M5)

### Data Structure (UNDECIDED)

```typescript
// content/personality.ts
export const personalityContent = {
  // Writing / Blog
  writing: [{ title: '', url: '', date: '', description: '' }],
  // Interests (curated, not exhaustive)
  interests: [
    { category: 'Music', items: [] },
    { category: 'Football', items: [] },
    { category: 'Theatre', items: [] },
    { category: 'Reading', items: [] },
  ],
  // Values / Philosophy (optional)
  values: [],
  // Fun fact / Easter egg (optional)
  easterEgg: '',
};
```

### Content Guidelines (FINALIZED)

- **Curated, not comprehensive** — a few meaningful items per category
- **Authentic voice** — not corporate, not forced
- **Visual integration** — this content informs design but doesn't dictate a "hobbies section"
- **Links to external** — writing on personal blog, Goodreads, Letterboxd, etc.

---

## Contact Content (M1/M7)

### Data Structure (UNDECIDED)

```typescript
// content/contact.ts
export const contactContent = {
  email: 'UNDECIDED',
  // Social / Professional
  links: [
    { label: 'GitHub', url: 'UNDECIDED', icon: 'github' },
    { label: 'LinkedIn', url: 'UNDECIDED', icon: 'linkedin' },
    { label: 'Twitter/X', url: 'UNDECIDED', icon: 'twitter' },
    { label: 'Email', url: 'mailto:UNDECIDED', icon: 'mail' },
  ],
  // Optional: Form endpoint
  formEndpoint: 'UNDECIDED',
  // CTA copy
  cta: 'UNDECIDED',
};
```

---

## Site Metadata (M0/M7)

### Data Structure (UNDECIDED)

```typescript
// content/meta.ts
export const siteMeta = {
  title: 'Shikhar Sahay — Portfolio',
  description: 'UNDECIDED — ~160 chars for SEO',
  url: 'UNDECIDED', // Production URL
  ogImage: '/images/og-portrait.jpg', // 1200x630
  twitterHandle: 'UNDECIDED',
  // JSON-LD structured data
  person: {
    name: 'Shikhar Sahay',
    url: 'UNDECIDED',
    sameAs: ['UNDECIDED'], // Social profiles
  },
};
```

---

## Content Migration Notes

When populating:

1. **Start with real data** — even draft content is better than placeholder
2. **Keep in sync** — `CONTENT.md` documents the schema; actual data lives in `src/content/*.ts`
3. **Version content** — if content changes, update both the data file and this doc
4. **Review for security** — no internal IPs, secrets, PII, or sensitive project details

---

## Owner Action Items

The following need owner input before milestones can proceed:

| Milestone | Needed From Owner                                                                        |
| --------- | ---------------------------------------------------------------------------------------- |
| M1        | Hero statement, role description, CTA copy, portrait file, portrait alt text             |
| M3        | Project list with all fields (title, description, role, tech, links, images, highlights) |
| M4        | Experience entries (work, education, research) with highlights                           |
| M5        | Curated interests, writing links, values/easter egg (optional)                           |
| M7        | Contact email, social URLs, form endpoint (if any), SEO description, OG image            |

---

## Notes

This file tracks the **schema and structure**. Actual content data files will be created in `src/content/` during implementation milestones. This doc stays in sync with the data structures.
