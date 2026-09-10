import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content/profile';
import { channelGlyphs, type ChannelGlyphKey } from '@/content/channelGlyphs';
import { navLinks } from '@/content/sections';
import { FooterClock } from '@/components/sections/FooterClock';
import { FooterWordmark } from '@/components/sections/FooterWordmark';

/**
 * Footer: a compact contact block (gesture, direct lines, pages), a slim
 * resume moment, and the closing frame: the name as an interactive marquee.
 * The contact chapter arrives through whitespace; footer-internal rules
 * still structure the resume and credit rows.
 */
export function Contact() {
  return (
    <footer
      id="contact"
      aria-label="Contact and footer"
      className="theme-fade bg-paper pt-[10vh] sm:px-10 md:pt-[14vh]"
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
              Internships, collaborations, ideas that sound slightly unreasonable, or a good
              argument about football. My inbox is open.
            </p>
            <EmailLink />
            <FooterClock />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Elsewhere</p>
                <ul className="mt-4 space-y-1">
                  {profile.socials.map(social => (
                    <li key={social.label}>
                      <SocialRow label={social.label} href={social.href} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-micro uppercase tracking-[0.16em] text-accent">Pages</p>
                <ul className="mt-4 space-y-1">
                  {navLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-baseline gap-2 py-1.5 text-sm text-muted transition-colors duration-300 hover:text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block text-accent transition-transform duration-500 ease-expo group-hover:translate-x-0.5"
                        >
                          →
                        </span>
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
          <div className="border-ink/15 lm-line-soft mt-[7vh] flex flex-wrap items-center justify-between gap-5 border-t py-7 md:mt-[9vh]">
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
                href={profile.links.resumeFile}
                download
                className="border-ink/25 lm-line inline-flex items-center gap-2.5 border px-5 py-2.5 text-micro font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Download PDF
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Closing frame: the name, drifting, letter by letter */}
      <div className="mt-[7vh] pb-4 md:mt-[9vh]">
        <FooterWordmark />
      </div>

      <div className="border-ink/10 lm-line-soft mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t px-5 py-6 sm:px-0">
        <p className="text-micro uppercase tracking-[0.16em] text-muted">
          Designed and built by Shikhar Sahay
        </p>
        <p className="text-micro uppercase tracking-[0.16em] text-muted">PORTFOLIO / 26</p>
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
        <span aria-hidden="true" className="text-accent">
          &#9993;
        </span>
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
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-7 inline-flex items-baseline gap-3 text-lg font-medium tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-xl"
    >
      <span aria-hidden="true" className="text-accent">
        &#9993;
      </span>
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

/** One Elsewhere row: the real brand mark plus the channel name. The whole
    row is the link; handles never render here. Hover lifts the mark a
    pixel, shifts the row, and reveals an arrow. The mark lives in a fixed
    15px box so individual glyph proportions never move the row geometry.
    Server-rendered: placeholders stay plain text, never anchors. */
function SocialRow({ label, href }: { label: string; href: string }) {
  const placeholder = href === '#';
  const glyph = channelGlyphs[label as ChannelGlyphKey];
  const mark = glyph ? (
    <span
      aria-hidden="true"
      className="flex h-[15px] w-[15px] shrink-0 items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[15px] w-[15px] text-muted transition-all duration-500 ease-expo group-hover:-translate-y-px group-hover:text-accent"
      >
        <path d={glyph.path} />
      </svg>
    </span>
  ) : (
    <span aria-hidden="true" className="inline-block text-accent">
      →
    </span>
  );
  if (placeholder) {
    return (
      <span
        title={`${label} link coming soon`}
        className="text-muted/60 flex cursor-default items-center gap-3 py-1.5 text-sm"
      >
        {mark}
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 py-1.5 text-sm text-muted transition-all duration-300 hover:translate-x-0.5 hover:text-ink"
    >
      {mark}
      {label}
      <span
        aria-hidden="true"
        className="-translate-x-1 text-accent opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100"
      >
        →
      </span>
    </a>
  );
}
