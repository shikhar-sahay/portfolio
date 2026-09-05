'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';

type MarkColor = 'paper' | 'accent' | 'gold';

interface Mark {
  id: string;
  glyph: string;
  color: MarkColor;
  /** Position in percent of the wall (clamped inside padding). */
  x: number;
  y: number;
  size: number;
  rot: number;
  at: number;
  mine?: boolean;
}

/**
 * The mark vocabulary: geometric text glyphs only (no emoji, no images,
 * no free text), so there is nothing to sanitize, nothing that breaks
 * layout, and everything stays in the editorial voice.
 */
const GLYPHS = ['✦', '◆', '●', '▲', '■', '✕', '★', '♦'] as const;
const COLOR_CLASS: Record<MarkColor, string> = {
  paper: 'text-paper',
  accent: 'text-accent',
  gold: 'text-gold',
};
const STORE_KEY = 'shikhar-marks-v1';
const MAX_MARKS = 150;

/**
 * A few owner marks so the wall never starts empty; they read as the
 * first layer of a growing composition, not as content to manage.
 */
const SEEDS: Mark[] = [
  { id: 'seed-1', glyph: '✦', color: 'accent', x: 12, y: 28, size: 26, rot: -6, at: 0 },
  { id: 'seed-2', glyph: '◆', color: 'paper', x: 24, y: 64, size: 20, rot: 8, at: 0 },
  { id: 'seed-3', glyph: '●', color: 'gold', x: 38, y: 34, size: 18, rot: 0, at: 0 },
  { id: 'seed-4', glyph: '▲', color: 'paper', x: 52, y: 70, size: 22, rot: -8, at: 0 },
  { id: 'seed-5', glyph: '■', color: 'accent', x: 63, y: 30, size: 20, rot: 5, at: 0 },
  { id: 'seed-6', glyph: '✕', color: 'paper', x: 74, y: 62, size: 22, rot: 0, at: 0 },
  { id: 'seed-7', glyph: '★', color: 'gold', x: 84, y: 32, size: 24, rot: 7, at: 0 },
  { id: 'seed-8', glyph: '♦', color: 'paper', x: 90, y: 68, size: 18, rot: -5, at: 0 },
  { id: 'seed-9', glyph: '●', color: 'accent', x: 45, y: 52, size: 16, rot: 0, at: 0 },
  { id: 'seed-10', glyph: '✦', color: 'paper', x: 6, y: 78, size: 20, rot: 4, at: 0 },
  { id: 'seed-11', glyph: '◆', color: 'gold', x: 70, y: 84, size: 18, rot: -7, at: 0 },
  { id: 'seed-12', glyph: '▲', color: 'accent', x: 31, y: 82, size: 20, rot: 6, at: 0 },
];

export interface MarkStore {
  load: () => Mark[];
  save: (marks: Mark[]) => boolean;
}

/**
 * Storage abstraction. Today this is localStorage (visitor marks persist
 * in THIS browser only) with an in-memory fallback for private modes.
 * A future shared wall would implement this same interface against a
 * backend: POST marks to an API route backed by a tiny KV store, GET on
 * load, with server-side allow-listing of glyph/color and rate limiting.
 * No secrets, no credentials, and no unrestricted text are involved in
 * either mode by design.
 */
function createLocalMarkStore(): MarkStore & { persistent: boolean } {
  let memory: Mark[] = [];
  let persistent = true;
  return {
    get persistent() {
      return persistent;
    },
    load() {
      try {
        const raw = window.localStorage.getItem(STORE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as Mark[];
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
          m =>
            typeof m?.x === 'number' &&
            typeof m?.y === 'number' &&
            GLYPHS.includes(m?.glyph as (typeof GLYPHS)[number]) &&
            (m?.color === 'paper' || m?.color === 'accent' || m?.color === 'gold')
        );
      } catch {
        persistent = false;
        return memory;
      }
    },
    save(marks: Mark[]) {
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(marks));
        return true;
      } catch {
        persistent = false;
        memory = marks;
        return false;
      }
    },
  };
}

function hash(n: number): number {
  let h = n;
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return ((h ^= h >>> 16) >>> 0) / 4294967295;
}

/**
 * Leave your mark: a collaborative wall inside Personality. Pick a glyph,
 * stamp it anywhere on the wall (click, tap, or the keyboard button for
 * a free spot); it pops in and joins the composition. Marks persist in
 * this browser via localStorage; see the store interface above for what
 * a shared backend would need. Reduced motion renders stamps instantly.
 */
export function MarkWall() {
  const reduce = useMountedReducedMotion();
  const storeRef = useRef<(MarkStore & { persistent: boolean }) | null>(null);
  if (!storeRef.current && typeof window !== 'undefined') {
    storeRef.current = createLocalMarkStore();
  }
  const [marks, setMarks] = useState<Mark[]>(SEEDS);
  const [glyph, setGlyph] = useState<string>(GLYPHS[0]);
  const [flash, setFlash] = useState<string | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;
    const saved = store.load();
    if (saved.length > 0) setMarks([...SEEDS, ...saved.slice(0, MAX_MARKS - SEEDS.length)]);
  }, []);

  const persist = useCallback((next: Mark[]) => {
    const store = storeRef.current;
    if (!store) return true;
    const visitor = next.filter(m => m.mine);
    return store.save(visitor);
  }, []);

  const stamp = useCallback(
    (x: number, y: number) => {
      let placed = false;
      setMarks(prev => {
        if (prev.length >= MAX_MARKS) return prev;
        idRef.current += 1;
        const n = idRef.current + (Date.now() % 100000);
        const mark: Mark = {
          id: `v-${Date.now().toString(36)}-${idRef.current}`,
          glyph,
          color: (['paper', 'accent', 'gold'] as MarkColor[])[prev.length % 3],
          x: Math.min(94, Math.max(6, x)),
          y: Math.min(90, Math.max(10, y)),
          size: 18 + Math.floor(hash(n) * 14),
          rot: Math.round(hash(n + 7) * 16 - 8),
          at: Date.now(),
          mine: true,
        };
        const next = [...prev, mark];
        persist(next);
        placed = true;
        return next;
      });
      if (placed) {
        setFlash('Mark placed');
        window.setTimeout(() => setFlash(null), 1600);
      }
      return placed;
    },
    [glyph, persist]
  );

  const stampAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      const wall = wallRef.current;
      if (!wall) return;
      const r = wall.getBoundingClientRect();
      stamp(((clientX - r.left) / r.width) * 100, ((clientY - r.top) / r.height) * 100);
    },
    [stamp]
  );

  // Keyboard (and touch fallback) path: stamp at the emptiest grid cell.
  const stampFreeSpot = useCallback(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const r = wall.getBoundingClientRect();
    const taken = marks.map(m => ({
      x: (m.x / 100) * r.width,
      y: (m.y / 100) * r.height,
    }));
    let best = { x: r.width / 2, y: r.height / 2, d: -1 };
    for (let gy = 12; gy <= 88; gy += 8) {
      for (let gx = 8; gx <= 92; gx += 8) {
        const x = (gx / 100) * r.width;
        const y = (gy / 100) * r.height;
        const d = Math.min(...taken.map(t => Math.hypot(t.x - x, t.y - y)), 1e9);
        if (d > best.d) best = { x, y, d };
      }
    }
    stampAtPoint(r.left + best.x, r.top + best.y);
  }, [marks, stampAtPoint]);

  const full = marks.length >= MAX_MARKS;
  const stored = storeRef.current;
  const localOnly = stored !== null && !stored.persistent && typeof window !== 'undefined';

  return (
    <div className="border-paper/15 mt-[8vh] border-t pt-6">
      <p className="text-micro uppercase tracking-[0.16em] text-accent">Leave your mark</p>
      <p className="text-paper/60 mt-3 max-w-[52ch] text-sm leading-relaxed">
        You were here. Pick a glyph, stamp it on the wall, and it joins the composition. Marks keep
        in this browser.
      </p>

      <div
        className="mt-5 flex flex-wrap items-center gap-2.5"
        role="group"
        aria-label="Pick a mark"
      >
        {GLYPHS.map(g => (
          <button
            key={g}
            type="button"
            onClick={() => setGlyph(g)}
            aria-pressed={glyph === g}
            aria-label={`Mark ${g}`}
            className={`flex h-10 w-10 items-center justify-center border text-lg transition-all duration-300 ease-expo ${
              glyph === g
                ? 'border-accent bg-accent text-paper'
                : 'border-paper/25 text-paper/70 hover:border-paper/60 hover:text-paper'
            }`}
          >
            <span aria-hidden="true">{g}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={stampFreeSpot}
          disabled={full}
          className="border-paper/25 text-paper/70 hover:border-paper/60 ml-2 border px-4 py-2 text-sm tracking-tight transition-all duration-300 ease-expo hover:text-paper disabled:cursor-default disabled:opacity-40"
        >
          Stamp it
        </button>
      </div>

      <div
        ref={wallRef}
        role="img"
        aria-label={`Wall of ${marks.length} marks. Pick a glyph above, then activate the wall or the stamp button to add yours.`}
        onClick={e => {
          if (!full) stampAtPoint(e.clientX, e.clientY);
        }}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && !full) {
            e.preventDefault();
            stampFreeSpot();
          }
        }}
        tabIndex={full ? undefined : 0}
        className={`relative mt-5 h-[320px] cursor-crosshair touch-manipulation overflow-hidden border sm:h-[380px] ${
          full ? 'border-paper/15 cursor-default' : 'border-paper/25'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(236,228,212,0.10) 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      >
        {marks.map(m => (
          <span
            key={m.id}
            title={`${m.glyph} mark`}
            aria-hidden="true"
            className={`absolute select-none ${COLOR_CLASS[m.color]} ${m.mine && !reduce ? 'mark-pop' : ''}`}
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              fontSize: `${m.size}px`,
              transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
              lineHeight: 1,
            }}
          >
            {m.glyph}
          </span>
        ))}
        {!full && (
          <span
            aria-hidden="true"
            className="text-paper/30 pointer-events-none absolute inset-x-0 bottom-3 text-center text-micro uppercase tracking-[0.16em]"
          >
            {marks.length <= SEEDS.length
              ? 'Pick a glyph, stamp the wall'
              : `${marks.length} marks and counting`}
          </span>
        )}
        {full && (
          <span
            aria-hidden="true"
            className="text-paper/30 pointer-events-none absolute inset-x-0 bottom-3 text-center text-micro uppercase tracking-[0.16em]"
          >
            The wall is full
          </span>
        )}
      </div>

      <p className="text-paper/40 mt-3 text-micro uppercase tracking-[0.14em]" aria-live="polite">
        {flash ??
          (localOnly ? 'Marks keep for this visit only' : `${marks.length} of ${MAX_MARKS} marks`)}
      </p>
    </div>
  );
}
