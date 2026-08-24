export interface TimelineEntry {
  org: string;
  role: string;
  period: string;
  location?: string;
  /** One concise, factual line. Full detail lives in the resume. */
  summary: string;
}

/**
 * The unified career timeline, latest first. Facts come from the owner's
 * source material; summaries are condensed from the original detailed
 * points, which remain available in git history and the resume.
 */
export const timeline: TimelineEntry[] = [
  {
    org: 'GDG On Campus, VIT Vellore',
    role: 'Senior Core Member',
    period: 'Mar 2026 - Present',
    summary:
      "Ran Women Techies'26 and Hexathon'26, mentored junior core members, and reviewed hackathon submissions.",
  },
  {
    org: 'Cyber Defenders',
    role: 'Cybersecurity Intern',
    period: 'Jun 2026 - Aug 2026',
    summary:
      'Built an AWS SSH honeypot with an LLM-driven shell and a Python telemetry pipeline for attack reporting.',
  },
  {
    org: 'Recipharm',
    role: 'IT & Security Intern',
    period: 'Jun 2026 - Jul 2026',
    location: 'Bengaluru',
    summary:
      'Assessed endpoint security with CrowdStrike Falcon and validated IT systems in GMP-regulated infrastructure.',
  },
  {
    org: 'GDG On Campus, VIT Vellore',
    role: 'Inner Core Member',
    period: 'Apr 2025 - Mar 2026',
    summary:
      "Top 1% of 4,000+ applicants. Raised 1.8L+ rupees in sponsorships and helped organize DevJams'25.",
  },
  {
    org: 'CodeChef-VIT',
    role: 'Senior Core Member',
    period: 'Jan 2026 - Jul 2026',
    summary: 'Led cybersecurity workshops, technical interviews, and recruitment task design.',
  },
  {
    org: 'CodeChef-VIT',
    role: 'Junior Core Member',
    period: 'Feb 2025 - Jan 2026',
    summary: 'Top 3% of 2,000+ applicants. Built Papers by CodeChef, serving 55K+ active users.',
  },
  {
    org: 'skilledity',
    role: 'Social Media Team Lead',
    period: 'Dec 2024 - Mar 2025',
    summary: 'Led a 4 to 7 member team across design, writing, video, analytics, and SEO.',
  },
  {
    org: 'Team Shade',
    role: 'Founder & Owner',
    period: 'Apr 2020 - Oct 2021',
    summary:
      'Ran an esports organization with a community of tens of thousands: contracts, sponsorships, operations.',
  },
];
