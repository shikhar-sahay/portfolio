'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

const lines = [
  { text: 'I build.', note: 'tools, experiments, platforms' },
  { text: 'I break.', note: 'systems, to understand them: the ethical kind' },
  { text: 'I rebuild.', note: 'better than before' },
];

const SEGMENT = 0.26;

function StatementLine({
  line,
  index,
  progress,
  className,
}: {
  line: (typeof lines)[number];
  index: number;
  progress: MotionValue<number>;
  className?: string;
}) {
  const start = index * SEGMENT;
  const opacity = useTransform(
    progress,
    [start, start + 0.14, 1],
    [0, 1, index === lines.length - 1 ? 1 : 0.3]
  );
  const y = useTransform(progress, [start, start + 0.14], [40, 0]);

  return (
    <motion.div style={{ opacity, y }} className={className}>
      <p className="text-[clamp(3rem,9vw,8rem)] font-semibold uppercase leading-none tracking-tight">
        {line.text}
      </p>
      <p className="text-paper/50 mt-2 text-micro uppercase tracking-[0.16em]">{line.note}</p>
    </motion.div>
  );
}

/**
 * The bridge between the hero and About: large statements reveal one by
 * one as the visitor scrolls, so the space where the portrait exits
 * becomes part of the story instead of dead space.
 */
export function TransitionStatements() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const stageFade = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  if (reduce) {
    return (
      <section
        aria-label="Introduction statements"
        className="bg-ink px-5 py-[14vh] text-paper sm:px-10"
      >
        <div className="mx-auto max-w-6xl space-y-6">
          {lines.map(line => (
            <div key={line.text}>
              <p className="text-[clamp(3rem,9vw,8rem)] font-semibold uppercase leading-none tracking-tight">
                {line.text}
              </p>
              <p className="text-paper/50 mt-2 text-micro uppercase tracking-[0.16em]">
                {line.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Introduction statements" className="relative h-[300svh]">
      <motion.div
        style={{ opacity: stageFade }}
        className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden bg-ink px-5 text-paper sm:px-10"
      >
        <div className="mx-auto w-full max-w-6xl space-y-[6vh]">
          {lines.map((line, i) => (
            <StatementLine
              key={line.text}
              line={line}
              index={i}
              progress={scrollYProgress}
              className={i === 1 ? 'pl-[10vw]' : i === 2 ? 'pl-[20vw]' : ''}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
