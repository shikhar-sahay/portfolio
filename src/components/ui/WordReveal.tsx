'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

export interface WordSegment {
  text: string;
  em?: boolean;
}

function Word({
  word,
  progress,
  range,
}: {
  word: { w: string; em?: boolean };
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={word.em ? 'font-serif font-normal italic' : undefined}
    >
      {word.w}{' '}
    </motion.span>
  );
}

/**
 * Word-by-word reading reveal: words sit muted and brighten in reading
 * order as the visitor scrolls through the block. Reduced motion and no-JS
 * render fully inked text.
 */
export function WordReveal({
  segments,
  className,
}: {
  segments: WordSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = segments.flatMap(segment =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map(w => ({ w, em: segment.em }))
  );

  if (reduce) {
    return (
      <p className={className}>
        {segments.map((segment, si) => (
          <span key={si} className={segment.em ? 'font-serif font-normal italic' : undefined}>
            {segment.text}{' '}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} aria-label={words.map(w => w.w).join(' ')}>
      {words.map((word, i) => (
        <Word
          key={`${word.w}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </p>
  );
}
