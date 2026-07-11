// lib/gsap.ts
// Single GSAP registry: every animation imports gsap + plugins from here,
// never from "gsap" directly, so plugins register exactly once.
// All plugins below are free since GSAP 3.13 (Webflow acquisition).

import { gsap, Expo } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  Expo,
  ScrollTrigger,
  MotionPathPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  SplitText,
);

export {
  gsap,
  useGSAP,
  Expo,
  ScrollTrigger,
  MotionPathPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  SplitText,
};
