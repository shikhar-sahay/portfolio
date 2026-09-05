'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useMountedReducedMotion } from '@/hooks/useMountedReducedMotion';
import portrait from '../../assets/shikhar-hero.jpg';
import { profile } from '@/content/profile';
import { InteractiveLetters } from '@/components/ui/InteractiveLetters';

/**
 * 01 / Identity. The portrait is an editorial arch: a tall aperture with a
 * rounded crown and an offset vermilion echo behind it, overlapping the
 * display type. The name reacts letter by letter under the pointer.
 * Scrolling never zooms the face: the scene changes in two beats. First
 * the composition separates while the frame stays full; then an ink veil
 * rises from the bottom carrying the opening statement, so the hero hands
 * a full, moving frame directly to the statements bridge. Reduced motion
 * never pins: the scene is a normal section that scrolls away cleanly.
 */
export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMountedReducedMotion();

  // Pointer parallax: the crop drifts gently toward the cursor while the
  // echo arch counters it. Fine pointers only, never under reduced motion.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 55, damping: 18 });
  const spy = useSpring(py, { stiffness: 55, damping: 18 });
  const photoX = useTransform(spx, [-1, 1], [10, -10]);
  const photoY = useTransform(spy, [-1, 1], [8, -8]);
  const echoX = useTransform(spx, [-1, 1], [-7, 7]);
  const echoY = useTransform(spy, [-1, 1], [-6, 6]);

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

  // Scene change, two beats. Beat one: the composition separates while
  // the frame stays full. Beat two: the identity sweeps aside and an ink
  // veil rises from the bottom carrying the opening statement, handing a
  // full frame to the statements bridge. Nothing fades on its own.
  const nameAY = useTransform(scrollYProgress, [0, 0.6, 1], ['0svh', '-7svh', '-22svh']);
  const nameAX = useTransform(scrollYProgress, [0, 0.6, 1], ['0vw', '-3.5vw', '-12vw']);
  const nameAO = useTransform(scrollYProgress, [0.4, 0.82, 1], [1, 1, 0]);
  const nameBY = useTransform(scrollYProgress, [0, 0.6, 1], ['0svh', '5svh', '16svh']);
  const nameBX = useTransform(scrollYProgress, [0, 0.6, 1], ['0vw', '3vw', '10vw']);
  const nameBO = useTransform(scrollYProgress, [0.42, 0.82, 1], [1, 1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 1.1]);
  const metaO = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1, 1, 0, 0]);
  const ledeO = useTransform(scrollYProgress, [0, 0.4, 0.72, 1], [1, 1, 0, 0]);
  const archX = useTransform(scrollYProgress, [0, 0.55, 1], ['0vw', '10vw', '34vw']);
  const archY = useTransform(scrollYProgress, [0, 0.55, 1], ['0svh', '5svh', '-6svh']);
  const archR = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const archO = useTransform(scrollYProgress, [0.6, 0.9, 1], [1, 1, 0]);
  const handoffLine = useTransform(scrollYProgress, [0.45, 0.9, 1], [0, 1, 1]);
  const cueO = useTransform(scrollYProgress, [0, 0.12, 1], [1, 0, 0]);
  // The exit veil: ink rises from the bottom with the opening statement.
  const veilY = useTransform(scrollYProgress, [0.5, 0.85, 1], ['100%', '0%', '0%']);
  const veilTextY = useTransform(scrollYProgress, [0.5, 0.88, 1], ['24svh', '0svh', '0svh']);
  const veilTextO = useTransform(scrollYProgress, [0.5, 0.72, 0.9, 1], [0, 1, 1, 1]);

  const scroll = (style: Record<string, unknown>) => (reduceMotion ? undefined : { style });

  return (
    <div ref={sceneRef} id="top" className={`relative ${reduceMotion ? '' : 'h-[120svh]'}`}>
      <div
        className={`${reduceMotion ? '' : 'sticky top-0'} flex ${reduceMotion ? 'min-h-dvh' : 'h-dvh'} items-center overflow-hidden`}
      >
        <div className="grid w-full grid-cols-1 items-center gap-10 px-5 pb-16 pt-24 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pb-0 lg:pt-0">
          {/* Identity column: min-w-0 so the oversized name can bleed over
              the portrait instead of squeezing the grid. */}
          <div className="relative z-10 order-2 min-w-0 lg:order-1">
            <motion.p
              className="anim-fade-in mb-6 flex items-center gap-3 text-micro uppercase tracking-[0.16em] text-muted [animation-delay:calc(var(--intro-delay)+0.2s)] sm:mb-8"
              {...scroll({ opacity: metaO })}
            >
              <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
              Portfolio, 2026
            </motion.p>

            <motion.h1
              className="select-none overflow-visible text-display uppercase"
              {...scroll({ scale: nameScale })}
            >
              <motion.span
                className="block overflow-visible"
                {...scroll({ y: nameAY, x: nameAX, opacity: nameAO })}
              >
                <InteractiveLetters
                  text="Shikhar"
                  entrance
                  entranceDelay="var(--intro-delay) + 0.25s"
                  className="block"
                />
              </motion.span>
              <motion.span
                className="mt-[0.05em] block overflow-visible pl-[8vw] lg:pl-[4vw]"
                {...scroll({ y: nameBY, x: nameBX, opacity: nameBO })}
              >
                <InteractiveLetters
                  text="Sahay"
                  letterClassName="type-outline"
                  tint="stroke"
                  entrance
                  entranceDelay="var(--intro-delay) + 0.4s"
                  className="block"
                />
              </motion.span>
            </motion.h1>

            <motion.div {...scroll({ opacity: ledeO })}>
              <p className="anim-fade-rise mt-6 max-w-[26ch] text-lede font-medium tracking-tight text-ink [animation-delay:calc(var(--intro-delay)+0.6s)] sm:mt-8">
                {profile.statementPre}
                <em className="font-serif font-normal italic">{profile.statementEm}</em>
              </p>

              {/* Compact personal context: part of the composition, not cards */}
              <motion.div
                {...scroll({ opacity: metaO })}
                className="anim-fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 [animation-delay:calc(var(--intro-delay)+0.8s)]"
              >
                <p className="text-micro uppercase tracking-[0.16em] text-muted">
                  CS @ VIT Vellore
                </p>
                <span className="bg-ink/25 hidden h-3 w-px sm:block" aria-hidden="true" />
                <p className="text-micro uppercase tracking-[0.16em] text-muted">
                  Software, security &amp; the web
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Portrait arch: the crop holds the face right of center so it
              looks into the type, and the column nudges right on small
              desktop widths so the name never reaches the face. */}
          <motion.div
            className="group/arch relative z-0 order-1 mx-auto w-[64vw] max-w-[300px] sm:w-[42vw] sm:max-w-[380px] lg:order-2 lg:mx-0 lg:ml-[3vw] lg:w-full lg:max-w-[460px] lg:justify-self-center xl:ml-0"
            {...scroll({
              x: archX,
              y: archY,
              rotate: archR,
              opacity: archO,
            })}
          >
            <motion.div
              className="relative"
              {...(reduceMotion ? undefined : { style: { x: echoX, y: echoY } })}
            >
              {/* Offset echo arch behind the photograph */}
              <div
                aria-hidden="true"
                className="arch-echo absolute -inset-0 translate-x-4 translate-y-4 sm:translate-x-5 sm:translate-y-5"
              />
              <div className="arch-reveal relative aspect-[3/3.9] overflow-hidden">
                <div className="arch absolute inset-0 overflow-hidden">
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
                      className="arch-photo object-cover object-[28%_22%]"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Handoff hairline: becomes the boundary into the statements bridge */}
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

        {/* Exit veil: ink rises from the bottom carrying the opening
            statement, handing a full frame to the statements bridge. */}
        {!reduceMotion && (
          <motion.div aria-hidden="true" className="absolute inset-0 z-20" style={{ y: veilY }}>
            <div className="ink-stage flex h-full flex-col justify-center px-5 sm:px-10">
              <motion.p
                style={{ y: veilTextY, opacity: veilTextO }}
                className="-mt-[12svh] text-[clamp(3.2rem,10.5vw,13rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]"
              >
                I build<span className="text-accent">.</span>
              </motion.p>
              <motion.p
                style={{ opacity: veilTextO }}
                className="mt-2 text-micro uppercase tracking-[0.16em] text-[#f3efe6]/60 sm:mt-3"
              >
                tools, experiments, platforms
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
