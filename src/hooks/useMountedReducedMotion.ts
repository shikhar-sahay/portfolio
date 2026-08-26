'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Reduced-motion state that is hydration-safe: the server and the first
 * client render always agree (false), and the flag flips after mount if
 * the user prefers reduced motion. Components must render the animated
 * variant first and settle into the static one immediately after.
 */
export function useMountedReducedMotion(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(prefers);
}
