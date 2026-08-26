'use client';

import { useReducedMotion } from 'motion/react';
import { InteractiveLetters } from '@/components/ui/InteractiveLetters';
import { profile } from '@/content/profile';

/**
 * The closing frame: the name as a slow infinite marquee, each letter
 * reactive under the pointer. The track is two identical groups so the
 * -50% translate loops seamlessly. Reduced motion gets a single fitted,
 * static wordmark instead.
 */
export function FooterWordmark() {
  const reduce = useReducedMotion();
  const name = profile.name.toUpperCase();

  if (reduce) {
    return (
      <div className="overflow-hidden" aria-hidden="true">
        <p className="flex items-baseline justify-center whitespace-nowrap px-2 text-[10.2vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink">
          <InteractiveLetters text={name} lift={0.1} tint="none" />
        </p>
      </div>
    );
  }

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-baseline">
      {[0, 1].map(copy => (
        <span key={copy} className="flex items-baseline">
          <InteractiveLetters
            text={name}
            lift={0.16}
            className="whitespace-nowrap text-[9.5vw] font-semibold uppercase leading-none tracking-[-0.02em] text-ink"
          />
          <span
            aria-hidden="true"
            className="bg-accent mx-[0.45em] inline-block h-[0.09em] w-[0.09em] shrink-0 rotate-45 self-center"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee marquee-fade overflow-hidden" aria-hidden="true">
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: '38s' }}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}
