'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Counter } from '@/components/ui/Counter';
import { InView } from '@/components/ui/InView';
import { Reveal } from '@/components/ui/Reveal';
import { projects, type Project } from '@/content/projects';

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

function ProjectPanel({ project }: { project: Project }) {
  return (
    <article className="border-ink/15 hover:border-accent/70 group flex h-full flex-col border transition-colors duration-500">
      {/* Preview surface: fixed height, project-specific motif */}
      <div className="border-ink/15 relative h-40 border-b">
        <InView>
          {project.visual === 'utility' && <UtilityPreview />}
          {project.visual === 'signal' && <SignalPreview />}
          {project.visual === 'manifest' && <ManifestPreview />}
          {project.visual === 'honeypot' && <HoneypotPreview />}
          {project.visual === 'site' && <SitePreview />}
        </InView>
        <p className="absolute right-3 top-3 text-micro tabular-nums text-muted">{project.index}</p>
      </div>

      {/* Info block: clamped so every panel stays the same height */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-micro uppercase tracking-[0.16em] text-accent">{project.kind}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.metric && (
          <div className="border-ink/10 mt-4 flex gap-8 border-t pt-3">
            {[project.metric, project.secondMetric].map(
              m =>
                m && (
                  <div key={m.label}>
                    <Counter
                      value={m.value}
                      decimals={m.decimals}
                      suffix={m.suffix}
                      className="block text-xl font-semibold tabular-nums leading-none tracking-tight text-ink"
                    />
                    <p className="mt-1 text-micro uppercase tracking-[0.14em] text-muted">
                      {m.label}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        {/* Stack + links: pinned to the bottom of every panel */}
        <div className="mt-auto pt-5">
          <p className="flex flex-wrap gap-x-2 text-micro uppercase tracking-[0.12em] text-muted">
            {project.stack.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < project.stack.length - 1 && (
                  <span className="text-ink/25 ml-2 select-none">/</span>
                )}
              </span>
            ))}
          </p>
          <div className="border-ink/10 mt-4 flex items-center gap-5 border-t pt-4">
            <PanelLink label="Live" href={project.links.live} />
            <PanelLink label="GitHub" href={project.links.github} />
            <PanelLink label="Case study" href={project.links.caseStudy} />
          </div>
        </div>
      </div>
    </article>
  );
}

function PanelLink({ label, href }: { label: string; href: string }) {
  const placeholder = href === '#';
  return (
    <a
      href={href}
      aria-disabled={placeholder || undefined}
      title={placeholder ? `${label} link coming soon` : label}
      className={`group/link inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
        placeholder ? 'text-muted/60 cursor-default' : 'text-ink hover:text-accent'
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-expo group-hover/link:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}

/* Papers: a grid of question paper outlines, one filling in. */
function UtilityPreview() {
  return (
    <svg viewBox="0 0 300 150" className="w-full" aria-hidden="true">
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3].map(col => (
          <rect
            key={`${row}-${col}`}
            x={22 + col * 68}
            y={18 + row * 42}
            width="52"
            height="30"
            fill="none"
            stroke={row === 1 && col === 2 ? 'var(--accent)' : 'var(--muted)'}
            strokeOpacity={row === 1 && col === 2 ? 0.9 : 0.4}
            strokeWidth="1"
            className="signal-node"
            style={{ transitionDelay: `${(row * 4 + col) * 40}ms` }}
          />
        ))
      )}
    </svg>
  );
}

/* HawkEye: the signal map. */
function SignalPreview() {
  const nodes = [
    { x: 30, y: 60, label: 'INGEST' },
    { x: 110, y: 25, label: 'PARSE' },
    { x: 110, y: 95, label: 'SIMULATE' },
    { x: 190, y: 60, label: 'CORRELATE' },
    { x: 262, y: 30, label: 'SCORE' },
    { x: 262, y: 92, label: 'ATT&CK' },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
  ];
  return (
    <svg viewBox="0 0 292 120" className="w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x + 3}
          y1={nodes[a].y}
          x2={nodes[b].x - 3}
          y2={nodes[b].y}
          stroke={i >= 4 ? 'var(--accent)' : 'var(--muted)'}
          strokeWidth="1"
          strokeDasharray="2 3"
          className="signal-edge"
          style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label} className="signal-node" style={{ transitionDelay: `${i * 0.12}s` }}>
          <circle cx={n.x} cy={n.y} r="3" fill={i >= 3 ? 'var(--accent)' : 'var(--ink)'} />
          <text
            x={n.x}
            y={n.y - 8}
            textAnchor="middle"
            fill="var(--muted)"
            className="text-[7px] uppercase"
            style={{ letterSpacing: '0.12em' }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* HolmesKit: manifest rows with toggle knobs. */
function ManifestPreview() {
  const rows = [
    { label: 'Registry', on: true },
    { label: 'Services', on: true },
    { label: 'Power plan', on: false },
    { label: 'Backup', on: true },
  ];
  return (
    <svg viewBox="0 0 300 150" className="w-full" aria-hidden="true">
      {rows.map((row, i) => (
        <g key={row.label} className="signal-node" style={{ transitionDelay: `${i * 90}ms` }}>
          <text
            x="22"
            y={34 + i * 30}
            fill="var(--muted)"
            className="text-[10px] uppercase"
            style={{ letterSpacing: '0.12em' }}
          >
            {row.label}
          </text>
          <rect
            x="220"
            y={22 + i * 30}
            width="42"
            height="18"
            rx="9"
            fill="none"
            stroke={row.on ? 'var(--accent)' : 'var(--muted)'}
            strokeOpacity={row.on ? 0.9 : 0.5}
            strokeWidth="1"
          />
          <circle
            cx={row.on ? 252 : 230}
            cy={31 + i * 30}
            r="5"
            fill={row.on ? 'var(--accent)' : 'var(--muted)'}
          />
        </g>
      ))}
    </svg>
  );
}

/* SSH Honeypot: probes converging into a trap. */
function HoneypotPreview() {
  return (
    <svg viewBox="0 0 300 120" className="w-full" aria-hidden="true">
      {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="18"
          x2="150"
          y2="78"
          stroke={i === 3 ? 'var(--accent)' : 'var(--muted)'}
          strokeOpacity={i === 3 ? 0.9 : 0.4}
          strokeWidth="1"
          strokeDasharray="2 3"
          className="signal-edge"
          style={{ transitionDelay: `${i * 80}ms` }}
        />
      ))}
      <g className="signal-node">
        <rect
          x="128"
          y="76"
          width="44"
          height="30"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="150"
          y="95"
          textAnchor="middle"
          fill="var(--accent)"
          className="text-[8px] uppercase"
          style={{ letterSpacing: '0.14em' }}
        >
          TRAP
        </text>
      </g>
      {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="18"
          r="3"
          fill="var(--muted)"
          className="signal-node"
          style={{ transitionDelay: `${i * 60}ms` }}
        />
      ))}
    </svg>
  );
}

/* This site: a tiny editorial page silhouette. */
function SitePreview() {
  return (
    <svg viewBox="0 0 300 150" className="w-full" aria-hidden="true">
      <rect
        x="60"
        y="20"
        width="180"
        height="110"
        fill="none"
        stroke="var(--muted)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <line
        x1="60"
        y1="40"
        x2="240"
        y2="40"
        stroke="var(--muted)"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle cx="72" cy="30" r="2.5" fill="var(--accent)" className="signal-node" />
      <circle
        cx="82"
        cy="30"
        r="2.5"
        fill="var(--muted)"
        className="signal-node"
        style={{ transitionDelay: '80ms' }}
      />
      <rect
        x="76"
        y="56"
        width="110"
        height="10"
        fill="none"
        stroke="var(--ink)"
        strokeOpacity="0.5"
        strokeWidth="1"
        className="signal-node"
        style={{ transitionDelay: '160ms' }}
      />
      <rect
        x="76"
        y="74"
        width="148"
        height="4"
        fill="var(--muted)"
        strokeOpacity="0.4"
        opacity="0.5"
        className="signal-node"
        style={{ transitionDelay: '240ms' }}
      />
      <rect
        x="76"
        y="84"
        width="120"
        height="4"
        fill="var(--muted)"
        opacity="0.4"
        className="signal-node"
        style={{ transitionDelay: '300ms' }}
      />
      <rect
        x="76"
        y="104"
        width="52"
        height="14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        className="signal-node"
        style={{ transitionDelay: '380ms' }}
      />
    </svg>
  );
}
