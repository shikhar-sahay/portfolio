export type EggKind = 'attack' | 'recover' | 'rupees' | 'crowd' | 'publish' | 'release' | 'unruly';

export interface EggTarget {
  kind: EggKind;
  /** Exact substring of the role body that carries the interaction. */
  target: string;
}

export interface RoleEntry {
  role: string;
  period: string;
  /** Full prose paragraph, owner-supplied verbatim. Never condensed. */
  body: string;
  egg?: EggTarget;
}

export type ArtifactKey =
  | 'cyber-defenders'
  | 'recipharm'
  | 'gdg'
  | 'codechef'
  | 'skilledity'
  | 'team-shade';

export interface OrgEntry {
  /** Display name, exact styling (skilledity stays lowercase). */
  org: string;
  /** External site. Absent only for Team Shade: never invent one. */
  url?: string;
  /** Key into the logo artifact system. */
  artifact: ArtifactKey;
  roles: RoleEntry[];
}

/**
 * Experience grouped by organization: one entry per org, one timeline
 * node per org, roles nested inside as progression. Order is deliberate
 * and owner-mandated, not chronological. All copy is owner-supplied
 * verbatim; organization URLs are owner-supplied (Team Shade has none).
 */
export const orgTimeline: OrgEntry[] = [
  {
    org: 'Cyber Defenders',
    url: 'https://www.cyberdefendersprogram.com/',
    artifact: 'cyber-defenders',
    roles: [
      {
        role: 'Cybersecurity Intern',
        period: 'Jun 2026 - Aug 2026',
        body: "I spent the summer building something you're usually told not to: a system designed to get attacked. I engineered an AWS SSH honeypot with Beelzebub and an LLM-backed Linux shell, then built a Python telemetry pipeline to enrich logs, automate attack reports, and make sense of attacker behavior.",
        egg: { kind: 'attack', target: 'designed to get attacked' },
      },
    ],
  },
  {
    org: 'Recipharm',
    url: 'https://www.recipharm.com/',
    artifact: 'recipharm',
    roles: [
      {
        role: 'IT & Security Intern',
        period: 'Jun 2026 - Jul 2026',
        body: 'Turns out, keeping enterprise systems secure is only part of the job when they also need to be recoverable, validated, and compliant. During my internship at Recipharm, I assessed endpoint security with CrowdStrike Falcon, dug into disaster recovery and backup redundancy with Veritas, and worked on Computer System Validation across GMP-regulated infrastructure.',
        egg: { kind: 'recover', target: 'recoverable' },
      },
    ],
  },
  {
    org: 'GDG On Campus VIT Vellore',
    url: 'https://www.dscvit.com/',
    artifact: 'gdg',
    roles: [
      {
        role: 'Management Lead',
        period: 'Sep 2026 - Present',
        body: 'Doing crazy things that matter.',
        egg: { kind: 'unruly', target: 'crazy things' },
      },
      {
        role: 'Senior Core Member',
        period: 'Mar 2026 - Sep 2026',
        body: "By Senior Core, I had gone from helping run the room to owning parts of it. I served as PoC for DevJams'26, GDG's flagship hackathon with 3,000+ registrations, helped execute Women Techies'26 and Hexathon'26, and mentored the next Core cohort. Oh, and I also brought my sponsorship total to ₹3.3L+ along the way.",
        egg: { kind: 'rupees', target: '₹3.3L+' },
      },
      {
        role: 'Inner Core Member',
        period: 'Apr 2025 - Mar 2026',
        body: "Selected among the top 1% of 4,000+ applicants, I found myself working across pretty much every corner of the Management domain: sponsorships, operations, digital marketing, and content. That meant raising ₹1.8L+ in sponsorships, helping bring DevJams'25 to life, cooking up technical blogs, and working on the marketing side of things along the way.",
      },
    ],
  },
  {
    org: 'CodeChef-VIT Student Chapter',
    url: 'https://codechefvit.com/',
    artifact: 'codechef',
    roles: [
      {
        role: 'Senior Core Member',
        period: 'Jan 2026 - Jul 2026',
        body: 'By Senior Core, I had gone from contributing within the Cybersecurity domain to helping shape it. I ran cybersecurity workshops and technical sessions, conducted technical interviews, and designed recruitment tasks to find the next set of people joining the domain.',
      },
      {
        role: 'Junior Core Member',
        period: 'Feb 2025 - Jan 2026',
        body: 'Selected among the top 3% of 2,000+ applicants, I joined both the Technical (Cybersecurity) and Management domains, working on security initiatives and full-stack development for Papers by CodeChef, serving 55K+ active users, while keeping myself busy with operations and digital marketing too.',
        egg: { kind: 'crowd', target: '55K+ active users' },
      },
    ],
  },
  {
    org: 'skilledity',
    url: 'https://www.skilledity.in/',
    artifact: 'skilledity',
    roles: [
      {
        role: 'Social Media Team Lead',
        period: 'Dec 2024 - Mar 2025',
        body: "A few months in, I became the company's youngest Team Lead, leading a 4-7 member student team across design, writing, video, and social media. I handled recruitment and content strategy while staying hands-on with the work, using analytics and SEO to figure out what actually performed.",
      },
      {
        role: 'Social Media Management Intern',
        period: 'Sep 2024 - Nov 2024',
        body: 'I started at skilledity with my hands in a little bit of everything: planning content, designing graphics, editing videos, writing, scheduling, and figuring out what might work before hitting publish. Three months later, I was handed a team of my own.',
        egg: { kind: 'publish', target: 'before hitting publish' },
      },
    ],
  },
  {
    org: 'Team Shade',
    artifact: 'team-shade',
    roles: [
      {
        role: 'Founder & Owner',
        period: 'Apr 2020 - Oct 2021',
        body: 'What started as a scrappy Discord server between my best friend and me grew into an esports organization and a community of tens of thousands. Somewhere along the way, a summer project became the place where I first learned what it actually meant to build something of my own: finding people, growing a brand, leading a team, managing money, and eventually knowing when to let something go.',
        egg: { kind: 'release', target: 'let something go' },
      },
    ],
  },
];
