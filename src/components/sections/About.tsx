'use client';

import { motion } from 'motion/react';
import { WordReveal } from '@/components/ui/WordReveal';
import { profile } from '@/content/profile';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
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
      className="theme-fade relative z-10 bg-paper px-5 pb-[11vh] pt-[5vh] sm:px-10 md:pb-[14vh] md:pt-[6vh]"
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
          className="max-w-[32ch] text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.22] tracking-tight text-ink sm:max-w-[38ch]"
          segments={[
            { text: profile.introLedePre },
            { text: profile.introLedeEm, em: true },
            { text: profile.introLedePost },
          ]}
        />

        <motion.div
          {...reveal}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-[7vh] grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-3 md:mt-[9vh]"
        >
          <div className="border-ink/15 lm-line-soft border-t pt-4">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Home</p>
            <p className="mt-2 text-sm text-muted">Bangalore, India</p>
          </div>
          <div className="border-ink/15 lm-line-soft border-t pt-4">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Studying</p>
            <p className="mt-2 text-sm text-muted">B.Tech CSE (Cybersecurity), VIT Vellore</p>
          </div>
          <div className="border-ink/15 lm-line-soft col-span-2 border-t pt-4 sm:col-span-1">
            <p className="text-micro uppercase tracking-[0.16em] text-accent">Interests</p>
            <p className="mt-2 text-sm text-muted">
              Entrepreneurship, writing, music &amp; football
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
