'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

interface Line {
  verb: string;
  note: string;
  /** Progressive left offset: the stack cascades diagonally downward. */
  offsetClass: string;
  /** Progress where this thought centers. */
  center: number;
  /** Note reveal window. */
  noteWindow: [number, number];
}

const lines: Line[] = [
  {
    verb: 'Build.',
    note: 'things I wish existed.',
    offsetClass: '',
    center: 0.1,
    noteWindow: [0.02, 0.1],
  },
  {
    verb: 'Break.',
    note: 'ideas until I understand them.',
    offsetClass: 'sm:pl-[4vw] lg:pl-[7vw]',
    center: 0.5,
    noteWindow: [0.42, 0.5],
  },
  {
    verb: 'Rebuild.',
    note: 'with everything I learned.',
    offsetClass: 'sm:pl-[8vw] lg:pl-[14vw]',
    center: 0.9,
    noteWindow: [0.82, 0.9],
  },
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
      className={`relative flex h-[30svh] flex-col justify-center will-change-transform sm:h-[32vh] ${line.offsetClass}`}
    >
      {/* Full-word echo: the complete verb, oversized and cropped by the
          frame edge, so the full viewport reads as composition. Same word
          behind same word is the only honest mapping; the echo sits
          low-right at whisper opacity so it never competes with its own
          letterforms. Static CSS riding the shared stack travel: no extra
          motion state, deterministic in both directions. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-[30%] select-none whitespace-nowrap text-[21vw] font-semibold uppercase leading-none tracking-[-0.03em] text-ink opacity-[0.06] dark:opacity-[0.09]"
      >
        {line.verb.slice(0, -1)}
      </span>
      <motion.p
        style={{ opacity: iO }}
        className="text-ink/80 relative font-serif text-[clamp(2.25rem,5vw,5rem)] italic leading-none tracking-tight"
      >
        I
      </motion.p>
      <p className="relative whitespace-nowrap text-[clamp(4rem,12.5vw,14rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
        {line.verb.slice(0, -1)}
        <span className="text-accent">{line.verb.slice(-1)}</span>
      </p>
      <motion.p
        style={{ opacity: noteO }}
        className="mt-3 text-micro uppercase tracking-[0.16em] text-muted sm:mt-4"
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

  // Small screens get a tighter cut of the same choreography: the type
  // stays small while viewports stay tall, so the full travel parks each
  // thought too high and leaves dead frame below it. Desktop values are
  // untouched; the compact flag only ever engages below sm.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // The stack travels as one camera: BUILD centered early, REBUILD
  // centered late, resolving just high enough to clear the About entry
  // while still sharing the frame with it briefly. The section runs
  // 200svh (down from 240svh) with a short REBUILD hold (0.9 to 1.0):
  // enough breath before About, never an empty wait. The compact cut
  // runs 165svh with a lower finale resolve so REBUILD shares the frame
  // with the About entry instead of parking above a void.
  const stackYFull = useTransform(scrollYProgress, [0, 1], ['42vh', '-40vh']);
  const stackYCompact = useTransform(scrollYProgress, [0, 1], ['28vh', '-20vh']);
  const stackY = compact ? stackYCompact : stackYFull;
  const panelO = useTransform(scrollYProgress, [0, 0.04, 1], [0, 1, 1]);

  if (reduce) {
    return (
      <section
        aria-label="Introduction statements"
        className="theme-fade overflow-hidden bg-paper px-5 py-[14vh] text-ink sm:px-10"
      >
        <div className="mx-auto max-w-6xl space-y-[6vh]">
          {lines.map(line => (
            <div key={line.verb} className={`relative ${line.offsetClass}`}>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[21vw] font-semibold uppercase leading-none tracking-[-0.03em] text-ink opacity-[0.07]"
              >
                {line.verb.slice(0, -1)}
              </span>
              <p className="text-ink/80 relative font-serif text-[clamp(2rem,5vw,4rem)] italic leading-none tracking-tight">
                I
              </p>
              <p className="relative whitespace-nowrap text-[clamp(4rem,12.5vw,14rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
                {line.verb.slice(0, -1)}
                <span className="text-accent">{line.verb.slice(-1)}</span>
              </p>
              <p className="mt-2 text-micro uppercase tracking-[0.16em] text-muted">{line.note}</p>
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
      className="pointer-events-none relative -mt-[100dvh] h-[165svh] sm:h-[200svh]"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div
          style={{ opacity: panelO }}
          className="theme-fade absolute inset-0 bg-paper"
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
