'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/projects';

const ProjectPanel = dynamic(() => import('./ProjectPanel').then(m => m.ProjectPanel), {
  ssr: false,
  loading: () => <div className="border-ink/10 h-[540px] border" aria-hidden="true" />,
});

const AUTO_SPEED = 40; // px per second, the resting drift

/**
 * Projects: a continuously drifting infinite carousel. The track holds two
 * copies of the row and the offset wraps modulo one copy width, so cards
 * leaving the right re-enter from the left with no seam. The drift runs
 * until the visitor touches it (drag, swipe, arrows, keys): from that
 * moment it stays manual for the session. One rAF loop owns the track and
 * pauses entirely when the carousel is offscreen. Reduced motion gets the
 * same cards in a plain native scroll row with no drift.
 */
export function Projects() {
  const reduce = useMountedReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    offset: 0,
    setWidth: 0,
    step: 1,
    target: null as number | null,
    dragging: false,
    lastX: 0,
    moved: 0,
    auto: true,
    visible: true,
    lastT: 0,
  });
  const [drifting, setDrifting] = useState(true);

  const stopAuto = useCallback(() => {
    if (s.current.auto) {
      s.current.auto = false;
      setDrifting(false);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const st = s.current;

    const measure = () => {
      const slides = track.querySelectorAll<HTMLElement>('[data-slide]');
      if (slides.length >= 2) {
        st.step = slides[1].offsetLeft - slides[0].offsetLeft;
      }
      // One copy width measured from the slides themselves: scrollWidth
      // drops the last slide's trailing margin, which would put every wrap
      // 24px off the card grid.
      const half = Array.from(slides).slice(0, projects.length);
      st.setWidth = half.reduce((w, s) => {
        const mr = parseFloat(getComputedStyle(s).marginRight || '0');
        return w + s.offsetWidth + mr;
      }, 0);
    };
    measure();
    window.addEventListener('resize', measure);

    if (reduce) {
      // The animated variant may have mounted for a frame before the
      // reduced-motion flag landed: clear any drift offset.
      track.style.transform = '';
      return () => window.removeEventListener('resize', measure);
    }

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
    });
    io.observe(viewport);

    let raf = 0;
    const tick = (t: number) => {
      const dt = Math.min(64, t - (st.lastT || t));
      st.lastT = t;
      if (st.visible) {
        if (st.target !== null) {
          st.offset += (st.target - st.offset) * 0.16;
          if (Math.abs(st.target - st.offset) < 0.5) {
            st.offset = st.target;
            st.target = null;
          }
        } else if (!st.dragging && st.auto) {
          st.offset -= (AUTO_SPEED * dt) / 1000;
        }
        if (st.setWidth > 0) {
          while (st.offset <= -st.setWidth) {
            st.offset += st.setWidth;
            if (st.target !== null) st.target += st.setWidth;
          }
          while (st.offset > 0) {
            st.offset -= st.setWidth;
            if (st.target !== null) st.target -= st.setWidth;
          }
        }
        track.style.transform = `translate3d(${st.offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  const nudge = useCallback(
    (dir: 1 | -1) => {
      if (reduce) {
        // Instant scroll: Chrome drops smooth scrolling entirely under
        // forced reduced motion. Forward is down the row (positive scroll).
        viewportRef.current?.scrollBy({ left: -dir * s.current.step, behavior: 'auto' });
        return;
      }
      stopAuto();
      const st = s.current;
      st.target = Math.round(st.offset / st.step) * st.step + dir * st.step;
    },
    [reduce, stopAuto]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const st = s.current;
    stopAuto();
    st.dragging = true;
    st.lastX = e.clientX;
    st.moved = 0;
    st.target = null;
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.offset += dx;
    st.moved += Math.abs(dx);
  };

  const endDrag = () => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    // Settle gently onto the card grid; no hard snap.
    st.target = Math.round(st.offset / st.step) * st.step;
  };

  // A drag should not fire the links under the pointer on release.
  const onClickCapture = (e: React.MouseEvent) => {
    const st = s.current;
    if (st.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
      st.moved = 0;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Forward (following the drift) is negative offset: next goes left.
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge(1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge(-1);
    }
  };

  const count = projects.length;

  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[14vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Projects
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
            Artifacts from the communities around them: a public utility, a signal map, a toolkit, a
            trap, and this page.
          </h2>
        </Reveal>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Project artifacts"
        className="mt-[7vh]"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          ref={viewportRef}
          className={
            reduce
              ? 'border-ink/10 overflow-x-auto border-y'
              : 'marquee-fade cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing'
          }
          {...(reduce
            ? {}
            : {
                onPointerDown,
                onPointerMove,
                onPointerUp: endDrag,
                onPointerCancel: endDrag,
                onClickCapture,
              })}
        >
          <div
            ref={trackRef}
            className={`flex will-change-transform ${reduce ? 'px-5 py-10 sm:px-10' : ''}`}
          >
            {[...projects, ...projects].map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                data-slide
                aria-hidden={i >= count}
                className="mr-6 w-[80vw] max-w-[420px] shrink-0 sm:w-[400px]"
              >
                <ProjectPanel project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between gap-4">
          <p className="text-micro uppercase tracking-[0.16em] text-muted">
            {reduce
              ? 'Swipe or use the arrows'
              : drifting
                ? 'It drifts on its own: drag, swipe, or take the wheel'
                : 'Paused: you have the wheel'}
          </p>
          <div className="flex gap-3">
            <CarouselButton direction="previous" onClick={() => nudge(1)} />
            <CarouselButton direction="next" onClick={() => nudge(-1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === 'next' ? 'Next' : 'Previous'} project`}
      className="border-ink/25 flex h-11 w-11 items-center justify-center border text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <span
        aria-hidden="true"
        className={`inline-block ${direction === 'next' ? '' : 'rotate-180'}`}
      >
        &rarr;
      </span>
    </button>
  );
}
