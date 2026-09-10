'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { fragments, football, literature, music, type SpotifyTrack } from '@/content/personality';
import { NotesWall } from '@/components/sections/NotesWall';
import footballBrazil from '../../assets/pieces/football-brazil.jpg';
import footballBarca from '../../assets/pieces/football-barca.JPG';

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
            {active === 0 ? (
              <LiteratureStage />
            ) : active === 1 ? (
              <MusicStage />
            ) : active === 2 ? (
              <FootballStage />
            ) : (
              <FragmentTeaser index={active} />
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
 * Holder for fragments whose full stage has not been supplied yet
 * (Rabbit Holes, Communities): identity plus the existing voice
 * line, nothing invented.
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
 * Literature: a two-column editorial stage. The story holds the left;
 * the right pairs the published sheets with the archive records
 * directly beneath them, so the composition fills intentionally
 * instead of stranding the archives across the full width. Sheets are
 * fixed warm paper in both themes with CSS-only hover; the records
 * sit 2x2 on desktop and scroll natively on touch.
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

        <div className="content-start">
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
              className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0"
            >
              {literature.archives.map(record => (
                <div
                  key={record.name}
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
      <div>
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
          className="mt-8 grid gap-6 border-t pt-6 sm:grid-cols-2"
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

      <div className="content-start">
        <SpotifyCard />
      </div>
    </div>
  );
}

/**
 * Football: a two-column personal stage. The story holds the left;
 * the right rests two childhood prints together: the Brazil portrait
 * in front, the Barca landscape tucked behind it. Opposing angles
 * and a modest overlap keep it physical; both stay full color in
 * both themes and static under reduced motion. Sources untouched:
 * framing is CSS containers plus object-fit only.
 */
function FootballStage() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
      <div>
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
        <p className="mt-6 text-lg font-semibold tracking-tight text-ink">{football.closing}</p>
      </div>

      <div className="content-start lg:self-center">
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:max-w-none">
          <div className="relative z-0 ml-auto w-[78%] rotate-[1deg] transition-transform duration-500 ease-expo hover:-translate-y-1 hover:rotate-0 lg:absolute lg:left-[168px] lg:top-6 lg:ml-0 lg:w-[300px] lg:rotate-[2deg] xl:left-[205px] xl:w-[375px]">
            <div className="aspect-[4/3] overflow-hidden shadow-[0_24px_44px_-24px_rgba(0,0,0,0.5)]">
              <Image
                src={footballBarca}
                alt="Shikhar as a child outdoors wearing a red FC Barcelona shirt, hat and sunglasses"
                width={6000}
                height={4000}
                sizes="(max-width: 1024px) 78vw, 380px"
                className="h-full w-full object-cover object-[30%_50%]"
              />
            </div>
          </div>
          <div className="relative z-10 -mt-12 w-[54%] -rotate-[1deg] transition-transform duration-500 ease-expo hover:-translate-y-1 hover:rotate-0 lg:mt-0 lg:w-[220px] lg:-rotate-[2deg] xl:w-[260px]">
            <Image
              src={footballBrazil}
              alt="Shikhar as a child wearing a Brazil number 10 kit and holding a football"
              placeholder="blur"
              sizes="(max-width: 1024px) 54vw, 260px"
              className="h-auto w-full shadow-[0_24px_44px_-24px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
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
      className="border p-4 transition-transform duration-500 ease-expo hover:-translate-y-1 sm:p-5"
      style={{ borderColor: 'color-mix(in srgb, var(--ink) 22%, transparent)' }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-micro font-semibold uppercase tracking-[0.16em] text-muted">
          On rotation
        </p>
        <a
          href={music.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open my Spotify profile"
          className="group inline-flex min-h-11 items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:text-accent"
        >
          Spotify
          <span
            aria-hidden="true"
            className="text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-px group-hover:translate-x-px"
          >
            ↗
          </span>
        </a>
      </div>

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
        <div className="mt-4">
          <p className="flex flex-wrap items-center gap-2.5 text-micro font-semibold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
            <span>{track.status === 'playing' ? 'Now playing' : 'Last played'}</span>
            {track.status === 'recent' && track.playedAt && (
              <span className="ml-auto pl-6 font-normal normal-case tracking-normal text-muted">
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
              className="mt-3 h-auto w-full max-w-[320px]"
            />
          )}
          <p className="mt-3 font-serif text-2xl leading-tight tracking-tight text-ink sm:text-[1.7rem]">
            {track.title}
          </p>
          <p className="mt-1.5 text-sm text-muted">
            {track.artist}
            {track.album && ` · ${track.album}`}
          </p>
          {track.status === 'playing' &&
            track.progressMs !== undefined &&
            track.durationMs !== undefined &&
            track.durationMs > 0 && (
              <div
                className="mt-4 h-[3px] w-full bg-ink opacity-15"
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
