export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  links: ProjectLinks;
  currentLocationLabel?: string;
  visual: 'utility' | 'signal' | 'manifest' | 'site' | 'rtenss';
}

/**
 * Project order, descriptions, stacks, and links are owner-supplied.
 * Keep copy concise and truthful: Papers was maintained as a CodeChef VIT
 * product, and RT-ENSS is a simulation.
 */
export const projects: Project[] = [
  {
    id: 'papers',
    name: 'Papers by CodeChef',
    description:
      "Papers makes VIT's previous-year question papers easy to find and use for exam prep, serving 55K+ users across 1.2M+ page views.",
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB'],
    links: {
      live: 'https://www.papers.codechefvit.com/',
      github: 'https://github.com/shikhar-sahay/papers-codechef',
    },
    visual: 'utility',
  },
  {
    id: 'hawk3ye',
    name: 'Hawk3ye',
    description:
      'Hawk3ye turns application security events into live threat intelligence, detecting suspicious behavior, mapping attacks to MITRE ATT&CK, and correlating alerts into incidents.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL'],
    links: {
      live: 'https://hawk3ye.vercel.app/',
      github: 'https://github.com/shikhar-sahay/hawk3ye',
    },
    visual: 'signal',
  },
  {
    id: 'holmeskit',
    name: 'HolmesKit',
    description:
      'HolmesKit strips unnecessary overhead from Windows through transparent, reversible system optimizations, with every change explained, backed up, and logged.',
    stack: ['PowerShell', 'Batch'],
    links: { github: 'https://github.com/shikhar-sahay/holmes-kit/' },
    visual: 'manifest',
  },
  {
    id: 'site',
    name: 'This Site',
    description:
      'This site turns a portfolio into something closer to an experience, combining editorial design, physical motion, interactive storytelling, and a slightly unreasonable attention to detail.',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Motion'],
    links: { github: 'https://github.com/shikhar-sahay/portfolio/' },
    currentLocationLabel: "YOU'RE ALREADY HERE.",
    visual: 'site',
  },
  {
    id: 'rt-enss',
    name: 'RT-ENSS',
    description:
      'RT-ENSS brings intrusion detection into a real-time embedded network, responding to simulated spoofing, replay, and DoS attacks while keeping critical tasks on schedule.',
    stack: ['SystemC', 'C++', 'Python'],
    links: { github: 'https://github.com/shikhar-sahay/rt-enss' },
    visual: 'rtenss',
  },
];
