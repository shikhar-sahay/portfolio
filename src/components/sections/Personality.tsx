'use client';

import { useState } from 'react';
import { fragments } from '@/content/personality';
import { MarkWall } from '@/components/sections/MarkWall';

/**
 * 06 / Personality: fragments of a person. Selecting a fragment
 * swaps the large serif word; captions are voice, not resume facts.
 * Keyboard accessible: fragments are buttons.
 */
export function Personality() {
  const [active, setActive] = useState(0);
  const fragment = fragments[active];

  return (
    <section
      id="personality"
      aria-label="Personality"
      className="theme-fade border-ink/10 relative overflow-hidden border-t bg-ink px-5 py-[18vh] text-paper sm:px-10"
    >
      {/* Inverted panel: the site's one full-tone shift */}
      <div className="relative mx-auto max-w-6xl">
        <p className="text-paper/50 flex items-center gap-3 text-micro uppercase tracking-[0.16em]">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Personality
        </p>

        <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-paper">
          Resumes list skills. This lists <em className="font-serif font-normal italic">fuel</em>.
          Pick a fragment.
        </h2>

        {/* Fixed word column: the longest word ("Communities", 424px at
            desktop) must never resize the button column, or hovering
            between fragments reflows the buttons under the cursor and the
            active state chases itself. Width depends on viewport only. */}
        <div className="mt-[10vh] grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_28rem]">
          {/* Fragment selector */}
          <ul className="flex flex-wrap gap-2.5" role="list">
            {fragments.map((f, i) => (
              <li key={f.word}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`border px-3.5 py-2 text-sm tracking-tight transition-all duration-300 ease-expo ${
                    i === active
                      ? 'border-accent bg-accent text-paper'
                      : 'border-paper/25 text-paper/70 hover:border-paper/60 hover:text-paper'
                  }`}
                >
                  <span className="mr-2 text-micro tabular-nums opacity-70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {f.word}
                </button>
              </li>
            ))}
          </ul>

          {/* Large word display */}
          <div className="min-h-[9rem] lg:min-h-0 lg:text-right" aria-live="polite">
            <p className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] italic leading-none text-paper">
              {fragment.word}
            </p>
            <p className="text-paper/60 mt-4 text-sm">{fragment.caption}</p>
          </div>
        </div>

        <MarkWall />
      </div>
    </section>
  );
}
