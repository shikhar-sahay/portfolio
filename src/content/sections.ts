export interface SectionMeta {
  id: string;
  name: string;
  note: string;
}

/**
 * Canonical information architecture. Drives the navigation active state.
 * Order is deliberate: Experience precedes Toolkit; Toolkit precedes
 * Projects. Toolkit is one navigational destination spanning the Skills
 * emblems and the Certifications ledger chapter (the ledger keeps its
 * `certifications` element id as a deep anchor but is not observed and
 * has no nav entry, so Toolkit stays active through both).
 */
export const sections: SectionMeta[] = [
  { id: 'top', name: 'Identity', note: 'opening' },
  { id: 'about', name: 'About', note: 'context' },
  { id: 'experience', name: 'Experience', note: '2020 to now' },
  { id: 'toolkit', name: 'Toolkit', note: 'skills to credentials' },
  { id: 'projects', name: 'Projects', note: 'five artifacts' },
  { id: 'pieces-of-me', name: 'Pieces of Me', note: 'fragments' },
  { id: 'contact', name: 'Contact', note: 'outro' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pieces of Me', href: '#pieces-of-me' },
  { label: 'Contact', href: '#contact' },
];
