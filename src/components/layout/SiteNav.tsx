'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { navLinks, sections } from '@/content/sections';
import { Magnetic } from '@/components/ui/Magnetic';

/**
 * Persistent site header. Behaves like a high-end site navigation:
 *
 * - At the top of the page: transparent, generous breathing room
 * - After scrolling: compact, subtle paper backdrop with a hairline edge
 * - Scrolling down (past the hero): tucks away
 * - Scrolling up: returns immediately, always discoverable
 * - Section-aware: the active link carries an accent underline (IO-driven)
 *
 * Never disappears permanently; never blocks content.
 */
export function SiteNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [active, setActive] = useState(sections[0]);
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, 'change', y => {
    const pastHero = y > 480;
    const scrollingDown = y > prevY.current + 4;
    const scrollingUp = y < prevY.current - 4;
    if (scrollingDown && pastHero) setTucked(true);
    else if (scrollingUp || !pastHero) setTucked(false);
    setCompact(y > 64);
    prevY.current = y;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sections.find(s => s.id === entry.target.id);
            if (match) setActive(match);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const linkHover =
    'relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-expo hover:after:scale-x-100 focus-visible:after:scale-x-100';

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-accent"
        style={{ scaleX: reduce ? 0 : scrollYProgress }}
        aria-hidden="true"
      />

      <motion.header
        animate={reduce ? undefined : { y: tucked ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-expo ${
            compact
              ? 'border-ink/10 bg-paper/85 border-b backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-4 px-5 transition-all duration-500 ease-expo sm:px-10 ${
              compact ? 'py-3' : 'py-5 sm:py-7'
            }`}
          >
            <Magnetic>
              <a
                href="#top"
                aria-label="Back to top"
                className={`inline-block whitespace-nowrap font-semibold uppercase tracking-[0.16em] text-ink transition-opacity duration-300 hover:opacity-60 ${linkHover} ${
                  compact ? 'text-micro' : 'text-micro sm:text-sm'
                }`}
              >
                S. Sahay
              </a>
            </Magnetic>

            <ul className="flex items-center gap-3.5 sm:gap-7">
              {navLinks.map(link => {
                const section = sections.find(s => `#${s.id}` === link.href);
                const isActive = section?.id === active.id;
                return (
                  <li key={link.label}>
                    <Magnetic strength={0.3} max={4}>
                      <a
                        href={link.href}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative inline-block text-micro uppercase tracking-[0.16em] transition-colors duration-300 ${linkHover} ${
                          isActive ? 'text-ink after:scale-x-100' : 'text-muted hover:text-ink'
                        }`}
                      >
                        {link.label}
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
