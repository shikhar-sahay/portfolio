'use client';

import Image from 'next/image';
import type { Project } from '@/content/projects';

/**
 * One artifact panel. Loaded on demand: it sits far below the fold, so the
 * code is split out of the first-load bundle (see PERFORMANCE notes).
 */
export function ProjectPanel({ project }: { project: Project }) {
  return (
    <article className="border-ink/15 hover:border-accent/70 group flex h-full flex-col border transition-colors duration-500">
      {/* Preview surface: authentic owner-provided project artifact. */}
      <div className="border-ink/15 relative h-52 overflow-hidden border-b bg-ink sm:h-56">
        <Image
          src={project.artwork.src}
          alt={project.artwork.alt}
          placeholder="blur"
          sizes="(max-width: 640px) 80vw, 400px"
          className={`project-artwork h-full w-full transition duration-700 ease-expo group-hover:scale-[1.015] group-hover:contrast-[1.04] group-hover:saturate-[1.05] ${
            project.artwork.fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          style={{ objectPosition: project.artwork.position }}
        />
      </div>

      {/* Info block: clamped so every panel stays the same height */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-3xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

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
            {project.currentLocationLabel && (
              <span className="text-micro font-semibold uppercase tracking-[0.14em] text-muted">
                {project.currentLocationLabel}
              </span>
            )}
            {project.links.live && <PanelLink label="Live" href={project.links.live} />}
            {project.links.github && <PanelLink label="GitHub" href={project.links.github} />}
          </div>
        </div>
      </div>
    </article>
  );
}

function PanelLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="group/link inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-accent"
    >
      {label}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-expo group-hover/link:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}
