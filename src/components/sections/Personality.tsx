'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  fragments,
  football,
  literature,
  music,
  sideQuests,
  type SpotifyTrack,
} from '@/content/personality';
import { SHOW_LIMITS, type RecommendResponse } from '@/content/shows';
import { channelGlyphs } from '@/content/channelGlyphs';
import { NotesWall } from '@/components/sections/NotesWall';
import footballBarca from '../../assets/pieces/football-barca-1200.jpg';

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
      className="theme-fade relative overflow-hidden bg-paper px-5 pb-[5vh] pt-[8vh] text-ink sm:px-10 md:pb-[10vh] md:pt-[16vh]"
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
        <ul className="mt-[6vh] grid grid-cols-2 gap-2.5 md:mt-[7vh] lg:grid-cols-4" role="list">
          {fragments.map((f, i) => (
            <li key={f.word}>
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                aria-controls={active === i ? 'fragment-stage' : undefined}
                className={`h-full min-h-11 w-full border px-3.5 py-2 text-left text-sm tracking-tight transition-colors duration-300 ease-expo sm:min-h-16 lg:text-center ${
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
            {active === 0 ? (
              <LiteratureStage />
            ) : active === 1 ? (
              <MusicStage />
            ) : active === 2 ? (
              <FootballStage />
            ) : (
              <SideQuestsStage />
            )}
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
 * Literature: a two-column editorial stage. The story holds the left;
 * the right pairs the published sheets with the archive records
 * directly beneath them, so the composition fills intentionally
 * instead of stranding the archives across the full width. Sheets are
 * fixed warm paper in both themes with CSS-only hover; the records
 * sit 2x2 on desktop and scroll natively on touch.
 */
function LiteratureStage() {
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Valid stop positions: every card start the browser can reach,
  // plus max scroll itself when the final card cannot start-align.
  // Every target sits at or inside the content, so no arrow, swipe,
  // or trackpad gesture can ever rest on trailing blank space.
  const stops = () => {
    const strip = stripRef.current;
    if (!strip) return [0];
    const max = strip.scrollWidth - strip.clientWidth;
    const starts = cardRefs.current.map(card => (card ? card.offsetLeft - strip.offsetLeft : 0));
    const valid = starts.filter(s => s <= max + 2);
    const list = valid.length > 0 ? valid : [0];
    if (max - list[list.length - 1] > 2) list.push(max);
    return list;
  };

  const nudge = (dir: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const list = stops();
    const current = strip.scrollLeft;
    const target =
      dir === 1
        ? (list.find(s => s > current + 2) ?? list[list.length - 1])
        : ([...list].reverse().find(s => s < current - 2) ?? 0);
    strip.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' });
  };

  // The strip is finite: arrows disable at the real scroll bounds and
  // re-enable on swipe, arrow travel, resize, or layout change. A tiny
  // tolerance absorbs subpixel rounding so the end state never flickers.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const updateBounds = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      setAtStart(strip.scrollLeft <= 2);
      setAtEnd(strip.scrollLeft >= max - 2);
    };
    updateBounds();
    strip.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds);
    return () => {
      strip.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        <div className="min-w-0">
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

        <div className="min-w-0 content-start">
          <div className="grid grid-cols-1 content-start gap-6 sm:grid-cols-2 sm:gap-5">
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
                className={`group relative flex min-h-[320px] flex-col bg-[#ece1c6] p-7 text-[#221a12] shadow-[0_24px_44px_-24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-expo hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_50px_-24px_rgba(0,0,0,0.55)] sm:min-h-[340px] ${
                  i === 0 ? 'sm:-rotate-[2.5deg]' : 'sm:-ml-10 sm:translate-y-8 sm:rotate-[2deg]'
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

          <div className="mt-10 lg:mt-12">
            <div className="flex items-center gap-4">
              <p className="shrink-0 text-micro font-semibold uppercase tracking-[0.16em] text-accent">
                From the archives
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-ink opacity-20" />
              <div className="flex shrink-0 gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  aria-label="Scroll archive backward"
                  className={`flex h-11 w-11 items-center justify-center border text-lg transition-colors duration-300 ${
                    atStart ? 'cursor-default text-ink opacity-30' : 'text-ink hover:text-accent'
                  }`}
                  style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  aria-label="Scroll archive forward"
                  className={`flex h-11 w-11 items-center justify-center border text-lg transition-colors duration-300 ${
                    atEnd ? 'cursor-default text-ink opacity-30' : 'text-ink hover:text-accent'
                  }`}
                  style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

            <div
              ref={stripRef}
              className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0"
            >
              {literature.archives.map((record, i) => (
                <div
                  key={record.name}
                  ref={el => {
                    cardRefs.current[i] = el;
                  }}
                  className="flex min-w-[220px] snap-start items-start justify-between gap-3 border p-4 lg:min-w-0"
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
                  <span
                    aria-hidden="true"
                    className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Music: a two-column contemporary stage that contrasts the Literature
 * archive. The story holds the left; a live listening artifact plus the
 * personal metadata holds the right. The artifact fetches once on mount
 * (no polling) and renders playing, recent, or a quiet fallback.
 */
function MusicStage() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
      <div className="min-w-0">
        <StageEyebrow index={1} word="Music" />
        <p className="mt-8 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
          Music
        </p>
        <p className="mt-3 font-serif text-xl italic tracking-tight text-ink sm:text-2xl">
          {fragments[1].micro}
        </p>

        <p className="mt-8 text-lg font-semibold leading-snug tracking-tight text-ink">
          {music.opening}
        </p>
        {music.body.map(paragraph => (
          <p
            key={paragraph.slice(0, 24)}
            className="mt-5 text-[0.95rem] leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
        <div
          className="mt-8 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-2"
          style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
        >
          <div>
            <p className="text-micro uppercase tracking-[0.16em] text-muted">Favourite artist</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-ink">
              {music.favouriteArtist}
            </p>
          </div>
          <div>
            <p className="text-micro uppercase tracking-[0.16em] text-muted">Favourite song</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-ink">
              {music.favouriteSong}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0 content-start">
        <SpotifyCard />
      </div>
    </div>
  );
}

/**
 * Football: a two-column personal stage. The story holds the left; a
 * single confident Barca childhood print holds the right, cropped in
 * CSS around the subject with excess garden falling away. The print
 * ships as a prepared 1200px JPEG derivative served unoptimized: the
 * default AVIF path compressed this photograph too aggressively
 * (visible smoothing on cap, crest, and shirt at ~30 to 55 KB), while
 * the derivative preserves that detail at a reasonable 175 KB.
 * Axis-aligned at rest so the browser never resamples it. Full color
 * in both themes, static under reduced motion. Source untouched.
 */
function FootballStage() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
      <div className="min-w-0">
        <StageEyebrow index={2} word="Football" />
        <p className="mt-8 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
          Football
        </p>
        <p className="mt-3 font-serif text-xl italic tracking-tight text-ink sm:text-2xl">
          {fragments[2].micro}
        </p>

        <p className="mt-8 text-lg font-semibold leading-snug tracking-tight text-ink">
          {football.opening}
        </p>
        {football.body.map(paragraph => (
          <p
            key={paragraph.slice(0, 24)}
            className="mt-5 text-[0.95rem] leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="min-w-0 content-start lg:self-center">
        <div className="mx-auto w-full max-w-[520px] transition-transform duration-500 ease-expo hover:-translate-y-1 lg:mx-auto lg:w-[520px] lg:max-w-none xl:w-[540px]">
          <div className="aspect-[4/3] overflow-hidden shadow-[0_24px_44px_-24px_rgba(0,0,0,0.5)]">
            <Image
              src={footballBarca}
              alt="Shikhar as a child outdoors wearing a red FC Barcelona shirt, hat and sunglasses"
              width={1200}
              height={800}
              unoptimized
              className="h-full w-full object-cover object-[30%_50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Side Quests: one continuous thought on the left, one recommendation
 * instrument on the right. The form posts to `/api/shows/recommend`
 * and renders only what the server confirms: watched, added,
 * already recommended, or an honest failure. No feed, no accounts,
 * no local persistence masquerading as shared state.
 */
function SideQuestsStage() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
      <div className="min-w-0">
        <StageEyebrow index={3} word="Side Quests" />
        <p className="mt-8 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
          Side Quests
        </p>
        <p className="mt-3 font-serif text-xl italic tracking-tight text-ink sm:text-2xl">
          {fragments[3].micro}
        </p>

        <p className="mt-8 text-lg font-semibold leading-snug tracking-tight text-ink">
          {sideQuests.opening}
        </p>
        {sideQuests.body.map(paragraph => (
          <SideQuestsParagraph key={paragraph.slice(0, 24)} text={paragraph} />
        ))}
      </div>

      <div className="min-w-0 content-start">
        <RecommendationCard />
      </div>
    </div>
  );
}

/**
 * One Side Quests body paragraph, rendered as plain prose.
 */
function SideQuestsParagraph({ text }: { text: string }) {
  return <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{text}</p>;
}

type RecommendState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'done'; status: RecommendResponse['status']; show?: string; error?: string };

/**
 * The recommendation instrument: a bordered editorial panel with one
 * input and one action, followed by a ranked favourites list. On
 * desktop it stretches to the prose row so both columns terminate
 * together. Feedback is compact, announced through a live region, and
 * never claims persistence the server did not confirm.
 */
function RecommendationCard() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<RecommendState>({ kind: 'idle' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.kind === 'sending') return;
    if (input.trim().length === 0) {
      setState({ kind: 'done', status: 'invalid', error: 'Type a show first.' });
      return;
    }
    setState({ kind: 'sending' });
    try {
      const response = await fetch('/api/shows/recommend', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ show: input }),
      });
      const data = (await response.json()) as RecommendResponse;
      if (data.status === 'added') setInput('');
      setState({ kind: 'done', status: data.status, show: data.show, error: data.error });
    } catch {
      setState({
        kind: 'done',
        status: 'unavailable',
        error: 'Recommendations are offline right now. Your show was not saved.',
      });
    }
  };

  return (
    <div
      className="border p-5 sm:p-6 lg:flex lg:h-full lg:flex-col"
      style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
    >
      <p className="text-micro font-semibold uppercase tracking-[0.16em] text-muted">
        For the watchlist
      </p>
      <p className="mt-3 font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.7rem]">
        What should I watch next?
      </p>

      <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="show-recommendation-input" className="sr-only">
          Recommend a show
        </label>
        <input
          id="show-recommendation-input"
          value={input}
          onChange={event => setInput(event.target.value.slice(0, SHOW_LIMITS.titleMax))}
          placeholder="Recommend a show"
          autoComplete="off"
          maxLength={SHOW_LIMITS.titleMax}
          className="min-h-11 w-full flex-1 border bg-transparent px-4 py-2.5 text-base text-ink outline-none placeholder:text-muted focus:border-accent"
          style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
        />
        <button
          type="submit"
          disabled={state.kind === 'sending'}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-accent px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] text-accent transition-opacity duration-300 hover:opacity-80 disabled:cursor-wait disabled:opacity-50"
        >
          {state.kind === 'sending' ? 'Sending' : 'Recommend'}
          <span aria-hidden="true">&rarr;</span>
        </button>
      </form>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        Think you&apos;ve got a banger I haven&apos;t seen yet?
      </p>

      {/*
        Feedback region: the idle prompt lives here as static copy so the
        card reads complete before any submission. The stage itself mounts
        only on user selection, so the idle text can never announce on
        page load; submitted results additionally mount inside their own
        dedicated live region below.
      */}
      <div className="mt-3 min-h-[3.75rem]">
        {state.kind === 'done' ? (
          <div aria-live="polite">
            <RecommendFeedback state={state} />
          </div>
        ) : state.kind === 'sending' ? null : (
          <div>
            <p className="text-micro font-semibold uppercase tracking-[0.16em] text-muted">
              Your move.
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Give me something worth losing a weekend to.
            </p>
          </div>
        )}
      </div>

      <div
        className="mt-5 border-t pt-4"
        style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
      >
        <p className="text-micro font-semibold uppercase tracking-[0.16em] text-muted">
          My favourites
        </p>
        <ol role="list" className="mt-2">
          {sideQuests.favourites.map((title, i) => (
            <li
              key={title}
              className="group flex items-baseline gap-4 border-t py-2 transition-colors duration-200 first:border-t-0 first:pt-0 last:pb-0 hover:bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 14%, transparent)' }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 text-micro tabular-nums tracking-[0.14em] text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-ink transition-transform duration-200 ease-expo motion-safe:group-hover:translate-x-1">
                {title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RecommendFeedback({ state }: { state: Extract<RecommendState, { kind: 'done' }> }) {
  if (state.status === 'watched') {
    return (
      <div>
        <p className="text-micro font-semibold uppercase tracking-[0.16em] text-accent">
          Already seen it.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          You have excellent taste, though.
        </p>
      </div>
    );
  }
  if (state.status === 'added') {
    return (
      <div>
        <p className="text-micro font-semibold uppercase tracking-[0.16em] text-accent">
          Added to the list.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Thanks. I&apos;ll blame you if I lose another weekend.
        </p>
      </div>
    );
  }
  if (state.status === 'duplicate') {
    return (
      <div>
        <p className="text-micro font-semibold uppercase tracking-[0.16em] text-accent">
          Someone beat you to it.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Apparently I really need to watch this one.
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-micro font-semibold uppercase tracking-[0.16em] text-accent">
        {state.status === 'unavailable' ? 'Recommendations offline.' : 'Not quite.'}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {state.error ?? 'Something went wrong. Nothing was saved.'}
      </p>
    </div>
  );
}

/**
 * The listening artifact: one fetch on mount, then a static render of
 * whatever Spotify truthfully reports. No polling, no animation loop,
 * no fake controls. The progress snapshot appears only while a track
 * is actively playing.
 */
function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    let live = true;
    fetch('/api/spotify', { headers: { accept: 'application/json' } })
      .then(response => response.json())
      .then(data => {
        if (live) setTrack(data as SpotifyTrack);
      })
      .catch(() => {
        if (live) setTrack({ status: 'unavailable' });
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div
      className={`border p-5 text-center transition-transform duration-500 ease-expo hover:-translate-y-1 sm:p-6 ${
        track !== null && track.status !== 'unavailable' ? 'lg:h-full' : ''
      }`}
      style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
    >
      <a
        href={music.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open my Spotify profile"
        className="group mx-auto inline-flex min-h-11 flex-col items-center gap-2"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-muted transition-colors duration-300 group-hover:text-accent"
        >
          <path d={channelGlyphs.Spotify.path} />
        </svg>
        <span className="text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 group-hover:text-accent">
          Spotify
        </span>
      </a>
      <p className="mt-1.5 text-micro uppercase tracking-[0.16em] text-muted">On rotation</p>

      {track === null ? (
        <p className="mt-8 text-micro uppercase tracking-[0.16em] text-muted">Tuning in</p>
      ) : track.status === 'unavailable' ? (
        <div className="mt-8">
          <p className="text-lede font-medium tracking-tight text-ink">
            Spotify is being difficult.
          </p>
          <a
            href={music.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 border border-accent px-4 py-2 text-micro font-semibold uppercase tracking-[0.16em] text-accent transition-opacity duration-300 hover:opacity-80"
          >
            Open my Spotify
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-expo group-hover:-translate-y-px group-hover:translate-x-px"
            >
              ↗
            </span>
          </a>
        </div>
      ) : (
        <div
          className="mt-5 border-t pt-5"
          style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
        >
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-micro font-semibold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
            <span>{track.status === 'playing' ? 'Now playing' : 'Last played'}</span>
            {track.status === 'recent' && track.playedAt && (
              <span className="font-normal normal-case tracking-normal text-muted">
                {relativePlayed(track.playedAt)}
              </span>
            )}
          </p>
          {track.artwork && (
            <Image
              src={track.artwork}
              alt={`${track.title ?? 'Track'} album artwork`}
              width={640}
              height={640}
              className="mx-auto mt-4 h-auto w-full max-w-[248px]"
            />
          )}
          <p className="mx-auto mt-4 max-w-[26ch] break-words font-serif text-[1.3rem] leading-snug tracking-tight text-ink">
            {track.title}
          </p>
          <p className="mx-auto mt-1 max-w-[32ch] break-words text-sm text-muted">
            {track.artist}
            {track.album && ` · ${track.album}`}
          </p>
          {track.status === 'playing' &&
            track.progressMs !== undefined &&
            track.durationMs !== undefined &&
            track.durationMs > 0 && (
              <div
                className="mx-auto mt-4 h-[3px] w-full max-w-[248px] bg-ink opacity-15"
                role="img"
                aria-label="Playback progress snapshot"
              >
                <div
                  className="h-full bg-accent"
                  style={{
                    width: `${Math.min(100, Math.round((track.progressMs / track.durationMs) * 100))}%`,
                  }}
                />
              </div>
            )}
          {track.spotifyUrl && (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${track.title ?? 'this track'} in Spotify`}
              className="group mt-4 inline-flex min-h-11 items-center gap-2 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:text-accent"
            >
              <span className="underline decoration-accent underline-offset-[5px] group-hover:no-underline">
                Open in Spotify
              </span>
              <span
                aria-hidden="true"
                className="text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-px group-hover:translate-x-px"
              >
                ↗
              </span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Snapshot label for a recent play, computed once at render (the card
 * never re-renders on a timer, so nothing can drift or mismatch).
 */
function relativePlayed(playedAt: string): string {
  const then = new Date(playedAt).getTime();
  if (!Number.isFinite(then)) return 'played recently';
  const minutes = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
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
