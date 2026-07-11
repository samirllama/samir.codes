// lib/gsap.ts
// Single GSAP registry: every animation imports gsap + plugins from here,
// never from "gsap" directly, so plugins register exactly once.
// All plugins below are free since GSAP 3.13 (Webflow acquisition).

// ScrollSmoother was evaluated and dropped: the (default) layout's sticky
// footer reveal + IntersectionObserver side-nav rely on native scroll, and
// scrubbed ScrollTriggers deliver the scroll-linked polish without the
// wrapper-container constraints.
import { gsap, Expo } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  Expo,
  ScrollTrigger,
  MotionPathPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin,
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
  SplitText,
};
