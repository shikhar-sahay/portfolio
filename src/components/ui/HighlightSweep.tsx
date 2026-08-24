'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Editorial reading highlight: the text starts muted and an ink sweep
 * progresses through it as the visitor scrolls, like reading along.
 * One compositor-friendly CSS variable drives the whole effect.
 * Reduced motion and no-JS render the text fully inked.
 */
export function HighlightSweep({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'],
  });
  const sweep = useTransform(scrollYProgress, [0, 1], ['0%', '118%']);

  if (reduce) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{ '--sweep': sweep } as React.CSSProperties}
      data-sweep
    >
      {children}
    </motion.p>
  );
}
