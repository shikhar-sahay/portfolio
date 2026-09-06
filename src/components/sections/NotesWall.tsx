'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { LIMITS, SEED_NOTES, WORLD, type WallNote } from '@/content/wall';

const CACHE_KEY = 'shikhar-wall-cache-v1';
const PAN_MARGIN = 400;

interface Draft {
  name: string;
  message: string;
  x: number;
  y: number;
}

function toWorld(e: { clientX: number; clientY: number }, canvas: HTMLElement | null) {
  if (!canvas) return { x: WORLD.w / 2, y: WORLD.h / 2 };
  const r = canvas.getBoundingClientRect();
  return {
    x: Math.min(WORLD.w - 20, Math.max(20, e.clientX - r.left)),
    y: Math.min(WORLD.h - 20, Math.max(20, e.clientY - r.top)),
  };
}

function formatDate(at: number): string {
  if (!at) return 'owner note';
  try {
    return new Date(at).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/** Deterministic tilt from the note id: stable across renders and SSR. */
function tiltFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return ((h % 45) - 22) / 10;
}

/** Restrained width scale: mostly standard, occasional wide or large. */
function widthFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) % 101;
  if (h % 11 === 0) return 'w-64 sm:w-72';
  if (h % 5 === 0) return 'w-56 sm:w-64';
  if (h % 3 === 0) return 'w-44 sm:w-48';
  return 'w-52 sm:w-56';
}

const variantClass = [
  'border-ink/25 bg-paper text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]',
  'border-paper/35 bg-ink text-paper shadow-[0_24px_50px_-20px_rgba(0,0,0,0.65)]',
  'border-accent/70 bg-paper text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]',
];

/**
 * The notes wall: Personality opens into a full-bleed living surface, no
 * containing box. Notes rest tilted at varied sizes with pin-diamond
 * metadata and tactile shadows; hover straightens and lifts a card. Drag
 * to pan (the page keeps vertical scroll), click a note to open its
 * thread slip, leave one via the docked instrument (a ghost previews the
 * landing spot), or jump to the newest note on the whole wall with
 * Latest. Notes persist through the wall API with a local cache
 * fallback; seeds are clearly labeled owner notes. Reduced motion gets
 * instant, calm behavior; keyboard users get full parity.
 */
export function NotesWall() {
  const reduce = useMountedReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pan = useRef({ x: 700, y: 500 });
  const [notes, setNotes] = useState<WallNote[]>(SEED_NOTES);
  const [total, setTotal] = useState(SEED_NOTES.length);
  const [live, setLive] = useState(true);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(SEED_NOTES.map(n => n.id)));
  const [openId, setOpenId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState<Draft>({
    name: '',
    message: '',
    x: WORLD.w / 2,
    y: WORLD.h / 2,
  });
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
    raf: number;
  } | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLSpanElement>(null);
  const fly = useRef(0);

  // Keep keyboard context: opening the thread or composer moves focus
  // inside it (without scrolling), so Escape and Tab continue from the
  // wall instead of dropping to the top of the page.
  useEffect(() => {
    if (openId) threadRef.current?.focus({ preventScroll: true });
  }, [openId]);
  useEffect(() => {
    if (composing) messageRef.current?.focus({ preventScroll: true });
  }, [composing]);
  const notesRef = useRef(notes);
  notesRef.current = notes;
  const openNote = openId ? (notesRef.current.find(n => n.id === openId) ?? null) : null;

  const applyPan = useCallback(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;
    const maxX = Math.max(0, WORLD.w - viewport.clientWidth);
    const maxY = Math.max(0, WORLD.h - viewport.clientHeight);
    pan.current.x = Math.min(maxX, Math.max(0, pan.current.x));
    pan.current.y = Math.min(maxY, Math.max(0, pan.current.y));
    canvas.style.transform = `translate3d(${-pan.current.x}px, ${-pan.current.y}px, 0)`;
  }, []);

  const refreshVisible = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const { x, y } = pan.current;
    const next = new Set<string>();
    for (const n of notesRef.current) {
      if (next.size >= LIMITS.renderCap) break;
      if (
        n.x > x - PAN_MARGIN &&
        n.x < x + vw + PAN_MARGIN &&
        n.y > y - PAN_MARGIN &&
        n.y < y + vh + PAN_MARGIN
      ) {
        next.add(n.id);
      }
    }
    setVisibleIds(next);
  }, []);

  useEffect(() => {
    applyPan();
    refreshVisible();
  }, [applyPan, refreshVisible]);

  // Initial load: seeds paint instantly, then the shared wall merges in.
  // The server list includes the seeds, so merge by id (server copy wins:
  // it carries any replies visitors left on them).
  useEffect(() => {
    let cancelled = false;
    const merge = (server: WallNote[]) => {
      const ids = new Set(server.map(n => n.id));
      return [...server, ...SEED_NOTES.filter(s => !ids.has(s.id))];
    };
    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as WallNote[];
        if (Array.isArray(parsed) && parsed.length > 0 && !cancelled) {
          setNotes(merge(parsed));
        }
      }
    } catch {
      /* cache is best-effort */
    }
    fetch(`/api/notes?limit=${LIMITS.initialFetchLimit}`, {
      headers: { accept: 'application/json' },
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ notes: WallNote[]; total: number }>;
      })
      .then(data => {
        if (cancelled) return;
        const server = (data.notes ?? []).filter(n => n && typeof n.id === 'string');
        setNotes(merge(server));
        setTotal(data.total + SEED_NOTES.filter(s => !server.some(n => n.id === s.id)).length);
        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(server.slice(0, LIMITS.renderCap)));
        } catch {
          /* best-effort */
        }
        setLive(true);
      })
      .catch(() => {
        if (!cancelled) setLive(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    refreshVisible();
  }, [notes, refreshVisible]);

  // Smooth camera flight to a world point (centers it). Reduced motion
  // jumps instead of animating. Cancels any in-flight tween.
  const flyTo = useCallback(
    (tx: number, ty: number) => {
      cancelAnimationFrame(fly.current);
      const viewport = viewportRef.current;
      if (!viewport || reduce) {
        if (viewport) {
          const vw = viewport.clientWidth;
          const vh = viewport.clientHeight;
          pan.current.x = Math.min(Math.max(0, WORLD.w - vw), Math.max(0, tx));
          pan.current.y = Math.min(Math.max(0, WORLD.h - vh), Math.max(0, ty));
        } else {
          pan.current.x = tx;
          pan.current.y = ty;
        }
        applyPan();
        refreshVisible();
        return;
      }
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      tx = Math.min(Math.max(0, WORLD.w - vw), Math.max(0, tx));
      ty = Math.min(Math.max(0, WORLD.h - vh), Math.max(0, ty));
      const sx = pan.current.x;
      const sy = pan.current.y;
      const t0 = performance.now();
      const dur = 650;
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - t, 3);
        pan.current.x = sx + (tx - sx) * e;
        pan.current.y = sy + (ty - sy) * e;
        applyPan();
        if (t < 1) fly.current = requestAnimationFrame(step);
        else refreshVisible();
      };
      fly.current = requestAnimationFrame(step);
    },
    [applyPan, refreshVisible, reduce]
  );

  // Latest-note navigation: asks the store for the newest note across
  // the WHOLE wall (never the newest loaded one), ensures it renders,
  // flies the camera to it, and opens its thread.
  const goLatest = useCallback(async () => {
    setError(null);
    try {
      const r = await fetch('/api/notes?order=latest', {
        headers: { accept: 'application/json' },
      });
      const data = (await r.json()) as { note?: WallNote | null; error?: string };
      if (!r.ok || !data.note) {
        setError(data.error ?? 'Could not find the latest note.');
        return;
      }
      const note = data.note;
      setNotes(prev => (prev.some(n => n.id === note.id) ? prev : [...prev, note]));
      setVisibleIds(prev => new Set(prev).add(note.id));
      const viewport = viewportRef.current;
      const vw = viewport?.clientWidth ?? 800;
      const vh = viewport?.clientHeight ?? 600;
      flyTo(note.x + 112 - vw / 2, note.y + 80 - vh / 2);
      const arriveIn = reduce ? 0 : 700;
      window.setTimeout(() => {
        setFlashId(note.id);
        setOpenId(note.id);
        window.setTimeout(() => setFlashId(null), 1600);
      }, arriveIn);
    } catch {
      setError('The wall is unreachable right now.');
    }
  }, [flyTo, reduce]);

  // Placement preview ghost: follows the cursor while composing, written
  // straight to the DOM so pointermove never re-renders React.
  const onPreviewMove = (e: React.PointerEvent) => {
    if (!composing) return;
    const el = previewRef.current;
    if (!el) return;
    const p = toWorld({ clientX: e.clientX, clientY: e.clientY }, canvasRef.current);
    el.style.opacity = '1';
    el.style.transform = `translate(${Math.round(p.x - 112)}px, ${Math.round(p.y - 70)}px)`;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const startX = e.clientX;
    const startY = e.clientY;
    const { x, y } = pan.current;
    if (drag.current) cancelAnimationFrame(drag.current.raf);
    const state = { sx: startX, sy: startY, ox: x, oy: y, moved: false, raf: 0 };
    drag.current = state;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!state.moved && Math.hypot(dx, dy) > 6) state.moved = true;
      if (!state.moved) return;
      cancelAnimationFrame(state.raf);
      state.raf = requestAnimationFrame(() => {
        pan.current.x = state.ox - dx;
        pan.current.y = state.oy - dy;
        applyPan();
      });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      cancelAnimationFrame(state.raf);
      if (drag.current === state) drag.current = null;
      applyPan();
      refreshVisible();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const placeDraft = (clientX: number, clientY: number) => {
    const p = toWorld({ clientX, clientY }, canvasRef.current);
    setDraft(d => ({ ...d, x: p.x, y: p.y }));
  };

  const submitNote = async () => {
    setError(null);
    const name = draft.name.trim() || 'anonymous';
    if (draft.message.trim().length === 0) {
      setError(`Write a message first (up to ${LIMITS.messageMax} characters).`);
      return;
    }
    try {
      const r = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          message: draft.message,
          x: Math.round(draft.x),
          y: Math.round(draft.y),
          variant: notes.length % 3,
        }),
      });
      const data = (await r.json()) as { note?: WallNote; error?: string };
      if (!r.ok || !data.note) {
        setError(data.error ?? 'Could not place the note.');
        return;
      }
      setNotes(prev => [...prev, data.note as WallNote]);
      setTotal(t => t + 1);
      setFlashId(data.note.id);
      setComposing(false);
      setDraft({ name: '', message: '', x: WORLD.w / 2, y: WORLD.h / 2 });
      setOpenId(data.note.id);
      window.setTimeout(() => setFlashId(null), 1200);
    } catch {
      setError('The wall is unreachable right now. Your draft is kept.');
    }
  };

  const submitReply = async () => {
    if (!openNote) return;
    setError(null);
    const name = replyName.trim() || 'anonymous';
    if (replyText.trim().length === 0) {
      setError(`Write a reply first (up to ${LIMITS.replyMax} characters).`);
      return;
    }
    try {
      const r = await fetch(`/api/notes/${openNote.id}/replies`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, message: replyText }),
      });
      const data = (await r.json()) as { reply?: WallNote['replies'][number]; error?: string };
      if (!r.ok || !data.reply) {
        setError(data.error ?? 'Could not post the reply.');
        return;
      }
      setNotes(prev =>
        prev.map(n =>
          n.id === openNote.id
            ? { ...n, replies: [...n.replies, data.reply as WallNote['replies'][number]] }
            : n
        )
      );
      setReplyText('');
    } catch {
      setError('The wall is unreachable right now. Your reply is kept.');
    }
  };

  const onKeyPan = (e: React.KeyboardEvent) => {
    const step = 120;
    if (e.key === 'ArrowLeft') {
      pan.current.x -= step;
      applyPan();
      refreshVisible();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      pan.current.x += step;
      applyPan();
      refreshVisible();
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      pan.current.y -= step;
      applyPan();
      refreshVisible();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      pan.current.y += step;
      applyPan();
      refreshVisible();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      if (composing) setComposing(false);
      else if (openId) setOpenId(null);
    }
  };

  const rendered = notes.filter(n => visibleIds.has(n.id));

  return (
    <div className="mt-[6vh]">
      {/* The wall is the section now: a full-bleed spatial surface with no
          containing box. The mosaic statement above is its reason; the
          dock floats inside the environment. */}
      <div
        ref={viewportRef}
        role="region"
        aria-label={`Notes wall, ${total} notes. Drag to pan, arrow keys pan when focused.`}
        tabIndex={0}
        onKeyDown={onKeyPan}
        onPointerDown={onPointerDown}
        onPointerMove={onPreviewMove}
        onClick={e => {
          if (drag.current?.moved) return;
          if (!composing) return;
          placeDraft(e.clientX, e.clientY);
        }}
        className={`relative ml-[calc(50%-50vw)] h-[78vh] min-h-[560px] w-screen touch-pan-y select-none overflow-hidden ${
          composing ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(236,228,212,0.12) 1px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Depth: a soft vignette over the dotted field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(120%_100%_at_50%_40%,transparent_55%,rgba(0,0,0,0.32)_100%)]"
        />
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: WORLD.w, height: WORLD.h }}
        >
          {/* Placement preview: while composing, a ghost of the note
              follows the cursor so landing it feels deliberate. Written
              straight to the DOM (no React state per pointermove). */}
          {composing && (
            <span
              ref={previewRef}
              aria-hidden="true"
              className="border-accent/80 pointer-events-none absolute left-0 top-0 flex h-[140px] w-56 items-center justify-center border border-dashed text-accent opacity-0"
            >
              +
            </span>
          )}
          {rendered.map(n => (
            <button
              key={n.id}
              type="button"
              onClick={e => {
                e.stopPropagation();
                setOpenId(n.id);
                setError(null);
              }}
              aria-label={`Note by ${n.name}: ${n.message.slice(0, 60)}${n.replies.length > 0 ? `, ${n.replies.length} replies` : ''}`}
              style={{ left: n.x, top: n.y, ['--tilt' as string]: `${tiltFor(n.id)}deg` }}
              className={`group absolute ${widthFor(n.id)} border p-4 text-left transition-all duration-300 ease-expo hover:-translate-y-1 hover:shadow-[0_32px_60px_-20px_rgba(0,0,0,0.65)] focus-visible:-translate-y-1 ${variantClass[n.variant] ?? variantClass[0]} ${
                openId === n.id ? 'ring-1 ring-accent' : ''
              } ${flashId === n.id && !reduce ? 'note-arrive' : ''}`}
            >
              <span className="block transition-transform duration-500 ease-expo [transform:rotate(var(--tilt))] group-hover:[transform:rotate(0deg)] group-focus-visible:[transform:rotate(0deg)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-[21px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-accent"
                />
                <span className="block text-micro uppercase tracking-[0.14em] opacity-70">
                  {n.name}
                  {n.owner && ' · owner'}
                </span>
                <span className="mt-2 line-clamp-4 block text-sm leading-relaxed">{n.message}</span>
                <span className="mt-3 block text-micro uppercase tracking-[0.14em] opacity-60">
                  {formatDate(n.createdAt)}
                  {n.replies.length > 0 &&
                    ` · ${n.replies.length} ${n.replies.length === 1 ? 'reply' : 'replies'}`}
                </span>
              </span>
            </button>
          ))}
          {composing && (
            <span
              aria-hidden="true"
              className="absolute flex h-10 w-10 items-center justify-center border border-dashed border-accent text-accent"
              style={{ left: draft.x - 20, top: draft.y - 20 }}
            >
              +
            </span>
          )}
        </div>

        {/* Instrument dock: the wall controls live on the wall itself */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setComposing(v => !v);
              setError(null);
            }}
            aria-expanded={composing}
            className={`border px-4 py-2 text-micro font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-expo ${
              composing
                ? 'border-accent bg-accent text-paper'
                : 'border-paper/30 hover:border-paper/60 bg-ink text-paper'
            }`}
          >
            {composing ? 'Cancel' : 'Leave a note'}
          </button>
          <button
            type="button"
            onClick={goLatest}
            className="border-paper/30 text-paper/70 hover:border-paper/60 border bg-ink px-4 py-2 text-micro font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-expo hover:text-paper"
          >
            Latest
          </button>
          <p
            className="text-paper/50 bg-ink px-3 py-2 text-micro uppercase tracking-[0.14em]"
            aria-live="polite"
          >
            {total} notes{live ? '' : ' · offline'}
          </p>
        </div>

        {openNote && (
          <div
            ref={threadRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="false"
            aria-label={`Note by ${openNote.name}`}
            className="border-ink/20 absolute bottom-4 left-4 right-4 z-10 border bg-paper p-5 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:bottom-4 sm:left-auto sm:right-4 sm:top-4 sm:w-72"
          >
            <p className="text-micro uppercase tracking-[0.14em] text-accent">Thread</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <p className="text-micro uppercase tracking-[0.14em] text-muted">
                {openNote.name}
                {openNote.owner && ' · owner'}
                {openNote.createdAt ? ` · ${formatDate(openNote.createdAt)}` : ''}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close note"
                className="text-lg leading-none text-muted transition-colors hover:text-ink"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{openNote.message}</p>
            {openNote.replies.length > 0 && (
              <ul className="border-accent/50 mt-4 max-h-36 space-y-3 overflow-y-auto border-l-2 pl-3">
                {openNote.replies.map(r => (
                  <li key={r.id}>
                    <p className="text-micro uppercase tracking-[0.14em] text-muted">{r.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed">{r.message}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 space-y-2">
              <input
                value={replyName}
                onChange={e => setReplyName(e.target.value.slice(0, LIMITS.nameMax))}
                placeholder="Name (optional)"
                aria-label="Your name"
                className="border-ink/20 placeholder:text-muted/60 w-full border bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <div className="flex gap-2">
                <input
                  value={replyText}
                  onChange={e => setReplyText(e.target.value.slice(0, LIMITS.replyMax))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') submitReply();
                  }}
                  placeholder={`Reply, up to ${LIMITS.replyMax} chars`}
                  aria-label="Your reply"
                  className="border-ink/20 placeholder:text-muted/60 w-full border bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={submitReply}
                  className="shrink-0 bg-ink px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {composing && (
          <div className="border-ink/20 absolute bottom-4 left-4 right-4 z-20 border bg-paper p-5 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:bottom-4 sm:left-auto sm:right-4 sm:top-4 sm:w-80">
            <span
              aria-hidden="true"
              className="absolute -top-[7px] left-8 h-3 w-3 rotate-45 bg-accent"
            />
            <p className="font-serif text-xl italic tracking-tight">Pin a note.</p>
            <p className="mt-1 text-micro uppercase tracking-[0.14em] text-muted">
              Click the canvas to choose its spot
            </p>
            <div className="mt-3 space-y-2">
              <input
                value={draft.name}
                onChange={e =>
                  setDraft(d => ({ ...d, name: e.target.value.slice(0, LIMITS.nameMax) }))
                }
                placeholder="Name (optional)"
                aria-label="Your name"
                className="border-ink/20 placeholder:text-muted/60 w-full border bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <textarea
                ref={messageRef}
                value={draft.message}
                onChange={e =>
                  setDraft(d => ({ ...d, message: e.target.value.slice(0, LIMITS.messageMax) }))
                }
                placeholder={`Message, up to ${LIMITS.messageMax} characters`}
                aria-label="Your message"
                rows={3}
                className="border-ink/20 placeholder:text-muted/60 w-full resize-none border bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <div className="flex items-center justify-between gap-2">
                <span className="text-micro uppercase tracking-[0.12em] text-muted">
                  {draft.message.length}/{LIMITS.messageMax}
                </span>
                <button
                  type="button"
                  onClick={submitNote}
                  className="bg-ink px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
                >
                  Pin it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-accent">
          {error}
        </p>
      )}
      <p className="text-paper/40 mt-3 text-micro uppercase tracking-[0.14em]">
        {live ? 'Shared wall: notes appear for every visitor.' : 'Offline: showing saved notes.'}{' '}
        Plain text only, nothing private.
      </p>
    </div>
  );
}
