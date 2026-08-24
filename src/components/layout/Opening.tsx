'use client';

import { useEffect, useState } from 'react';

/**
 * Title sequence: an ink field establishes, "SHIKHAR SAHAY" reveals
 * word by word while section indices tick 01 to 07 along a signal line,
 * then the whole field lifts away as the hero boots beneath it.
 * ~2.2s total. Skipped (pre-paint, via html[data-intro]) for returning
 * visitors and reduced-motion users.
 */
export function Opening() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'hidden' | 'play' | 'exit'>('hidden');
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'skip') {
      setGone(true);
      return;
    }
    document.body.style.overflow = 'hidden';
    setPhase('play');
    const ticks = [0, 1, 2, 3, 4, 5, 6].map(i =>
      window.setTimeout(() => setCount(i + 1), 250 + i * 120)
    );
    const exitAt = window.setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('opened', '1');
      } catch {}
    }, 1500);
    const doneAt = window.setTimeout(() => setGone(true), 2300);
    return () => {
      ticks.forEach(clearTimeout);
      clearTimeout(exitAt);
      clearTimeout(doneAt);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`opening-overlay fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink px-5 py-6 text-paper transition-transform duration-[800ms] ease-expo sm:px-10 sm:py-8 ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top row */}
      <div
        className={`flex items-start justify-between transition-opacity duration-300 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-paper/60 text-micro uppercase tracking-[0.18em]">Portfolio</p>
        <p className="text-paper/60 text-micro uppercase tabular-nums tracking-[0.18em]">2026</p>
      </div>

      {/* Name reveal: words rise out of masks */}
      <div>
        <h1 className="select-none text-[clamp(2.75rem,9vw,8.5rem)] font-semibold uppercase leading-[0.95] tracking-tight">
          <span className="anim-mask">
            <span className="text-paper [animation-delay:0.35s]">Shikhar</span>
          </span>
          <span className="anim-mask pl-[6vw]">
            <span className="type-outline-light [animation-delay:0.55s]">Sahay</span>
          </span>
        </h1>
        <p className="anim-fade-in text-paper/60 mt-6 text-micro uppercase tracking-[0.18em] [animation-delay:0.9s]">
          Software, security &amp; the web
        </p>
      </div>

      {/* Signal line + indices */}
      <div>
        <div className="mb-5 flex items-baseline justify-between">
          <p
            className={`text-paper/60 text-micro uppercase tracking-[0.18em] transition-opacity duration-300 ${
              phase === 'exit' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Establishing
          </p>
          <p className="text-paper/80 font-serif text-2xl italic tabular-nums">
            {String(Math.max(count, 1)).padStart(2, '0')}
          </p>
        </div>
        <div className="bg-paper/15 h-px w-full">
          <div
            className="h-px origin-left bg-accent transition-transform duration-150 ease-linear"
            style={{ transform: `scaleX(${count / 7})` }}
          />
        </div>
      </div>
    </div>
  );
}
