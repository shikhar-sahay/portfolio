'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/**
 * Subtle magnetic pull toward the cursor. Desktop fine pointers only,
 * never under reduced motion. The pull is small (max ~5px) so it reads
 * as tactility, not gimmick.
 */
export function Magnetic({
  children,
  strength = 0.35,
  max = 5,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className ?? 'inline-block'}
      style={{ x: sx, y: sy }}
      onPointerMove={e => {
        const el = ref.current;
        if (!el || !window.matchMedia('(pointer: fine)').matches) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(-max, Math.min(max, dx * strength)));
        y.set(Math.max(-max, Math.min(max, dy * strength)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
