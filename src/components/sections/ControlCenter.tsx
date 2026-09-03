'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { channelGlyphs } from '@/content/channelGlyphs';
import { skillGroups } from '@/content/systems';
import { navLinks } from '@/content/sections';

/**
 * Control center: a utility panel near the end of the page. Live clock
 * (IST), session uptime, current context, selected tools, brand channel
 * tiles, and navigation, in one bordered grid. Facts only: education,
 * roles, and tools that appear in the owner's source material. Links the
 * owner has not supplied yet stay visibly marked as coming soon.
 */
export function ControlCenter() {
  const selectedTools = [
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'Linux',
    'Wireshark',
    'Nmap',
    'AWS',
  ];
  const tools = selectedTools.filter(tool =>
    skillGroups.some(group => group.items.some(item => item.name === tool))
  );

  return (
    <section
      id="control"
      aria-label="Control center"
      className="theme-fade border-ink/10 border-t bg-paper px-5 py-[16vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Control center
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
            The utility panel. Everything operational, one place.
          </h2>
        </Reveal>

        {/* One instrument: outer frame with corner ticks, title strip,
            divided modules, and a footer strip. The gap-px grid keeps every
            division a crisp hairline. */}
        <div className="border-ink/15 relative mt-[8vh] border">
          <span aria-hidden="true" className="absolute -left-px -top-px h-1.5 w-1.5 bg-accent" />
          <span aria-hidden="true" className="absolute -right-px -top-px h-1.5 w-1.5 bg-accent" />
          <span aria-hidden="true" className="absolute -bottom-px -left-px h-1.5 w-1.5 bg-accent" />
          <span
            aria-hidden="true"
            className="absolute -bottom-px -right-px h-1.5 w-1.5 bg-accent"
          />
          <div className="border-ink/15 flex items-center justify-between border-b px-5 py-3 sm:px-7">
            <p className="text-micro uppercase tracking-[0.16em] text-muted">
              shikharsahay / control
            </p>
            <p className="flex items-center gap-2 text-micro uppercase tracking-[0.16em] text-muted">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              All systems nominal
            </p>
          </div>
          <div className="bg-ink/15 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {/* Now */}
            <Reveal className="bg-paper">
              <Module label="Now">
                <p className="text-sm leading-relaxed text-muted">
                  Recent: cybersecurity internship at Cyber Defenders, and an IT &amp; security
                  internship at Recipharm.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Ongoing: senior core member at GDG On Campus, VIT Vellore.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-micro uppercase tracking-[0.14em] text-muted">
                  <span className="h-px w-3 bg-accent" aria-hidden="true" />
                  Active on campus
                </span>
              </Module>
            </Reveal>

            {/* Local time */}
            <Reveal delay={0.05} className="bg-paper">
              <Module label="Vellore, India">
                <IstClock />
              </Module>
            </Reveal>

            {/* Studying */}
            <Reveal delay={0.1} className="bg-paper">
              <Module label="Studying">
                <p className="text-sm font-medium leading-relaxed text-ink">
                  {profile.education.degree}
                </p>
                <p className="mt-2 text-sm text-muted">{profile.education.school}</p>
                <p className="mt-1 text-micro uppercase tabular-nums tracking-[0.14em] text-muted">
                  {profile.education.period}
                </p>
              </Module>
            </Reveal>

            {/* Toolbox */}
            <Reveal delay={0.05} className="bg-paper">
              <Module label="Toolbox">
                <p className="text-lg leading-loose text-muted">
                  {tools.map((tool, i) => (
                    <span key={tool}>
                      <span className="text-ink transition-colors duration-300 hover:text-accent">
                        {tool}
                      </span>
                      {i < tools.length - 1 && <span className="text-ink/25 select-none"> / </span>}
                    </span>
                  ))}
                </p>
              </Module>
            </Reveal>

            {/* Channels: real interactive tiles with brand marks */}
            <Reveal delay={0.1} className="bg-paper">
              <Module label="Channels">
                <ul className="grid grid-cols-2 gap-2">
                  <ChannelTile
                    label="Email"
                    href={profile.links.email}
                    glyph={channelGlyphs.Email}
                  />
                  <ChannelTile
                    label="GitHub"
                    href={profile.links.github}
                    glyph={channelGlyphs.GitHub}
                    external
                  />
                  <ChannelTile
                    label="LinkedIn"
                    href={profile.links.linkedin}
                    glyph={channelGlyphs.LinkedIn}
                    external
                  />
                  <ChannelTile
                    label="Resume"
                    href={profile.links.resume}
                    glyph={channelGlyphs.Resume}
                    external
                  />
                </ul>
              </Module>
            </Reveal>

            {/* Navigate */}
            <Reveal delay={0.15} className="bg-paper">
              <Module label="Navigate">
                <ul className="space-y-2.5">
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
              </Module>
            </Reveal>
          </div>
          <div className="border-ink/15 flex items-center justify-between border-t px-5 py-3 sm:px-7">
            <p className="text-micro uppercase tracking-[0.16em] text-muted">
              Vellore, India · UTC +05:30
            </p>
            <p className="text-micro uppercase tracking-[0.16em] text-muted">
              <SessionUptime />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Module({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group/module flex h-full flex-col p-6 transition-colors duration-500 hover:bg-surface sm:p-7">
      <p className="border-ink/10 mb-4 flex items-center gap-2.5 border-b pb-3 text-micro uppercase tracking-[0.16em] text-accent">
        <span
          aria-hidden="true"
          className="inline-block h-1 w-1 rotate-45 bg-accent transition-transform duration-500 ease-expo group-hover/module:rotate-[135deg]"
        />
        {label}
      </p>
      {children}
    </div>
  );
}

function ChannelTile({
  label,
  href,
  glyph,
  external,
}: {
  label: string;
  href: string;
  glyph: { title: string; path: string };
  external?: boolean;
}) {
  // Links the owner has not supplied stay visibly marked instead of
  // pretending to work; the Resume tile points at /resume.pdf.
  const placeholder = href === '#';
  return (
    <li>
      <a
        href={href}
        {...(!placeholder && external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-disabled={placeholder || undefined}
        aria-label={placeholder ? `${label} (link coming soon)` : label}
        title={placeholder ? `${label} link coming soon` : label}
        className={`group/tile flex h-full min-h-[88px] flex-col items-center justify-center gap-2 border p-3 transition-all duration-500 ease-expo ${
          placeholder
            ? 'border-ink/10 cursor-default'
            : 'border-ink/15 hover:-translate-y-1 hover:border-accent hover:bg-surface focus-visible:border-accent'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
          className={`h-6 w-6 transition-colors duration-300 ${
            placeholder ? 'text-muted/60' : 'text-ink group-hover/tile:text-accent'
          }`}
        >
          <path d={glyph.path} />
        </svg>
        <span
          className={`text-micro uppercase tracking-[0.14em] transition-colors duration-300 ${
            placeholder ? 'text-muted/60' : 'text-muted group-hover/tile:text-ink'
          }`}
        >
          {label}
        </span>
        {placeholder && (
          <span className="text-[0.6rem] uppercase leading-none tracking-[0.14em] text-muted/50">
            soon
          </span>
        )}
      </a>
    </li>
  );
}

/** Seconds since this page load, ticking in the panel footer. */
function SessionUptime() {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(
      () => setSecs(Math.floor((Date.now() - start) / 1000)),
      1000
    );
    return () => window.clearInterval(id);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return (
    <span aria-hidden="true" className="tabular-nums">
      Session T+ {h}:{m}:{s}
    </span>
  );
}

function IstClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div>
      <p
        className="text-[clamp(2.5rem,4vw,3.75rem)] font-semibold tabular-nums leading-none tracking-tight text-ink"
        aria-label={time ? `Local time ${time} IST` : 'Local time'}
      >
        {time ?? '--:--:--'}
      </p>
      <p className="mt-3 text-micro uppercase tracking-[0.16em] text-muted">Indian standard time</p>
    </div>
  );
}
