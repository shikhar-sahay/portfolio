# CONTENT.md

> **Status:** Implemented. Content lives in typed modules under `src/content/` and is consumed by section components. This file documents the model.
> **Format:** Structured TypeScript data modules, single source of truth per topic.

---

## Implemented Content Modules

```
src/content/
├── profile.ts       # Name, location, statement, lede, education, links
├── sections.ts      # Section registry: id, name, note (nav order source of truth)
├── projects.ts      # Five artifacts with visual treatment keys, metrics, role lines
├── experience.ts    # Org-grouped roles (role, period, summary)
├── systems.ts       # Skill groups (name + monogram) + certifications
├── personality.ts   # Fragment words + voice captions (tonal, not factual claims)
├── techLogos.ts     # Vendored CC0 brand paths for tools
└── channelGlyphs.ts # Vendored CC0 brand paths + original glyphs for contact channels
```

### Rules encoded in the model

- Metrics and claims come only from owner-supplied source material (55K+ users, 1.2M+ views, top 1% of 4,000+, top 3% of 2,000+, 1.8L+ rupees, tens of thousands of followers, 4 to 7 member team). Academic scores in source material are never displayed anywhere on the site.
- `profile.links` values are placeholders (`#`, `/resume.pdf`) until the owner supplies real destinations.
- Placeholder links never navigate: client components swallow the click, server components render plain text instead of anchors, and every placeholder carries a "coming soon" label. Nothing pretends to work.
- Personality captions are voice lines, deliberately not factual claims.
- No em dashes anywhere in content.

### Section registry (drives navigation active state)

Order is deliberate (Experience precedes Skills; Skills precedes Projects):

Identity (opening + hero), About, Experience, Skills, Projects, Personality, Contact + Footer.

The resume moment lives inside Contact + Footer rather than as its own section.

---

## Legacy planning sections (pre-implementation, kept for reference)

The planning sketch below predates implementation and does not match the
built modules above. It is kept so future agents can see what was
considered and rejected. Do not implement from it.

```
content/
├── hero.ts              # Hero copy, portrait reference
├── projects.ts          # Selected work  -  full project data
├── experience.ts        # Career/education timeline
├── personality.ts       # Human layer  -  interests, writing, etc.
├── contact.ts           # Contact info, social links
└── meta.ts              # SEO, Open Graph, site metadata
```

## Hero Content

> Hero statement and intro lede come from `src/content/profile.ts`
> (`statementPre`/`statementEm`, `introLedePre`/`Em`/`Post`, plus
> `education`, `location`, `links`). They remain owner-provided
> provisional copy. Rule: no em dashes in any website copy.

Actual hero content model:

```typescript
// src/content/profile.ts
export const profile = {
  name: 'Shikhar Sahay',
  statementPre: 'I build things worth ',
  statementEm: 'remembering.',
  introLedePre: "I'm Shikhar. I study computer science ...",
  introLedeEm: 'inevitable',
  // ... education { school, degree, period }, location, links
};
```

Portrait: `src/assets/shikhar-hero.jpg` with alt "Portrait of Shikhar Sahay".

### Copy Guidelines (FINALIZED)

- **No generic intros** - "Hi, I'm...", "Passionate...", "Aspiring..."
- **Editorial voice** - confident, distinctive, memorable
- **Concise** - hero is scanned in seconds
- **Action-oriented** - invitation to explore, not just consume

---

## Projects Content

Actual model (`src/content/projects.ts`):

```typescript
export interface Project {
  id: string;
  name: string;
  kind: string; // e.g. "Public platform", "Security experiment"
  description: string;
  role?: string; // provenance line, rendered muted under the name
  stack: string[]; // rendered with breakable separators
  metric?: { value: number; decimals?: number; suffix: string; label: string };
  secondMetric?: { value: number; decimals?: number; suffix: string; label: string };
  links: { live: string; github: string; caseStudy: string }; // '#' placeholders
  visual: 'utility' | 'signal' | 'manifest' | 'honeypot' | 'site';
}
```

Current items (5): Papers (utility), HawkEye (signal), HolmesKit (manifest), SSH Honeypot (honeypot), This Site (site). All links are `#` placeholders rendered inert until the owner supplies destinations. No project detail pages, no filters, no galleries exist.

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

Note: the Skilledity "Social Media Management Intern" entry intentionally has no period or summary until the owner supplies dates and facts. Do not invent them. The timeline renders a muted "Details coming soon" line for it.

### Entries To Populate

Education is covered (degree, school, period in `profile.education`, rendered in About meta and the control panel). Research and publications do not exist. Leadership and community work lives inside the Experience timeline and Personality fragments, not as separate entries.

### Content Guidelines (FINALIZED)

- **Reverse chronological** (most recent first)
- **Impact over duties** - "Built X that achieved Y" not "Responsible for X"
- **Technical specificity** - name tools, languages, scale, constraints
- **Security context** - frame cybersecurity work technically, not aesthetically

---

## Personality Content

Actual model (`src/content/personality.ts`):

```typescript
export interface Fragment {
  word: string;
  caption: string;
}
export const fragments: Fragment[] = [
  { word: 'Writing', caption: 'notes, drafts, and sentences that almost work' },
  { word: 'Music', caption: 'the one background process that never exits' },
  // ... Football, Theatre, Rabbit Holes, Building, Communities, Teaching
];
```

Eight fragments, each a tonal word plus a voice caption. There are no writing links, no external profiles, no visitor input, and no persistence: selection is local component state only.

### Content Guidelines (FINALIZED)

- **Curated, not comprehensive** - a few meaningful items per category
- **Authentic voice** - not corporate, not forced
- **Visual integration** - this content informs design but doesn't dictate a "hobbies section"
- **Links to external** - writing on personal blog, Goodreads, Letterboxd, etc.

---

## Contact Content

Actual model: `profile.links` (`email`, `github`, `linkedin` are `#`; `resume` is `/resume.pdf`) plus `navLinks` in `sections.ts` (About, Experience, Projects, Contact anchors). Placeholders render inert with "coming soon" labels. There is no contact form, no form endpoint, and no social URL beyond the three placeholder channels.

---

## Site Metadata

Actual model: the `metadata` export in `src/app/layout.tsx` (title "Shikhar Sahay - Portfolio", description, authors, OpenGraph, Twitter card, robots) plus `src/app/icon.svg` (ink field, vermilion diamond). There is no custom OG image, no Twitter handle, no production URL, and no JSON-LD structured data yet.

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

| Milestone | Needed From Owner                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| M1        | Copy approval (hero statement, lede wording); portrait alt text review (current: "Portrait of Shikhar Sahay") |
| M3        | Real project links (live, GitHub, case study per project); case studies if written                            |
| M4        | Skilledity intern dates and facts                                                                             |
| M5        | Nothing open (fragments and captions are in place)                                                            |
| M7        | Contact email, social URLs, real resume PDF, production URL, OG image                                         |

---

## Notes

This file tracks the **schema and structure**. Actual content data files will be created in `src/content/` during implementation milestones. This doc stays in sync with the data structures.
