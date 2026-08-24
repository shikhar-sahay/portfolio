export interface SectionMeta {
  id: string;
  number: string;
  name: string;
  note: string;
}

/**
 * Canonical information architecture. Drives the navigation readout, the
 * opening indices, and the editorial index. Order is deliberate:
 * Experience precedes Skills; Skills precedes Projects.
 */
export const sections: SectionMeta[] = [
  { id: 'top', number: '01', name: 'Identity', note: 'opening' },
  { id: 'about', number: '02', name: 'About', note: 'context' },
  { id: 'experience', number: '03', name: 'Experience', note: '2020 to now' },
  { id: 'skills', number: '04', name: 'Skills', note: 'inventory' },
  { id: 'projects', number: '05', name: 'Projects', note: 'three artifacts' },
  { id: 'personality', number: '06', name: 'Personality', note: 'fragments' },
  { id: 'contact', number: '07', name: 'Contact', note: 'say hello' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
