'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Per-letter pointer reactivity for display type. Each letter owns an
 * independent underdamped spring integrated in a single rAF loop (one
 * transform write per letter per frame, no React state). The drive is a
 * two-dimensional gaussian proximity field around the pointer, so a letter
 * only rises when the pointer is near it in both axes: hovering one row of
 * a stacked wordmark does not lift the other row. Fine pointers only;
 * reduced motion and touch render static letters.
 *
 * Nothing here clips: letters live in normal flow with visible overflow,
 * so they can rise freely. The optional staggered entrance is a plain
 * fade-and-rise on each letter (fill backwards), never a mask, so the
 * interaction is never constrained by an overflow boundary.
 *
 * Centers are cached in viewport coordinates on pointerenter and refreshed
 * on scroll while the pointer is inside (scroll-driven transforms move the
 * letters), so the animation loop never reads layout per frame.
 */
export function InteractiveLetters({
  text,
  className,
  letterClassName,
  lift = 0.12,
  tint = 'color',
  entrance = false,
  entranceDelay = '0s',
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  /** Maximum rise in em. */
  lift?: number;
  /** What reacts besides the rise: fill color, or the stroke of outline type. */
  tint?: 'color' | 'stroke' | 'none';
  /** Staggered fade-and-rise entrance instead of appearing instantly. */
  entrance?: boolean;
  /** CSS time expression the per-letter stagger builds on. */
  entranceDelay?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    const letters = letterRefs.current;
    const count = letters.length;
    const centerX: number[] = new Array(count).fill(0);
    const centerY: number[] = new Array(count).fill(0);
    const targets = new Array(count).fill(0);
    const pos = new Array(count).fill(0);
    const vel = new Array(count).fill(0);
    let pointerX = 0;
    let pointerY = 0;
    let inside = false;
    let raf = 0;
    let running = false;
    let last = 0;
    let scrollQueued = false;

    // Two-dimensional rise field: laterally broad so neighbors join in,
    // vertically tight so stacked rows keep independent boundaries.
    const FALLOFF_X = 130; // px
    const FALLOFF_Y = 85; // px
    const STIFFNESS = 170;
    const DAMPING = 15; // slightly underdamped: soft, expensive settle
    const EPS_POS = 0.0015;
    const EPS_VEL = 0.004;

    const paint = (i: number, f: number) => {
      const el = letters[i];
      if (!el) return;
      el.style.transform = f === 0 ? '' : `translateY(${-f}em)`;
      if (tint !== 'none' && f > 0.04) {
        const a = Math.round(Math.min(1, f / lift) * 85);
        if (tint === 'stroke') {
          el.style.setProperty(
            '-webkit-text-stroke-color',
            `color-mix(in srgb, var(--accent) ${a}%, var(--ink))`
          );
        } else {
          el.style.color = `color-mix(in srgb, var(--accent) ${a}%, currentColor)`;
        }
      } else {
        if (tint === 'stroke') el.style.setProperty('-webkit-text-stroke-color', '');
        else el.style.color = '';
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, last > 0 ? (now - last) / 1000 : 0.016);
      last = now;
      let settled = true;
      for (let i = 0; i < count; i++) {
        // Semi-implicit Euler spring toward the pointer target.
        const force = STIFFNESS * (targets[i] - pos[i]) - DAMPING * vel[i];
        vel[i] += force * dt;
        pos[i] += vel[i] * dt;
        if (Math.abs(targets[i] - pos[i]) > EPS_POS || Math.abs(vel[i]) > EPS_VEL) {
          settled = false;
        }
        paint(i, pos[i]);
      }
      if (settled && !inside) {
        for (let i = 0; i < count; i++) {
          pos[i] = 0;
          vel[i] = 0;
          paint(i, 0);
        }
        running = false;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const cacheCenters = () => {
      for (let i = 0; i < count; i++) {
        const el = letters[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        centerX[i] = r.left + r.width / 2;
        centerY[i] = r.top + r.height / 2;
      }
    };

    const drive = () => {
      for (let i = 0; i < count; i++) {
        if (!letters[i]) continue;
        const dx = pointerX - centerX[i];
        const dy = pointerY - centerY[i];
        targets[i] =
          lift *
          Math.exp(-(dx * dx) / (2 * FALLOFF_X * FALLOFF_X)) *
          Math.exp(-(dy * dy) / (2 * FALLOFF_Y * FALLOFF_Y));
      }
    };

    const onEnter = (e: PointerEvent) => {
      inside = true;
      pointerX = e.clientX;
      pointerY = e.clientY;
      cacheCenters();
      drive();
      wake();
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      drive();
      wake();
    };

    const onLeave = () => {
      inside = false;
      for (let i = 0; i < count; i++) targets[i] = 0;
      wake();
    };

    // Scroll-driven transforms (hero scene change) move the letters while
    // the pointer is inside: refresh the cached centers without layout
    // reads inside the animation loop.
    const onScroll = () => {
      if (!inside || scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        if (!inside) return;
        cacheCenters();
        drive();
        wake();
      });
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [text, lift, tint, reduce]);

  return (
    <span
      ref={containerRef}
      className={`overflow-visible ${className ?? ''}`}
      aria-label={text}
      role="text"
    >
      {Array.from(text).map((letter, i) =>
        letter === ' ' ? (
          <span key={`space-${i}`} aria-hidden="true" className="inline-block w-[0.28em]" />
        ) : (
          <span
            key={`${letter}-${i}`}
            ref={el => {
              letterRefs.current[i] = el;
            }}
            aria-hidden="true"
            className={`inline-block will-change-transform ${letterClassName ?? ''}`}
            style={
              entrance
                ? {
                    animation: 'letter-rise 1.05s cubic-bezier(0.19, 1, 0.22, 1) backwards',
                    animationDelay: `calc(${entranceDelay} + ${i * 45}ms)`,
                  }
                : undefined
            }
          >
            {letter}
          </span>
        )
      )}
    </span>
  );
}
