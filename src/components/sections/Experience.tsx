'use client';

import { Fragment, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { WordReveal } from '@/components/ui/WordReveal';
import { orgTimeline, type EggTarget, type OrgEntry } from '@/content/experience';
import { EggPhrase } from '@/components/sections/ExperienceEggs';
import { OrgArtifact } from '@/components/sections/ExperienceArtifacts';

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * Experience: one visual timeline grouped by organization, one node per
 * org. A hairline spine fills with accent as the visitor scrolls; org
 * blocks alternate sides on wide screens and stack along the spine on
 * small ones. The org name (an external link when a URL exists) appears
 * once; roles inside read as progression (title, period, prose) parted
 * by an extremely restrained hairline. Multi-role orgs get full height:
 * nothing is compressed to shorten the timeline.
 */
export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.78', 'end 0.55'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
  };

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="theme-fade bg-paper px-5 py-[14vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...reveal}
          transition={{ duration: 0.9, ease }}
          className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted"
        >
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Experience
        </motion.p>

        <WordReveal
          className="mt-8 max-w-[30ch] text-lede font-medium tracking-tight"
          segments={[
            {
              text: "I've worked across software, security, communities, and early-stage teams. ",
            },
            { text: 'different rooms, same instinct: find the problem and get to work.', em: true },
          ]}
        />

        {/* The timeline */}
        <div ref={listRef} className="relative mt-[10vh]">
          {/* Spine: base hairline plus the accent fill that draws with scroll.
              Both are 1px wide and shifted by half their width, so the axis
              sits exactly on the container midpoint and the fill passes
              through the exact center of every marker. */}
          <div
            aria-hidden="true"
            className="bg-ink/15 absolute bottom-0 left-[7px] top-0 w-px -translate-x-1/2 lg:left-1/2"
          />
          {/* Positioning wrapper holds the axis; the inner line only scales,
              so Motion's inline transform can never disturb the geometry. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px -translate-x-1/2 lg:left-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-accent"
              style={reduce ? { scaleY: 1 } : { scaleY: spineScale }}
            />
          </div>

          <ol className="space-y-[11vh] lg:space-y-[13vh]">
            {orgTimeline.map((entry, i) => (
              <OrgBlock key={entry.org} entry={entry} index={i} reveal={reveal} reduce={reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Role prose with its Easter egg phrase split out. Fail-safe: if the
 * target ever stops matching, the paragraph renders whole, so copy can
 * never break and the joined text always equals the source string.
 */
function Prose({ body, egg }: { body: string; egg?: EggTarget }) {
  if (!egg) return <>{body}</>;
  const i = body.indexOf(egg.target);
  if (i === -1) return <>{body}</>;
  return (
    <>
      {body.slice(0, i)}
      <EggPhrase kind={egg.kind} text={egg.target} />
      {body.slice(i + egg.target.length)}
    </>
  );
}

function OrgBlock({
  entry,
  index,
  reveal,
  reduce,
}: {
  entry: OrgEntry;
  index: number;
  reveal: {
    initial: { opacity: number; y: number };
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; margin: string };
  };
  reduce: boolean;
}) {
  const left = index % 2 === 0;
  // Keyboard spotlight: focusing the org link wakes its artifact with
  // the same gentle engagement pointer users get (no extra tab stops;
  // the figure itself stays decorative and unfocusable).
  const [linkHot, setLinkHot] = useState(false);
  return (
    <motion.li
      {...reveal}
      transition={{ duration: 0.8, ease }}
      className="group relative max-lg:pl-10 lg:grid lg:grid-cols-[1fr_3rem_1fr] lg:items-start"
    >
      {/* Marker: outer span owns the axis position; the middle span plays
          the entrance; the diamond itself handles hover. Splitting the
          three jobs keeps Motion's inline transforms from ever shifting
          the marker off the spine. */}
      <span
        aria-hidden="true"
        className="absolute left-[1px] top-[0.5em] lg:left-1/2 lg:-translate-x-1/2"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, ease }}
          className="block h-3 w-3"
        >
          <span className="border-ink/40 block h-3 w-3 rotate-45 border bg-paper transition-all duration-500 ease-expo group-hover:rotate-[135deg] group-hover:scale-125 group-hover:border-accent group-hover:bg-accent" />
        </motion.span>
      </span>

      <div
        className={
          left
            ? 'lg:col-start-1 lg:row-start-1 lg:pr-4 lg:text-right'
            : 'lg:col-start-3 lg:row-start-1 lg:pl-4'
        }
      >
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            onFocus={() => setLinkHot(true)}
            onBlur={() => setLinkHot(false)}
            className="group/org inline-flex items-baseline gap-2"
            aria-label={`${entry.org} (opens in a new tab)`}
          >
            <h3 className="text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover/org:text-accent sm:text-2xl">
              {entry.org}
            </h3>
            <span
              aria-hidden="true"
              className="text-base text-muted transition-all duration-500 ease-expo group-hover/org:-translate-y-px group-hover/org:translate-x-px group-hover/org:text-accent"
            >
              ↗
            </span>
          </a>
        ) : (
          <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{entry.org}</h3>
        )}

        {/* Roles read as a progression: a restrained hairline parts the
            steps (solid token plus element opacity, never a dead
            opacity modifier), each step reveals with its own stagger. */}
        <ul className="mt-5">
          {entry.roles.map((role, ri) => {
            const body = (
              <>
                <div
                  className={`flex flex-wrap items-baseline gap-x-4 gap-y-0.5 ${
                    left ? 'lg:justify-end' : ''
                  }`}
                >
                  <p className="text-sm font-semibold text-ink">{role.role}</p>
                  <p className="text-micro uppercase tabular-nums tracking-[0.14em] text-accent">
                    {role.period}
                  </p>
                </div>
                <p
                  className={`group-hover/role:text-ink/80 mt-1 max-w-[58ch] text-pretty text-sm leading-relaxed text-muted transition-colors duration-500 ${
                    left ? 'lg:ml-auto' : ''
                  }`}
                >
                  <Prose body={role.body} egg={role.egg} />
                </p>
              </>
            );
            return reduce ? (
              <li key={role.role} className="group/role py-4 first:pt-0 last:pb-0">
                {ri > 0 && <div aria-hidden="true" className="mb-4 h-px bg-ink opacity-15" />}
                {body}
              </li>
            ) : (
              <motion.li
                key={role.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: ri * 0.09, ease }}
                className="group/role py-4 first:pt-0 last:pb-0"
              >
                {ri > 0 && <div aria-hidden="true" className="mb-4 h-px bg-ink opacity-15" />}
                {body}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Identity object in the negative space opposite the text. */}
      <OrgArtifact artifact={entry.artifact} left={left} reduce={reduce} spotlight={linkHot} />
    </motion.li>
  );
}
