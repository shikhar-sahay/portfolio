export interface RoleEntry {
  title: string;
  period: string;
  points: string[];
}

export interface OrgEntry {
  org: string;
  location?: string;
  /** Latest role first: the progression reads top down. */
  roles: RoleEntry[];
}

/**
 * Experience grouped by organization (multiple roles at one org are one
 * entry with an internal progression), ordered latest first.
 */
export const organizations: OrgEntry[] = [
  {
    org: 'GDG On Campus, VIT Vellore',
    roles: [
      {
        title: 'Senior Core Member',
        period: 'Mar 2026 - Present',
        points: [
          "Contributed to the organization and execution of Women Techies'26 and Hexathon'26.",
          'Mentored Junior Core members across content, digital marketing, and sponsorships.',
          'Served on hackathon review panels, evaluating submissions and providing structured feedback.',
        ],
      },
      {
        title: 'Inner Core Member',
        period: 'Apr 2025 - Mar 2026',
        points: [
          'Selected among the top 1% of 4,000+ applicants for the Inner Core team.',
          'Raised 1.8L+ rupees in sponsorships through sponsor outreach and partner coordination.',
          "Helped organize large-scale hackathons such as DevJams'25.",
          'Contributed across operations, sponsorships, digital marketing, and content.',
        ],
      },
    ],
  },
  {
    org: 'Cyber Defenders',
    roles: [
      {
        title: 'Cybersecurity Intern',
        period: 'Jun 2026 - Aug 2026',
        points: [
          'Engineered an AWS SSH honeypot using Beelzebub with an LLM backend for adaptive Linux shell emulation.',
          'Developed a Python telemetry pipeline for log parsing, Geo-IP enrichment, and automated attack reporting.',
          'Profiled attacker behavior via credential analysis, command categorization, and SSH client identification.',
        ],
      },
    ],
  },
  {
    org: 'Recipharm',
    location: 'Bengaluru, Karnataka',
    roles: [
      {
        title: 'IT & Security Intern',
        period: 'Jun 2026 - Jul 2026',
        points: [
          'Assessed endpoint security and threat coverage via CrowdStrike Falcon within GMP-regulated infrastructure.',
          'Analyzed enterprise DR and BCP strategies, evaluating backup redundancy and recovery gaps using Veritas.',
          'Performed Computer System Validation across IT systems to support regulatory compliance.',
        ],
      },
    ],
  },
  {
    org: 'CodeChef-VIT Student Chapter',
    roles: [
      {
        title: 'Senior Core Member',
        period: 'Jan 2026 - Jul 2026',
        points: [
          'Conducted cybersecurity workshops and technical sessions.',
          'Drove technical interviews and designed tasks for cybersecurity recruitment.',
        ],
      },
      {
        title: 'Junior Core Member, Cybersecurity Domain',
        period: 'Feb 2025 - Jan 2026',
        points: [
          'Selected among the top 3% of 2,000+ applicants.',
          'Front-end and back-end development for Papers by CodeChef, serving 55K+ active users.',
          'Managed club operations and executed digital marketing initiatives.',
        ],
      },
    ],
  },
  {
    org: 'skilledity',
    roles: [
      {
        title: 'Social Media Team Lead',
        period: 'Dec 2024 - Mar 2025',
        points: [
          'Led a 4 to 7 member team; directed recruitment and onboarding.',
          'Managed content creation across graphic design, written content, and video.',
          'Contributed to design, writing, short-form content, analytics, and SEO.',
        ],
      },
      {
        title: 'Social Media Management Intern',
        period: 'Sep 2024 - Nov 2024',
        points: [
          'Content planning, creation, scheduling, and optimization.',
          'Graphic design, video editing, writing, and short-form content.',
        ],
      },
    ],
  },
  {
    org: 'Team Shade',
    roles: [
      {
        title: 'Founder & Owner',
        period: 'Apr 2020 - Oct 2021',
        points: [
          'Founded and operated an esports organization: recruitment, social media, task allocation, accounts, operations.',
          'Built an active community with tens of thousands of followers across social platforms.',
          'Worked with player contracts, sponsorships, media and brand revenue, and assets.',
        ],
      },
    ],
  },
];
