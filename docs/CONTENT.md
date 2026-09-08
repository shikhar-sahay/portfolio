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
├── experience.ts    # Org-grouped prose roles (role, period, body, egg target)
├── systems.ts       # Skill groups (name + monogram) + certifications
├── personality.ts   # Fragment words + voice captions (tonal, not factual claims)
├── techLogos.ts     # Vendored CC0 brand paths for tools
└── channelGlyphs.ts # Vendored CC0 brand paths + original glyphs for contact channels
```

### Rules encoded in the model

- Metrics and claims come only from owner-supplied source material (55K+ users, 1.2M+ views, top 1% of 4,000+, top 3% of 2,000+, 1.8L+ rupees, DevJams 750+ participants, tens of thousands of followers, 4 to 7 member team). Academic scores in source material are never displayed anywhere on the site.
- `profile.links` holds real destinations (mailto email, GitHub, LinkedIn, Drive resume, local resume file); `profile.socials` holds the broader set (Instagram, Medium, X, Spotify) with handles; `profile.discord` holds a username only (no public URL exists, rendered as a copy action).
- Certifications link to owner-supplied verification URLs (Credly, Coursera).
- Placeholder links that remain (`#` project URLs) never navigate: client components swallow the click, server components render plain text instead of anchors, and every placeholder carries a "coming soon" label. Nothing pretends to work.
- Pieces of Me captions are voice lines, deliberately not factual claims.
- No em dashes anywhere in content.

### Section registry (drives navigation active state)

Order is deliberate (Experience precedes Toolkit; Toolkit precedes Projects):

Identity (opening + hero), About, Experience, Toolkit (Skills emblems plus Certifications ledger chapter), Projects, Pieces of Me, Contact + Footer.

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

### Data Structure (EXPERIMENTAL, updated 2026-09-08)

Experience is grouped by organization: one entry per org, one timeline
node per org, roles nested inside as progression with full prose bodies.

```typescript
// content/experience.ts
export interface RoleEntry {
  role: string;
  period: string;
  body: string; // full prose paragraph, owner-supplied verbatim
  egg?: EggTarget; // one prose Easter egg per org max ({ kind, target })
}

export interface OrgEntry {
  org: string; // display name, exact styling (skilledity stays lowercase)
  url?: string; // absent only for Team Shade: never invent one
  artifact: ArtifactKey; // key into the logo artifact system
  roles: RoleEntry[];
}

// Canonical order (owner-mandated 2026-09-08):
// Cyber Defenders, Recipharm, GDG On Campus VIT Vellore,
// CodeChef-VIT Student Chapter, skilledity, Team Shade.
// Multi-role orgs (GDG, CodeChef, skilledity) nest both roles with
// periods and prose; no "Details coming soon" remains anywhere.
// Owner-mandated 2026-09-09: GDG Senior final sentence reads the
// cumulative "brought my sponsorship total to ₹3.3L+ along the way"
// (₹3.3L+ is the GDG total, not an additional raise); the Experience
// intro continuation reads "different rooms, same instinct: find the
// problem and get to work." (rendered inline in Experience.tsx).
```

### Entries To Populate

Education is covered (degree, school, period in `profile.education`, rendered in About meta and the control panel). Research and publications do not exist. Leadership and community work lives inside the Experience timeline and Pieces of Me fragments, not as separate entries.

### Content Guidelines (FINALIZED)

- **Reverse chronological** (most recent first)
- **Impact over duties** - "Built X that achieved Y" not "Responsible for X"
- **Technical specificity** - name tools, languages, scale, constraints
- **Security context** - frame cybersecurity work technically, not aesthetically

---

## Pieces of Me Content

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

### Mosaic statement (EXPERIMENTAL copy, owner meaning preserved)

Above the wall, a personal lede establishes why the surface exists: "I am a mosaic of everyone I have ever known. If they are a piece of me, they deserve to be a piece of this place too." (Owner supplied the wording; lightly polished for rhythm. Provisional until approved.) A hint line follows: drag to look around, open a note to reply, leave one of your own.

### Notes wall model (`src/content/wall.ts`, API under `src/app/api/notes/`)

Visitor marks are not owner content and never sync anywhere except through the wall API. Notes carry id, world coordinates, display name, message, timestamp, style variant, owner flag, and replies; replies carry id, note id, name, message, timestamp. Limits: names 24 chars, messages 140, replies 100, 10 notes and 20 replies per IP per hour, 4 KB payloads. Rendering is plain text nodes only. Seeds are two labeled Shikhar notes using site copy. The default store is in-memory (per process); production needs the documented KV swap.

Presentation (not content, lives in `NotesWall.tsx`): deterministic tilt and restrained widths derive from note ids; tilt, width, and variant are display-only. (The older geometric-glyph stamp wall, `MarkWall.tsx`, was deleted in v4.7; no glyph system exists.)

### Latest-note lookup (API)

`GET /api/notes?order=latest` returns the newest note across the whole store (`{ note }`), so Latest navigation never mistakes the newest loaded note for the newest global one. The `NoteStore` interface requires `latest()`; KV implementations must answer from the full dataset. Rate limits, validation, and caps are unchanged.

### Content Guidelines (FINALIZED)

- **Curated, not comprehensive** - a few meaningful items per category
- **Authentic voice** - not corporate, not forced
- **Visual integration** - this content informs design but doesn't dictate a "hobbies section"
- **Links to external** - writing on personal blog, Goodreads, Letterboxd, etc.

---

## Contact Content

Actual model: `profile.links` (mailto email, GitHub, LinkedIn, Drive resume, local resume file), `profile.socials` (GitHub, LinkedIn, Instagram, Medium, X, Spotify with hrefs; handles are stored but the footer Elsewhere column renders icon plus name only), `profile.discord` (username, copy action), plus `navLinks` in `sections.ts` (About, Experience, Toolkit, Projects, Pieces of Me, Contact anchors). Placeholders that remain (project URLs) render inert with "coming soon" labels. There is no contact form, no form endpoint, and no phone number on the site.

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
| M5        | Nothing open (fragments and captions are in place; wall backend is an infrastructure task, not content)       |
| M7        | Production URL, OG image (real resume PDF committed 2026-09-06; Drive link still canonical for viewing)       |

---

## Notes

This file tracks the **schema and structure**. Actual content data files will be created in `src/content/` during implementation milestones. This doc stays in sync with the data structures.
