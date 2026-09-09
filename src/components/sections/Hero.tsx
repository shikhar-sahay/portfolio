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
 * the composition separates while the frame stays full; then a veil in
 * the statements surface rises from the bottom, so the hero hands a full,
 * moving frame directly to the statements bridge. Reduced motion
 * never pins: the scene is a normal section that scrolls away cleanly.
 */
/**
 * The hero tagline keeps an accent rule. A vermilion hairline draws
 * beneath the serif word on enter while a small diamond rides to the
 * cursor; movement glides the diamond, leave retracts the rule and fades
 * the marker. Everything is absolutely positioned (never layout),
 * aria-hidden, and absent under reduced motion. Springs move only on
 * pointer events and settle to rest; no loop ever runs.
 */
function TaglineRule({ reduceMotion }: { reduceMotion: boolean }) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const session = useRef(0);
  const draw = useMotionValue(0);
  const markX = useMotionValue(0);
  const markO = useMotionValue(0);
  const ruleX = useSpring(draw, { stiffness: 170, damping: 24 });
  const diaX = useSpring(markX, { stiffness: 260, damping: 26 });
  const diaO = useSpring(markO, { stiffness: 200, damping: 26 });

  const place = (clientX: number) => {
    const el = wordRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    markX.set(Math.min(r.width - 3, Math.max(3, clientX - r.left)));
  };

  const release = (hold: number) => {
    const s = session.current;
    window.setTimeout(() => {
      if (session.current !== s) return;
      draw.set(0);
      markO.set(0);
    }, hold);
  };

  return (
    <p
      onPointerEnter={e => {
        if (reduceMotion) return;
        session.current += 1;
        draw.set(1);
        markO.set(1);
        place(e.clientX);
      }}
      onPointerMove={e => {
        if (reduceMotion) return;
        place(e.clientX);
      }}
      onPointerLeave={e => {
        if (reduceMotion) return;
        // Touch taps fire enter and leave in the same instant: hold the
        // rule briefly so the gesture reads, then retract.
        release(e.pointerType === 'touch' ? 900 : 0);
      }}
      className="anim-fade-rise mt-6 max-w-[26ch] text-lede font-medium tracking-tight text-ink [animation-delay:calc(var(--intro-delay)+0.6s)] sm:mt-8"
    >
      {profile.statementPre}
      <span ref={wordRef} className="relative inline-block">
        <em className="font-serif font-normal italic">{profile.statementEm}</em>
        {!reduceMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-1.5 top-full"
          >
            <motion.span
              style={{ scaleX: ruleX }}
              className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
            />
            <motion.span
              style={{ x: diaX, opacity: diaO }}
              className="absolute -top-[2px] left-0 h-[7px] w-[7px] -translate-x-1/2 rotate-45 bg-accent"
            />
          </span>
        )}
      </span>
    </p>
  );
}

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
  // the frame stays full. Beat two: the identity sweeps aside and a pure
  // ink veil rises from the bottom, handing a full frame to the statements
  // bridge (the bridge owns all statement typography, so the veil carries
  // no text and can never duplicate it). Nothing fades on its own.
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
  // The exit veil: pure ink rises from the bottom. It carries no text:
  // the statements bridge owns every word, so nothing can duplicate.
  const veilY = useTransform(scrollYProgress, [0.5, 0.85, 1], ['100%', '0%', '0%']);

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
              <TaglineRule reduceMotion={reduceMotion} />

              {/* Compact personal context: part of the composition, not cards */}
              <motion.div
                {...scroll({ opacity: metaO })}
                className="anim-fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 [animation-delay:calc(var(--intro-delay)+0.8s)]"
              >
                <p className="text-micro uppercase tracking-[0.16em] text-muted">
                  CS @ VIT Vellore
                </p>
                <span
                  className="bg-ink/25 lm-fill-line hidden h-3 w-px sm:block"
                  aria-hidden="true"
                />
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
          className="bg-ink/20 lm-fill-line absolute inset-x-5 bottom-0 h-px origin-left sm:inset-x-10"
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
        {/* Exit veil: rises from the bottom in the statements surface,
            handing a full frame to the bridge (paper in light, deep warm
            charcoal in dark). It carries no text: the bridge owns every
            word, so nothing can duplicate. */}
        {!reduceMotion && (
          <motion.div aria-hidden="true" className="absolute inset-0 z-20" style={{ y: veilY }}>
            <div className="theme-fade flex h-full flex-col justify-center bg-paper px-5 sm:px-10" />
          </motion.div>
        )}
      </div>

      {/* Tail block: covers exactly the transparent zone below the sticky
          frame (scene minus viewport) in the statements surface, so the
          post-release scroll never flashes between the veil and the
          bridge. It sits precisely below the fold while pinned, and only
          rendered when pinned. */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="theme-fade absolute inset-x-0 bottom-0 h-[calc(120svh-100dvh)] bg-paper"
        />
      )}
    </div>
  );
}
