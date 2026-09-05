'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { InteractiveLetters } from '@/components/ui/InteractiveLetters';
import { profile } from '@/content/profile';

/**
 * Velocity-wave letters for the closing marquee. Unlike the hero spring
 * field, this reacts to pointer VELOCITY: letters near the cursor rise
 * with proximity, lean with movement direction, and swell slightly, then
 * settle as the velocity decays. One rAF loop runs only while the pointer
 * is inside (or settling); idle costs nothing beyond the marquee drift.
 * Fine pointers only; touch and reduced motion render static letters.
 */
function MarqueeWave({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const container = containerRef.current;
    if (!container) return;
    const track = container.closest('.marquee-track') as HTMLElement | null;
    if (!track) return;
    const marquee = container.closest('.marquee') as HTMLElement | null;
    if (!marquee) return;

    const letters = letterRefs.current;
    const count = letters.length;
    const rel: number[] = new Array(count).fill(0);
    let trackBase = 0;
    let pointerX = 0;
    let lastX = 0;
    let lastMove = 0;
    let vel = 0;
    let presence = 0;
    let inside = false;
    let running = false;
    let raf = 0;
    let lastT = 0;

    const SIGMA = 130;
    const clampRot = (v: number) => Math.max(-0.12, Math.min(0.12, v * 0.06));

    const cache = () => {
      const t = track.getBoundingClientRect();
      trackBase = t.left;
      for (let i = 0; i < count; i++) {
        const el = letters[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        rel[i] = r.left - t.left + r.width / 2;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - (lastT || now));
      lastT = now;
      vel *= Math.pow(0.94, dt / 16.7);
      presence += ((inside ? 1 : 0) - presence) * Math.min(1, dt / 160);
      // One layout read per frame: the track drifts under a CSS animation.
      const shift = track.getBoundingClientRect().left - trackBase;
      const liftBoost = Math.min(Math.abs(vel) * 0.25, 0.3);
      const rot = clampRot(vel) * presence;
      const alive = inside || presence > 0.02 || Math.abs(vel) > 0.02;
      for (let i = 0; i < count; i++) {
        const el = letters[i];
        if (!el) continue;
        const dx = pointerX - (trackBase + shift + rel[i]);
        const prox = Math.exp(-(dx * dx) / (2 * SIGMA * SIGMA));
        const rise = prox * (0.14 + liftBoost) * presence;
        const s = 1 + prox * 0.07 * presence;
        if (rise < 0.002 && Math.abs(rot) < 0.002 && Math.abs(s - 1) < 0.002) {
          if (el.style.transform !== '') el.style.transform = '';
          continue;
        }
        el.style.transform = `translateY(${-rise.toFixed(3)}em) rotate(${rot.toFixed(3)}rad) scale(${s.toFixed(3)})`;
      }
      if (!alive) {
        for (let i = 0; i < count; i++) {
          const el = letters[i];
          if (el && el.style.transform !== '') el.style.transform = '';
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
      pointerX = e.clientX;
      lastX = e.clientX;
      lastMove = performance.now();
      cache();
      wake();
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(8, now - lastMove);
      vel = vel * 0.75 + ((e.clientX - lastX) / dt) * 0.25;
      lastX = e.clientX;
      lastMove = now;
      pointerX = e.clientX;
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
  }, [text, reduce]);

  return (
    <span
      ref={containerRef}
      className={`overflow-visible whitespace-nowrap ${className ?? ''}`}
      aria-label={text}
      role="text"
    >
      {Array.from(text).map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          ref={el => {
            letterRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="inline-block will-change-transform"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

/**
 * The closing frame: the name as a slow infinite marquee with a
 * velocity-wave pointer response (rise plus directional lean, settling as
 * velocity decays; idle costs nothing). The track is two identical groups
 * so the -50% translate loops seamlessly. Reduced motion gets a single
 * fitted, static wordmark instead.
 */
export function FooterWordmark() {
  const reduce = useMountedReducedMotion();
  const name = profile.name.toUpperCase();

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
        <span key={copy} className="flex items-baseline">
          <MarqueeWave
            text={name}
            className="whitespace-nowrap text-[9.5vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink"
          />
          <span
            aria-hidden="true"
            className="mx-[0.45em] inline-block h-[0.09em] w-[0.09em] shrink-0 rotate-45 self-center bg-accent"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee marquee-fade -my-[0.5em] overflow-hidden py-[0.5em]" aria-hidden="true">
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: '38s' }}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}
