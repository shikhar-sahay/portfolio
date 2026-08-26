export interface RoleEntry {
  role: string;
  /** Undefined only when the owner's source material gives no dates. */
  period?: string;
  /** One concise, factual line. Full detail lives in the resume. */
  summary?: string;
}

export interface OrgEntry {
  org: string;
  location?: string;
  roles: RoleEntry[];
}

/**
 * Experience grouped by organization: one entry per org, roles nested
 * inside. Order is deliberate (latest impact first). Facts come from the
 * owner's source material; summaries are condensed from the original
 * detailed points, which remain available in git history and the resume.
 */
export const orgTimeline: OrgEntry[] = [
  {
    org: 'Cyber Defenders',
    roles: [
      {
        role: 'Cybersecurity Intern',
        period: 'Jun 2026 - Aug 2026',
        summary:
          'Built an AWS SSH honeypot with an LLM-driven shell and a Python telemetry pipeline for attack reporting.',
      },
    ],
  },
  {
    org: 'Recipharm',
    location: 'Bengaluru',
    roles: [
      {
        role: 'IT & Security Intern',
        period: 'Jun 2026 - Jul 2026',
        summary:
          'Assessed endpoint security with CrowdStrike Falcon and validated IT systems in GMP-regulated infrastructure.',
      },
    ],
  },
  {
    org: 'GDG On Campus, VIT Vellore',
    roles: [
      {
        role: 'Senior Core Member',
        period: 'Mar 2026 - Present',
        summary:
          "Ran Women Techies'26 and Hexathon'26, mentored junior core members, and reviewed hackathon submissions.",
      },
      {
        role: 'Inner Core Member',
        period: 'Apr 2025 - Mar 2026',
        summary:
          "Top 1% of 4,000+ applicants. Raised 1.8L+ rupees in sponsorships and helped organize DevJams'25.",
      },
    ],
  },
  {
    org: 'CodeChef-VIT',
    roles: [
      {
        role: 'Senior Core Member',
        period: 'Jan 2026 - Jul 2026',
        summary: 'Led cybersecurity workshops, technical interviews, and recruitment task design.',
      },
      {
        role: 'Junior Core Member',
        period: 'Feb 2025 - Jan 2026',
        summary:
          'Top 3% of 2,000+ applicants. Built Papers by CodeChef, serving 55K+ active users.',
      },
    ],
  },
  {
    org: 'Skilledity',
    roles: [
      {
        role: 'Social Media Team Lead',
        period: 'Dec 2024 - Mar 2025',
        summary: 'Led a 4 to 7 member team across design, writing, video, analytics, and SEO.',
      },
      {
        role: 'Social Media Management Intern',
      },
    ],
  },
  {
    org: 'Team Shade',
    roles: [
      {
        role: 'Founder & Owner',
        period: 'Apr 2020 - Oct 2021',
        summary:
          'Ran an esports organization with a community of tens of thousands: contracts, sponsorships, operations.',
      },
    ],
  },
];
