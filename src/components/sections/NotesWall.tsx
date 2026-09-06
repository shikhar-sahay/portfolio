'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import {
  LIMITS,
  SEED_NOTES,
  WORLD,
  type WallNote,
} from '@/content/wall';

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
    return new Date(at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

const variantClass = [
  'border-ink/20 bg-paper text-ink',
  'border-paper/30 bg-ink text-paper',
  'border-accent/60 bg-paper text-ink',
];

/**
 * The notes wall: an infinite-feeling spatial canvas of visitor notes
 * inside Personality. Drag to pan (the page keeps vertical scroll;
 * horizontal drags pan the wall), click a note to open it with replies,
 * or add your own. Notes persist through the wall API with a local cache
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
  const [draft, setDraft] = useState<Draft>({ name: '', message: '', x: WORLD.w / 2, y: WORLD.h / 2 });
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean; raf: number } | null>(null);
  const notesRef = useRef(notes);
  notesRef.current = notes;
  const openNote = openId ? notesRef.current.find(n => n.id === openId) ?? null : null;

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
      if (n.x > x - PAN_MARGIN && n.x < x + vw + PAN_MARGIN && n.y > y - PAN_MARGIN && n.y < y + vh + PAN_MARGIN) {
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
    fetch(`/api/notes?limit=${LIMITS.initialFetchLimit}`, { headers: { accept: 'application/json' } })
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

  const recenter = useCallback(() => {
    pan.current.x = 700;
    pan.current.y = 500;
    applyPan();
    refreshVisible();
  }, [applyPan, refreshVisible]);

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
        body: JSON.stringify({ name, message: draft.message, x: Math.round(draft.x), y: Math.round(draft.y), variant: notes.length % 3 }),
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
      setNotes(prev => prev.map(n => (n.id === openNote.id ? { ...n, replies: [...n.replies, data.reply as WallNote['replies'][number]] } : n)));
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
    <div className="border-paper/15 mt-[8vh] border-t pt-6">
      <p className="text-micro uppercase tracking-[0.16em] text-accent">The wall</p>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-paper/60">
        A shared canvas. Drag to look around, open a note to reply, or pin one of your own. Be
        kind: everything here is public.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setComposing(v => !v);
            setError(null);
          }}
          aria-expanded={composing}
          className={`border px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-expo ${
            composing
              ? 'border-accent bg-accent text-paper'
              : 'border-paper/25 text-paper hover:border-paper/60 hover:text-paper'
          }`}
        >
          {composing ? 'Cancel' : 'Add a note'}
        </button>
        <button
          type="button"
          onClick={recenter}
          className="border-paper/25 text-paper/70 hover:border-paper/60 hover:text-paper border px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-expo"
        >
          Recenter
        </button>
        <p className="text-paper/40 text-micro uppercase tracking-[0.14em]" aria-live="polite">
          {total} notes{live ? '' : ' · offline'}
        </p>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-label={`Notes wall, ${total} notes. Drag to pan, arrow keys pan when focused.`}
        tabIndex={0}
        onKeyDown={onKeyPan}
        onPointerDown={onPointerDown}
        onClick={e => {
          if (drag.current?.moved) return;
          if (!composing) return;
          placeDraft(e.clientX, e.clientY);
        }}
        className="border-paper/25 relative mt-5 h-[440px] cursor-grab touch-pan-y select-none overflow-hidden border active:cursor-grabbing sm:h-[520px]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(236,228,212,0.12) 1px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: WORLD.w, height: WORLD.h }}
        >
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
              className={`group absolute w-56 border p-4 text-left transition-all duration-300 ease-expo hover:-translate-y-1 ${variantClass[n.variant] ?? variantClass[0]} ${
                flashId === n.id && !reduce ? 'note-arrive' : ''
              }`}
              style={{ left: n.x, top: n.y }}
            >
              <span className="text-micro block uppercase tracking-[0.14em] opacity-70">
                {n.name}
                {n.owner && ' · owner'}
              </span>
              <span className="mt-2 line-clamp-4 block text-sm leading-relaxed">{n.message}</span>
              <span className="text-micro mt-3 block uppercase tracking-[0.14em] opacity-60">
                {formatDate(n.createdAt)}
                {n.replies.length > 0 && ` · ${n.replies.length} ${n.replies.length === 1 ? 'reply' : 'replies'}`}
              </span>
            </button>
          ))}
          {composing && (
            <span
              aria-hidden="true"
              className="border-accent absolute flex h-10 w-10 items-center justify-center border border-dashed text-accent"
              style={{ left: draft.x - 20, top: draft.y - 20 }}
            >
              +
            </span>
          )}
        </div>

        {openNote && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label={`Note by ${openNote.name}`}
            className="border-ink/20 bg-paper text-ink absolute bottom-4 left-4 right-4 border p-5 sm:left-auto sm:right-4 sm:top-4 sm:w-80 sm:bottom-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-micro uppercase tracking-[0.14em] text-muted">
                {openNote.name}
                {openNote.owner && ' · owner'} · {formatDate(openNote.createdAt)}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close note"
                className="text-muted hover:text-ink text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{openNote.message}</p>
            {openNote.replies.length > 0 && (
              <ul className="border-ink/10 mt-4 max-h-36 space-y-3 overflow-y-auto border-t pt-3">
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
                className="border-ink/20 bg-transparent w-full border px-3 py-2 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
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
                  className="border-ink/20 bg-transparent w-full border px-3 py-2 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={submitReply}
                  className="bg-ink text-paper shrink-0 px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {composing && (
          <div className="border-ink/20 bg-paper text-ink absolute bottom-4 left-4 right-4 border p-5 sm:left-auto sm:right-4 sm:top-4 sm:w-80 sm:bottom-4">
            <p className="text-micro uppercase tracking-[0.14em] text-muted">New note, placed where you clicked</p>
            <div className="mt-3 space-y-2">
              <input
                value={draft.name}
                onChange={e => setDraft(d => ({ ...d, name: e.target.value.slice(0, LIMITS.nameMax) }))}
                placeholder="Name (optional)"
                aria-label="Your name"
                className="border-ink/20 bg-transparent w-full border px-3 py-2 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
              />
              <textarea
                value={draft.message}
                onChange={e => setDraft(d => ({ ...d, message: e.target.value.slice(0, LIMITS.messageMax) }))}
                placeholder={`Message, up to ${LIMITS.messageMax} characters`}
                aria-label="Your message"
                rows={3}
                className="border-ink/20 bg-transparent w-full resize-none border px-3 py-2 text-sm outline-none placeholder:text-muted/60 focus:border-accent"
              />
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted text-micro uppercase tracking-[0.12em]">
                  {draft.message.length}/{LIMITS.messageMax}
                </span>
                <button
                  type="button"
                  onClick={submitNote}
                  className="bg-ink text-paper px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
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
        {live ? 'Shared wall: notes appear for every visitor.' : 'Offline: showing saved notes.'} Plain
        text only, nothing private.
      </p>
    </div>
  );
}
