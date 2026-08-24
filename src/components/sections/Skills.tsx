import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { certifications, skillGroups } from '@/content/systems';

/**
 * 04 / Systems: a plain inventory, honestly presented. No fake proficiency
 * bars: groups, counts, and the credentials that back them.
 */
export function Skills() {
  let running = 0;

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            04 · Skills
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-[26ch] text-lede font-medium tracking-tight text-ink">
            The inventory behind the work. No proficiency percentages; tools are either in use or
            they are not listed.
          </h2>
        </Reveal>

        <div className="mt-[10vh] grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
          <div className="space-y-14">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 0.06}>
                <div className="border-ink/15 flex items-baseline justify-between border-t pt-4">
                  <p className="text-micro uppercase tracking-[0.16em] text-accent">
                    {group.id} · {group.label}
                  </p>
                  <p className="text-micro uppercase tabular-nums tracking-[0.16em] text-muted">
                    {group.items.length} items
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map(item => {
                    running += 1;
                    return (
                      <li
                        key={item}
                        className="border-ink/15 border px-3 py-1.5 text-sm text-ink transition-colors duration-300 hover:border-accent"
                      >
                        <span className="mr-2 text-micro tabular-nums text-muted">
                          {String(running).padStart(2, '0')}
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          <div className="space-y-12 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="border-ink/15 border-t pt-4">
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Education</p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-ink">
                  {profile.education.degree}
                </p>
                <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
                <p className="mt-1 text-micro uppercase tabular-nums tracking-[0.14em] text-muted">
                  {profile.education.period}
                </p>
                <div className="border-ink/15 mt-8 border p-6 text-center">
                  <p className="text-[clamp(3rem,4vw,4.5rem)] font-semibold tabular-nums leading-none tracking-tight text-ink">
                    {profile.education.cgpa}
                  </p>
                  <p className="mt-2 text-micro uppercase tracking-[0.16em] text-muted">
                    CGPA / 10
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border-ink/15 border-t pt-4">
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Credentials</p>
                <ul className="mt-4 space-y-3">
                  {certifications.map(cert => (
                    <li key={cert.name} className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-ink">{cert.name}</span>
                      <span className="shrink-0 text-micro uppercase tracking-[0.14em] text-muted">
                        {cert.issuer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
