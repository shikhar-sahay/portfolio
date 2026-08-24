'use client';

import { useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { skillGroups } from '@/content/systems';
import { navLinks } from '@/content/sections';

/**
 * Control center: a utility panel near the end of the page. Live clock
 * (IST), current context, selected tools, and every important link, in
 * one bordered grid. Facts only: education, roles, and tools that appear
 * in the owner's source material.
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

        <div className="border-ink/15 bg-ink/15 mt-[8vh] grid gap-px sm:grid-cols-2 lg:grid-cols-3">
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
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
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

          {/* Direct lines */}
          <Reveal delay={0.1} className="bg-paper">
            <Module label="Direct lines">
              <ul className="space-y-2.5">
                <ControlLink label="Email" href={profile.links.email} />
                <ControlLink label="GitHub" href={profile.links.github} />
                <ControlLink label="LinkedIn" href={profile.links.linkedin} />
                <ControlLink label="Resume" href={profile.links.resume} />
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
      </div>
    </section>
  );
}

function Module({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-ink/10 flex h-full flex-col p-6 transition-colors duration-500 hover:bg-surface sm:p-7">
      <p className="mb-4 flex items-center gap-2.5 text-micro uppercase tracking-[0.16em] text-accent">
        <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
        {label}
      </p>
      {children}
    </div>
  );
}

function ControlLink({ label, href }: { label: string; href: string }) {
  const placeholder = href === '#';
  return (
    <a
      href={href}
      {...(label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-disabled={placeholder || undefined}
      title={placeholder ? `${label} link coming soon` : undefined}
      className={`group inline-flex items-baseline gap-2 text-sm transition-colors duration-300 ${
        placeholder ? 'text-muted/60 cursor-default' : 'text-muted hover:text-ink'
      }`}
    >
      <span className="h-px w-2 bg-accent transition-all duration-500 ease-expo group-hover:w-4" />
      {label}
    </a>
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
