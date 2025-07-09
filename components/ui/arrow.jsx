"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MdArrowForward } from "react-icons/md";
import ArrowLine from "./arrow-line";

export const AnimatedArrow = ({ delay = 0 }) => {
  const originalRef = useRef();
  const hoverRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(originalRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    }).fromTo(
      hoverRef.current,
      {
        opacity: 0,
        x: -10,
      },
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

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [delay]);

  return (
    <div
      ref={wrapperRef}
      className="relative group"
      style={{ position: "relative", display: "inline-flex" }}
    >
      <div
        ref={originalRef}
        className="arrow-original"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: "rotate(0deg)",
          transition: "transform 0.6s ease-out",
          position: "relative",
        }}
      >
        <ArrowLine />
      </div>

      <div
        ref={hoverRef}
        className="arrow-hover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          opacity: 0,
          transform: "rotate(0deg)",
          willChange: "transform, opacity",
        }}
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
    className="group"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "10px",
    }}
  >
    <span style={{ lineHeight: 1 }}>{label}</span>
    <AnimatedArrow delay={delay} />
  </a>
);
