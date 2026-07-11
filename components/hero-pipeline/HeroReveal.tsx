"use client";

// Choreographs the hero copy entrance. Renders nothing itself; the SSR
// default state is fully visible, so no-JS and reduced-motion visitors
// simply see the finished hero.
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { MOTION_DUR, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";

export const HeroReveal = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const headline = document.querySelector<HTMLElement>(
        "[data-hero-headline]",
      );
      if (!headline) return;

      const tl = gsap.timeline();

      tl.from("[data-hero-kicker]", {
        opacity: 0,
        y: 16,
        duration: MOTION_DUR.fast,
        ease: MOTION_EASE.out,
      });

      // Masked line reveal; autoSplit re-splits when Monaspace finishes
      // loading so line breaks stay correct.
      const split = SplitText.create(headline, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: MOTION_DUR.slow,
            ease: MOTION_EASE.emphasis,
            stagger: MOTION_STAGGER.base,
          }),
      });

      tl.from(
        "[data-hero-sub]",
        {
          opacity: 0,
          y: 24,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
        },
        0.5,
      );

      tl.from(
        "[data-hero-stat]",
        {
          opacity: 0,
          y: 18,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
          stagger: MOTION_STAGGER.base,
        },
        0.65,
      );

      // Stat values decode into place - the terminal texture, not a gimmick:
      // it reads as "computed", which is the brand.
      gsap.utils.toArray<HTMLElement>("[data-stat-value]").forEach((el, i) => {
        tl.to(
          el,
          {
            scrambleText: {
              text: el.textContent ?? "",
              chars: "0123456789",
              speed: 0.4,
            },
            duration: 0.7,
            ease: "none",
          },
          0.7 + i * MOTION_STAGGER.base,
        );
      });

      tl.from(
        "[data-hero-ctas]",
        {
          opacity: 0,
          y: 18,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
        },
        1,
      );

      return () => {
        split.revert();
      };
    });
  });

  return null;
};
