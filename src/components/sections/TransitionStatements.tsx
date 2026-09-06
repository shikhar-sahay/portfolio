'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

interface Line {
  verb: string;
  note: string;
  /** Progress where this thought centers. */
  center: number;
  /** Note reveal window. */
  noteWindow: [number, number];
}

const lines: Line[] = [
  { verb: 'Build.', note: 'tools, experiments, platforms', center: 0.15, noteWindow: [0.07, 0.15] },
  {
    verb: 'Break.',
    note: 'systems, to understand them: the ethical kind',
    center: 0.5,
    noteWindow: [0.42, 0.5],
  },
  { verb: 'Rebuild.', note: 'better than before', center: 0.85, noteWindow: [0.77, 0.85] },
];

/**
 * One line of the composition. Emphasis follows distance from center:
 * the leading thought renders full while the others persist as dimmed,
 * slightly smaller history above and below. Every transform is a pure
 * function of the single shared scroll progress, so the choreography is
 * deterministic in both scroll directions, and every keyframe range ends
 * at 1.0 (Motion v13 drops flat terminal segments past the last
 * keyframe, so ranges must never end early).
 */
function ThoughtLine({
  line,
  index,
  progress,
}: {
  line: Line;
  index: number;
  progress: MotionValue<number>;
}) {
  const c = line.center;
  const isFirst = index === 0;
  const isLast = index === lines.length - 1;
  const opInputs = isFirst
    ? [0, c, c + 0.28, 1]
    : isLast
      ? [0, c - 0.28, c, 1]
      : [0, c, c + 0.28, 1];
  const opOutputs = isFirst
    ? [0, 1, 0.22, 0.22]
    : isLast
      ? [0.22, 0.22, 1, 1]
      : [0.22, 1, 0.22, 0.22];
  const opacity = useTransform(progress, opInputs, opOutputs);
  const scale = useTransform(
    progress,
    opInputs,
    opOutputs.map(v => (typeof v === 'number' ? 0.9 + v * 0.1 : v)) as number[]
  );
  const iO = useTransform(
    progress,
    isLast ? [0, c - 0.05, 1] : [Math.max(0, c - 0.14), c - 0.05, c + 0.28, 1],
    isLast ? [0.3, 1, 1] : [0, 1, 0.3, 0.3]
  );
  const noteO = useTransform(
    progress,
    isLast
      ? [line.noteWindow[0], line.noteWindow[1], 1]
      : [line.noteWindow[0], line.noteWindow[1], c + 0.22, 1],
    isLast ? [0, 1, 1] : [0, 1, 0, 0]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex h-[32vh] flex-col justify-center will-change-transform"
    >
      <motion.p
        style={{ opacity: iO }}
        className="font-serif text-[clamp(2rem,4.5vw,4.5rem)] italic leading-none tracking-tight text-[#f3efe6]/80"
      >
        I
      </motion.p>
      <p className="whitespace-nowrap text-[clamp(3.5rem,10vw,11rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-[#f3efe6]">
        {line.verb.slice(0, -1)}
        <span className="text-accent">{line.verb.slice(-1)}</span>
      </p>
      <motion.p
        style={{ opacity: noteO }}
        className="mt-3 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60 sm:mt-4"
      >
        {line.note}
      </motion.p>
    </motion.div>
  );
}

/**
 * The bridge between the hero and About: one typographic composition that
 * accumulates as the visitor scrolls. Three thoughts share a vertical
 * stack that travels upward with scroll (the same direction as the page),
 * while emphasis moves down the stack: the leading thought renders full
 * and the others persist as dimmed history above and below it. The
 * section is pulled up by exactly one viewport so its sticky engages the
 * moment the hero releases; the finale holds its frame and hands directly
 * into About.
 */
export function TransitionStatements() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // The stack travels as one camera: BUILD centered early, REBUILD
  // centered late, resolving slightly high to clear space for About.
  const stackY = useTransform(scrollYProgress, [0, 1], ['42vh', '-50vh']);
  const panelO = useTransform(scrollYProgress, [0, 0.04, 1], [0, 1, 1]);

  if (reduce) {
    return (
      <section aria-label="Introduction statements" className="ink-stage px-5 py-[14vh] sm:px-10">
        <div className="mx-auto max-w-6xl space-y-[6vh]">
          {lines.map(line => (
            <div key={line.verb}>
              <p className="font-serif text-[clamp(2rem,5vw,4rem)] italic leading-none tracking-tight text-[#f3efe6]/80">
                I
              </p>
              <p className="whitespace-nowrap text-[clamp(3rem,9vw,10rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
                {line.verb.slice(0, -1)}
                <span className="text-accent">{line.verb.slice(-1)}</span>
              </p>
              <p className="mt-2 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60">
                {line.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="Introduction statements"
      className="pointer-events-none relative -mt-[100dvh] h-[240svh]"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div
          style={{ opacity: panelO }}
          className="ink-stage absolute inset-0"
          aria-hidden="true"
        />
        <motion.div style={{ y: stackY }} className="absolute inset-0 will-change-transform">
          <div className="flex h-full flex-col justify-center px-5 sm:px-10">
            {lines.map((line, i) => (
              <ThoughtLine key={line.verb} line={line} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
