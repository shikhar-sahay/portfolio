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
    label: 'Technologies & Tools',
    items: [
      { name: 'React', abbr: 'Re' },
      { name: 'Next.js', abbr: 'Nx' },
      { name: 'Node.js', abbr: 'No' },
      { name: 'Tailwind', abbr: 'Tw' },
      { name: 'MongoDB', abbr: 'Mg' },
      { name: 'Git', abbr: 'Gt' },
      { name: 'Linux', abbr: 'Li' },
      { name: 'Docker', abbr: 'Dk' },
      { name: 'AWS', abbr: 'AW' },
      { name: 'Nmap', abbr: 'Nm' },
      { name: 'Wireshark', abbr: 'Ws' },
    ],
  },
];

export const certifications = [
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    url: 'https://www.credly.com/badges/2274220b-6d72-4b34-bd8b-046225820e48',
  },
  {
    name: 'Google Cybersecurity Professional',
    issuer: 'Google',
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/Y4MJPANAI8VF',
  },
  {
    name: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    url: 'https://www.credly.com/badges/4e5a8a2c-09c1-49e9-884d-7037c65b7715/public_url',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    url: 'https://www.credly.com/badges/5e0259ac-f39a-43e6-83a2-125887e9fab4/public_url',
  },
] as const;
