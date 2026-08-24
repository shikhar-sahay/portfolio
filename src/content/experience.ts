export interface ExperienceEntry {
  org: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
}

export interface Era {
  year: string;
  mood: string;
  entries: ExperienceEntry[];
}

export const timeline: Era[] = [
  {
    year: '2020',
    mood: 'origins',
    entries: [
      {
        org: 'Team Shade',
        role: 'Founder & Owner',
        period: 'Apr 2020 - Oct 2021',
        points: [
          'Founded and operated an esports organization: recruitment, social media, task allocation, accounts, operations.',
          'Built an active community with tens of thousands of followers across social platforms.',
          'Worked with player contracts, sponsorships, media and brand revenue, and assets.',
        ],
      },
    ],
  },
  {
    year: '2024',
    mood: 'media & design',
    entries: [
      {
        org: 'skilledity',
        role: 'Social Media Management Intern',
        period: 'Sep 2024 - Nov 2024',
        points: [
          'Content planning, creation, scheduling, and optimization.',
          'Graphic design, video editing, writing, and short-form content.',
        ],
      },
      {
        org: 'skilledity',
        role: 'Social Media Team Lead',
        period: 'Dec 2024 - Mar 2025',
        points: [
          'Led a 4 to 7 member team; directed recruitment and onboarding.',
          'Managed content creation across graphic design, written content, and video.',
          'Contributed to design, writing, short-form content, analytics, and SEO.',
        ],
      },
    ],
  },
  {
    year: '2025',
    mood: 'community & scale',
    entries: [
      {
        org: 'CodeChef-VIT Student Chapter',
        role: 'Junior Core Member, Cybersecurity Domain',
        period: 'Feb 2025 - Jan 2026',
        points: [
          'Selected among the top 3% of 2,000+ applicants.',
          'Front-end and back-end development for Papers by CodeChef, serving 55K+ active users.',
          'Managed club operations and executed digital marketing initiatives.',
        ],
      },
      {
        org: 'GDG On Campus, VIT Vellore',
        role: 'Inner Core Member',
        period: 'Apr 2025 - Mar 2026',
        points: [
          'Selected among the top 1% of 4,000+ applicants for the Inner Core team.',
          'Raised 1.8L+ rupees in sponsorships through sponsor outreach and partner coordination.',
          "Helped organize large-scale hackathons such as DevJams'25.",
        ],
      },
      {
        org: 'CodeChef-VIT Student Chapter',
        role: 'Senior Core Member',
        period: 'Jan 2026 - Jul 2026',
        points: [
          'Conducted cybersecurity workshops and technical sessions.',
          'Drove technical interviews and designed tasks for cybersecurity recruitment.',
        ],
      },
    ],
  },
  {
    year: '2026',
    mood: 'into security',
    entries: [
      {
        org: 'GDG On Campus, VIT Vellore',
        role: 'Senior Core Member',
        period: 'Mar 2026 - Present',
        points: [
          "Contributed to the organization and execution of Women Techies'26 and Hexathon'26.",
          'Mentored Junior Core members across content, digital marketing, and sponsorships.',
          'Served on hackathon review panels, evaluating submissions and providing structured feedback.',
        ],
      },
      {
        org: 'Recipharm',
        role: 'IT & Security Intern',
        period: 'Jun 2026 - Jul 2026',
        location: 'Bengaluru, Karnataka',
        points: [
          'Assessed endpoint security and threat coverage via CrowdStrike Falcon within GMP-regulated infrastructure.',
          'Analyzed enterprise DR and BCP strategies, evaluating backup redundancy and recovery gaps using Veritas.',
          'Performed Computer System Validation across IT systems to support regulatory compliance.',
        ],
      },
      {
        org: 'Cyber Defenders',
        role: 'Cybersecurity Intern',
        period: 'Jun 2026 - Aug 2026',
        points: [
          'Engineered an AWS SSH honeypot using Beelzebub with an LLM backend for adaptive Linux shell emulation.',
          'Developed a Python telemetry pipeline for log parsing, Geo-IP enrichment, and automated attack reporting.',
          'Profiled attacker behavior via credential analysis, command categorization, and SSH client identification.',
        ],
      },
    ],
  },
];
