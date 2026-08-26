'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Per-letter pointer reactivity for display type. Letters near the cursor
 * rise with a gaussian falloff and take a faint accent tint; the motion is
 * lerped in a single rAF loop (one transform write per letter per frame,
 * no React state). Fine pointers only; reduced motion and touch render
 * static letters.
 *
 * Centers are cached on pointerenter (the hero is pinned while it is
 * hovered, and the footer wordmark sits at the document end), so the
 * animation loop never reads layout.
 */
export function InteractiveLetters({
  text,
  className,
  letterClassName,
  lift = 0.14,
  tint = 'color',
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  /** Maximum rise in em. */
  lift?: number;
  /** What reacts besides the rise: fill color, or the stroke of outline type. */
  tint?: 'color' | 'stroke' | 'none';
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
    const centers: number[] = new Array(count).fill(0);
    const targets = new Array(count).fill(0);
    const currents = new Array(count).fill(0);
    let pointerX = 0;
    let inside = false;
    let raf = 0;
    let running = false;

    const FALLOFF = 110; // px, gaussian width of the rise field
    const EPS = 0.002;

    const tick = () => {
      let settled = true;
      for (let i = 0; i < count; i++) {
        currents[i] += (targets[i] - currents[i]) * 0.16;
        if (Math.abs(targets[i] - currents[i]) > EPS) settled = false;
        else currents[i] = targets[i];
        const el = letters[i];
        if (!el) continue;
        const f = currents[i];
        el.style.transform = f === 0 ? '' : `translateY(${-f}em)`;
        if (tint !== 'none' && f > 0.05) {
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
      }
      if (settled && !inside) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const cacheCenters = () => {
      const rect = container.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        const el = letters[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        centers[i] = r.left - rect.left + r.width / 2;
      }
    };

    const onEnter = (e: PointerEvent) => {
      inside = true;
      pointerX = e.clientX;
      cacheCenters();
      wake();
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      const rect = container.getBoundingClientRect();
      const localX = pointerX - rect.left;
      for (let i = 0; i < count; i++) {
        const d = localX - centers[i];
        targets[i] = lift * Math.exp(-(d * d) / (2 * FALLOFF * FALLOFF));
      }
      wake();
    };

    const onLeave = () => {
      inside = false;
      for (let i = 0; i < count; i++) targets[i] = 0;
      wake();
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    return () => {
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [text, lift, tint, reduce]);

  return (
    <span ref={containerRef} className={className} aria-label={text} role="text">
      {Array.from(text).map((letter, i) =>
        letter === ' ' ? (
          <span key={`space-${i}`} className="inline-block w-[0.28em]" />
        ) : (
          <span
            key={`${letter}-${i}`}
            ref={el => {
              letterRefs.current[i] = el;
            }}
            aria-hidden="true"
            className={`inline-block will-change-transform ${letterClassName ?? ''}`}
          >
            {letter}
          </span>
        )
      )}
    </span>
  );
}
