import { Counter } from '@/components/ui/Counter';
import { InView } from '@/components/ui/InView';
import { Reveal } from '@/components/ui/Reveal';
import { projects, type Project } from '@/content/projects';

function SectionHeading() {
  return (
    <div className="mb-[12vh]">
      <Reveal>
        <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Projects
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-8 max-w-[22ch] text-lede font-medium tracking-tight text-ink">
          Three artifacts, built with the communities around them: a public utility, a signal map,
          and a toolkit.
        </h2>
      </Reveal>
    </div>
  );
}

function StackLabels({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {stack.map((tech, i) => (
        <li
          key={tech}
          className="border-ink/15 border px-2.5 py-1 text-micro uppercase tracking-[0.12em] text-muted"
        >
          <span className="mr-1.5 tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** Papers: a public utility. The metrics ARE the visual. */
function UtilityVisual({ project }: { project: Project }) {
  return (
    <div className="border-ink/15 border-y py-10">
      <div className="grid grid-cols-2 gap-8">
        {[project.metric, project.secondMetric].map(
          m =>
            m && (
              <div key={m.label}>
                <Counter
                  value={m.value}
                  decimals={m.decimals}
                  suffix={m.suffix}
                  className="block text-[clamp(3.5rem,8vw,7.5rem)] font-semibold tabular-nums leading-none tracking-tight text-ink"
                />
                <p className="mt-3 text-micro uppercase tracking-[0.16em] text-muted">{m.label}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

/** HawkEye: an abstract signal map, drawn in on view. */
function SignalVisual() {
  const nodes = [
    { x: 30, y: 150, label: 'INGEST' },
    { x: 150, y: 60, label: 'PARSE' },
    { x: 150, y: 240, label: 'SIMULATE' },
    { x: 290, y: 150, label: 'CORRELATE' },
    { x: 420, y: 90, label: 'SCORE' },
    { x: 420, y: 215, label: 'ATT&CK' },
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
    <div className="border-ink/15 border-y py-8">
      <InView>
        <svg
          viewBox="0 0 460 300"
          className="w-full"
          role="img"
          aria-label="Abstract signal flow: ingest and simulate feed a correlate node, which maps to risk scoring and MITRE ATT&CK"
        >
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x + 4}
              y1={nodes[a].y}
              x2={nodes[b].x - 4}
              y2={nodes[b].y}
              stroke={i >= 4 ? 'var(--accent)' : 'var(--muted)'}
              strokeWidth="1"
              strokeDasharray="3 4"
              className="signal-edge"
              style={{ transitionDelay: `${0.3 + i * 0.18}s` }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={n.label} className="signal-node" style={{ transitionDelay: `${i * 0.15}s` }}>
              <circle cx={n.x} cy={n.y} r="4" fill={i >= 3 ? 'var(--accent)' : 'var(--ink)'} />
              <text
                x={n.x}
                y={n.y - 12}
                textAnchor="middle"
                className="fill-current text-[9px] uppercase"
                style={{ letterSpacing: '0.14em' }}
                fill="var(--muted)"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </InView>
    </div>
  );
}

/** HolmesKit: a spec-sheet manifest. */
function ManifestVisual() {
  const modules = [
    ['M.01', 'Registry tweaks', 'reversible'],
    ['M.02', 'Service tuning', 'reversible'],
    ['M.03', 'Power plans', 'reversible'],
    ['M.04', 'TCP/IP optimization', 'reversible'],
    ['M.05', 'Automated backups', 'always on'],
    ['M.06', 'Session logging', 'always on'],
    ['M.07', 'Rollback', 'one command'],
  ];
  return (
    <div className="border-ink/15 border-y">
      <InView>
        <ul>
          {modules.map(([id, name, note], i) => (
            <li
              key={id}
              className="signal-node border-ink/10 flex items-baseline justify-between border-b py-3 last:border-b-0"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="flex items-baseline gap-4">
                <span className="text-micro tabular-nums text-accent">{id}</span>
                <span className="text-sm text-ink">{name}</span>
              </span>
              <span className="text-micro uppercase tracking-[0.14em] text-muted">{note}</span>
            </li>
          ))}
        </ul>
      </InView>
    </div>
  );
}

function ProjectArtifact({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? 'lg:order-2' : ''}>
        <p className="mb-6 flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
          <span className="tabular-nums text-accent">{project.index}</span>
          {project.context && <span>{project.context}</span>}
        </p>
        <h3 className="text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-6 max-w-[48ch] leading-relaxed text-muted">{project.description}</p>
        <div className="mt-8">
          <StackLabels stack={project.stack} />
        </div>
        {project.role && (
          <p className="mt-6 text-micro uppercase tracking-[0.14em] text-muted">
            Role: {project.role}
          </p>
        )}
        {project.link && (
          <a
            href={project.link.href}
            className="group mt-8 inline-flex items-center gap-3 text-micro font-semibold uppercase tracking-[0.16em] text-ink"
          >
            <span className="h-px w-8 bg-accent transition-all duration-500 ease-expo group-hover:w-12" />
            {project.link.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        )}
      </Reveal>
      <Reveal delay={0.12} className={flip ? 'lg:order-1' : ''}>
        {project.visual === 'utility' && <UtilityVisual project={project} />}
        {project.visual === 'signal' && <SignalVisual />}
        {project.visual === 'manifest' && <ManifestVisual />}
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading />
        <div className="space-y-[16vh]">
          {projects.map((project, i) => (
            <ProjectArtifact key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
