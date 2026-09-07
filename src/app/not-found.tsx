'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

/**
 * The missing page as a broken fourth statement: the bridge reads
 * I BUILD / I BREAK / I REBUILD, so a lost visitor gets You BROKE.
 * The verb arrives misregistered like a slipped print (the accent
 * period stays put as the registration anchor); REBUILD re-registers
 * the letters with a staggered expo settle, holds a beat, then routes
 * home. CSS transitions only, no animation library. Reduced motion
 * gets aligned type and immediate navigation; no-JS gets a plain link.
 */
const LETTERS = ['B', 'R', 'O', 'K', 'E', '.'];

/** Print-slip offsets in em so the break scales with the type. */
const SCATTER = [
  'translate(0em, 0em)',
  'translate(0.028em, -0.02em) rotate(-2deg)',
  'translate(-0.024em, 0.016em) rotate(1.2deg)',
  'translate(0.02em, 0.024em) rotate(-1deg)',
  'translate(-0.03em, -0.014em) rotate(2deg)',
  'translate(0em, 0em)',
];

export default function NotFound() {
  const reduce = useMountedReducedMotion();
  const router = useRouter();
  const path = usePathname() ?? '';
  const [rebuilt, setRebuilt] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const aligned = rebuilt || reduce;

  return (
    <div className="theme-fade flex min-h-dvh flex-col bg-paper text-ink">
      {/* Slim identity header: brand plus theme control, no section links */}
      <header className="flex items-center justify-between px-4 py-5 sm:px-10">
        <Link
          href="/"
          aria-label="Shikhar Sahay, back to top"
          className="whitespace-nowrap text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-opacity duration-300 hover:opacity-60"
        >
          S. Sahay
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col justify-center px-5 py-[8vh] sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="anim-fade-rise flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Missing page
          </p>

          <h1
            aria-label="You broke it. This page does not exist."
            className="anim-fade-rise mt-8 [animation-delay:0.08s]"
          >
            <span
              aria-hidden="true"
              className="block font-serif text-[clamp(2.25rem,5vw,5rem)] italic leading-none tracking-tight text-ink"
            >
              You
            </span>
            <span
              aria-hidden="true"
              className="mt-1 block whitespace-nowrap text-[clamp(4.5rem,18vw,13rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              {LETTERS.map((ch, i) => (
                <span
                  key={i}
                  className={`inline-block will-change-transform ${i === LETTERS.length - 1 ? 'text-accent' : 'text-ink'}`}
                  style={{
                    transform: aligned ? 'none' : SCATTER[i],
                    transition: reduce
                      ? undefined
                      : `transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) ${i * 35}ms`,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          <p className="anim-fade-rise mt-6 text-micro uppercase tracking-[0.16em] text-muted [animation-delay:0.16s]">
            This page was never built.
          </p>
          <p className="anim-fade-rise mt-3 max-w-[60ch] break-all text-micro uppercase tracking-[0.14em] text-muted [animation-delay:0.2s]">
            Error 404{path ? ` · ${path}` : ''}
          </p>

          <div className="anim-fade-rise mt-10 [animation-delay:0.26s]">
            <Link
              href="/"
              onClick={e => {
                if (reduce || rebuilt) return;
                e.preventDefault();
                setRebuilt(true);
                timer.current = window.setTimeout(() => router.push('/'), 950);
              }}
              className="group inline-flex items-center gap-2.5 bg-accent px-6 py-3 text-micro font-semibold uppercase tracking-[0.16em] text-paper transition-opacity duration-300 hover:opacity-85"
            >
              Rebuild
              <span
                aria-hidden="true"
                className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-ink px-5 py-6 sm:px-10">
        <p className="text-micro uppercase tracking-[0.16em] text-muted">
          Designed and built by Shikhar Sahay
        </p>
        <p className="text-micro uppercase tracking-[0.16em] text-muted">2026</p>
      </footer>
    </div>
  );
}
