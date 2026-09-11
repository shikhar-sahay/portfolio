'use client';

import { useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/projects';

const ProjectPanel = dynamic(() => import('./ProjectPanel').then(m => m.ProjectPanel), {
  ssr: false,
  loading: () => <div className="border-ink/10 lm-line-soft h-[540px] border" aria-hidden="true" />,
});

const AUTO_SPEED = 40; // px per second, the resting drift

/**
 * Projects: a continuously drifting infinite carousel. The track holds two
 * copies of the row and the offset wraps modulo one copy width, so cards
 * leaving the right re-enter from the left with no seam. The drift runs
 * until the visitor genuinely takes over (a real drag, swipe, arrow, or
 * key): incidental touches such as taps or vertical scroll pass-throughs
 * over the track never kill it, so mobile keeps the same slow rest drift
 * as desktop. One rAF loop owns the track and pauses entirely when the
 * carousel is offscreen. Reduced motion gets the same cards in a plain
 * native scroll row with no drift.
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

  const stopAuto = useCallback(() => {
    if (s.current.auto) {
      s.current.auto = false;
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
    if ((e.target as HTMLElement).closest('[data-carousel-interactive="true"]')) return;
    const st = s.current;
    // Deliberately not stopping the drift here: on touch screens almost
    // every scroll gesture starts with a pointerdown on whatever is under
    // the finger, so killing auto on press would end the drift before the
    // visitor ever sees it move. Only genuine drag intent stops it (below).
    st.dragging = true;
    st.lastX = e.clientX;
    st.moved = 0;
    st.target = null;
    viewportRef.current?.classList.add('project-carousel-dragging');
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.offset += dx;
    st.moved += Math.abs(dx);
    // A real drag or swipe takes over the carousel for the session. The
    // threshold matches the click-suppression distance so taps and scroll
    // jitter never count as intent. While dragging, the rAF loop already
    // yields (auto is gated on !dragging), so nothing fights the finger.
    if (st.moved > 6) stopAuto();
  };

  const endDrag = () => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    viewportRef.current?.classList.remove('project-carousel-dragging');
    if (st.moved > 6) {
      // Genuine drag: settle gently onto the card grid; no hard snap.
      st.target = Math.round(st.offset / st.step) * st.step;
    } else {
      // Incidental touch (tap, vertical scroll pass-through): leave no
      // snap target behind so the rest drift resumes cleanly.
      st.target = null;
    }
  };

  // A drag should not fire the links under the pointer on release.
  const onClickCapture = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-carousel-interactive="true"]')) return;
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
      className="theme-fade bg-paper px-5 pb-[8vh] pt-[8vh] sm:px-10 md:py-[14vh]"
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
            Ideas are more interesting once they exist. Here are a few I made real.
          </h2>
        </Reveal>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Project artifacts"
        className="projects-track-region mt-[6vh] md:mt-[7vh]"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          ref={viewportRef}
          className={
            reduce
              ? 'border-ink/10 lm-line-soft overflow-x-auto border-y'
              : 'marquee-fade cursor-grab touch-pan-y select-none overflow-hidden px-5 active:cursor-grabbing sm:px-10'
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
            className={`flex will-change-transform ${reduce ? 'px-5 py-10 sm:px-10' : 'py-px'}`}
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
        <div className="projects-controls mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="min-w-0 flex-1 text-micro uppercase tracking-[0.16em] text-muted">
            IT MOVES ON ITS OWN. DRAG, SWIPE, OR INTERRUPT.
          </p>
          <div className="flex gap-3">
            <CarouselButton direction="previous" onClick={() => nudge(1)} />
            <CarouselButton direction="next" onClick={() => nudge(-1)} />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="mx-auto mt-10 h-px w-[86%] max-w-5xl bg-ink opacity-15"
        />
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
      className="border-ink/25 lm-line flex h-11 w-11 items-center justify-center border text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
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
