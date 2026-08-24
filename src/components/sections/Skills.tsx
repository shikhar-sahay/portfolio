import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { certifications, skillGroups } from '@/content/systems';

/**
 * 04 / Skills: an editorial tool index, not a wall of badges. Each group
 * is a large serif heading with the tools as a flowing inline list;
 * hovering a tool pulls it into the accent. No fake proficiency bars:
 * tools are either in use or they are not listed.
 */
export function Skills() {
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
            Skills
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-[26ch] text-lede font-medium tracking-tight text-ink">
            The inventory behind the work. Tools are either in use or they are not listed.
          </h2>
        </Reveal>

        <div className="mt-[10vh] grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
          <div className="space-y-[9vh]">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 0.06}>
                <div className="border-ink/15 flex items-baseline justify-between border-t pt-5">
                  <h3 className="font-serif text-3xl italic tracking-tight text-ink sm:text-4xl">
                    {group.label}
                  </h3>
                  <p className="text-micro uppercase tabular-nums tracking-[0.16em] text-muted">
                    {group.items.length}
                  </p>
                </div>
                <p className="mt-5 max-w-[52ch] text-lg leading-loose text-muted">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      <span className="cursor-default text-ink transition-all duration-300 ease-expo hover:text-accent">
                        {item}
                      </span>
                      {i < group.items.length - 1 && (
                        <span className="text-ink/25 mx-2.5 select-none">/</span>
                      )}
                    </span>
                  ))}
                </p>
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
