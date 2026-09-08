import { Reveal } from '@/components/ui/Reveal';
import { TechLogo, hasGlyph } from '@/components/ui/TechLogo';
import { skillGroups, type Skill } from '@/content/systems';

/**
 * Toolkit (Skills): each group is a slow drifting marquee of golden
 * emblems, one direction per row, pausing under the cursor. The emblem
 * core holds the real technology mark wherever one exists (vendored CC0
 * paths, drawn monochrome to keep the editorial voice); tools without a
 * mark keep their serif monogram. No counts, no proficiency bars. The
 * Certifications ledger chapter follows inside the same Toolkit region.
 */
export function Skills() {
  return (
    <section
      id="toolkit"
      aria-label="Toolkit"
      className="theme-fade bg-paper px-5 py-[14vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Toolkit
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
            className="text-ink transition-all duration-500 ease-expo group-hover:scale-110 group-hover:text-accent"
          />
        ) : (
          <span className="relative font-serif text-xl italic tracking-tight text-ink transition-colors duration-500 group-hover:text-accent">
            {skill.abbr}
          </span>
        )}
      </div>
      <p className="flex min-h-[2.6em] items-center justify-center text-center text-micro uppercase leading-tight tracking-[0.12em] text-muted transition-colors duration-300 [text-wrap:balance] group-hover:text-ink">
        {skill.name}
      </p>
    </div>
  );
}
