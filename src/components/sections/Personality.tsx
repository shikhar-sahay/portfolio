'use client';

import { useState } from 'react';
import { fragments } from '@/content/personality';
import { NotesWall } from '@/components/sections/NotesWall';

/**
 * Pieces of Me: fragments of a person. Selecting a fragment
 * swaps the large serif word; captions are voice, not resume facts.
 * Keyboard accessible: fragments are buttons.
 */
export function Personality() {
  const [active, setActive] = useState(0);
  const fragment = fragments[active];

  return (
    <section
      id="pieces-of-me"
      aria-label="Pieces of Me"
      className="theme-fade relative overflow-hidden bg-paper px-5 py-[18vh] text-ink sm:px-10"
    >
      {/* Theme-following section: paper surface in light, warm charcoal in
          dark, like every other chapter. No fixed panel treatment. */}
      <div className="relative mx-auto max-w-6xl">
        <p className="flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Pieces of Me
        </p>

        <h2 className="mt-8 max-w-[24ch] text-lede font-medium tracking-tight text-ink">
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
                      : 'border-muted text-muted hover:border-ink hover:text-ink'
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
            <p className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] italic leading-none text-ink">
              {fragment.word}
            </p>
            <p className="mt-4 text-sm text-muted">{fragment.caption}</p>
          </div>
        </div>

        {/* Why the wall exists: the mosaic statement hands directly into
            the shared surface below. Copy is provisional (EXPERIMENTAL)
            until the owner approves it. */}
        <div className="mt-[12vh] max-w-[36ch]">
          <p className="text-lede font-medium tracking-tight text-ink">
            I am a mosaic of everyone I have ever known. If they are a piece of me, they deserve to
            be a piece of <em className="font-serif font-normal italic">this place</em> too.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Drag to look around. Open a note to reply, or leave one of your own. Be kind: everything
            here is public.
          </p>
        </div>

        <NotesWall />
      </div>
    </section>
  );
}
