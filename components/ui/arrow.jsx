"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowLine } from "./arrow-line";

export const AnimatedArrow = ({ delay = 0 }) => {
  const originalRef = useRef(null);
  const hoverRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(originalRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    }).fromTo(
      hoverRef.current,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
        delay,
      }
    );

    const wrapper = wrapperRef.current;
    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    wrapper?.addEventListener("mouseenter", onEnter);
    wrapper?.addEventListener("mouseleave", onLeave);

    return () => {
      wrapper?.removeEventListener("mouseenter", onEnter);
      wrapper?.removeEventListener("mouseleave", onLeave);
    };
  }, [delay]);

  return (
    <div ref={wrapperRef} className="relative inline-flex group">
      <div
        ref={originalRef}
        className="arrow-original relative flex items-center justify-start rotate-0 transition-transform duration-600 ease-out"
      >
        <ArrowLine />
      </div>
      <div
        ref={hoverRef}
        className="arrow-hover absolute top-0 left-0 flex items-center justify-start opacity-0 will-change-transform will-change-opacity"
      >
        <ArrowLine />
      </div>
    </div>
  );
};

export const ArrowLink = ({ href, label = "Label", delay = 0 }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-start gap-[10px]"
  >
    <span className="leading-none">{label}</span>
    <AnimatedArrow delay={delay} />
  </a>
);
