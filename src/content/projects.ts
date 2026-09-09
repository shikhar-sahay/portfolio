import type { StaticImageData } from 'next/image';
import papersBackdrop from '@/assets/projects/papersbackdrop.png';
import hawk3yeBackdrop from '@/assets/projects/hawk3yebackdrop.png';
import holmeskitBackdrop from '@/assets/projects/holmeskitbackdrop.png';
import portfolioBackdrop from '@/assets/projects/portfoliobackdrop.jpg';
import rtEnssBackdrop from '@/assets/projects/rtenssbackdrop.png';

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface ProjectArtwork {
  src: StaticImageData;
  alt: string;
  fit: 'cover' | 'contain';
  position: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  links: ProjectLinks;
  currentLocationLabel?: string;
  artwork: ProjectArtwork;
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
    artwork: {
      src: papersBackdrop,
      alt: 'Papers by CodeChef project banner with Papers branding',
      fit: 'contain',
      position: 'center',
    },
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
    artwork: {
      src: hawk3yeBackdrop,
      alt: 'Hawk3ye application landing page with threat radar artwork',
      fit: 'cover',
      position: 'center',
    },
  },
  {
    id: 'holmeskit',
    name: 'HolmesKit',
    description:
      'HolmesKit strips unnecessary overhead from Windows through transparent, reversible system optimizations, with every change explained, backed up, and logged.',
    stack: ['PowerShell', 'Batch'],
    links: { github: 'https://github.com/shikhar-sahay/holmes-kit/' },
    artwork: {
      src: holmeskitBackdrop,
      alt: 'HolmesKit terminal menu for Windows optimization tools',
      fit: 'contain',
      position: 'center top',
    },
  },
  {
    id: 'site',
    name: 'This Site',
    description:
      'This site turns a portfolio into something closer to an experience, combining editorial design, physical motion, interactive storytelling, and a slightly unreasonable attention to detail.',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Motion'],
    links: { github: 'https://github.com/shikhar-sahay/portfolio/' },
    currentLocationLabel: "YOU'RE ALREADY HERE.",
    artwork: {
      src: portfolioBackdrop,
      alt: 'This portfolio hero with SHIKHAR SAHAY typography and portrait',
      fit: 'cover',
      position: 'center',
    },
  },
  {
    id: 'rt-enss',
    name: 'RT-ENSS',
    description:
      'RT-ENSS brings intrusion detection into a real-time embedded network, responding to simulated spoofing, replay, and DoS attacks while keeping critical tasks on schedule.',
    stack: ['SystemC', 'C++', 'Python'],
    links: { github: 'https://github.com/shikhar-sahay/rt-enss' },
    artwork: {
      src: rtEnssBackdrop,
      alt: 'RT-ENSS simulated embedded network security dashboard',
      fit: 'contain',
      position: 'center',
    },
  },
];
