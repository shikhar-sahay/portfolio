import { Reveal } from '@/components/ui/Reveal';
import { certifications, skillGroups, type Skill } from '@/content/systems';

/**
 * 04 / Skills: each technology is a small golden emblem, an object rather
 * than a line of text. The gold exists only here (and in certifications),
 * so it reads as its own material within the palette. No proficiency bars,
 * no pills. Education lives in the control center and footer.
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

        <div className="mt-[10vh] space-y-[10vh]">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.05}>
              <div className="border-ink/15 flex items-baseline justify-between border-t pt-5">
                <h3 className="font-serif text-3xl italic tracking-tight text-ink sm:text-4xl">
                  {group.label}
                </h3>
                <p className="text-micro uppercase tabular-nums tracking-[0.16em] text-muted">
                  {group.items.length}
                </p>
              </div>
              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-9">
                {group.items.map(skill => (
                  <li key={skill.name}>
                    <SkillEmblem skill={skill} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Certifications: their own quiet register */}
        <Reveal>
          <div className="border-ink/15 mt-[12vh] border-t pt-5">
            <h3 className="text-micro uppercase tracking-[0.16em] text-accent">Certifications</h3>
            <ul className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {certifications.map(cert => (
                <li
                  key={cert.name}
                  className="border-ink/10 flex items-baseline justify-between gap-4 border-b pb-3"
                >
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
    </section>
  );
}

function SkillEmblem({ skill }: { skill: Skill }) {
  return (
    <div className="group flex w-[76px] flex-col items-center gap-3">
      {/* Emblem: gold ring, monogram core, a dashed orbit that wakes on hover */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span
          aria-hidden="true"
          className="border-gold/60 absolute inset-0 rounded-full border transition-transform duration-700 ease-expo group-hover:rotate-90"
        />
        <span
          aria-hidden="true"
          className="border-gold/0 group-hover:border-gold/40 absolute -inset-1.5 rounded-full border border-dashed transition-all duration-700 group-hover:rotate-45"
        />
        <span
          aria-hidden="true"
          className="group-hover:bg-gold/10 absolute inset-[7px] rounded-full bg-surface transition-colors duration-500"
        />
        <span className="relative font-serif text-lg italic tracking-tight text-gold">
          {skill.abbr}
        </span>
      </div>
      <p className="text-center text-micro uppercase leading-tight tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-ink">
        {skill.name}
      </p>
    </div>
  );
}
