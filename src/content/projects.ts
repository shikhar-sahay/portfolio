export interface ProjectLinks {
  live: string;
  github: string;
  caseStudy: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  kind: string;
  description: string;
  role?: string;
  stack: string[];
  metric?: { value: number; decimals?: number; suffix: string; label: string };
  secondMetric?: { value: number; decimals?: number; suffix: string; label: string };
  links: ProjectLinks;
  visual: 'utility' | 'signal' | 'manifest';
}

/**
 * Link values are structured placeholders until the owner supplies real
 * destinations. They are rendered as disabled-looking anchors (href "#")
 * so the layout is final but nothing pretends to work.
 */
export const projects: Project[] = [
  {
    id: 'papers',
    index: 'P.01',
    name: 'Papers',
    kind: 'Public platform',
    description:
      "One of VIT's most-used platforms for previous year question papers. Find your course, pull the paper, get back to work.",
    role: 'Front-end and back-end development, CodeChef-VIT',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB'],
    metric: { value: 55, suffix: 'K+', label: 'active users' },
    secondMetric: { value: 1.2, decimals: 1, suffix: 'M+', label: 'page views' },
    links: { live: '#', github: '#', caseStudy: '#' },
    visual: 'utility',
  },
  {
    id: 'hawkeye',
    index: 'P.02',
    name: 'HawkEye',
    kind: 'Security visualization',
    description:
      'An attack and risk visualization SIEM. It ingests security logs, simulates attacker behavior, correlates events into attack paths, computes risk scores, and maps activity to MITRE ATT&CK.',
    stack: ['Python', 'Flask', 'JavaScript', 'Plotly.js'],
    links: { live: '#', github: '#', caseStudy: '#' },
    visual: 'signal',
  },
  {
    id: 'holmeskit',
    index: 'P.03',
    name: 'HolmesKit',
    kind: 'Windows toolkit',
    description:
      'A modular Windows optimization toolkit. Registry, service, power plan and TCP/IP tweaks, with the safety rails built in: automated backups, session logging, and rollback support.',
    stack: ['PowerShell', 'Batch'],
    links: { live: '#', github: '#', caseStudy: '#' },
    visual: 'manifest',
  },
];
