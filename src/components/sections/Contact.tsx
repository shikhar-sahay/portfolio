import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { navLinks } from '@/content/sections';
import { FooterWordmark } from '@/components/sections/FooterWordmark';

/**
 * Footer: a compact contact block (gesture, direct lines, pages), a slim
 * resume moment, and the closing frame: the name as an interactive
 * marquee. The wordmark is the dominant element; everything above it
 * stays small and structured.
 */
export function Contact() {
  return (
    <footer
      id="contact"
      aria-label="Contact and footer"
      className="theme-fade border-ink/10 border-t bg-paper pt-[14vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-0">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Contact
          </p>
        </Reveal>

        {/* Compact contact grid: gesture on the left, structured links on the right */}
        <div className="mt-10 grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] italic leading-[1.05] tracking-tight text-ink">
              Let&apos;s talk.
            </h2>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted">
              Internships, collaborations, security rabbit holes, or a good argument about football:
              the inbox is open.
            </p>
            <EmailLink />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Elsewhere</p>
                <ul className="mt-4 space-y-3">
                  <li>
                    <CompactLink label="GitHub" href={profile.links.github} />
                  </li>
                  <li>
                    <CompactLink label="LinkedIn" href={profile.links.linkedin} />
                  </li>
                  <li>
                    <CompactLink label="Resume" href={profile.links.resume} />
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Pages</p>
                <ul className="mt-4 space-y-3">
                  {navLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-baseline gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
                      >
                        <span className="h-px w-2 bg-accent transition-all duration-500 ease-expo group-hover:w-4" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Resume moment, one slim row */}
        <Reveal delay={0.08}>
          <div className="border-ink/15 mt-[9vh] flex flex-wrap items-center justify-between gap-5 border-t py-7">
            <p className="font-serif text-xl italic tracking-tight text-ink sm:text-2xl">
              Everything, condensed.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-ink px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] text-paper transition-opacity duration-300 hover:opacity-85"
              >
                View resume
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
              <a
                href={profile.links.resume}
                download
                className="border-ink/25 inline-flex items-center gap-2.5 border px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Download PDF
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Closing frame: the name, drifting, letter by letter */}
      <div className="mt-[9vh] pb-4">
        <FooterWordmark />
      </div>

      <div className="border-ink/10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t px-5 py-6 sm:px-0">
        <p className="text-micro uppercase tracking-[0.16em] text-muted">
          Designed and built by Shikhar Sahay
        </p>
        <p className="text-micro uppercase tracking-[0.16em] text-muted">
          {profile.location} · 2026
        </p>
      </div>
    </footer>
  );
}

function EmailLink() {
  const href = profile.links.email;
  const placeholder = href === '#';
  // Server-rendered: placeholders are plain text, never anchors, so they
  // can neither navigate nor steal keyboard focus.
  if (placeholder) {
    return (
      <span
        title="Email link coming soon"
        className="text-muted/60 mt-7 inline-flex cursor-default items-baseline gap-3 text-lg font-medium tracking-tight sm:text-xl"
      >
        Email
        <span aria-hidden="true" className="text-accent">
          &rarr;
        </span>
      </span>
    );
  }
  return (
    <a
      href={href}
      className="group mt-7 inline-flex items-baseline gap-3 text-lg font-medium tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-xl"
    >
      Email
      <span
        aria-hidden="true"
        className="text-accent transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
      >
        &rarr;
      </span>
    </a>
  );
}

function CompactLink({ label, href }: { label: string; href: string }) {
  const placeholder = href === '#';
  // Server-rendered: placeholders are plain text, never anchors, so they
  // can neither navigate nor steal keyboard focus.
  if (placeholder) {
    return (
      <span
        title={`${label} link coming soon`}
        className="text-muted/60 inline-flex cursor-default items-baseline gap-2 text-sm"
      >
        <span className="h-px w-2 bg-accent" />
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
    >
      <span className="h-px w-2 bg-accent transition-all duration-500 ease-expo group-hover:w-4" />
      {label}
    </a>
  );
}
