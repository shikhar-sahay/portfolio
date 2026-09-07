'use client';

import { motion } from 'motion/react';
import { WordReveal } from '@/components/ui/WordReveal';
import { profile } from '@/content/profile';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-20% 0px' },
};

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * 02 / About: the lede reveals word by word with scroll, grounded by a
 * small meta row. No index: the persistent header is the navigation.
 */
export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="theme-fade relative z-10 bg-paper px-5 pb-[14vh] pt-[6vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...reveal}
          transition={{ duration: 0.9, ease }}
          className="mb-10 flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted"
        >
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          About
        </motion.p>

        <WordReveal
          className="max-w-[30ch] text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.25] tracking-tight text-ink sm:max-w-[34ch]"
          segments={[
            { text: profile.introLedePre },
            { text: profile.introLedeEm, em: true },
            { text: profile.introLedePost },
          ]}
        />

        <motion.div
          {...reveal}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-[9vh] grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-3"
        >
          <div className="border-ink/15 border-t pt-4">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Based in</p>
            <p className="mt-2 text-sm text-muted">{profile.location}</p>
          </div>
          <div className="border-ink/15 border-t pt-4">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Studying</p>
            <p className="mt-2 text-sm text-muted">B.Tech CSE (Cybersecurity), VIT</p>
          </div>
          <div className="border-ink/15 col-span-2 border-t pt-4 sm:col-span-1">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Otherwise</p>
            <p className="mt-2 text-sm text-muted">
              Writing, music, football, theatre, and long detours through security rabbit holes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
