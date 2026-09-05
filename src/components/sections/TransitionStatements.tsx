'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

interface Phase {
  verb: string;
  note: string;
  /** Verb enter window: mask travels with scroll. */
  enter: [number, number];
  /** Verb exit window (absent for the finale, which holds into About). */
  exit?: [number, number];
  /** Note reveal window. */
  noteWindow: [number, number];
  /** Lateral drift across the whole scene. */
  drift: [number, number];
}

const phases: Phase[] = [
  {
    verb: 'Build.',
    note: 'tools, experiments, platforms',
    enter: [0.0, 0.08],
    exit: [0.28, 0.36],
    noteWindow: [0.06, 0.11],
    drift: [-1.5, 0.5],
  },
  {
    verb: 'Break.',
    note: 'systems, to understand them: the ethical kind',
    enter: [0.28, 0.36],
    exit: [0.6, 0.68],
    noteWindow: [0.36, 0.41],
    drift: [1, -1],
  },
  {
    verb: 'Rebuild.',
    note: 'better than before',
    enter: [0.6, 0.68],
    noteWindow: [0.66, 0.71],
    drift: [0.5, 0],
  },
];

/**
 * One thought on stage at a time. The pronoun arrives first, then the
 * verb unmasks from below; the previous thought masks away upward before
 * the next arrives, so words never collide. Every transform below is a
 * pure function of the single shared scroll progress, which makes the
 * choreography deterministic in both scroll directions, and every input
 * range ends at 1.0 (Motion v13 drops flat terminal segments past the
 * last keyframe, so ranges must never end early).
 */
function WordPhase({ phase, progress }: { phase: Phase; progress: MotionValue<number> }) {
  const [e0, e1] = phase.enter;
  const [x0, x1] = phase.exit ?? [2, 2];
  const finale = phase.exit === undefined;

  const containerO = useTransform(
    progress,
    finale ? [e0, e0 + 0.03, 1] : [e0, e0 + 0.03, x0, x1, 1],
    finale ? [0, 1, 1] : [0, 1, 1, 0, 0]
  );
  const iO = useTransform(
    progress,
    finale ? [e0, e0 + 0.05, 1] : [e0, e0 + 0.05, x0, x1, 1],
    finale ? [0, 1, 1] : [0, 1, 1, 0, 0]
  );
  const iY = useTransform(progress, [e0, e0 + 0.05, 1], [16, 0, 0]);
  const verbClip = useTransform(
    progress,
    finale ? [e0 + 0.02, e1, 1] : [e0 + 0.02, e1, x0, x1, 1],
    finale
      ? ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
      : [
          'inset(100% 0% 0% 0%)',
          'inset(0% 0% 0% 0%)',
          'inset(0% 0% 0% 0%)',
          'inset(100% 0% 0% 0%)',
          'inset(100% 0% 0% 0%)',
        ]
  );
  const verbY = useTransform(
    progress,
    finale ? [e0 + 0.02, e1, 1] : [e0 + 0.02, e1, x0, x1, 1],
    finale ? ['6vh', '0vh', '0vh'] : ['6vh', '0vh', '0vh', '-6vh', '-6vh']
  );
  const noteO = useTransform(
    progress,
    finale ? [phase.noteWindow[0], phase.noteWindow[1], 1] : [phase.noteWindow[0], phase.noteWindow[1], x0 - 0.02, x0 + 0.03, 1],
    finale ? [0, 1, 1] : [0, 1, 1, 0, 0]
  );
  const scale = useTransform(progress, [e0, e1, 1], [0.96, 1, 1]);
  const x = useTransform(
    progress,
    [0, 1],
    [`${phase.drift[0]}vw`, `${phase.drift[1]}vw`]
  );

  return (
    <motion.div
      style={{ opacity: containerO, x }}
      className="ink-stage absolute inset-0 will-change-transform"
    >
      <div className="flex h-full flex-col justify-center px-5 sm:px-10">
        <motion.p
          style={{ opacity: iO, y: iY }}
          className="font-serif text-[clamp(2.5rem,6vw,6rem)] italic leading-none tracking-tight text-[#f3efe6]/80"
        >
          I
        </motion.p>
        <motion.p
          style={{ clipPath: verbClip, y: verbY, scale }}
          className="whitespace-nowrap text-[clamp(3.5rem,13vw,15rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] will-change-transform"
        >
          {phase.verb.slice(0, -1)}
          <span className="text-accent">{phase.verb.slice(-1)}</span>
        </motion.p>
        <motion.p
          style={{ opacity: noteO }}
          className="mt-3 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60 sm:mt-4"
        >
          {phase.note}
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * The bridge between the hero and About: one thought on stage at a time
 * (I / BUILD, then BREAK, then REBUILD), each arriving word by word and
 * yielding before the next arrives. The section is pulled up by exactly
 * one viewport so its sticky engages the moment the hero releases: the
 * wipe is veil against incoming thought, never an empty tail. Each phase
 * carries its own ink (the stage itself is transparent), so the hero stays
 * pristine underneath until the first thought arrives. The finale holds
 * its frame and hands directly into About.
 */
export function TransitionStatements() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <section aria-label="Introduction statements" className="ink-stage px-5 py-[14vh] sm:px-10">
        <div className="mx-auto max-w-6xl space-y-[6vh]">
          {phases.map(phase => (
            <div key={phase.verb}>
              <p className="font-serif text-[clamp(2rem,5vw,4rem)] italic leading-none tracking-tight text-[#f3efe6]/80">
                I
              </p>
              <p className="whitespace-nowrap text-[clamp(3.2rem,10.5vw,13rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
                {phase.verb.slice(0, -1)}
                <span className="text-accent">{phase.verb.slice(-1)}</span>
              </p>
              <p className="mt-2 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60">
                {phase.note}
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
        {phases.map(phase => (
          <WordPhase key={phase.verb} phase={phase} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
