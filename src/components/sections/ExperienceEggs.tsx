'use client';

import { useEffect, useRef, useState } from 'react';
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
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-150 ease-out will-change-transform"
          style={hit ? { transform: `translate(${jit(i, 5)}px, ${jit(i + 7, 5)}px)` } : undefined}
        >
          {ch}
        </span>
      ))}
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
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-opacity duration-200"
          style={{
            transitionDelay: phase === 0 ? `${i * 30}ms` : `${i * 28}ms`,
            opacity: phase === 1 ? 0 : 1,
          }}
        >
          {ch}
        </span>
      ))}
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

const EGGS: Record<EggKind, (p: { text: string; reduce: boolean }) => React.ReactNode> = {
  attack: p => <AttackEgg {...p} />,
  recover: p => <RecoverEgg {...p} />,
  rupees: p => <RupeesEgg {...p} />,
  crowd: p => <CrowdEgg {...p} />,
  publish: p => <PublishEgg {...p} />,
  release: p => <ReleaseEgg {...p} />,
};

export function EggPhrase({ kind, text }: { kind: EggKind; text: string }) {
  const reduce = useMountedReducedMotion();
  const Render = EGGS[kind];
  return <>{Render({ text, reduce })}</>;
}
