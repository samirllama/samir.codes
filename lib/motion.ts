// lib/motion.ts
// The site's motion vocabulary. Every GSAP tween pulls duration/ease/stagger
// from here - a single voice is what makes motion read as designed.

export const MOTION_DUR = {
  /** micro-interactions: hovers, toggles */
  fast: 0.5,
  /** standard entrances and reveals */
  base: 0.8,
  /** hero moments and large-surface transitions */
  slow: 1.2,
} as const;

export const MOTION_EASE = {
  /** default entrance */
  out: "power2.out",
  out3: "power3.out",
  /** emphasis moments (hero headline, flagship cards) */
  emphasis: "expo.out",
  /** anything that both enters and exits in view */
  inOut: "power2.inOut",
} as const;

export const MOTION_STAGGER = {
  /** characters, tags, dense lists */
  tight: 0.06,
  /** cards and lines */
  base: 0.09,
  /** large sibling sections */
  loose: 0.12,
} as const;

/** Standard entrance travel distance in px. */
export const MOTION_RISE = 48;
