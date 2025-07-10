"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ArrowLine() {
  const lineRef = useRef(null);
  const fillRef = useRef(null);
  const tipRef = useRef(null);
  const fillRightRef = useRef(null);
  const tipRightRef = useRef(null);
  const fillLeftRef = useRef(null);
  const tipLeftRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(fillRef.current, {
      scaleX: 1,
      ease: "power2.out",
      duration: 0.6,
    })
      .to(
        tipRef.current,
        {
          scaleX: 0.15,
          xPercent: 100,
          ease: "power2.out",
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        [fillRightRef.current, tipRightRef.current],
        {
          scaleX: (i) => (i ? 0.15 : 1),
          xPercent: (i) => (i ? 100 : 0),
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.2"
      )
      .to(
        [fillLeftRef.current, tipLeftRef.current],
        {
          scaleX: (i) => (i ? 0.15 : 1),
          xPercent: (i) => (i ? -100 : 0),
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.5"
      );

    const node = lineRef.current;
    const play = () => tl.play();
    const reverse = () => tl.reverse();
    node?.addEventListener("mouseenter", play);
    node?.addEventListener("mouseleave", reverse);

    return () => {
      node?.removeEventListener("mouseenter", play);
      node?.removeEventListener("mouseleave", reverse);
    };
  }, []);

  return (
    <span className="arrow-wrapper" ref={lineRef}>
      <span className="arrow-line">
        <span className="line-fill" ref={fillRef} />
        <span className="line-tip" ref={tipRef} />
      </span>
      <span className="arrow-chevron chevron-right">
        <span className="chev-fill" ref={fillRightRef} />
        <span className="chev-tip" ref={tipRightRef} />
      </span>
      <span className="arrow-chevron chevron-left">
        <span className="chev-fill" ref={fillLeftRef} />
        <span className="chev-tip" ref={tipLeftRef} />
      </span>
    </span>
  );
}

export default function ArrowDemo() {
  const wrapperRef = useRef(null);
  const originalRef = useRef(null);
  const hoverRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(originalRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 0.2,
    }).to(
      hoverRef.current,
      {
        opacity: 1,
        ease: "power2.out",
        duration: 0.2,
      },
      "-=0.2"
    );

    const node = wrapperRef.current;
    const play = () => tl.play();
    const reverse = () => tl.reverse();
    node?.addEventListener("mouseenter", play);
    node?.addEventListener("mouseleave", reverse);

    return () => {
      node?.removeEventListener("mouseenter", play);
      node?.removeEventListener("mouseleave", reverse);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="arrow-reveal-wrapper inline-flex relative">
      <div ref={originalRef}>
        <span className="arrow-line">
          <span className="line-fill-static" />
          <span className="line-tip-static" />
        </span>
        <span className="arrow-chevron chevron-right">
          <span className="chev-fill-static" />
          <span className="chev-tip-static" />
        </span>
        <span className="arrow-chevron chevron-left">
          <span className="chev-fill-static" />
          <span className="chev-tip-static" />
        </span>
      </div>
      <div
        ref={hoverRef}
        className="arrow-hover absolute top-0 left-0 flex items-center justify-start opacity-0 will-change-transform will-change-opacity"
      >
        <ArrowLine />
      </div>
    </div>
  );
}