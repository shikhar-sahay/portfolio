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
          'Engineered an AWS SSH honeypot with an LLM-driven shell and a Python telemetry pipeline with Geo-IP enrichment for attack reporting.',
      },
    ],
  },
  {
    org: 'Recipharm',
    location: 'Bengaluru',
    roles: [
      {
        role: 'IT Intern',
        period: 'Jun 2026 - Jul 2026',
        summary:
          'Assessed endpoint security with CrowdStrike Falcon, evaluated backup redundancy with Veritas, and performed system validation in GMP-regulated infrastructure.',
      },
    ],
  },
  {
    org: 'GDG On Campus, VIT Vellore',
    roles: [
      {
        role: 'Senior Core Member',
        period: 'Apr 2025 - Present',
        summary:
          "Top 1% of 4,000+ applicants. Raised 1.8L+ rupees in sponsorships and ran DevJams'25 with 750+ participants.",
      },
    ],
  },
  {
    org: 'CodeChef-VIT Student Chapter',
    roles: [
      {
        role: 'Senior Core Member',
        period: 'Feb 2025 - Jul 2026',
        summary:
          'Top 3% of 2,000+ applicants. Led cybersecurity workshops, technical interviews, and recruitment task design.',
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
