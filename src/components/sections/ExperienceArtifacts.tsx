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
  /** Max pointer drift in px. */
  shift: number;
  /** Engagement settle scale (the forward Z read). */
  settle: number;
  /** Engagement lift in px (badge-like kinds only). */
  lift: number;
  /** Extra rotateZ range in degrees for angular kinds. */
  twist: number;
  /** Radial compression toward the edges (the GDG give). */
  give: boolean;
  /** Press dip before tilt takes over (tile and badge press). */
  press: boolean;
  /** Spring voice: heavy kinds are slow, the coin is snappy. */
  spring: { stiffness: number; damping: number };
}

const ARTIFACTS: Record<ArtifactKey, ArtifactSpec> = {
  'cyber-defenders': {
    src: cyberDefenders,
    box: 'w-[132px] lg:w-[200px]',
    tilt: 3,
    shift: 3,
    settle: 1.03,
    lift: -2,
    twist: 0,
    give: false,
    press: false,
    spring: { stiffness: 120, damping: 20 },
  },
  recipharm: {
    src: recipharm,
    box: 'w-[200px] lg:w-[300px]',
    tilt: 1.5,
    shift: 3,
    settle: 1.006,
    lift: 0,
    twist: 0,
    give: false,
    press: false,
    spring: { stiffness: 180, damping: 22 },
  },
  gdg: {
    src: gdg,
    box: 'w-[165px] lg:w-[250px]',
    tilt: 3,
    shift: 4,
    settle: 1.01,
    lift: 0,
    twist: 1.5,
    give: true,
    press: false,
    spring: { stiffness: 140, damping: 15 },
  },
  codechef: {
    src: codechef,
    box: 'w-[140px] lg:w-[190px]',
    tilt: 2.5,
    shift: 2,
    settle: 1.02,
    lift: -2,
    twist: 0.8,
    give: false,
    press: true,
    spring: { stiffness: 160, damping: 18 },
  },
  skilledity: {
    src: skilledity,
    box: 'w-[140px] lg:w-[190px]',
    tilt: 3,
    shift: 3,
    settle: 1.008,
    lift: 0,
    twist: 2,
    give: false,
    press: true,
    spring: { stiffness: 200, damping: 20 },
  },
  'team-shade': {
    src: teamShade,
    box: 'w-[130px] lg:w-[165px]',
    tilt: 5,
    shift: 2,
    settle: 1.01,
    lift: 0,
    twist: 1.2,
    give: false,
    press: false,
    spring: { stiffness: 220, damping: 14 },
  },
};

/**
 * One quiet sculptural identity object living in the negative space
 * opposite its organization text. Shared foundation: normalized pointer
 * position over the object, one perspective stage, spring return, rest
 * state at identity, subtle scroll arrival. Per-organization personality
 * comes only from the spec above: tilt range, drift, settle, lift,
 * twist, radial give, press dip, spring voice. The baked PNG lighting
 * carries all material response: no sweep overlays, no traveling
 * highlights, no shine layers anywhere. No loops, no continuous
 * animation, transform and opacity only. Decorative: hidden from
 * assistive tech, never focusable, pointer tracking is mouse-only so
 * touch scrolling stays clean. Keyboard users get the same gentle
 * engagement through the org-link spotlight below.
 */
function ArtifactFigure({
  spec,
  reduce,
  spotlight,
}: {
  spec: ArtifactSpec;
  reduce: boolean;
  spotlight: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: spec.spring.stiffness, damping: spec.spring.damping });
  const sy = useSpring(py, { stiffness: spec.spring.stiffness, damping: spec.spring.damping });
  const rotateX = useTransform(sy, [-0.5, 0.5], [spec.tilt, -spec.tilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-spec.tilt, spec.tilt]);
  const x = useTransform(sx, [-0.5, 0.5], [-spec.shift, spec.shift]);
  const y = useTransform(sy, [-0.5, 0.5], [-spec.shift, spec.shift]);
  const rotateZ = useTransform(sx, [-0.5, 0.5], [spec.twist, -spec.twist]);
  const giveX = useTransform([sx, sy], (v: number[]) => {
    if (!spec.give) return 1;
    return 1 - Math.min(0.5, Math.hypot(v[0], v[1])) * 0.07;
  });

  // Pointer engagement, or the keyboard spotlight from the org link.
  // Under reduced motion the static branch below renders instead, so
  // neither path can animate.
  const active = touched || (spotlight && !reduce);

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
          setTouched(true);
        }}
        onMouseLeave={() => {
          px.set(0);
          py.set(0);
          setTouched(false);
        }}
        className="group/artifact [perspective:900px]"
      >
        <motion.div
          animate={
            active
              ? spec.press
                ? { scale: [0.99, spec.settle], y: [1, spec.lift] }
                : { scale: spec.settle, y: spec.lift }
              : { scale: 1, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="drop-shadow-[0_14px_26px_rgba(93,64,36,0.3)] transition-[filter] duration-500 group-hover/artifact:drop-shadow-[0_18px_32px_rgba(93,64,36,0.38)] dark:drop-shadow-[0_14px_26px_rgba(0,0,0,0.45)] dark:group-hover/artifact:drop-shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
        >
          <motion.div
            style={{ rotateX, rotateY, rotateZ, x, y, scaleX: giveX }}
            className="relative"
          >
            <Image
              src={spec.src}
              alt=""
              placeholder="blur"
              sizes="(max-width: 1024px) 210px, 300px"
              className="h-auto w-full select-none"
              draggable={false}
            />
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
  spotlight,
}: {
  artifact: ArtifactKey;
  left: boolean;
  reduce: boolean;
  spotlight: boolean;
}) {
  const spec = ARTIFACTS[artifact];
  if (!spec) return null;
  return (
    <div
      aria-hidden="true"
      className={`mt-6 flex items-center justify-start lg:row-start-1 lg:mt-0 lg:justify-center lg:self-stretch ${
        left ? 'lg:col-start-3 lg:pl-4' : 'lg:col-start-1 lg:pr-4'
      }`}
    >
      <ArtifactFigure spec={spec} reduce={reduce} spotlight={spotlight} />
    </div>
  );
}
