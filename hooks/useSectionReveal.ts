// hooks/useSectionReveal.ts
// Shared entrance choreography for the narrative sections. Wraps useGSAP +
// gsap.matchMedia so every section gets reduced-motion handling for free: the
// SSR markup is already the finished state, and motion only ever plays for
// (prefers-reduced-motion: no-preference).
//
// Sections opt in from markup - no per-component GSAP:
//   [data-reveal-heading]  masked SplitText line reveal on scroll-in
//   [data-reveal]          batched fade + rise, staggered, once
import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap";
import {
  MOTION_DUR,
  MOTION_EASE,
  MOTION_STAGGER,
  MOTION_RISE,
} from "@/lib/motion";

interface SectionRevealOptions {
  /** ScrollTrigger start position for the heading and batched items. */
  start?: string;
}

export function useSectionReveal(
  scope: RefObject<HTMLElement | null>,
  { start = "top 82%" }: SectionRevealOptions = {},
): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;
        const q = gsap.utils.selector(root);

        // Heading: masked line reveal; autoSplit re-splits once the mono font
        // loads so line breaks stay correct. Returning the tween lets SplitText
        // clean it up on re-split.
        const heading = root.querySelector<HTMLElement>("[data-reveal-heading]");
        let split: SplitText | undefined;
        if (heading) {
          split = SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: MOTION_DUR.base,
                ease: MOTION_EASE.emphasis,
                stagger: MOTION_STAGGER.base,
                scrollTrigger: { trigger: heading, start },
              }),
          });
        }

        // Body items: batched so a row of cards reveals together, once.
        const items = q("[data-reveal]") as HTMLElement[];
        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: MOTION_RISE });
          ScrollTrigger.batch(items, {
            start,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: MOTION_DUR.base,
                ease: MOTION_EASE.out,
                stagger: MOTION_STAGGER.base,
              }),
          });
        }

        return () => split?.revert();
      });
    },
    { scope },
  );
}
