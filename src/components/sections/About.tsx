'use client';

import { motion } from 'motion/react';
import { sections } from '@/content/sections';
import { profile } from '@/content/profile';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
};

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * 02 / About: personal context plus the editorial index, which acts
 * as a navigation instrument (numbers, notes, hover reveals).
 */
export function About() {
  const rest = sections.slice(2);

  return (
    <section
      id="about"
      aria-label="About"
      className="theme-fade relative z-10 bg-paper px-5 pb-[14vh] pt-[20vh] sm:px-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[4vw] right-[2vw] select-none font-serif text-[clamp(10rem,28vw,24rem)] italic leading-none text-ink opacity-[0.05]"
      >
        02
      </span>

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_360px] lg:gap-24">
        <div>
          <motion.p
            {...reveal}
            transition={{ duration: 0.9, ease }}
            className="mb-10 flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted"
          >
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            02 · About
          </motion.p>

          <motion.h2
            {...reveal}
            transition={{ duration: 1, delay: 0.08, ease }}
            className="max-w-[24ch] text-lede font-medium tracking-tight text-ink"
          >
            {profile.introLedePre}
            <em className="font-serif font-normal italic">{profile.introLedeEm}</em>
            {profile.introLedePost}
          </motion.h2>

          <motion.div
            {...reveal}
            transition={{ duration: 0.9, delay: 0.16, ease }}
            className="mt-[8vh] grid max-w-md grid-cols-2 gap-6"
          >
            <div className="border-ink/15 border-t pt-4">
              <p className="text-micro uppercase tracking-[0.16em] text-accent">Based in</p>
              <p className="mt-2 text-sm text-muted">{profile.location}</p>
              <p className="mt-1 text-micro uppercase tabular-nums tracking-[0.16em] text-muted">
                {profile.coordinates}
              </p>
            </div>
            <div className="border-ink/15 border-t pt-4">
              <p className="text-micro uppercase tracking-[0.16em] text-accent">Studying</p>
              <p className="mt-2 text-sm text-muted">B.Tech CSE (Cybersecurity), VIT</p>
              <p className="mt-1 text-micro uppercase tabular-nums tracking-[0.16em] text-muted">
                CGPA {profile.education.cgpa}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Editorial index: a navigation instrument */}
        <motion.nav
          {...reveal}
          transition={{ duration: 1, delay: 0.2, ease }}
          aria-label="Site index"
          className="self-start lg:sticky lg:top-28"
        >
          <p className="mb-4 text-micro uppercase tracking-[0.16em] text-muted">Index</p>
          <ul>
            {rest.map(section => (
              <li key={section.id} className="border-ink/15 border-t last:border-b">
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors duration-300"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-micro tabular-nums text-accent">{section.number}</span>
                    <span className="font-medium tracking-tight text-ink transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      {section.name}
                    </span>
                  </span>
                  <span className="text-micro uppercase tracking-[0.14em] text-muted opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                    {section.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
