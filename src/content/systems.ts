export interface Skill {
  name: string;
  /** Two-to-three character monogram for the emblem badge. */
  abbr: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'S.01',
    label: 'Languages',
    items: [
      { name: 'Python', abbr: 'Py' },
      { name: 'Java', abbr: 'Jv' },
      { name: 'C', abbr: 'C' },
      { name: 'C++', abbr: 'C+' },
      { name: 'JavaScript', abbr: 'Js' },
      { name: 'TypeScript', abbr: 'Ts' },
      { name: 'SQL', abbr: 'SQ' },
      { name: 'R', abbr: 'R' },
      { name: 'HTML', abbr: 'HT' },
      { name: 'CSS', abbr: 'CS' },
    ],
  },
  {
    id: 'S.02',
    label: 'Frameworks & Platforms',
    items: [
      { name: 'React', abbr: 'Re' },
      { name: 'Next.js', abbr: 'Nx' },
      { name: 'Node.js', abbr: 'No' },
      { name: 'Tailwind', abbr: 'Tw' },
      { name: 'MongoDB', abbr: 'Mg' },
      { name: 'Git', abbr: 'Gt' },
      { name: 'Linux', abbr: 'Li' },
      { name: 'AWS', abbr: 'AW' },
    ],
  },
  {
    id: 'S.03',
    label: 'Security Tooling',
    items: [
      { name: 'Wireshark', abbr: 'Ws' },
      { name: 'Nmap', abbr: 'Nm' },
      { name: 'CrowdStrike Falcon', abbr: 'CF' },
      { name: 'Veritas', abbr: 'Vt' },
      { name: 'Beelzebub', abbr: 'Bz' },
    ],
  },
];

export const certifications = [
  { name: 'CompTIA Security+', issuer: 'CompTIA' },
  { name: 'Google Cybersecurity Professional', issuer: 'Google' },
  { name: 'Cybersecurity Fundamentals', issuer: 'IBM' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco' },
] as const;
