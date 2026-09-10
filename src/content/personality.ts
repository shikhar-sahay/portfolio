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
  {
    word: 'Music',
    caption: 'the one background process that never exits',
    micro: 'the one background process that never exits',
  },
  {
    word: 'Football',
    caption: 'some things are worth ruining a weekend over',
    micro: 'més que un club, and I mean it',
  },
  {
    word: 'Side Quests',
    caption: 'where the rest of my time disappears',
    micro: 'where the rest of my time disappears',
  },
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
    "The subjects have changed over the years. The habit hasn't. I read to disappear into other people's worlds, and write to make sense of my own. More recently, that has included writing about technology too. A couple of those pieces are sitting right over there.",
  ],
  emphasis: "The subjects have changed over the years. The habit hasn't.",
  articles: [
    {
      title: 'Your Device is Cheating on You',
      category: 'Technology · Essay',
      teaser:
        'A performance investigation into benchmarking, hidden villains, and the rabbit hole that ended with a Windows optimization toolkit.',
      href: 'https://dscv.it/optimization-blog',
      action: 'Read',
    },
    {
      title: 'How Vibe Coding Won Me $20 (And Cost Me My Soul)',
      category: 'Technology · Essay',
      teaser:
        'What if Swiggy was built entirely by AI? A look inside Shwikky, the wins, the failures, and where AI coding might be headed.',
      href: 'https://dscv.it/vibecoding-blog',
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

/**
 * Music stage: owner-supplied copy plus personal metadata. The live
 * listening state arrives from `/api/spotify`, never from this file.
 */
export const music = {
  opening: "I'll listen to almost anything, as long as it sounds good.",
  body: [
    "I love discovering new music across genres, languages, and artists I would've never found otherwise. Rap and pop get a lot of airtime, melodic rap has a special place somewhere in there, and my embarrassingly westernized music taste is currently finding its way around Bollywood.",
    "Some songs become attached to people, places, and oddly specific moments. Others are just bangers. I don't really organize my life into eras, but Spotify probably could.",
  ],
  favouriteArtist: 'JUICE WRLD',
  favouriteSong: "DON'T MAKE ME CHOOSE.",
  profileUrl: 'https://open.spotify.com/user/e903cr9l76oafo6tt5oyi4gdh?si=ab8c9e51a25d446c',
};

/**
 * Football stage: owner-supplied copy plus the childhood Brazil-kit
 * photograph. The photo is the only visual; it carries that side of
 * the story alone, so the copy says nothing about Brazil.
 */
export const football = {
  opening: "There's nothing more beautiful than the beautiful game.",
  body: [
    'For me, it all started with Neymar Jr., one of the finest magicians to ever touch a football. I followed him everywhere, and when he found his way to FC Barcelona, so did I. What started with Neymar quickly became something bigger. I became a culer, fell in love with the way Barça played, and by the time he left, the club had already become a part of me.',
    "Now, watching Lamine Yamal, I catch glimpses of the same magic that made eight-year-old me fall in love with football in the first place. And this season, we're bringing the Champions League back to the Camp Nou.",
  ],
  closing: 'Visca Barça. And fu** Madrid.',
};

/**
 * Side Quests stage: owner-supplied copy in one continuous thought.
 * The recommendation artifact lives beside it; watched titles never
 * reach the database.
 */
export const sideQuests = {
  opening: 'Life would be pretty boring if I only ever stuck to the main quest.',
  body: [
    'Some of my favourite time is the least complicated: being around my friends and the people I love, going somewhere with no real plan, finding another show to binge, watching a movie, or just doing absolutely nothing together.',
    "Somewhere in between, I've made my way through just about every Pokémon game I could get my hands on, lost an unreasonable number of hours to FIFA and Fortnite, developed a (concerning) liking for crime stories and documentaries, and read enough Agatha Christie to know that the obvious suspect is almost never the right one.",
  ],
  closing: 'The main quest gets the résumé. The side quests get the rest of me.',
};

export type SpotifyStatus = 'playing' | 'recent' | 'unavailable';

export interface SpotifyTrack {
  status: SpotifyStatus;
  title?: string;
  artist?: string;
  album?: string;
  artwork?: string;
  spotifyUrl?: string;
  isPlaying?: boolean;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
}
