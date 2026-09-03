'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

const lines = [
  {
    text: 'I build.',
    note: 'tools, experiments, platforms',
    align: 'left' as const,
    edge: '0vw',
    drift: [-1.5, -3.5],
  },
  {
    text: 'I break.',
    note: 'systems, to understand them: the ethical kind',
    align: 'right' as const,
    edge: '4vw',
    drift: [4, 1],
  },
  {
    text: 'I rebuild.',
    note: 'better than before',
    align: 'left' as const,
    edge: '10vw',
    drift: [6, 2],
  },
] as const;

/** Scroll share of the bridge owned by each statement. */
const SHARE = 1 / lines.length;
/** Width of the emphasis crossfade, in progress units. */
const FADE = 0.07;

function StatementLine({
  line,
  index,
  progress,
}: {
  line: (typeof lines)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // All three statements share the stage from the first pixel: the inactive
  // ones sit back at low opacity, scrolling moves the emphasis down the
  // stack. The stage is never empty. The choreography alternates sides:
  // BUILD holds the left, BREAK answers from the right, REBUILD lands
  // center-left and carries the finale. Each line drifts laterally and
  // settles from a slight scale and a whisper of rotation, so every scroll
  // step lands somewhere visible. Everything stays readable: motion is
  // small, type never distorts.
  // Motion v13 quirk: ranges must be explicit, strictly increasing, and
  // three or more points, so every case below spells out its keyframes.
  const activate = index * SHARE;
  const deactivate = (index + 1) * SHARE;
  const isLast = index === lines.length - 1;
  const isFirst = index === 0;
  const on = 0.16;

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, deactivate - FADE, deactivate + FADE, 1]
      : isLast
        ? [activate - FADE, activate + FADE, 1]
        : [activate - FADE, activate + FADE, deactivate - FADE, deactivate + FADE],
    isFirst ? [1, 1, on, on] : isLast ? [on, 1, 1] : [on, 1, 1, on]
  );
  const y = useTransform(
    progress,
    isFirst ? [0, 0.5, 1] : [activate - FADE, activate + FADE, 1],
    isFirst ? [0, 0, 0] : [36, 0, 0]
  );
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [`${line.drift[0]}vw`, `${(line.drift[0] + line.drift[1]) / 2}vw`, `${line.drift[1]}vw`]
  );
  const scale = useTransform(
    progress,
    isFirst ? [0, 0.5, 1] : [activate - FADE, activate + FADE, 1],
    isFirst ? [1, 1, 1] : [0.94, 1, 1]
  );
  const rotate = useTransform(
    progress,
    isFirst ? [0, 0.5, 1] : [activate - FADE, activate + FADE, 1],
    isFirst ? [0, 0, 0] : [index === 1 ? -1.2 : 1, 0, 0]
  );

  const words = line.text.split(' ');
  const last = words[words.length - 1];
  const head = [...words.slice(0, -1), last.slice(0, -1)].join(' ');
  const period = last.slice(-1);
  const right = line.align === 'right';

  return (
    <motion.div
      style={{
        opacity,
        y,
        x,
        scale,
        rotate,
        paddingLeft: right ? undefined : line.edge,
        paddingRight: right ? line.edge : undefined,
        textAlign: right ? 'right' : 'left',
      }}
      className="will-change-transform"
    >
      <p className="text-[clamp(3.2rem,10.5vw,13rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
        {head}
        <span className="text-accent">{period}</span>
      </p>
      <p className="mt-2 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60 sm:mt-3">
        {line.note}
      </p>
    </motion.div>
  );
}

/**
 * The bridge between the hero and About: three oversized statements that
 * own the viewport together in a left, right, center-left choreography.
 * Emphasis moves down the stack with scroll (the inactive lines stay
 * visible but receded), so there is no dead stage time, and every line
 * drifts, scales, and settles with scroll so the frame keeps moving.
 * The sticky simply releases into About; the stage stays opaque.
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
          {lines.map(line => (
            <div key={line.text}>
              <p className="text-[clamp(3.2rem,10.5vw,13rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
                {line.text.slice(0, -1)}
                <span className="text-accent">{line.text.slice(-1)}</span>
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
    <section ref={ref} aria-label="Introduction statements" className="relative h-[200svh]">
      <div className="ink-stage sticky top-0 flex h-dvh flex-col justify-center overflow-hidden px-5 sm:px-10">
        <div className="flex w-full flex-col gap-[4.5vh]">
          {lines.map((line, i) => (
            <StatementLine key={line.text} line={line} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
