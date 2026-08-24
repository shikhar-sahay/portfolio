'use client';

import { useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { navLinks } from '@/content/sections';

/**
 * Navigation instrument: scroll progress hairline, quiet links. Fades out
 * while the hero aperture owns the viewport; scroll behavior is revisited
 * in the header rebuild.
 */
export function SiteNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  // Fade out while the aperture expands, return once content sections arrive.
  const navOpacity = useTransform(scrollY, [140, 460, 1400, 1600], [1, 0, 0, 1]);
  const navY = useTransform(scrollY, [140, 460, 1400, 1600], [0, -12, -12, 0]);
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
        style={
          reduce
            ? undefined
            : { opacity: navOpacity, y: navY, pointerEvents: navHidden ? 'none' : undefined }
        }
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="anim-fade-in [animation-delay:1.5s]">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-6"
          >
            <a
              href="#top"
              className={`hidden whitespace-nowrap text-micro font-semibold uppercase tracking-[0.16em] text-white transition-opacity duration-300 hover:opacity-60 sm:inline ${linkHover}`}
            >
              S. Sahay
            </a>
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
