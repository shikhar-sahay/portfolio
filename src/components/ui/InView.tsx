'use client';

import { useRef } from 'react';
import { useInView } from 'motion/react';

/**
 * Sets data-inview on its wrapper once (for CSS-triggered draws/flows).
 */
export function InView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <div ref={ref} data-inview={inView ? '' : undefined} className={className}>
      {children}
    </div>
  );
}
