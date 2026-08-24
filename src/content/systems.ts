export const skillGroups = [
  {
    id: 'S.01',
    label: 'Languages',
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'R', 'HTML', 'CSS'],
  },
  {
    id: 'S.02',
    label: 'Frameworks & Platforms',
    items: ['React', 'Next.js', 'Node.js', 'Tailwind', 'MongoDB', 'Git', 'Linux', 'AWS'],
  },
  {
    id: 'S.03',
    label: 'Security Tooling',
    items: ['Wireshark', 'Nmap', 'CrowdStrike Falcon', 'Veritas', 'Beelzebub'],
  },
] as const;

export const certifications = [
  { name: 'CompTIA Security+', issuer: 'CompTIA' },
  { name: 'Google Cybersecurity Professional', issuer: 'Google' },
  { name: 'Cybersecurity Fundamentals', issuer: 'IBM' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco' },
] as const;
