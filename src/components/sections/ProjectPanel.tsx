'use client';

import { Counter } from '@/components/ui/Counter';
import { InView } from '@/components/ui/InView';
import type { Project } from '@/content/projects';

/**
 * One artifact panel. Loaded on demand: it sits far below the fold, so the
 * code is split out of the first-load bundle (see PERFORMANCE notes).
 */
export function ProjectPanel({ project }: { project: Project }) {
  return (
    <article className="border-ink/15 hover:border-accent/70 group flex h-full flex-col border transition-colors duration-500">
      {/* Preview surface: fixed height, project-specific motif */}
      <div className="bg-surface/60 border-ink/15 relative h-44 border-b">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <InView className="w-full">
            {project.visual === 'utility' && <UtilityPreview />}
            {project.visual === 'signal' && <SignalPreview />}
            {project.visual === 'manifest' && <ManifestPreview />}
            {project.visual === 'honeypot' && <HoneypotPreview />}
            {project.visual === 'site' && <SitePreview />}
          </InView>
        </div>
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
