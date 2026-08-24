'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { navLinks, sections } from '@/content/sections';

/**
 * Navigation instrument: scroll progress hairline, live section readout
 * (number + name via IntersectionObserver), quiet links. Hidden while the
 * hero aperture owns the viewport, present everywhere else.
 */
export function SiteNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [heroEnd, setHeroEnd] = useState(1600);
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById('top');
      setHeroEnd(hero ? hero.offsetHeight - window.innerHeight * 0.5 : 1600);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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

  // Fade out while the aperture expands, return once content sections arrive.
  const navOpacity = useTransform(scrollY, [140, 460, heroEnd - 200, heroEnd], [1, 0, 0, 1]);
  const navY = useTransform(scrollY, [140, 460, heroEnd - 200, heroEnd], [0, -12, -12, 0]);
  const [navHidden, setNavHidden] = useState(false);
  useMotionValueEvent(navOpacity, 'change', v => setNavHidden(v < 0.05));

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
        data-blend=""
        style={
          reduce
            ? undefined
            : { opacity: navOpacity, y: navY, pointerEvents: navHidden ? 'none' : undefined }
        }
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      >
        <div className="anim-fade-in [animation-delay:1.5s]">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6"
          >
            <div className="flex items-baseline gap-4">
              <a
                href="#top"
                className={`hidden whitespace-nowrap text-micro font-semibold uppercase tracking-[0.16em] text-white transition-opacity duration-300 hover:opacity-60 sm:inline ${linkHover}`}
              >
                S. Sahay
              </a>
              <p
                className="hidden text-micro uppercase tabular-nums tracking-[0.16em] text-white/70 md:block"
                aria-live="polite"
              >
                {active.number} / 07 {active.name}
              </p>
            </div>
            <ul className="flex items-center gap-3.5 sm:gap-7">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-micro uppercase tracking-[0.16em] text-white/70 transition-colors duration-300 hover:text-white ${linkHover}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
