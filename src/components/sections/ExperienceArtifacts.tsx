'use client';

import { useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { ArtifactKey } from '@/content/experience';

import cyberDefenders from '../../assets/org-logos/cyberdefenders_websitelogo.png';
import recipharm from '../../assets/org-logos/recipharm_websitelogo.png';
import gdg from '../../assets/org-logos/gdg_websitelogo.png';
import codechef from '../../assets/org-logos/codechef_websitelogo.png';
import skilledity from '../../assets/org-logos/skilledity_websitelogo.png';
import teamShade from '../../assets/org-logos/shade_websitelogo.png';

const ease = [0.19, 1, 0.22, 1] as const;

interface ArtifactSpec {
  src: StaticImageData;
  /** File-box width (mobile, then lg). Optical size follows the baked padding. */
  box: string;
  /** Max pointer tilt in degrees. */
  tilt: number;
  /** Hover settle scale. */
  settle: number;
  /** Hover lift in px on top of the settle (badge-like kinds only). */
  lift: number;
  /** Extra rotateZ range in degrees for angular kinds. */
  twist: number;
  /** Warm sweep overlay peak opacity on hover (0 disables). */
  sweep: number;
}

const ARTIFACTS: Record<ArtifactKey, ArtifactSpec> = {
  'cyber-defenders': {
    src: cyberDefenders,
    box: 'w-[132px] lg:w-[200px]',
    tilt: 3,
    settle: 1.015,
    lift: 0,
    twist: 0,
    sweep: 0,
  },
  recipharm: {
    src: recipharm,
    box: 'w-[200px] lg:w-[300px]',
    tilt: 2,
    settle: 1.008,
    lift: 0,
    twist: 0,
    sweep: 0.3,
  },
  gdg: {
    src: gdg,
    box: 'w-[165px] lg:w-[250px]',
    tilt: 3,
    settle: 1.01,
    lift: 0,
    twist: 1.2,
    sweep: 0,
  },
  codechef: {
    src: codechef,
    box: 'w-[140px] lg:w-[190px]',
    tilt: 2.5,
    settle: 1.01,
    lift: -2,
    twist: 0,
    sweep: 0,
  },
  skilledity: {
    src: skilledity,
    box: 'w-[140px] lg:w-[190px]',
    tilt: 3,
    settle: 1.01,
    lift: 0,
    twist: 1.5,
    sweep: 0.18,
  },
  'team-shade': {
    src: teamShade,
    box: 'w-[130px] lg:w-[165px]',
    tilt: 2,
    settle: 1.01,
    lift: 0,
    twist: 1,
    sweep: 0,
  },
};

/**
 * One quiet sculptural identity object living in the negative space
 * opposite its organization text. Shared language: shallow pointer tilt
 * (a few degrees, a few pixels), soft spring return, restrained
 * separation shadow, subtle scroll arrival. Still at rest. Decorative:
 * hidden from assistive tech, never focusable, tilt is mouse-only so
 * touch scrolling stays clean.
 */
function ArtifactFigure({ spec, reduce }: { spec: ArtifactSpec; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 160, damping: 18, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [spec.tilt, -spec.tilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-spec.tilt, spec.tilt]);
  const x = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const y = useTransform(sy, [-0.5, 0.5], [-2, 2]);
  const rotateZ = useTransform(sx, [-0.5, 0.5], [spec.twist, -spec.twist]);
  const sweepX = useTransform(sx, [-0.5, 0.5], ['-35%', '35%']);

  if (reduce) {
    return (
      <figure aria-hidden="true" className={spec.box}>
        <Image
          src={spec.src}
          alt=""
          placeholder="blur"
          sizes="(max-width: 1024px) 210px, 300px"
          className="h-auto w-full select-none"
          draggable={false}
        />
      </figure>
    );
  }

  return (
    <motion.figure
      aria-hidden="true"
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease }}
      className={spec.box}
    >
      <div
        ref={ref}
        onMouseMove={e => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
          setActive(true);
        }}
        onMouseLeave={() => {
          px.set(0);
          py.set(0);
          setActive(false);
        }}
        className="group/artifact [perspective:900px]"
      >
        <motion.div
          animate={active ? { scale: spec.settle, y: spec.lift } : { scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className="drop-shadow-[0_14px_26px_rgba(93,64,36,0.3)] transition-[filter] duration-500 group-hover/artifact:drop-shadow-[0_18px_32px_rgba(93,64,36,0.38)] dark:drop-shadow-[0_14px_26px_rgba(0,0,0,0.45)] dark:group-hover/artifact:drop-shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
        >
          <motion.div style={{ rotateX, rotateY, rotateZ, x, y }} className="relative">
            <Image
              src={spec.src}
              alt=""
              placeholder="blur"
              sizes="(max-width: 1024px) 210px, 300px"
              className="h-auto w-full select-none"
              draggable={false}
            />
            {spec.sweep > 0 && (
              <motion.span
                aria-hidden="true"
                style={{ x: sweepX }}
                animate={{ opacity: active ? spec.sweep : 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-[rgba(255,242,220,0.4)] to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.figure>
  );
}

/**
 * Artifact cell for an organization block. On desktop it takes the grid
 * column opposite the text (spine stays centered, no new columns) and
 * centers the object against the whole block; below lg it follows the
 * text in normal flow at a smaller size. Fail-safe: unknown keys render
 * nothing, so content can never break.
 */
export function OrgArtifact({
  artifact,
  left,
  reduce,
}: {
  artifact: ArtifactKey;
  left: boolean;
  reduce: boolean;
}) {
  const spec = ARTIFACTS[artifact];
  if (!spec) return null;
  return (
    <div
      aria-hidden="true"
      className={`mt-10 flex items-center justify-start lg:row-start-1 lg:mt-0 lg:justify-center lg:self-stretch ${
        left ? 'lg:col-start-3 lg:pl-4' : 'lg:col-start-1 lg:pr-4'
      }`}
    >
      <ArtifactFigure spec={spec} reduce={reduce} />
    </div>
  );
}
