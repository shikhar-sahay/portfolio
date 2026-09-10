'use client';

import { useRef, useState } from 'react';
import { fragments, literature } from '@/content/personality';
import { NotesWall } from '@/components/sections/NotesWall';

/**
 * Pieces of Me: fragments of a person. Nothing is selected at first:
 * the visitor picks a fragment and its stage opens below the selector
 * row. Each fragment owns its own stage layout, so later fragments can
 * look nothing like Literature. Stages render immediately with plain
 * CSS only: no entrance choreography, no observers, no loops.
 * Keyboard accessible: fragments are buttons.
 */
export function Personality() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="pieces-of-me"
      aria-label="Pieces of Me"
      className="theme-fade relative overflow-hidden bg-paper px-5 pb-[6vh] pt-[10vh] text-ink sm:px-10 md:pb-[10vh] md:pt-[16vh]"
    >
      {/* Theme-following section: paper surface in light, warm charcoal in
          dark, like every other chapter. No fixed panel treatment. */}
      <div className="relative mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Pieces of Me
        </p>

        <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
          Resumes list skills. This lists <em className="font-serif font-normal italic">fuel</em>.
          Pick a fragment.
        </h2>

        {/* Fragment selectors: click to open, click again to close. */}
        <ul
          className="mt-[6vh] grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:mt-[7vh] lg:grid-cols-5"
          role="list"
        >
          {fragments.map((f, i) => (
            <li key={f.word}>
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                aria-controls={active === i ? 'fragment-stage' : undefined}
                className={`h-full w-full border px-3.5 py-2 text-left text-sm tracking-tight transition-colors duration-300 ease-expo sm:min-h-16 lg:text-center ${
                  active === i
                    ? 'border-accent bg-accent text-paper'
                    : 'border-muted text-muted hover:border-ink hover:text-ink'
                }`}
              >
                <span className="mr-2 text-micro tabular-nums opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {f.word}
              </button>
            </li>
          ))}
        </ul>

        {active !== null && (
          <div id="fragment-stage" aria-live="polite" className="mt-[6vh] md:mt-[8vh]">
            {active === 0 ? <LiteratureStage /> : <FragmentTeaser index={active} />}
          </div>
        )}

        <NotesWall />
      </div>
    </section>
  );
}

function StageEyebrow({ index, word }: { index: number; word: string }) {
  return (
    <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
      <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
      <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
      {word}
    </p>
  );
}

/**
 * Holder for fragments whose full stage has not been supplied yet:
 * identity plus the existing voice line, nothing invented.
 */
function FragmentTeaser({ index }: { index: number }) {
  const fragment = fragments[index];
  return (
    <div>
      <StageEyebrow index={index} word={fragment.word} />
      <p className="mt-8 font-serif text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight text-ink">
        {fragment.word}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{fragment.caption}</p>
    </div>
  );
}

/**
 * Literature: a two-column editorial stage. The story holds the left,
 * the archive of published sheets holds the right, and the archive
 * records run underneath. Sheets are fixed warm paper in both themes
 * with CSS-only hover; the records strip scrolls natively on touch.
 */
function LiteratureStage() {
  const stripRef = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stripRef.current?.scrollBy({ left: dir * 300, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        <div>
          <StageEyebrow index={0} word="Literature" />
          <p className="mt-8 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
            Literature
          </p>
          <p className="mt-3 font-serif text-xl italic tracking-tight text-ink sm:text-2xl">
            {fragments[0].micro}
          </p>

          <p className="mt-8 text-lg font-semibold leading-snug tracking-tight text-ink">
            {literature.opening}
          </p>
          {literature.body.map(paragraph => (
            <LiteratureParagraph key={paragraph.slice(0, 24)} text={paragraph} />
          ))}
        </div>

        <div className="grid content-start gap-6 sm:grid-cols-2 sm:gap-5">
          {literature.articles.map((article, i) => (
            <a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${article.title}, read the essay`}
              style={{
                backgroundImage:
                  'linear-gradient(155deg, rgba(255,255,255,0.30), rgba(255,255,255,0) 44%)',
              }}
              className={`group relative flex min-h-[380px] flex-col bg-[#ece1c6] p-7 text-[#221a12] shadow-[0_28px_50px_-24px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-expo hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_34px_56px_-24px_rgba(0,0,0,0.6)] sm:min-h-[420px] ${
                i === 0 ? 'sm:-rotate-2' : 'sm:translate-y-10 sm:rotate-1'
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 h-2.5 w-2.5 rotate-45 border border-[#b3401a]"
              />
              <p className="text-micro font-semibold uppercase tracking-[0.16em] text-[#7a6a4f]">
                {article.category}
              </p>
              <p className="mt-4 font-serif text-[1.7rem] leading-[1.08] tracking-tight">
                {article.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#4f4436]">{article.teaser}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-micro font-semibold uppercase tracking-[0.16em] text-[#b3401a]">
                <span className="underline decoration-[#b3401a] underline-offset-[5px] group-hover:no-underline">
                  {article.action}
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-expo group-hover:-translate-y-px group-hover:translate-x-px"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-[6vh] md:mt-[7vh]">
        <div className="flex items-center gap-4">
          <p className="shrink-0 text-micro font-semibold uppercase tracking-[0.16em] text-accent">
            From the archives
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-ink opacity-20" />
          <div className="flex shrink-0 gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll archive backward"
              className="flex h-11 w-11 items-center justify-center border text-lg text-ink transition-colors duration-300 hover:text-accent"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll archive forward"
              className="flex h-11 w-11 items-center justify-center border text-lg text-ink transition-colors duration-300 hover:text-accent"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div
          ref={stripRef}
          className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {literature.archives.map(record => (
            <div
              key={record.name}
              className="flex min-w-[240px] snap-start items-start justify-between gap-3 border p-4 sm:p-5 lg:min-w-0"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
            >
              <div>
                <p className="text-micro font-semibold uppercase tracking-[0.14em] text-ink">
                  {record.name}
                </p>
                <p className="mt-2 text-micro uppercase tracking-[0.14em] text-muted">
                  {record.detail}
                </p>
              </div>
              <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One body paragraph. The emphasis sentence keeps stronger ink plus a
 * vermilion underline; everything else reads as quiet body copy.
 */
function LiteratureParagraph({ text }: { text: string }) {
  const { emphasis } = literature;
  const at = text.indexOf(emphasis);
  if (at === -1) {
    return <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{text}</p>;
  }
  return (
    <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
      <strong className="font-semibold text-ink underline decoration-accent underline-offset-[5px]">
        {emphasis}
      </strong>
      {text.slice(at + emphasis.length)}
    </p>
  );
}
