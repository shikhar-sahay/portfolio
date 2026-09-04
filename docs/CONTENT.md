# CONTENT.md

> **Status:** Implemented (2026-08-23). Content lives in typed modules under `src/content/` and is consumed by section components. This file documents the model.
> **Format:** Structured TypeScript data modules, single source of truth per topic.

---

## Implemented Content Modules (v2)

```
src/content/
├── profile.ts       # Name, location, statement, education, links
├── sections.ts      # Section registry: id, number, name, note (drives nav + opening + index)
├── projects.ts      # Three artifacts with visual treatment keys and metrics
├── experience.ts    # Era-grouped chronology (year, mood, entries)
├── systems.ts       # Skill groups + certifications
└── personality.ts   # Fragment words + voice captions (tonal, not factual claims)
```

### Rules encoded in the model

- Metrics and claims come only from owner-supplied source material (55K+ users, 1.2M+ views, top 1% of 4,000+, top 3% of 2,000+, 1.8L+ rupees, CGPA 9.31, tens of thousands of followers, 4 to 7 member team).
- `profile.links` values are placeholders (`#`, `/resume.pdf`) until the owner supplies real destinations.
- Placeholder links never navigate: client components swallow the click, server components render plain text instead of anchors, and every placeholder carries a "coming soon" label. Nothing pretends to work.
- Personality captions are voice lines, deliberately not factual claims.
- No em dashes anywhere in content.

### Section registry (drives navigation instrument, opening sequence, editorial index)

v4 information architecture (owner-directed reorder: Experience precedes Skills, Skills precedes Projects):

01 Identity (opening + hero), 02 About, 03 Experience, 04 Skills, 05 Projects, 06 Personality, 07 Contact + Footer.

The resume artifact moment lives inside 07 (Contact + Footer) rather than as its own section.

---

## Legacy planning sections (pre-implementation, kept for reference)

```
content/
├── hero.ts              # Hero copy, portrait reference
├── projects.ts          # Selected work  -  full project data
├── experience.ts        # Career/education timeline
├── personality.ts       # Human layer  -  interests, writing, etc.
├── contact.ts           # Contact info, social links
└── meta.ts              # SEO, Open Graph, site metadata
```

---

## Hero Content (M1)

> **Note (2026-08-23, v2):** Hero statement and intro lede now come from
> `src/content/profile.ts` (statementPre/statementEm, introLedePre/Em/Post).
> They remain owner-provided provisional copy. Rule: no em dashes in any
> website copy.

### Data Structure (UNDECIDED)

```typescript
// content/hero.ts
export const heroContent = {
  name: 'Shikhar Sahay',
  // Striking statement  -  NOT "Hi, I'm Shikhar, a passionate Computer Science student..."
  statement: 'UNDECIDED',
  // Role indication  -  what he does
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

- **No generic intros** - "Hi, I'm...", "Passionate...", "Aspiring..."
- **Editorial voice** - confident, distinctive, memorable
- **Concise** - hero is scanned in seconds
- **Action-oriented** - invitation to explore, not just consume

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

- **Show, don't just tell** - metrics, outcomes, specific technical challenges
- **Security work** - describe impact without sensitive details
- **Images** - hero + gallery, optimized, with descriptive alt text
- **Links** - live demo preferred, repo if public, case study if written

---

## Experience Content (M4)

### Data Structure (EXPERIMENTAL, updated 2026-08-26)

Experience is grouped by organization; roles nest inside each org entry.

```typescript
// content/experience.ts
export interface RoleEntry {
  role: string;
  period?: string; // omitted only when the owner's source supplies no dates
  summary?: string; // one condensed factual line; detail lives in the resume
}

export interface OrgEntry {
  org: string;
  location?: string;
  roles: RoleEntry[];
}

// Canonical order (owner-mandated, v4.2; full chapter name since v4.3):
// Cyber Defenders, Recipharm, GDG On Campus (Senior Core, Inner Core),
// CodeChef-VIT Student Chapter (Senior Core, Junior Core),
// Skilledity (Team Lead, Intern), Team Shade.
```

Note: the Skilledity "Social Media Management Intern" entry intentionally has no period or summary until the owner supplies dates and facts. Do not invent them.

### Entries To Populate (UNDECIDED)

- [ ] Education (CS degree)
- [ ] Internships / Work experience
- [ ] Research / Publications
- [ ] Leadership / Community
- [ ] Notable side projects

### Content Guidelines (FINALIZED)

- **Reverse chronological** (most recent first)
- **Impact over duties** - "Built X that achieved Y" not "Responsible for X"
- **Technical specificity** - name tools, languages, scale, constraints
- **Security context** - frame cybersecurity work technically, not aesthetically

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

- **Curated, not comprehensive** - a few meaningful items per category
- **Authentic voice** - not corporate, not forced
- **Visual integration** - this content informs design but doesn't dictate a "hobbies section"
- **Links to external** - writing on personal blog, Goodreads, Letterboxd, etc.

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
  title: 'Shikhar Sahay  -  Portfolio',
  description: 'UNDECIDED  -  ~160 chars for SEO',
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

1. **Start with real data** - even draft content is better than placeholder
2. **Keep in sync** - `CONTENT.md` documents the schema; actual data lives in `src/content/*.ts`
3. **Version content** - if content changes, update both the data file and this doc
4. **Review for security** - no internal IPs, secrets, PII, or sensitive project details

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
