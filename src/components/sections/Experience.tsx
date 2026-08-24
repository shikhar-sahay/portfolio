'use client';

import { motion } from 'motion/react';
import { WordReveal } from '@/components/ui/WordReveal';
import { timeline } from '@/content/experience';

const ease = [0.19, 1, 0.22, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
};

/**
 * Experience: one continuous timeline, latest first. Every entry is a
 * single scannable row: period, role, organization, one factual line.
 * The line itself draws downward as the visitor scrolls.
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

        <WordReveal
          className="mt-8 max-w-[26ch] text-lede font-medium tracking-tight"
          segments={[
            {
              text: 'From esports group chats to GMP-regulated infrastructure, one long thread: ',
            },
            { text: 'build the thing, gather the people.', em: true },
          ]}
        />

        {/* Unified timeline */}
        <div className="relative mt-[12vh]">
          {/* The line, drawing with scroll */}
          <motion.div
            aria-hidden="true"
            className="bg-ink/15 absolute bottom-0 left-[7px] top-0 w-px origin-top max-sm:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.6, ease }}
          />

          <ol className="space-y-14">
            {timeline.map((entry, i) => (
              <motion.li
                key={`${entry.org}-${entry.role}-${i}`}
                {...reveal}
                transition={{ duration: 0.8, delay: 0.05, ease }}
                className="group relative grid gap-1 pl-10 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-14"
              >
                {/* Marker: a small square that fills on hover, no dots */}
                <span
                  aria-hidden="true"
                  className="border-ink/30 absolute left-0 top-[0.4em] h-3.5 w-3.5 rotate-45 border bg-paper transition-colors duration-500 group-hover:border-accent group-hover:bg-accent sm:left-[-3px]"
                />
                <p className="text-micro uppercase tabular-nums tracking-[0.14em] text-muted sm:pt-1 sm:text-right">
                  {entry.period}
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {entry.role}
                    <span className="text-muted"> · {entry.org}</span>
                  </h3>
                  <p className="group-hover:text-ink/80 mt-1.5 max-w-[58ch] text-sm leading-relaxed text-muted transition-colors duration-500">
                    {entry.summary}
                    {entry.location ? (
                      <span className="text-ink/40"> ({entry.location})</span>
                    ) : null}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          {...reveal}
          transition={{ duration: 0.9, ease }}
          className="mt-[8vh] max-w-[52ch] text-sm leading-relaxed text-muted"
        >
          Full details for every role live in the{' '}
          <a
            href="/resume.pdf"
            className="text-ink underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
          >
            resume
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
