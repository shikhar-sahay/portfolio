import { Reveal } from '@/components/ui/Reveal';
import { TechLogo, hasGlyph } from '@/components/ui/TechLogo';
import { certifications, skillGroups, type Skill } from '@/content/systems';

/**
 * Skills: each group is a slow drifting marquee of golden emblems, one
 * direction per row, pausing under the cursor. The emblem core holds the
 * real technology mark wherever one exists (vendored CC0 paths, drawn
 * monochrome to keep the editorial voice); tools without a mark keep
 * their serif monogram. No counts, no proficiency bars. Certifications
 * keep their own quiet register below.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[14vh] sm:px-10"
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

        <div className="mt-[9vh] space-y-[9vh]">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.05}>
              <div className="border-ink/15 border-t pt-5">
                <h3 className="font-serif text-3xl italic tracking-tight text-ink sm:text-4xl">
                  {group.label}
                </h3>
              </div>
              <SkillRow items={group.items} reverse={gi % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {/* Certifications: their own quiet register */}
        <Reveal>
          <div className="border-ink/15 mt-[11vh] border-t pt-5">
            <h3 className="text-micro uppercase tracking-[0.16em] text-accent">Certifications</h3>
            <ul className="mt-6 grid gap-x-14 sm:grid-cols-2">
              {certifications.map(cert => (
                <li
                  key={cert.name}
                  className="group/cert border-ink/10 flex items-center justify-between gap-4 border-b py-4"
                >
                  <span className="flex items-baseline gap-3 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className="border-ink/40 inline-block h-1.5 w-1.5 shrink-0 rotate-45 border transition-colors duration-500 group-hover/cert:border-accent group-hover/cert:bg-accent"
                    />
                    {cert.name}
                  </span>
                  <span className="shrink-0 text-micro uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover/cert:text-ink">
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

/**
 * One drifting row. The track holds two identical halves so the -50%
 * translate loops seamlessly; each half is repeated enough times to
 * always cover the widest container.
 */
function SkillRow({ items, reverse }: { items: Skill[]; reverse: boolean }) {
  const half: Skill[] = [];
  do {
    for (const item of items) half.push(item);
  } while (half.length < 12);
  const duration = `${20 + half.length * 2.2}s`;

  return (
    <div className={`marquee marquee-fade mt-8 ${reverse ? 'marquee-reverse' : ''}`}>
      <div
        className="marquee-track"
        style={{ ['--marquee-duration' as string]: duration }}
        aria-hidden="true"
      >
        {[...half, ...half].map((skill, i) => (
          <SkillEmblem key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
      {/* Screen readers get one static copy of the row */}
      <ul className="sr-only">
        {items.map(skill => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}

function SkillEmblem({ skill }: { skill: Skill }) {
  const logo = hasGlyph(skill.name);
  return (
    <div className="group mx-4 flex w-[88px] shrink-0 flex-col items-center gap-3 py-2">
      {/* Emblem frame: the core holds the real mark where one exists */}
      <div className="relative flex h-20 w-20 items-center justify-center">
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
          className="group-hover:bg-gold/10 absolute inset-[8px] rounded-full bg-surface transition-colors duration-500"
        />
        {logo ? (
          <TechLogo
            name={skill.name}
            className="relative h-7 w-7 text-ink transition-all duration-500 ease-expo group-hover:scale-110 group-hover:text-accent"
          />
        ) : (
          <span className="relative font-serif text-xl italic tracking-tight text-gold">
            {skill.abbr}
          </span>
        )}
      </div>
      <p className="text-center text-micro uppercase leading-tight tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-ink">
        {skill.name}
      </p>
    </div>
  );
}
