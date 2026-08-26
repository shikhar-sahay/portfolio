'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

const lines = [
  { text: 'I build.', note: 'tools, experiments, platforms', drift: [-2, -5] },
  { text: 'I break.', note: 'systems, to understand them: the ethical kind', drift: [8, 2] },
  { text: 'I rebuild.', note: 'better than before', drift: [16, 8] },
] as const;

const SEGMENT = 0.24;

function StatementLine({
  line,
  index,
  progress,
}: {
  line: (typeof lines)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * SEGMENT;
  // First line is already on stage when the bridge arrives; later lines
  // rise quickly. Each line keeps drifting sideways for its whole life so
  // the composition never sits still.
  const opacity = useTransform(
    progress,
    index === 0 ? [0, 1] : [start, start + 0.1, 1],
    index === 0 ? [1, 1] : [0, 1, 1]
  );
  const y = useTransform(progress, index === 0 ? [0, 1] : [start, start + 0.12, 1], [0, 0, -30]);
  const x = useTransform(progress, [0, 1], [`${line.drift[0]}vw`, `${line.drift[1]}vw`]);
  // The trailing period carries the accent; the words carry the weight.
  const words = line.text.split(' ');
  const last = words[words.length - 1];
  const head = [...words.slice(0, -1), last.slice(0, -1)].join(' ');
  const period = last.slice(-1);

  return (
    <motion.div style={{ opacity, y, x }} className="will-change-transform">
      <p className="text-[clamp(3.4rem,12.5vw,11.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em]">
        {head}
        <span className="text-accent">{period}</span>
      </p>
      <p className="mt-3 text-micro uppercase tracking-[0.16em] text-paper/50 sm:mt-4">
        {line.note}
      </p>
    </motion.div>
  );
}

/**
 * The bridge between the hero and About: three oversized statements that
 * own the viewport. The first is on stage the moment the bridge arrives
 * (no dead scroll), later lines join quickly, and every line drifts
 * laterally with scroll so the frame keeps moving. The stage stays opaque
 * to the end; the sticky simply releases into About.
 */
export function TransitionStatements() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <section
        aria-label="Introduction statements"
        className="bg-ink px-5 py-[14vh] text-paper sm:px-10"
      >
        <div className="mx-auto max-w-6xl space-y-[6vh]">
          {lines.map(line => (
            <div key={line.text}>
              <p className="text-[clamp(3.4rem,12.5vw,11.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em]">
                {line.text.slice(0, -1)}
                <span className="text-accent">{line.text.slice(-1)}</span>
              </p>
              <p className="mt-3 text-micro uppercase tracking-[0.16em] text-paper/50">
                {line.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Introduction statements" className="relative h-[220svh]">
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden bg-ink px-5 text-paper sm:px-10">
        <div className="flex w-full flex-col gap-[7vh]">
          {lines.map((line, i) => (
            <StatementLine key={line.text} line={line} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
