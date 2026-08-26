'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { WordReveal } from '@/components/ui/WordReveal';
import { orgTimeline, type OrgEntry } from '@/content/experience';

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * Experience: one visual timeline grouped by organization. A hairline
 * spine fills with accent as the visitor scrolls; org blocks alternate
 * sides on wide screens and stack along the spine on small ones. Every
 * role is a compact block: title, period, one factual line.
 */
export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.78', 'end 0.55'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
  };

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[14vh] sm:px-10"
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
              text: 'From esports group chats to GMP-regulated infrastructure: ',
            },
            { text: 'build the thing, gather the people.', em: true },
          ]}
        />

        {/* The timeline */}
        <div ref={listRef} className="relative mt-[10vh]">
          {/* Spine: base hairline plus the accent fill that draws with scroll */}
          <div
            aria-hidden="true"
            className="bg-ink/15 absolute bottom-0 left-[7px] top-0 w-px lg:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            className="bg-accent absolute top-0 left-[7px] w-px origin-top lg:left-1/2"
            style={reduce ? { scaleY: 1, height: '100%' } : { scaleY: spineScale, height: '100%' }}
          />

          <ol className="space-y-[9vh] lg:space-y-[11vh]">
            {orgTimeline.map((entry, i) => (
              <OrgBlock key={entry.org} entry={entry} index={i} reveal={reveal} />
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

function OrgBlock({
  entry,
  index,
  reveal,
}: {
  entry: OrgEntry;
  index: number;
  reveal: {
    initial: { opacity: number; y: number };
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; margin: string };
  };
}) {
  const left = index % 2 === 0;
  return (
    <motion.li
      {...reveal}
      transition={{ duration: 0.8, ease }}
      className="relative max-lg:pl-10 lg:grid lg:grid-cols-[1fr_5rem_1fr] lg:items-start"
    >
      {/* Marker: a diamond riding the spine, wakes as the block arrives */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, ease }}
        className="border-ink/40 absolute left-[1.5px] top-[0.5em] block h-3 w-3 rotate-45 border bg-paper transition-colors duration-500 hover:border-accent hover:bg-accent lg:left-1/2 lg:-translate-x-1/2"
      />

      <div
        className={
          left
            ? 'lg:col-start-1 lg:pr-14 lg:text-right'
            : 'lg:col-start-3 lg:pl-14'
        }
      >
        <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{entry.org}</h3>
        {entry.location && (
          <p className="mt-1 text-micro uppercase tracking-[0.16em] text-muted">
            {entry.location}
          </p>
        )}

        <ul className="mt-4 space-y-4">
          {entry.roles.map(role => (
            <li key={role.role} className="group/role">
              <div
                className={`flex flex-wrap items-baseline gap-x-4 gap-y-0.5 ${
                  left ? 'lg:justify-end' : ''
                }`}
              >
                <p className="text-sm font-semibold text-ink">{role.role}</p>
                {role.period && (
                  <p className="text-micro uppercase tabular-nums tracking-[0.14em] text-accent">
                    {role.period}
                  </p>
                )}
              </div>
              {role.summary && (
                <p
                  className={`mt-1 max-w-[54ch] text-sm leading-relaxed text-muted transition-colors duration-500 group-hover/role:text-ink/80 ${
                    left ? 'lg:ml-auto' : ''
                  }`}
                >
                  {role.summary}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
