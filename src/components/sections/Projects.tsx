'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/projects';

const ProjectPanel = dynamic(() => import('./ProjectPanel').then(m => m.ProjectPanel), {
  ssr: false,
  loading: () => <div className="border-ink/10 h-[540px] border" aria-hidden="true" />,
});

/**
 * Projects: a horizontal, looping, keyboard-accessible carousel of
 * artifact panels. Every panel shares the same architecture: fixed
 * preview surface, fixed info block (clamped), fixed stack/links row.
 */
export function Projects() {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const touchX = useRef<number | null>(null);

  const slideStep = slideWidth + 24; // slide + gap

  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (el) setSlideWidth(el.querySelector('[data-slide]')?.clientWidth ?? 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setAnimated(true);
    setIndex(i => i + dir);
  }, []);

  // Seamless loop: after sliding into the cloned region, snap back silently.
  const onSettled = () => {
    if (index >= count) {
      setAnimated(false);
      setIndex(index - count);
    } else if (index < 0) {
      setAnimated(false);
      setIndex(index + count);
    }
  };

  // Re-enable animation on the frame after a silent snap.
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
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
        className="mt-[8vh]"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onTouchStart={e => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div ref={viewportRef} className="overflow-hidden" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <div
            className="flex gap-6"
            style={{
              transform: `translateX(${-(index * slideStep)}px)`,
              transition: animated ? 'transform 0.65s cubic-bezier(0.19, 1, 0.22, 1)' : 'none',
            }}
            onTransitionEnd={onSettled}
          >
            {[...projects, ...projects].map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                data-slide
                aria-hidden={i >= count}
                aria-roledescription="slide"
                aria-label={`${project.name}, ${(i % count) + 1} of ${count}`}
                className="w-[82vw] max-w-[440px] shrink-0 sm:w-[420px]"
              >
                <ProjectPanel project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between">
          <p className="text-micro uppercase tracking-[0.16em] text-muted">
            Drag, swipe, or use the arrows
          </p>
          <div className="flex gap-3">
            <CarouselButton direction="previous" onClick={() => go(-1)} />
            <CarouselButton direction="next" onClick={() => go(1)} />
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
