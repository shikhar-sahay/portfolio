'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import portrait from '../../assets/shikhar-hero.jpg';
import { profile } from '@/content/profile';

/**
 * 01 / Identity. The portrait is an instrument: a circular aperture with a
 * technical ring system (hairline orbit, dashed ring, rotating accent arc,
 * coordinate labels). Scrolling does NOT zoom the face: the composition
 * changes scenes. Typography separates into layers, the instrument exits
 * laterally, and a hairline draws to hand off into About.
 */
export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer parallax: the crop drifts toward the cursor, the ring system
  // drifts slightly against it. Fine pointers only, never under reduced
  // motion. Spring-smoothed, values normalized to -1..1.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 55, damping: 18 });
  const spy = useSpring(py, { stiffness: 55, damping: 18 });
  const photoX = useTransform(spx, [-1, 1], [9, -9]);
  const photoY = useTransform(spy, [-1, 1], [7, -7]);
  const ringX = useTransform(spx, [-1, 1], [-6, 6]);
  const ringY = useTransform(spy, [-1, 1], [-5, 5]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = sceneRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [px, py, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  // Scene change: typography separates into layers, the instrument exits
  // laterally, a hairline draws to hand content over to About.
  const nameAY = useTransform(scrollYProgress, [0, 0.55, 1], ['0svh', '-9svh', '-12svh']);
  const nameAX = useTransform(scrollYProgress, [0, 0.55, 1], ['0vw', '-5vw', '-6vw']);
  const nameAO = useTransform(scrollYProgress, [0.12, 0.5, 1], [1, 0, 0]);
  const nameBY = useTransform(scrollYProgress, [0, 0.55, 1], ['0svh', '7svh', '10svh']);
  const nameBX = useTransform(scrollYProgress, [0, 0.55, 1], ['0vw', '4vw', '5vw']);
  const nameBO = useTransform(scrollYProgress, [0.16, 0.55, 1], [1, 0, 0]);
  const metaO = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0]);
  const instrumentX = useTransform(scrollYProgress, [0, 0.6, 1], ['0vw', '14vw', '22vw']);
  const instrumentY = useTransform(scrollYProgress, [0, 1], ['0svh', '-8svh']);
  const instrumentS = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const instrumentO = useTransform(scrollYProgress, [0.55, 0.9, 1], [1, 1, 0]);
  const handoffLine = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);
  const cueO = useTransform(scrollYProgress, [0, 0.12, 1], [1, 0, 0]);

  const scroll = (style: Record<string, unknown>) => (reduceMotion ? undefined : { style });

  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div ref={sceneRef} id="top" className="relative h-[150svh]">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="grid w-full grid-cols-1 items-center gap-10 px-5 pb-16 pt-24 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pb-0 lg:pt-0">
          {/* Identity column */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.p
              className="mb-6 flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted sm:mb-8"
              {...scroll({ opacity: metaO })}
            >
              <span
                className="anim-fade-in inline-block h-px w-10 bg-accent [animation-delay:calc(var(--intro-delay)+0.2s)]"
                aria-hidden="true"
              />
              <span className="anim-fade-in [animation-delay:calc(var(--intro-delay)+0.2s)]">
                Portfolio, 2026
              </span>
            </motion.p>

            <h1 className="select-none text-display uppercase">
              <motion.span className="block" {...scroll({ y: nameAY, x: nameAX, opacity: nameAO })}>
                <span className="anim-mask">
                  <span className="[animation-delay:calc(var(--intro-delay)+0.25s)]">Shikhar</span>
                </span>
              </motion.span>
              <motion.span
                className="block pl-[8vw] lg:pl-[4vw]"
                {...scroll({ y: nameBY, x: nameBX, opacity: nameBO })}
              >
                <span className="anim-mask">
                  <span className="type-outline [animation-delay:calc(var(--intro-delay)+0.4s)]">
                    Sahay
                  </span>
                </span>
              </motion.span>
            </h1>

            <motion.div {...scroll({ opacity: metaO })}>
              <p className="anim-fade-rise mt-6 max-w-[26ch] text-lede font-medium tracking-tight text-ink [animation-delay:calc(var(--intro-delay)+0.6s)] sm:mt-8">
                {profile.statementPre}
                <em className="font-serif font-normal italic">{profile.statementEm}</em>
              </p>

              {/* Compact personal context: part of the composition, not cards */}
              <div className="anim-fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 [animation-delay:calc(var(--intro-delay)+0.8s)]">
                <p className="text-micro uppercase tracking-[0.16em] text-muted">
                  CS @ VIT Vellore
                </p>
                <span className="bg-ink/25 hidden h-3 w-px sm:block" aria-hidden="true" />
                <p className="text-micro uppercase tracking-[0.16em] text-muted">
                  Software, security &amp; the web
                </p>
              </div>
            </motion.div>
          </div>

          {/* Portrait instrument */}
          <motion.div
            className="relative z-0 order-1 mx-auto w-[62vw] max-w-[300px] sm:w-[44vw] sm:max-w-[380px] lg:order-2 lg:w-full lg:max-w-[520px] lg:max-w-none lg:justify-self-center"
            {...scroll({
              x: instrumentX,
              y: instrumentY,
              scale: instrumentS,
              opacity: instrumentO,
            })}
          >
            <motion.div
              className="relative aspect-square"
              {...(reduceMotion ? undefined : { style: { x: ringX, y: ringY } })}
            >
              {/* Ring system */}
              <svg
                viewBox="0 0 100 100"
                className="absolute -inset-[9%] h-[118%] w-[118%]"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="var(--ink)"
                  strokeOpacity="0.25"
                  strokeWidth="0.35"
                  className="ring-boot"
                />
                <g className="ring-late">
                  <circle
                    cx="50"
                    cy="50"
                    r="43"
                    fill="none"
                    stroke="var(--ink)"
                    strokeOpacity="0.3"
                    strokeWidth="0.3"
                    strokeDasharray="0.8 3.2"
                    className="ring-dash"
                  />
                  {ticks.map(deg => (
                    <line
                      key={deg}
                      x1="50"
                      y1="1.5"
                      x2="50"
                      y2="4"
                      stroke="var(--ink)"
                      strokeOpacity="0.35"
                      strokeWidth="0.35"
                      transform={`rotate(${deg} 50 50)`}
                    />
                  ))}
                </g>
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                  strokeDasharray="34 268"
                  strokeLinecap="round"
                  className="ring-arc ring-late"
                />
              </svg>

              {/* Orbit label */}
              <motion.p
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                {...scroll({ opacity: metaO })}
              >
                <span className="anim-fade-in block text-micro uppercase tracking-[0.18em] text-muted [animation-delay:calc(var(--intro-delay)+1.2s)]">
                  Shikhar Sahay
                </span>
              </motion.p>

              {/* Circular aperture */}
              <div className="portrait-photo absolute inset-[6.5%] overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-[-4%]"
                  {...(reduceMotion ? undefined : { style: { x: photoX, y: photoY } })}
                >
                  <Image
                    src={portrait}
                    alt="Portrait of Shikhar Sahay"
                    fill
                    priority
                    placeholder="blur"
                    sizes="(max-width: 640px) 70vw, 40vw"
                    className="object-cover object-[center_24%]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Handoff hairline: becomes the boundary into About */}
        <motion.div
          aria-hidden="true"
          className="bg-ink/20 absolute inset-x-5 bottom-0 h-px origin-left sm:inset-x-10"
          {...scroll({ scaleX: handoffLine })}
        />

        {/* Scroll invitation */}
        <motion.div
          className="absolute bottom-6 right-5 z-10 sm:right-10"
          {...scroll({ opacity: cueO })}
        >
          <div className="anim-fade-in flex flex-col items-center gap-3 [animation-delay:calc(var(--intro-delay)+1.4s)]">
            <span className="text-micro uppercase tracking-[0.16em] text-muted [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="cue-line" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
