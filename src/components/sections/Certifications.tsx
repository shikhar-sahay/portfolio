'use client';

import { motion } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { certifications } from '@/content/systems';

const ease = [0.19, 1, 0.22, 1] as const;

/**
 * Certifications: its own editorial chapter after Skills, not an
 * appendix to the tools. A credential ledger: generous air, hairline
 * rules, one credential per row arriving with a mask wipe as the
 * visitor scrolls (physical progression, never a fade-up queue). The
 * first credential leads larger; every row carries its verification
 * link as a first-class interaction. Client only for the scroll
 * choreography; reduced motion renders the full ledger statically.
 */
export function Certifications() {
  const reduce = useMountedReducedMotion();

  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="theme-fade bg-paper px-5 pb-[16vh] pt-[20vh] sm:px-10"
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

        <ol className="mt-[8vh]">
          {certifications.map((cert, i) =>
            reduce ? (
              <CertRow key={cert.name} index={i} />
            ) : (
              <motion.div
                key={cert.name}
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.07, ease }}
              >
                <CertRow index={i} />
              </motion.div>
            )
          )}
        </ol>
      </div>
    </section>
  );
}

function CertRow({ index }: { index: number }) {
  const cert = certifications[index];
  const featured = index === 0;
  return (
    <li className="border-ink/15 group border-t py-7 last:border-b sm:py-9">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <p className="text-micro uppercase tracking-[0.16em] text-accent">{cert.issuer}</p>
          <p
            className={`mt-2 font-semibold tracking-tight text-ink ${
              featured ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
            }`}
          >
            {cert.name}
          </p>
        </div>
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cert.name}, verified by ${cert.issuer}`}
          title={`Verify ${cert.name} on ${new URL(cert.url).hostname}`}
          className="group/link border-ink/20 inline-flex shrink-0 items-baseline gap-2 border px-4 py-2.5 text-micro font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
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
    </li>
  );
}
