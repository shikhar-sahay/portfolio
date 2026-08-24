export interface Fragment {
  word: string;
  caption: string;
}

/**
 * Voice lines are tonal, not factual claims: they frame the supplied
 * interests (writing, music, football, theatre, security rabbit holes,
 * building, communities, teaching) without inventing achievements.
 */
export const fragments: Fragment[] = [
  { word: 'Writing', caption: 'notes, drafts, and sentences that almost work' },
  { word: 'Music', caption: 'the one background process that never exits' },
  { word: 'Football', caption: 'the only system where I defend manually' },
  { word: 'Theatre', caption: 'rehearsal is debugging with an audience' },
  { word: 'Rabbit Holes', caption: 'cybersecurity rabbit holes, entered voluntarily' },
  { word: 'Building', caption: 'side projects outnumber finished ones' },
  { word: 'Communities', caption: 'clubs, events, and the people who run them' },
  { word: 'Teaching', caption: 'explaining it is how I check I know it' },
];
