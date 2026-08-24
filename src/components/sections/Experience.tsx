'use client';

import { motion } from 'motion/react';
import { HighlightSweep } from '@/components/ui/HighlightSweep';
import { organizations } from '@/content/experience';

const ease = [0.19, 1, 0.22, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
};

/**
 * Experience: a story of progression, not a LinkedIn clone. Organizations
 * appear once, latest first; multiple roles at one organization read as a
 * progression down a shared line. Facts come from the owner's source
 * material only.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...reveal}
          transition={{ duration: 0.9, ease }}
          className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted"
        >
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Experience
        </motion.p>

        <HighlightSweep className="mt-8 max-w-[26ch] text-lede font-medium tracking-tight">
          From esports group chats to GMP-regulated infrastructure, one long thread:{' '}
          <em className="font-serif font-normal italic">build the thing, gather the people.</em>
        </HighlightSweep>

        <div className="mt-[12vh] space-y-[12vh]">
          {organizations.map((org, oi) => (
            <motion.div
              key={org.org}
              {...reveal}
              transition={{ duration: 0.9, ease }}
              className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
            >
              {/* Organization header */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {org.org}
                </h3>
                {org.location && (
                  <p className="mt-2 text-micro uppercase tracking-[0.14em] text-muted">
                    {org.location}
                  </p>
                )}
                {org.roles.length > 1 && (
                  <p className="mt-3 text-micro uppercase tracking-[0.14em] text-accent">
                    {org.roles.length} roles, one run
                  </p>
                )}
              </div>

              {/* Role progression */}
              <div className="border-ink/15 relative space-y-10 border-l pl-7 lg:pl-9">
                {org.roles.map((role, ri) => (
                  <motion.article
                    key={role.title}
                    {...reveal}
                    transition={{ duration: 0.9, delay: ri * 0.08, ease }}
                    className="group relative"
                  >
                    {/* Progression marker: filled for the latest role */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-7 top-[0.45em] h-2.5 w-2.5 rounded-full border lg:-left-[2.35rem] ${
                        ri === 0 ? 'border-accent bg-accent' : 'border-ink/40 bg-paper'
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-lg font-semibold tracking-tight text-ink transition-transform duration-500 ease-expo group-hover:translate-x-1">
                        {role.title}
                      </h4>
                      <p className="text-micro uppercase tabular-nums tracking-[0.14em] text-muted transition-colors duration-500 group-hover:text-accent">
                        {role.period}
                      </p>
                    </div>
                    <ul className="mt-3 max-w-[62ch] space-y-2">
                      {role.points.map(point => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span
                            className="mt-[0.55em] h-px w-3 shrink-0 bg-accent transition-all duration-500 ease-expo group-hover:w-5"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
