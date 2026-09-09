export interface Fragment {
  word: string;
  caption: string;
}

/**
 * Voice lines are tonal, not factual claims: they frame the supplied
 * interests (writing, music, football, rabbit holes, communities)
 * without inventing achievements.
 */
export const fragments: Fragment[] = [
  { word: 'Writing', caption: 'notes, drafts, and sentences that almost work' },
  { word: 'Music', caption: 'the one background process that never exits' },
  { word: 'Football', caption: 'some things are worth ruining a weekend over' },
  { word: 'Rabbit Holes', caption: 'things I know suspiciously too much about' },
  { word: 'Communities', caption: 'most good things have people attached to them' },
];
