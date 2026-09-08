'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { certifications } from '@/content/systems';
import comptiaSecurityPlus from '@/assets/certifications/comptia-security-plus.png';
import googleCybersecurity from '@/assets/certifications/Google Cybersecurity Professional Certificate.png';
import ibmFundamentals from '@/assets/certifications/ibm-cybersecurity-fundamentals.png';
import ciscoIntro from '@/assets/certifications/cisco-intro-cybersecurity.png';

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * Display artwork for each credential, in `certifications` order. These
 * are the owner-supplied PNG files, imported without alteration.
 */
const certImages: StaticImageData[] = [
  comptiaSecurityPlus,
  googleCybersecurity,
  ibmFundamentals,
  ciscoIntro,
];

/**
 * Certifications: a compact accordion ledger, not an appendix and not a
 * showcase. Four equal-weight rows sit tight as one group; opening a row
 * unfolds the actual certificate out of the same box (same geometry, no
 * modal, no overlay). At most one certificate is open at a time. The
 * Verify link stays a sibling of the toggle so it never disturbs it.
 * Client only for the open state plus choreography; reduced motion gets
 * static rows with an instant open and close.
 */
export function Certifications() {
  const reduce = useMountedReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="theme-fade bg-paper px-5 pb-[12vh] pt-[14vh] sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Certifications
        </p>
        <h2 className="mt-8 max-w-[22ch] text-lede font-medium tracking-tight text-ink">
          Earned, <em className="font-serif font-normal italic">verifiable.</em>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Four credentials. Each one opens its proof.
        </p>

        <ol className="mt-[6vh]">
          {certifications.map((cert, i) => (
            <CertRow
              key={cert.name}
              index={i}
              open={openIndex === i}
              reduce={reduce}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function CertRow({
  index,
  open,
  reduce,
  onToggle,
}: {
  index: number;
  open: boolean;
  reduce: boolean;
  onToggle: () => void;
}) {
  const cert = certifications[index];
  const toggleId = `cert-toggle-${index}`;
  const panelId = `cert-panel-${index}`;

  return (
    <motion.li
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={reduce ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={reduce ? undefined : { duration: 0.9, delay: index * 0.07, ease }}
      className="border-t last:border-b"
      style={{ borderColor: 'color-mix(in srgb, var(--ink) 15%, transparent)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 sm:py-6">
        <button
          type="button"
          id={toggleId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex min-w-0 flex-1 cursor-pointer items-center gap-4 text-left sm:gap-5"
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rotate-45 border transition-colors duration-300 ${
              open ? 'border-accent bg-accent' : 'border-ink group-hover:border-accent'
            }`}
          />
          <span className="min-w-0">
            <span className="block text-micro uppercase tracking-[0.16em] text-accent">
              {cert.issuer}
            </span>
            <span className="mt-1 block text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
              {cert.name}
            </span>
          </span>
        </button>
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cert.name}, verified by ${cert.issuer}`}
          title={`Verify ${cert.name} on ${new URL(cert.url).hostname}`}
          className="group/link inline-flex shrink-0 items-baseline gap-2 border px-4 py-2.5 text-micro font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
          style={{ borderColor: 'color-mix(in srgb, var(--ink) 20%, transparent)' }}
        >
          Verify
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 ease-expo group-hover/link:-translate-y-px group-hover/link:translate-x-px"
          >
            ↗
          </span>
        </a>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={toggleId}
        className={`grid ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${
          open ? 'visible' : 'invisible'
        } ${reduce ? '' : 'transition-[grid-template-rows,visibility] duration-500 ease-expo'}`}
      >
        <div className="overflow-hidden">
          <div
            className={`pb-8 pt-1 ${
              reduce ? '' : 'transition-[opacity,transform] duration-500 ease-expo'
            } ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
          >
            <Image
              src={certImages[index]}
              alt={`${cert.name} certificate`}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 880px"
              className="h-auto w-full max-w-[880px]"
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
