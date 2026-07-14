"use client";

// Choreographs the hero copy entrance. Renders nothing itself; the SSR
// default state is fully visible, so no-JS and reduced-motion visitors
// simply see the finished hero.
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap";
import { MOTION_DUR, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";

export const HeroReveal = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const headline = document.querySelector<HTMLElement>("[data-hero-headline]");
      if (!headline) return;

      const tl = gsap.timeline({ paused: true });

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top 75%",
        once: true,
        onEnter: () => tl.play(),
      });

      tl.from("[data-hero-kicker]", {
        opacity: 0,
        y: 12,
        duration: MOTION_DUR.fast,
        ease: MOTION_EASE.out3,
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
            ease: MOTION_EASE.out3,
            stagger: MOTION_STAGGER.base,
          }),
      });

      tl.add("headline", "start+=0.15");

      tl.from(
        "[data-hero-sub]",
        {
          opacity: 0,
          y: 20,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
        },
        "headline+=0.45",
      );

      tl.from(
        "[data-hero-stat]",
        {
          opacity: 0,
          y: 16,
          duration: MOTION_DUR.base,
          ease: MOTION_EASE.out,
          stagger: MOTION_STAGGER.loose,
        },
        0.65,
      );

      tl.add("statsIn", "headline+=0.75");

      tl.add("countStart", "statsIn+=0.35");

      // Stat values tick up like a counter settling into place. Each value is
      // seeded to 0 immediately (before first paint, while the stat is still
      // opacity 0) so the SSR final number never flashes, then counts to its
      // target as the stat fades in. Non-numeric or prefixed values ($0) are
      // parsed so the "$" is preserved and only the digits animate.
      //
      // The target is read from the data-stat-value attribute, never from
      // textContent: this tween writes to textContent, and on GSAP's
      // revert-on-unmount that write is a "0". A soft-nav re-mount reuses the
      // same DOM node, so reading textContent back would parse a target of 0
      // and the counter would stall at zero.
      gsap.utils.toArray<HTMLElement>("[data-stat-value]").forEach((el, i) => {
        const source = el.dataset.statValue ?? el.textContent ?? "";
        const parts = source.match(/^(\D*)(\d[\d,]*)(\D*)$/);
        if (!parts) return;

        const [, prefix, digits, suffix] = parts;
        const target = Number(digits.replace(/,/g, ""));
        const counter = { v: 0 };

        const render = () => {
          el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
        };

        gsap.set(el, { textContent: `${prefix}0${suffix}` });

        tl.to(
          counter,
          {
            v: target,
            duration: MOTION_DUR.slow,
            ease: MOTION_EASE.out,
            onUpdate: render,
          },
          `countStart+=${i * 0.12}`,
        );
      });

      tl.from(
        "[data-hero-ctas]",
        {
          opacity: 0,
          y: 16,
          duration: MOTION_DUR.slow,
          ease: MOTION_EASE.out,
        },
        "countStart+=0.6",
      );

      return () => {
        split.revert();
      };
    });
  });

  return null;
};
