export interface SectionMeta {
  id: string;
  name: string;
  note: string;
}

/**
 * Canonical information architecture. Drives the navigation active state.
 * Order is deliberate: Experience precedes Skills; Skills precedes Projects.
 */
export const sections: SectionMeta[] = [
  { id: 'top', name: 'Identity', note: 'opening' },
  { id: 'about', name: 'About', note: 'context' },
  { id: 'experience', name: 'Experience', note: '2020 to now' },
  { id: 'skills', name: 'Skills', note: 'inventory' },
  { id: 'projects', name: 'Projects', note: 'five artifacts' },
  { id: 'personality', name: 'Personality', note: 'fragments' },
  { id: 'contact', name: 'Contact', note: 'outro' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
