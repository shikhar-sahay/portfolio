'use client';

import { useEffect, useState } from 'react';

/**
 * Title sequence. The name renders at the hero's exact position and scale,
 * so when the ink field lifts away the composition reads as one continuous
 * moment rather than "loading screen, then hero". A vermilion sweep draws
 * under the name just before the lift. ~2.1s, once per session, skipped
 * pre-paint for returning visitors and reduced-motion users.
 */
export function Opening() {
  const [phase, setPhase] = useState<'hidden' | 'play' | 'exit'>('hidden');
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'skip') {
      setGone(true);
      return;
    }
    document.body.style.overflow = 'hidden';
    setPhase('play');
    const exitAt = window.setTimeout(() => {
      setPhase('exit');
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('opened', '1');
      } catch {}
    }, 1400);
    const doneAt = window.setTimeout(() => setGone(true), 2250);
    return () => {
      clearTimeout(exitAt);
      clearTimeout(doneAt);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`opening-overlay fixed inset-0 z-[100] overflow-hidden bg-ink transition-transform duration-[850ms] ease-expo ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`flex h-full flex-col justify-center px-5 transition-opacity duration-300 sm:px-10 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="anim-fade-in text-paper/60 mb-5 flex items-center gap-3 text-micro uppercase tracking-[0.16em] [animation-delay:0.25s] sm:mb-7">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Portfolio, 2026
        </p>

        {/* Same position and scale as the hero name: continuity on the lift */}
        <h1 className="select-none text-display uppercase text-paper">
          <span className="anim-mask">
            <span className="[animation-delay:0.4s]">Shikhar</span>
          </span>
          <span className="anim-mask pl-[8vw] lg:pl-[4vw]">
            <span className="type-outline-light [animation-delay:0.55s]">Sahay</span>
          </span>
        </h1>

        <div className="sweep-line bg-accent/80 mt-7 h-px w-40 sm:mt-9" />
      </div>
    </div>
  );
}
