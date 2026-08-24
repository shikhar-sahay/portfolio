export interface Project {
  id: string;
  index: string;
  name: string;
  context?: string;
  description: string;
  role?: string;
  stack: string[];
  metric?: { value: number; decimals?: number; suffix: string; label: string };
  secondMetric?: { value: number; decimals?: number; suffix: string; label: string };
  link?: { label: string; href: string };
  visual: 'utility' | 'signal' | 'manifest';
}

export const projects: Project[] = [
  {
    id: 'papers',
    index: 'P.01',
    name: 'Papers',
    context: 'by CodeChef VIT',
    description:
      "One of VIT's most-used platforms for previous year question papers. Built around large-scale academic access and exam preparation: find your course, pull the paper, get back to work.",
    role: 'Front-end and back-end development, CodeChef-VIT',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB'],
    metric: { value: 55, suffix: 'K+', label: 'active users' },
    secondMetric: { value: 1.2, decimals: 1, suffix: 'M+', label: 'page views' },
    link: { label: 'Visit Papers', href: '#' },
    visual: 'utility',
  },
  {
    id: 'hawkeye',
    index: 'P.02',
    name: 'HawkEye',
    description:
      'An attack and risk visualization SIEM. It ingests security logs, simulates attacker behavior, correlates events into attack paths, computes dynamic risk scores, and maps activity to MITRE ATT&CK.',
    stack: ['Python', 'Flask', 'JavaScript', 'Plotly.js'],
    link: { label: 'Case study', href: '#' },
    visual: 'signal',
  },
  {
    id: 'holmeskit',
    index: 'P.03',
    name: 'HolmesKit',
    description:
      'A modular Windows optimization toolkit. Registry, service, power plan and TCP/IP tweaks, with the safety rails built in: automated backups, session logging, and rollback support.',
    stack: ['PowerShell', 'Batch'],
    link: { label: 'View toolkit', href: '#' },
    visual: 'manifest',
  },
];
