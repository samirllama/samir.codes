"use client";

// A single gentle entrance on load - the blog is a reading room, so nothing is
// scroll-triggered inside the article body (motion must never fight reading).
// Everything routes through gsap.matchMedia, and gsap.from means the natural,
// final state is what reduced-motion and no-JS readers see - no opacity holes.
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_DUR, MOTION_EASE } from "@/lib/motion";

export function PostAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline()
        .from(".post-hero", {
          autoAlpha: 0,
          y: 24,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
        })
        .from(
          ".post-content",
          {
            autoAlpha: 0,
            y: 16,
            duration: MOTION_DUR.base,
            ease: MOTION_EASE.out,
          },
          "-=0.5",
        );
    });
  });

  return null;
}
