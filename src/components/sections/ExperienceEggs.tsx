'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import type { EggKind } from '@/content/experience';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

/** Deterministic scatter from an index (SSR-safe, no Math.random). */
const jit = (i: number, span: number) => ((i * 37 + 11) % span) - Math.floor(span / 2);

function useTimers() {
  const ids = useRef<number[]>([]);
  useEffect(() => () => ids.current.forEach(id => window.clearTimeout(id)), []);
  const later = (fn: () => void, ms: number) => ids.current.push(window.setTimeout(fn, ms));
  return later;
}

/**
 * Shared trigger: plain prose semantics with a dotted-underline hint on
 * hover/focus. Fires once per interaction on hover, focus, or tap; ignores
 * re-entry while playing. Reduced motion never animates (the CSS hint is
 * the whole response).
 */
function Trigger({
  children,
  onPlay,
  playing,
  label,
}: {
  children: React.ReactNode;
  onPlay: () => void;
  playing: boolean;
  label: string;
}) {
  return (
    <span
      tabIndex={0}
      role="button"
      aria-label={label}
      onMouseEnter={() => !playing && onPlay()}
      onFocus={() => !playing && onPlay()}
      onClick={() => !playing && onPlay()}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !playing) {
          e.preventDefault();
          onPlay();
        }
      }}
      className="egg-hint cursor-pointer rounded-[2px]"
    >
      {children}
    </span>
  );
}

/**
 * Per-character spans grouped by word. Inter-word spaces stay real text
 * nodes between the word wrappers: a lone space inside an inline-block
 * collapses to zero width (this once jammed an entire phrase together),
 * while a text-node space keeps normal width and wrapping.
 */
function Chars({
  text,
  render,
}: {
  text: string;
  render: (ch: string, i: number) => React.ReactNode;
}) {
  let n = 0;
  return (
    <>
      {text.split(' ').map((word, wi, arr) => (
        <Fragment key={wi}>
          <span className="inline-block">
            {word.split('').map(ch => {
              const el = render(ch, n);
              n += 1;
              return <Fragment key={n}>{el}</Fragment>;
            })}
          </span>
          {wi < arr.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

/** Cyber Defenders: the phrase takes one tiny directional hit, springs back. */
function AttackEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [hit, setHit] = useState(false);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setHit(true);
    later(() => setHit(false), 380);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={hit} onPlay={play}>
      <Chars
        text={text}
        render={(ch, i) => (
          <span
            className="inline-block transition-transform duration-150 ease-out will-change-transform"
            style={hit ? { transform: `translate(${jit(i, 5)}px, ${jit(i + 7, 5)}px)` } : undefined}
          >
            {ch}
          </span>
        )}
      />
    </Trigger>
  );
}

/** Recipharm: the word briefly loses characters, then reconstructs. Opacity
    only, so layout never shifts and the DOM text never changes. */
function RecoverEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setPhase(1);
    later(() => setPhase(2), text.length * 28 + 220);
    later(() => setPhase(0), text.length * 28 + 220 + text.length * 30 + 320);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={phase !== 0} onPlay={play}>
      <Chars
        text={text}
        render={(ch, i) => (
          <span
            className="inline-block transition-opacity duration-200"
            style={{
              transitionDelay: phase === 0 ? `${i * 30}ms` : `${i * 28}ms`,
              opacity: phase === 1 ? 0 : 1,
            }}
          >
            {ch}
          </span>
        )}
      />
    </Trigger>
  );
}

/** GDG: a few tiny rupee glyphs escape upward and vanish. One-shot. */
function RupeesEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [burst, setBurst] = useState(false);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setBurst(true);
    later(() => setBurst(false), 750);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={burst} onPlay={play}>
      <span className="relative inline-block">
        {text}
        {burst &&
          [0, 1, 2, 3].map(i => (
            <span
              key={i}
              aria-hidden="true"
              className="egg-rupee pointer-events-none absolute select-none text-[0.85em] text-accent"
              style={{ left: `${8 + i * 22}%`, bottom: '60%', animationDelay: `${i * 70}ms` }}
            >
              ₹
            </span>
          ))}
      </span>
    </Trigger>
  );
}

/** CodeChef: a tiny crowd field populates around the phrase, then clears. */
function CrowdEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [crowd, setCrowd] = useState(false);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setCrowd(true);
    later(() => setCrowd(false), 1050);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={crowd} onPlay={play}>
      <span className="relative inline-block">
        {text}
        {crowd &&
          Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="egg-dot pointer-events-none absolute rounded-full bg-ink opacity-40"
              style={{
                width: 3 + (i % 2),
                height: 3 + (i % 2),
                left: `${((i * 71) % 108) - 4}%`,
                top: `${-46 + ((i * 37) % 150)}%`,
                animationDelay: `${i * 45}ms`,
              }}
            />
          ))}
      </span>
    </Trigger>
  );
}

/** skilledity: a caret drafts at the end of the phrase, then a tiny check
    confirms and everything clears. */
function PublishEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setStage(1);
    later(() => setStage(2), 750);
    later(() => setStage(0), 1450);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={stage !== 0} onPlay={play}>
      <span className="relative inline-block">
        {text}
        {stage === 1 && (
          <span
            aria-hidden="true"
            className="egg-caret ml-1 inline-block h-[1em] w-[2px] bg-accent"
          />
        )}
        {stage === 2 && (
          <span
            aria-hidden="true"
            className="anim-fade-in ml-1.5 inline-block text-[0.85em] text-accent"
          >
            ✓
          </span>
        )}
      </span>
    </Trigger>
  );
}

/** Team Shade: the quietest egg. Tracking loosens a breath and opacity
    dips, then everything returns. The phrase is end-of-sentence, so the
    tiny width change only nudges the final period. */
function ReleaseEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [loose, setLoose] = useState(false);
  const later = useTimers();
  const play = () => {
    if (reduce) return;
    setLoose(true);
    later(() => setLoose(false), 1400);
  };
  return (
    <Trigger label={`${text} (playful animation)`} playing={loose} onPlay={play}>
      <span
        className="inline-block whitespace-nowrap transition-all duration-1000 ease-out"
        style={loose ? { letterSpacing: '0.08em', opacity: 0.55 } : undefined}
      >
        {text}
      </span>
    </Trigger>
  );
}

/** GDG Management Lead: "crazy things" goes briefly, spatially unruly on
    hover, then settles back into order. Unlike AttackEgg (one synchronized
    ±2px nudge with no rotation), each character gets its own irregular
    displacement (4-10px vertical, a few px horizontal, ±3-6° rotation) with
    scattered timing over ~600-800ms. CSS keyframes carry the motion (never
    accumulated inline transforms), so the resting DOM is always the plain
    settled phrase. Hover/fine-pointer only: no tab stop (purely decorative,
    so no button role), no tap handler, and reduced motion renders plain
    text. Screen readers get the phrase once via the wrapper label while the
    visual characters stay hidden. */
function UnrulyEgg({ text, reduce }: { text: string; reduce: boolean }) {
  const [playing, setPlaying] = useState(false);
  const later = useTimers();
  const play = () => {
    if (reduce || playing) return;
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }
    setPlaying(true);
    later(() => setPlaying(false), 950);
  };
  if (reduce) return <>{text}</>;
  return (
    <span aria-label={text} onMouseEnter={play} className="egg-unruly">
      <span aria-hidden="true">
        <Chars
          text={text}
          render={(ch, i) => {
            const sign = (i * 29 + 3) % 2 === 0 ? 1 : -1;
            const dy = sign * (4 + ((i * 53 + 7) % 7));
            const dx = ((i * 37 + 11) % 7) - 3;
            const rot = ((i * 41 + 5) % 2 === 0 ? 1 : -1) * (3 + ((i * 23) % 4));
            // Note: the animation must be set as one `animation` shorthand.
            // Splitting name/duration/delay across the stylesheet class and
            // inline longhands computes identically but never instantiates
            // the animation in Chromium (verified: full shorthand animates,
            // split longhands stay at rest). Resting spans carry no animation
            // at all, so the settled phrase is always plain text.
            const dur = 600 + ((i * 71) % 5) * 50;
            const delay = (i * 137) % 160;
            return (
              <span
                className="inline-block will-change-transform"
                style={
                  playing
                    ? {
                        animation: `egg-unruly ${dur}ms cubic-bezier(0.3, 0.7, 0.3, 1) ${delay}ms`,
                        ['--ux' as string]: `${dx}px`,
                        ['--uy' as string]: `${dy}px`,
                        ['--ur' as string]: `${rot}deg`,
                      }
                    : undefined
                }
              >
                {ch}
              </span>
            );
          }}
        />
      </span>
    </span>
  );
}

const EGGS: Record<EggKind, (p: { text: string; reduce: boolean }) => React.ReactNode> = {
  attack: p => <AttackEgg {...p} />,
  recover: p => <RecoverEgg {...p} />,
  rupees: p => <RupeesEgg {...p} />,
  crowd: p => <CrowdEgg {...p} />,
  publish: p => <PublishEgg {...p} />,
  release: p => <ReleaseEgg {...p} />,
  unruly: p => <UnrulyEgg {...p} />,
};

export function EggPhrase({ kind, text }: { kind: EggKind; text: string }) {
  const reduce = useMountedReducedMotion();
  const Render = EGGS[kind];
  return <>{Render({ text, reduce })}</>;
}
