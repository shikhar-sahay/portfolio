export const profile = {
  name: 'Shikhar Sahay',
  shortName: 'S. Sahay',
  firstName: 'Shikhar',
  location: 'Vellore, India',
  role: 'Computer Science @ VIT Vellore, building across software, security and the web.',
  statementPre: 'I build things worth ',
  statementEm: 'remembering.',
  introLedePre:
    "I'm Shikhar. I study computer science at VIT Vellore, and I like making software that feels ",
  introLedeEm: 'inevitable',
  introLedePost: ': tools, experiments, and the occasional security rabbit hole.',
  education: {
    school: 'Vellore Institute of Technology, Vellore',
    degree: 'B.Tech, Computer Science and Engineering (Cybersecurity)',
    period: '2024 - Present',
  },
  // Real destinations, owner-supplied. Resume PDF file still pending.
  // Typed as generic strings so placeholder checks keep working.
  links: {
    email: 'mailto:sahay.shikhar@gmail.com',
    github: 'https://github.com/shikhar-sahay',
    linkedin: 'https://www.linkedin.com/in/shikharsahay/',
    resume: 'https://drive.google.com/file/d/1P3cGQWpB5S2DN4xn9gbVk5xg1QGcFrJ8/view?usp=sharing',
    resumeFile: '/resume.pdf',
  } as Record<string, string>,
  /** Broader social set for the footer Elsewhere column. */
  socials: [
    { label: 'GitHub', handle: 'shikhar-sahay', href: 'https://github.com/shikhar-sahay' },
    {
      label: 'LinkedIn',
      handle: 'Shikhar Sahay',
      href: 'https://www.linkedin.com/in/shikharsahay/',
    },
    {
      label: 'Instagram',
      handle: 'shikhar.sahay',
      href: 'https://www.instagram.com/shikhar.sahay/',
    },
    { label: 'Medium', handle: 'sahay.shikhar', href: 'https://medium.com/@sahay.shikhar' },
    { label: 'X', handle: 'Noscope999', href: 'https://x.com/Noscope999' },
    {
      label: 'Spotify',
      handle: 'shikhar',
      href: 'https://open.spotify.com/user/e903cr9l76oafo6tt5oyi4gdh?si=ab8c9e51a25d446c',
    },
  ],
  /** No public profile URL supplied: render as copy action, never a link. */
  discord: { username: 'noscope5573' },
} as const;
