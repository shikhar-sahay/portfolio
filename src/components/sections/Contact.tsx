import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { certifications } from '@/content/systems';
import { timeline } from '@/content/experience';

/**
 * 07 / Contact + Footer: the resume artifact moment ("Everything,
 * condensed.") followed by the ending. The opening indices return as a
 * quiet callback; the system returns to its initial state.
 */
export function Contact() {
  const roles = timeline.flatMap(era => era.entries.map(entry => ({ ...entry, year: era.year })));

  return (
    <footer
      id="contact"
      aria-label="Contact"
      className="theme-fade border-ink/10 border-t bg-paper px-5 pb-10 pt-[18vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            07 · Contact
          </p>
        </Reveal>

        {/* Resume artifact moment */}
        <Reveal delay={0.08}>
          <h2 className="mt-10 max-w-[20ch] font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] italic leading-[1.05] tracking-tight text-ink">
            Everything, condensed.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-micro font-semibold uppercase tracking-[0.16em] text-paper transition-opacity duration-300 hover:opacity-85"
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
              className="border-ink/25 inline-flex items-center gap-3 border px-6 py-3.5 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Download PDF
              <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </Reveal>

        {/* Condensed sheet */}
        <Reveal delay={0.16}>
          <div className="border-ink/15 mt-[8vh] grid gap-12 border-t pt-10 md:grid-cols-3">
            <div>
              <p className="text-micro uppercase tracking-[0.16em] text-accent">Education</p>
              <p className="mt-3 text-sm font-medium text-ink">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
              <p className="mt-1 text-micro uppercase tabular-nums tracking-[0.14em] text-muted">
                {profile.education.period}
              </p>
              <p className="mt-10 text-micro uppercase tracking-[0.16em] text-accent">
                Credentials
              </p>
              <ul className="mt-3 space-y-1.5">
                {certifications.map(cert => (
                  <li key={cert.name} className="text-sm text-muted">
                    {cert.name}, {cert.issuer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="text-micro uppercase tracking-[0.16em] text-accent">Experience</p>
              <ul className="divide-ink/10 mt-3 divide-y">
                {roles.map((role, i) => (
                  <li
                    key={`${role.org}-${role.role}-${i}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 py-2.5"
                  >
                    <span className="text-sm text-ink">
                      {role.role}, {role.org}
                    </span>
                    <span className="text-micro uppercase tabular-nums tracking-[0.14em] text-muted">
                      {role.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* The ending */}
        <Reveal delay={0.08}>
          <h2 className="mt-[16vh] max-w-[16ch] text-display uppercase text-ink">Say hello.</h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-[42ch] leading-relaxed text-muted">
            Internships, collaborations, security rabbit holes, or a good argument about football:
            the inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <ul className="border-ink/15 mt-[8vh] border-t">
            {[
              { label: 'Email', href: profile.links.email, external: false },
              { label: 'GitHub', href: profile.links.github, external: true },
              { label: 'LinkedIn', href: profile.links.linkedin, external: true },
            ].map(link => (
              <li key={link.label} className="border-ink/15 border-b">
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-baseline justify-between py-5"
                >
                  <span className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium tracking-tight text-ink transition-transform duration-500 ease-expo group-hover:translate-x-2">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl text-accent transition-transform duration-500 ease-expo group-hover:translate-x-2"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Closing mark */}
        <Reveal delay={0.1}>
          <div className="mt-[14vh] flex flex-wrap items-end justify-between gap-6">
            <p className="font-serif text-3xl italic text-accent">fin.</p>
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <p className="text-micro uppercase tracking-[0.16em] text-muted">
                {profile.location} · 2026
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
