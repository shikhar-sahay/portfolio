'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Loading sequence: a quiet ink field with a thin signal line that draws
 * while a small vermilion marker rides its tip, like a cursor writing the
 * page into existence. When the line completes, the field lifts into the
 * hero. About 0.8s wall time on a first visit, once per session, skipped
 * pre-paint for returning visitors and reduced-motion users. No counters,
 * no "loading" text.
 */
export function Opening() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'hidden' | 'play' | 'exit'>('hidden');
  const [gone, setGone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'skip') {
      setGone(true);
      return;
    }
    document.body.style.overflow = 'hidden';
    setPhase('play');
    const duration = 420;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setPhase('exit');
        document.body.style.overflow = '';
        try {
          sessionStorage.setItem('opened', '1');
        } catch {}
      }
    };
    raf.current = requestAnimationFrame(tick);
    const doneAt = window.setTimeout(() => setGone(true), 850);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(doneAt);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`opening-overlay ink-stage fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden px-5 py-6 transition-transform duration-[380ms] ease-expo sm:px-10 sm:py-8 ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <p
        className={`text-\[#f3efe6\]/50 text-micro uppercase tracking-[0.18em] transition-opacity duration-300 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        shikhar sahay
      </p>

      {/* The signal: a line drawing itself, a marker riding its tip */}
      <div
        className={`transition-opacity duration-200 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* The signal line uses explicit rgba (never bare-var slash
            utilities, which compile to nothing against var() tokens). */}
        <div className="relative h-px w-[min(200px,50vw)] bg-[rgba(243,239,230,0.15)]">
          <div
            className="absolute inset-y-0 left-0 bg-[rgba(243,239,230,0.7)]"
            style={{ width: `${progress * 100}%` }}
          />
          <span
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-accent"
            style={{ left: `calc(${progress * 100}% - 3px)` }}
          />
        </div>
        <p className="text-\[#f3efe6\]/40 mt-4 text-micro uppercase tracking-[0.18em]">
          {phase === 'exit' ? 'Ready' : '\u00a0'}
        </p>
      </div>

      {/* Serif year, quiet anchor */}
      <p
        className={`text-\[#f3efe6\]/60 self-end font-serif text-2xl italic transition-opacity duration-300 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        2026
      </p>
    </div>
  );
}
