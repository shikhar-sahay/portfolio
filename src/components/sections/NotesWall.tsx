'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { LIMITS, SEED_NOTES, WORLD, type WallNote } from '@/content/wall';

const OVERSCAN = 900;
const NOTE_W = 232;
const NOTE_H = 150;
const CAMERA_HOME = { x: 0, y: 280 };

interface Camera {
  x: number;
  y: number;
}

interface Draft {
  name: string;
  message: string;
  x: number;
  y: number;
}

type WallStatus = 'live' | 'setup' | 'offline';

function clampCamera(camera: Camera): Camera {
  return {
    x: Math.min(WORLD.maxX, Math.max(WORLD.minX, camera.x)),
    y: Math.min(WORLD.maxY, Math.max(WORLD.minY, camera.y)),
  };
}

function homeCamera(width: number): Camera {
  return width < 640 ? { x: 220, y: 520 } : CAMERA_HOME;
}

function formatDate(at: number): string {
  if (!at) return 'seed note';
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

function tiltFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return ((h % 45) - 22) / 10;
}

function widthFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) % 101;
  if (h % 7 === 0) return 'w-64';
  if (h % 3 === 0) return 'w-52';
  return 'w-56';
}

const variantClass = [
  'border-ink bg-paper text-ink shadow-[0_24px_50px_-22px_rgba(0,0,0,0.5)]',
  'border-paper bg-ink text-paper shadow-[0_24px_50px_-22px_rgba(0,0,0,0.62)]',
  'border-accent bg-paper text-ink shadow-[0_24px_50px_-22px_rgba(0,0,0,0.5)]',
];

function mergeNotes(server: WallNote[], local: WallNote[]) {
  const byId = new Map<string, WallNote>();
  for (const note of local) byId.set(note.id, note);
  for (const note of server) byId.set(note.id, note);
  return Array.from(byId.values());
}

export function NotesWall() {
  const reduce = useMountedReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
    raf: number;
  } | null>(null);
  const flight = useRef(0);
  const camera = useRef<Camera>(CAMERA_HOME);
  const cameraInitialized = useRef(false);

  const [notes, setNotes] = useState<WallNote[]>(SEED_NOTES);
  const [total, setTotal] = useState(SEED_NOTES.length);
  const [, setStatus] = useState<WallStatus>('offline');
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(SEED_NOTES.map(n => n.id)));
  const [openId, setOpenId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState<Draft>({ name: '', message: '', x: 240, y: 420 });
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  const notesRef = useRef(notes);
  notesRef.current = notes;

  const openNote = useMemo(
    () => (openId ? (notes.find(note => note.id === openId) ?? null) : null),
    [notes, openId]
  );

  const applyCamera = useCallback(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;
    if (!viewport || !world) return;
    const current = clampCamera(camera.current);
    camera.current = current;
    const x = Math.round(viewport.clientWidth / 2 - current.x);
    const y = Math.round(viewport.clientHeight / 2 - current.y);
    world.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const viewportBounds = useCallback(() => {
    const viewport = viewportRef.current;
    const vw = viewport?.clientWidth ?? 1000;
    const vh = viewport?.clientHeight ?? 700;
    return {
      minX: Math.round(camera.current.x - vw / 2 - OVERSCAN),
      maxX: Math.round(camera.current.x + vw / 2 + OVERSCAN),
      minY: Math.round(camera.current.y - vh / 2 - OVERSCAN),
      maxY: Math.round(camera.current.y + vh / 2 + OVERSCAN),
    };
  }, []);

  const refreshVisible = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const { x, y } = camera.current;
    const next = new Set<string>();
    for (const note of notesRef.current) {
      if (next.size >= LIMITS.renderCap) break;
      if (
        note.x + NOTE_W > x - vw / 2 - OVERSCAN &&
        note.x < x + vw / 2 + OVERSCAN &&
        note.y + NOTE_H > y - vh / 2 - OVERSCAN &&
        note.y < y + vh / 2 + OVERSCAN
      ) {
        next.add(note.id);
      }
    }
    setVisibleIds(next);
  }, []);

  const fetchVisibleNotes = useCallback(async () => {
    const bounds = viewportBounds();
    const params = new URLSearchParams({
      limit: String(LIMITS.initialFetchLimit),
      minX: String(bounds.minX),
      maxX: String(bounds.maxX),
      minY: String(bounds.minY),
      maxY: String(bounds.maxY),
    });
    try {
      const response = await fetch(`/api/notes?${params.toString()}`, {
        headers: { accept: 'application/json' },
      });
      const data = (await response.json()) as {
        notes?: WallNote[];
        total?: number;
        error?: string;
      };
      if (!response.ok) {
        setStatus(response.status === 503 ? 'setup' : 'offline');
        if (response.status !== 503) setError(data.error ?? 'The wall is unreachable right now.');
        return;
      }
      const server = (data.notes ?? []).filter(note => note && typeof note.id === 'string');
      setNotes(prev => mergeNotes(server, prev));
      setTotal(data.total ?? server.length);
      setStatus('live');
    } catch {
      setStatus('offline');
      setError('The wall is unreachable right now.');
    }
  }, [viewportBounds]);

  useEffect(() => {
    if (!cameraInitialized.current) {
      const width = viewportRef.current?.clientWidth ?? window.innerWidth;
      camera.current = homeCamera(width);
      cameraInitialized.current = true;
    }
    applyCamera();
    refreshVisible();
    void fetchVisibleNotes();
  }, [applyCamera, fetchVisibleNotes, refreshVisible]);

  useEffect(() => {
    refreshVisible();
  }, [notes, refreshVisible]);

  const screenToWorld = useCallback((clientX: number, clientY: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return { x: CAMERA_HOME.x, y: CAMERA_HOME.y };
    const rect = viewport.getBoundingClientRect();
    return {
      x: Math.round(camera.current.x + clientX - rect.left - viewport.clientWidth / 2),
      y: Math.round(camera.current.y + clientY - rect.top - viewport.clientHeight / 2),
    };
  }, []);

  const flyTo = useCallback(
    (target: Camera) => {
      cancelAnimationFrame(flight.current);
      const dest = clampCamera(target);
      if (reduce) {
        camera.current = dest;
        applyCamera();
        refreshVisible();
        void fetchVisibleNotes();
        return;
      }
      const start = { ...camera.current };
      const startTime = performance.now();
      const duration = 620;
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        camera.current = {
          x: start.x + (dest.x - start.x) * eased,
          y: start.y + (dest.y - start.y) * eased,
        };
        applyCamera();
        if (t < 1) {
          flight.current = requestAnimationFrame(step);
        } else {
          refreshVisible();
          void fetchVisibleNotes();
        }
      };
      flight.current = requestAnimationFrame(step);
    },
    [applyCamera, fetchVisibleNotes, reduce, refreshVisible]
  );

  const focusNote = useCallback(
    (note: WallNote) => {
      setNotes(prev => mergeNotes([note], prev));
      setVisibleIds(prev => new Set(prev).add(note.id));
      flyTo({ x: note.x + NOTE_W / 2, y: note.y + NOTE_H / 2 });
      window.setTimeout(
        () => {
          setOpenId(note.id);
          setFlashId(note.id);
          window.setTimeout(() => setFlashId(null), 1200);
        },
        reduce ? 0 : 650
      );
    },
    [flyTo, reduce]
  );

  const goRemoteNote = useCallback(
    async (order: 'latest' | 'random') => {
      setError(null);
      try {
        const response = await fetch(`/api/notes?order=${order}`, {
          headers: { accept: 'application/json' },
        });
        const data = (await response.json()) as { note?: WallNote | null; error?: string };
        if (!response.ok || !data.note) {
          setStatus(response.status === 503 ? 'setup' : 'offline');
          setError(data.error ?? `Could not find a ${order} note.`);
          return;
        }
        setStatus('live');
        focusNote(data.note);
      } catch {
        setStatus('offline');
        setError('The wall is unreachable right now.');
      }
    },
    [focusNote]
  );

  const startComposer = useCallback(() => {
    setError(null);
    const viewport = viewportRef.current;
    const x = camera.current.x + (viewport?.clientWidth ?? 900) * 0.12;
    const y = camera.current.y + (viewport?.clientHeight ?? 700) * 0.12;
    setDraft(d => ({ ...d, x: Math.round(x), y: Math.round(y) }));
    setComposing(true);
  }, []);

  const submitNote = async () => {
    setError(null);
    const message = draft.message.trim();
    const name = draft.name.trim() || 'anonymous';
    if (!message) {
      setError(`Write a message first, up to ${LIMITS.messageMax} characters.`);
      return;
    }
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          message,
          x: draft.x,
          y: draft.y,
          variant: notes.length % 3,
        }),
      });
      const data = (await response.json()) as { note?: WallNote; error?: string };
      if (!response.ok || !data.note) {
        setStatus(response.status === 503 ? 'setup' : 'offline');
        setError(data.error ?? 'Could not place the note.');
        return;
      }
      setStatus('live');
      setNotes(prev => mergeNotes([data.note as WallNote], prev));
      setTotal(value => value + 1);
      setComposing(false);
      setDraft({ name: '', message: '', x: 240, y: 420 });
      focusNote(data.note);
    } catch {
      setStatus('offline');
      setError('The wall is unreachable right now. Your draft is still here.');
    }
  };

  const submitReply = async () => {
    if (!openNote) return;
    setError(null);
    const message = replyText.trim();
    const name = replyName.trim() || 'anonymous';
    if (!message) {
      setError(`Write a reply first, up to ${LIMITS.replyMax} characters.`);
      return;
    }
    try {
      const response = await fetch(`/api/notes/${openNote.id}/replies`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      const data = (await response.json()) as {
        reply?: WallNote['replies'][number];
        error?: string;
      };
      if (!response.ok || !data.reply) {
        setStatus(response.status === 503 ? 'setup' : 'offline');
        setError(data.error ?? 'Could not post the reply.');
        return;
      }
      setStatus('live');
      setNotes(prev =>
        prev.map(note =>
          note.id === openNote.id
            ? {
                ...note,
                replyCount: note.replyCount + 1,
                replies: [...note.replies, data.reply as WallNote['replies'][number]],
              }
            : note
        )
      );
      setReplyText('');
    } catch {
      setStatus('offline');
      setError('The wall is unreachable right now. Your reply is still here.');
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest('[data-wall-interactive="true"]')) return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    cancelAnimationFrame(flight.current);
    const start = {
      sx: event.clientX,
      sy: event.clientY,
      ox: camera.current.x,
      oy: camera.current.y,
      moved: false,
      raf: 0,
    };
    drag.current = start;
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.sx;
      const dy = ev.clientY - start.sy;
      if (!start.moved && Math.hypot(dx, dy) > 7) start.moved = true;
      if (!start.moved) return;
      cancelAnimationFrame(start.raf);
      start.raf = requestAnimationFrame(() => {
        camera.current = clampCamera({ x: start.ox - dx, y: start.oy - dy });
        applyCamera();
      });
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      cancelAnimationFrame(start.raf);
      if (drag.current === start) drag.current = null;
      applyCamera();
      refreshVisible();
      void fetchVisibleNotes();
      if (!start.moved && composing) {
        const point = screenToWorld(ev.clientX, ev.clientY);
        setDraft(d => ({ ...d, x: point.x, y: point.y }));
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 360 : 140;
    if (event.key === 'ArrowLeft') {
      camera.current.x -= step;
    } else if (event.key === 'ArrowRight') {
      camera.current.x += step;
    } else if (event.key === 'ArrowUp') {
      camera.current.y -= step;
    } else if (event.key === 'ArrowDown') {
      camera.current.y += step;
    } else if (event.key === 'Escape') {
      if (composing) setComposing(false);
      else setOpenId(null);
      return;
    } else {
      return;
    }
    applyCamera();
    refreshVisible();
    void fetchVisibleNotes();
    event.preventDefault();
  };

  const rendered = notes.filter(note => visibleIds.has(note.id));
  const statusText = `${total} notes`;
  const countText = `${total} NOTES`;

  return (
    <div className="mt-[12vh]">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-accent">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          The notes wall
        </p>
        <div className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
          <p>I am a mosaic of everyone I have ever known.</p>
          <p className="mt-5">
            If they are a piece of me, they deserve to be a piece of{' '}
            <em className="font-serif font-normal italic">this place</em> too.
          </p>
        </div>
      </div>
      <div
        ref={viewportRef}
        role="region"
        aria-label={`Notes wall, ${statusText}. Drag to pan, arrow keys pan when focused.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        className={`wall-dots relative left-1/2 h-[86vh] min-h-[620px] w-screen -translate-x-1/2 touch-pan-y select-none overflow-hidden ${
          composing ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <div
          aria-hidden="true"
          className="wall-vignette pointer-events-none absolute inset-0 z-[5]"
        />
        <div
          ref={worldRef}
          className="absolute left-0 top-0 z-[2] will-change-transform"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {rendered.map(note => (
            <button
              key={note.id}
              type="button"
              data-wall-interactive="true"
              onClick={() => {
                setOpenId(note.id);
                setError(null);
              }}
              aria-label={`Note by ${note.name}: ${note.message.slice(0, 64)}${
                note.replyCount > 0 ? `, ${note.replyCount} replies` : ''
              }`}
              className={`group absolute ${widthFor(note.id)} border p-4 text-left transition-all duration-300 ease-expo hover:-translate-y-1 focus-visible:-translate-y-1 ${variantClass[note.variant] ?? variantClass[0]} ${
                openId === note.id ? 'ring-1 ring-accent' : ''
              } ${flashId === note.id && !reduce ? 'note-arrive' : ''}`}
              style={{
                left: note.x,
                top: note.y,
                transform: `rotate(${tiltFor(note.id)}deg)`,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-[7px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-accent"
              />
              <span className="block text-micro uppercase tracking-[0.14em] opacity-70">
                {note.name}
                {note.owner && ' · owner'}
              </span>
              <span className="mt-2 line-clamp-4 block text-sm leading-relaxed">
                {note.message}
              </span>
              <span className="mt-3 block text-micro uppercase tracking-[0.14em] opacity-60">
                {formatDate(note.createdAt)}
                {note.replyCount > 0 &&
                  ` · ${note.replyCount} ${note.replyCount === 1 ? 'reply' : 'replies'}`}
              </span>
            </button>
          ))}

          {composing && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-[150px] w-56 border border-dashed border-accent text-accent"
              style={{ left: draft.x, top: draft.y }}
            />
          )}
        </div>

        <p className="absolute left-4 top-4 z-20 max-w-[30ch] text-xs leading-relaxed text-muted sm:left-6">
          Drag to look around. Leave a note, or just see what people have left behind. Be kind:
          everything here is public.
        </p>

        <div
          data-wall-interactive="true"
          className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2 sm:left-6"
        >
          <button
            type="button"
            onClick={startComposer}
            className="border border-accent bg-accent px-4 py-2 text-micro font-semibold uppercase tracking-[0.16em] text-paper transition-opacity duration-300 hover:opacity-90"
          >
            Leave a note
          </button>
          <WallButton onClick={() => void goRemoteNote('latest')}>Latest</WallButton>
          <WallButton onClick={() => void goRemoteNote('random')}>Random</WallButton>
          <WallButton
            onClick={() => flyTo(homeCamera(viewportRef.current?.clientWidth ?? window.innerWidth))}
          >
            Center
          </WallButton>
          <p className="border border-ink bg-paper px-3 py-2 text-micro uppercase tracking-[0.14em] text-muted">
            {countText}
          </p>
        </div>

        {openNote && (
          <div
            data-wall-interactive="true"
            role="dialog"
            aria-modal="false"
            aria-label={`Note by ${openNote.name}`}
            className="absolute bottom-4 left-4 right-4 z-30 border border-ink bg-paper p-5 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:left-auto sm:right-6 sm:top-6 sm:w-80"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-micro uppercase tracking-[0.14em] text-accent">
                {openNote.name}
                {openNote.owner && ' · owner'}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close note"
                className="text-lg leading-none text-muted transition-colors hover:text-ink"
              >
                x
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{openNote.message}</p>
            {openNote.replies.length > 0 && (
              <ul className="mt-4 max-h-40 space-y-3 overflow-y-auto border-l-2 border-accent pl-3">
                {openNote.replies.map(reply => (
                  <li key={reply.id}>
                    <p className="text-micro uppercase tracking-[0.14em] text-muted">
                      {reply.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{reply.message}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 space-y-2">
              <input
                value={replyName}
                onChange={event => setReplyName(event.target.value.slice(0, LIMITS.nameMax))}
                placeholder="Name, optional"
                aria-label="Your name for the reply"
                className="w-full border border-ink bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <textarea
                value={replyText}
                onChange={event => setReplyText(event.target.value.slice(0, LIMITS.replyMax))}
                placeholder={`Reply, up to ${LIMITS.replyMax} chars`}
                aria-label="Your reply"
                rows={2}
                className="w-full resize-none border border-ink bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-micro uppercase tracking-[0.12em] text-muted">
                  {replyText.length}/{LIMITS.replyMax}
                </span>
                <button
                  type="button"
                  onClick={submitReply}
                  className="bg-ink px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {composing && (
          <div
            data-wall-interactive="true"
            className="absolute bottom-4 left-4 right-4 z-40 border border-ink bg-paper p-5 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:left-auto sm:right-6 sm:top-6 sm:w-80"
          >
            <span
              aria-hidden="true"
              className="absolute -top-[7px] left-8 h-3 w-3 rotate-45 bg-accent"
            />
            <p className="font-serif text-xl italic tracking-tight">Pin a note.</p>
            <p className="mt-1 text-micro uppercase tracking-[0.14em] text-muted">
              Click the field to choose its spot
            </p>
            <div className="mt-4 space-y-3">
              <input
                value={draft.name}
                onChange={event =>
                  setDraft(value => ({
                    ...value,
                    name: event.target.value.slice(0, LIMITS.nameMax),
                  }))
                }
                placeholder="Name, optional"
                aria-label="Your name"
                className="w-full border border-ink bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <textarea
                value={draft.message}
                onChange={event =>
                  setDraft(value => ({
                    ...value,
                    message: event.target.value.slice(0, LIMITS.messageMax),
                  }))
                }
                placeholder={`Message, up to ${LIMITS.messageMax} characters`}
                aria-label="Your note"
                rows={4}
                className="w-full resize-none border border-ink bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <p className="text-xs leading-relaxed text-muted">
                Everything here is public. Plain text only.
              </p>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setComposing(false)}
                  className="border border-ink px-4 py-2 text-micro font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
                >
                  Cancel
                </button>
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
    </div>
  );
}

function WallButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-ink bg-paper px-4 py-2 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
