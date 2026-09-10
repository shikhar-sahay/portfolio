'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import { navLinks, sections } from '@/content/sections';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

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
  const reduce = useMountedReducedMotion();
  const [compact, setCompact] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [active, setActive] = useState(sections[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevY = useRef(0);
  const panelRef = useRef<HTMLElement>(null);

  // Mobile menu: Escape closes from anywhere, and opening moves focus to
  // the first destination so keyboard users continue from the menu.
  useEffect(() => {
    if (!menuOpen) return;
    panelRef.current?.querySelector('a')?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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

  // Brand lockup variant: the underline lives on the text span (never the
  // diamond), so it answers to the whole link through group triggers. The
  // unfocusable span can never be :hover/:focus-visible itself.
  const brandHover =
    'relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-expo group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100';

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
          className={`nav-shell transition-all duration-500 ease-expo ${
            compact
              ? 'border-ink/10 bg-paper/85 lm-nav border-b backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-3 px-4 transition-all duration-500 ease-expo sm:gap-4 sm:px-10 ${
              compact ? 'py-3' : 'py-5 sm:py-7'
            }`}
          >
            <a
              href="#top"
              aria-label="Back to top"
              className={`group inline-flex items-center gap-2.5 whitespace-nowrap font-semibold uppercase text-ink transition-opacity duration-300 hover:opacity-60 ${
                compact ? 'text-micro' : 'text-micro sm:text-sm'
              }`}
            >
              <span
                aria-hidden="true"
                className="h-[9px] w-[9px] rotate-45 bg-accent transition-transform duration-500 ease-expo group-hover:rotate-90 group-hover:scale-110 motion-reduce:group-hover:rotate-45 motion-reduce:group-hover:scale-100"
              />
              <span className={`tracking-[0.16em] ${brandHover}`}>Portfolio / 26</span>
            </a>

            {/* Six destinations fit one premium row from md up; below
                that the links collapse into a disclosure menu instead of
                shrinking into unreadable text. */}
            <ul className="hidden items-center gap-4 lg:flex lg:gap-6 xl:gap-7">
              {navLinks.map(link => {
                const section = sections.find(s => `#${s.id}` === link.href);
                const isActive = section?.id === active.id;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative inline-block whitespace-nowrap text-micro uppercase tracking-[0.1em] transition-colors duration-300 xl:tracking-[0.16em] ${linkHover} ${
                        isActive ? 'text-ink after:scale-x-100' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li aria-hidden="true" className="h-3 w-px bg-ink opacity-20" />
              <li>
                <ThemeToggle />
              </li>
            </ul>
            <div className="flex items-center gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(v => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="text-micro uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:text-ink"
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>
              <ThemeToggle />
            </div>
          </nav>
          {menuOpen && (
            <nav
              id="mobile-nav"
              aria-label="Mobile"
              ref={panelRef}
              className="border-t border-ink bg-paper px-4 py-2 lg:hidden"
            >
              <ul className="divide-y divide-ink">
                {navLinks.map(link => {
                  const section = sections.find(s => `#${s.id}` === link.href);
                  const isActive = section?.id === active.id;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={e => {
                          // Close first: unmounting the panel shifts layout,
                          // so the hash jump waits a beat for it to settle.
                          e.preventDefault();
                          setMenuOpen(false);
                          window.setTimeout(() => {
                            window.location.hash = link.href;
                          }, 80);
                        }}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex items-center justify-between py-3 text-micro uppercase tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? 'text-ink' : 'text-muted hover:text-ink'
                        }`}
                      >
                        {link.label}
                        <span aria-hidden="true" className="text-accent">
                          {isActive ? '●' : '→'}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </motion.header>
    </>
  );
}
