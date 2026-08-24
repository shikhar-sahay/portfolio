'use client';

import { Counter } from '@/components/ui/Counter';
import { InView } from '@/components/ui/InView';
import { Reveal } from '@/components/ui/Reveal';
import { projects, type Project } from '@/content/projects';

/**
 * Projects: three compact artifact panels, not full-screen cinematics.
 * Each panel has a project-specific preview motif (pure SVG line work),
 * metadata, technology, and structured link placeholders.
 */
export function Projects() {
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
            Three artifacts, built with the communities around them: a public utility, a signal map,
            and a toolkit.
          </h2>
        </Reveal>

        <div className="mt-[10vh] grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectPanel project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ project }: { project: Project }) {
  return (
    <article className="border-ink/15 hover:border-accent/70 group flex h-full flex-col border transition-colors duration-500">
      {/* Preview surface */}
      <div className="border-ink/15 relative border-b">
        <InView>
          {project.visual === 'utility' && <UtilityPreview />}
          {project.visual === 'signal' && <SignalPreview />}
          {project.visual === 'manifest' && <ManifestPreview />}
        </InView>
        <p className="absolute right-3 top-3 text-micro tabular-nums text-muted">{project.index}</p>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-micro uppercase tracking-[0.16em] text-accent">{project.kind}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.metric && (
          <div className="border-ink/10 mt-5 flex gap-8 border-t pt-4">
            {[project.metric, project.secondMetric].map(
              m =>
                m && (
                  <div key={m.label}>
                    <Counter
                      value={m.value}
                      decimals={m.decimals}
                      suffix={m.suffix}
                      className="block text-2xl font-semibold tabular-nums leading-none tracking-tight text-ink"
                    />
                    <p className="mt-1.5 text-micro uppercase tracking-[0.14em] text-muted">
                      {m.label}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-micro uppercase tracking-[0.12em] text-muted">
          {project.stack.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < project.stack.length - 1 && (
                <span className="text-ink/25 ml-3 select-none">/</span>
              )}
            </span>
          ))}
        </p>

        {project.role && (
          <p className="mt-4 text-micro uppercase tracking-[0.12em] text-muted">
            Role: {project.role}
          </p>
        )}

        {/* Links: structured placeholders until real URLs exist */}
        <div className="border-ink/10 mt-auto flex items-center gap-5 border-t pt-4 [margin-top:auto]">
          <PanelLink label="Live" href={project.links.live} />
          <PanelLink label="GitHub" href={project.links.github} />
          <PanelLink label="Case study" href={project.links.caseStudy} />
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
