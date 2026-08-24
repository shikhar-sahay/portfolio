'use client';

import { useEffect, useRef, useState } from 'react';
import { timeline } from '@/content/experience';

/**
 * 03 / Experience: a chronology, not a LinkedIn list. A sticky year and era
 * mood track scroll position; each era shifts the visual language slightly
 * (the esports era should not look like the security era).
 */
export function Experience() {
  const [eraIndex, setEraIndex] = useState(0);
  const eraRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.era);
            if (!Number.isNaN(idx)) setEraIndex(idx);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    for (const ref of eraRefs.current) {
      if (ref) observer.observe(ref);
    }
    return () => observer.disconnect();
  }, []);

  const era = timeline[eraIndex];

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-[12vh]">
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            03 · Experience
          </p>
          <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
            From esports group chats to GMP-regulated infrastructure, one long thread:{' '}
            <em className="font-serif font-normal italic">build the thing, gather the people.</em>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
          {/* Sticky era marker (desktop only; mobile renders markers inline) */}
          <div className="hidden lg:sticky lg:top-32 lg:block lg:self-start" aria-hidden="true">
            <p className="text-[clamp(4.5rem,7vw,7rem)] font-semibold tabular-nums leading-none tracking-tight text-ink">
              {era.year}
            </p>
            <p className="mt-3 flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
              <span className="font-serif text-2xl italic text-muted">{era.mood}</span>
            </p>
            <div className="mt-8 hidden flex-col gap-2 lg:flex">
              {timeline.map((t, i) => (
                <span
                  key={t.year}
                  className={`h-px w-16 transition-colors duration-500 ${
                    i === eraIndex ? 'bg-accent' : 'bg-ink/15'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Entries */}
          <div className="space-y-[10vh]">
            {timeline.map((t, eraIdx) => (
              <div
                key={t.year}
                data-era={eraIdx}
                ref={el => {
                  eraRefs.current[eraIdx] = el;
                }}
                className="scroll-mt-40"
              >
                {/* Mobile era marker */}
                <div className="mb-8 lg:hidden" aria-hidden="true">
                  <p className="text-6xl font-semibold tabular-nums leading-none tracking-tight text-ink">
                    {t.year}
                  </p>
                  <p className="mt-2 font-serif text-xl italic text-muted">{t.mood}</p>
                </div>

                <div className="space-y-12">
                  {t.entries.map((entry, i) => (
                    <article
                      key={`${entry.org}-${entry.role}-${i}`}
                      className="border-ink/15 border-t pt-6"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="text-xl font-semibold tracking-tight text-ink">
                          {entry.org}
                        </h3>
                        <p className="text-micro uppercase tabular-nums tracking-[0.14em] text-muted">
                          {entry.period}
                          {entry.location ? ` · ${entry.location}` : ''}
                        </p>
                      </div>
                      <p className="mt-1 font-serif text-lg italic text-accent">{entry.role}</p>
                      <ul className="mt-4 max-w-[62ch] space-y-2">
                        {entry.points.map(point => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span
                              className="mt-[0.55em] h-px w-3 shrink-0 bg-accent"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
