export interface Fragment {
  word: string;
  caption: string;
  micro?: string;
}

export interface Article {
  title: string;
  category: string;
  teaser: string;
  href: string;
  action: string;
}

export interface ArchiveRecord {
  name: string;
  detail: string;
}

/**
 * Voice lines are tonal, not factual claims: they frame the supplied
 * interests (literature, music, football, rabbit holes, communities)
 * without inventing achievements.
 */
export const fragments: Fragment[] = [
  {
    word: 'Literature',
    caption: 'notes, drafts, and sentences that almost work',
    micro: 'a lifelong thing with words',
  },
  { word: 'Music', caption: 'the one background process that never exits' },
  { word: 'Football', caption: 'some things are worth ruining a weekend over' },
  { word: 'Rabbit Holes', caption: 'things I know suspiciously too much about' },
  { word: 'Communities', caption: 'most good things have people attached to them' },
];

/**
 * Literature stage: owner-supplied copy plus the two published essays
 * and four archive records. Other fragments keep only their selector
 * voice lines until their own content arrives.
 */
export const literature = {
  opening: 'I was a reader before I was a writer, and a writer long before I wrote code.',
  body: [
    'I grew up buried in books, competing in spelling bees, writing essays, and developing a perhaps unreasonable attachment to finding exactly the right word. Somewhere along the way came poetry, stories, half-finished drafts, and pages nobody else will ever read.',
    "Writing became the purest form of expression for me. A place to turn thoughts into something tangible, to say what conversation sometimes couldn't, and, more often than not, to understand what I was thinking in the first place.",
    "The subjects have changed over the years. The habit hasn't. I read to disappear into other people's worlds, and write to make sense of my own.",
  ],
  emphasis: 'Writing became the purest form of expression for me.',
  articles: [
    {
      title: 'How Vibe Coding Won Me $20 (And Cost Me My Soul)',
      category: 'Technology · Essay',
      teaser:
        'What if Swiggy was built entirely by AI? A look inside Shwikky, the wins, the failures, and where AI coding might be headed.',
      href: 'https://dscv.it/vibecoding-blog',
      action: 'Read',
    },
    {
      title: 'Your Device is Cheating on You',
      category: 'Technology · Essay',
      teaser:
        'A performance investigation into benchmarking, hidden villains, and the rabbit hole that ended with a Windows optimization toolkit.',
      href: 'https://dscv.it/optimization-blog',
      action: 'Read',
    },
  ] as Article[],
  archives: [
    { name: 'Spelling Bee International', detail: 'International Distinction' },
    { name: 'Mahatma Gandhi Library', detail: 'Essay Contest · 1st Place' },
    { name: 'Scripps Spelling Bee', detail: '1st Runner-Up · School Level' },
    { name: 'PTA Reflections', detail: '1st Place · What Is Your Story?' },
  ] as ArchiveRecord[],
};
