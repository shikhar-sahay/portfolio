'use client';

import { motion } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * Footer threshold: the one deliberate closing line on the page. Major
 * narrative sections separate through space plus the eyebrow system, but
 * the footer is the terminal state, so it earns a threshold of its own:
 * a content-width hairline (centered, slightly inset from the full
 * measure) with a small vermilion diamond seated at its middle. The line
 * draws once, left to right, as the footer enters, mirroring the opening
 * loader in reverse. No loop, no label, no glow. Reduced motion renders
 * the finished line statically.
 */
export function FooterThreshold() {
  const reduce = useMountedReducedMotion();

  if (reduce) {
    return (
      <div aria-hidden="true" className="mx-auto w-[80%]">
        <div className="relative flex items-center">
          <div className="h-px w-full bg-ink opacity-20" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-paper px-4">
            <span className="block h-2 w-2 rotate-45 bg-accent" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="mx-auto w-[80%]">
      <div className="relative flex items-center">
        <motion.div
          className="h-px w-full origin-left bg-ink opacity-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 1.2, ease }}
        />
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 bg-paper px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          <span className="block h-2 w-2 rotate-45 bg-accent" />
        </motion.span>
      </div>
    </div>
  );
}
