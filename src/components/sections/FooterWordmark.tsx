'use client';

import { useEffect, useRef } from 'react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { InteractiveLetters } from '@/components/ui/InteractiveLetters';
import { profile } from '@/content/profile';

/**
 * The closing frame: the name as a slow infinite marquee that responds as
 * ONE typographic object. Pointer velocity leans every copy identically
 * (uniform skew plus a breath of horizontal stretch), tracking widens
 * slightly while the pointer is inside, and a vermilion sweep follows the
 * cursor across accent overlays clipped per copy. No letter ever moves on
 * its own. One rAF loop runs only while the pointer is inside (or
 * settling); per frame it performs zero layout reads, only velocity math
 * and style writes (copy rects refresh on pointer events, never per
 * frame). Fine pointers only; touch and reduced motion render the drift
 * statically.
 */
export function FooterWordmark() {
  const reduce = useMountedReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const name = profile.name.toUpperCase();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let copies: HTMLElement[] = [];
    let sweeps: HTMLElement[] = [];
    let fractions: number[] = [];
    let inside = false;
    let presence = 0;
    let vel = 0;
    let skew = 0;
    let stretch = 1;
    let lastX = 0;
    let lastMove = 0;
    let running = false;
    let raf = 0;
    let lastT = 0;

    const refresh = (clientX: number) => {
      copies = Array.from(marquee.querySelectorAll<HTMLElement>('.wordmark-copy'));
      sweeps = Array.from(marquee.querySelectorAll<HTMLElement>('.wordmark-sweep'));
      fractions = copies.map(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 ? Math.min(1, Math.max(0, (clientX - r.left) / r.width)) : 0.5;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - (lastT || now));
      lastT = now;
      const k = Math.min(1, dt / 16.7);
      vel *= Math.pow(0.93, k);
      presence += ((inside ? 1 : 0) - presence) * Math.min(1, dt / 220);
      const targetSkew = Math.max(-0.06, Math.min(0.06, vel * 0.05)) * presence;
      const targetStretch = 1 + Math.min(Math.abs(vel) * 0.008, 0.012) * presence;
      skew += (targetSkew - skew) * Math.min(1, dt / 140);
      stretch += (targetStretch - stretch) * Math.min(1, dt / 140);
      const track = -0.02 + 0.03 * presence;
      const transform =
        Math.abs(skew) < 0.0005 && Math.abs(stretch - 1) < 0.0005
          ? ''
          : `skewX(${skew.toFixed(4)}rad) scaleX(${stretch.toFixed(4)})`;
      for (let i = 0; i < copies.length; i++) {
        copies[i].style.transform = transform;
        copies[i].style.letterSpacing = `${track.toFixed(4)}em`;
        const sweep = sweeps[i];
        if (sweep) {
          // A narrow sheen band around the cursor, never a fill.
          const center = fractions[i] * 100;
          const left = Math.max(0, center - 9);
          const right = Math.max(0, 100 - (center + 9));
          sweep.style.opacity = presence.toFixed(3);
          sweep.style.clipPath = `inset(0 ${right.toFixed(2)}% 0 ${left.toFixed(2)}%)`;
        }
      }
      const alive = inside || presence > 0.02 || Math.abs(vel) > 0.02 || Math.abs(skew) > 0.0005;
      if (!alive) {
        for (let i = 0; i < copies.length; i++) {
          copies[i].style.transform = '';
          copies[i].style.letterSpacing = '';
          if (sweeps[i]) sweeps[i].style.opacity = '0';
        }
        running = false;
        lastT = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running) {
        running = true;
        lastT = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onEnter = (e: PointerEvent) => {
      inside = true;
      lastX = e.clientX;
      lastMove = performance.now();
      refresh(e.clientX);
      wake();
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(8, now - lastMove);
      vel = vel * 0.7 + ((e.clientX - lastX) / dt) * 0.3;
      lastX = e.clientX;
      lastMove = now;
      refresh(e.clientX);
      wake();
    };
    const onLeave = () => {
      inside = false;
      wake();
    };

    marquee.addEventListener('pointerenter', onEnter);
    marquee.addEventListener('pointermove', onMove);
    marquee.addEventListener('pointerleave', onLeave);
    return () => {
      marquee.removeEventListener('pointerenter', onEnter);
      marquee.removeEventListener('pointermove', onMove);
      marquee.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className="overflow-hidden" aria-hidden="true">
        <p className="flex items-baseline justify-center whitespace-nowrap px-2 text-[10.2vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink">
          <InteractiveLetters text={name} lift={0.1} tint="none" />
        </p>
      </div>
    );
  }

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-baseline">
      {[0, 1].map(copy => (
        <span key={copy} className="flex items-baseline text-[9.5vw] leading-none">
          <span className="wordmark-copy relative whitespace-nowrap text-[9.5vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink will-change-transform">
            {name}
            <span
              aria-hidden="true"
              className="wordmark-sweep pointer-events-none absolute inset-0 whitespace-nowrap text-accent opacity-0"
            >
              {name}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mx-[0.7em] inline-block h-[0.16em] w-[0.16em] shrink-0 rotate-45 self-center bg-accent"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={marqueeRef}
      className="marquee marquee-fade -my-[0.5em] overflow-hidden py-[0.5em]"
      aria-hidden="true"
    >
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: '38s' }}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}
