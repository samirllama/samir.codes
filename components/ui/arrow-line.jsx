"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// export default function ArrowLine() {
//   const lineRef = useRef();
//   const fillRef = useRef();
//   const fillRightRef = useRef();
//   const fillLeftRef = useRef();
//   const tipRef = useRef();
//   const tipLeftRef = useRef();
//   const tipRightRef = useRef();
//   const chevLeftRef = useRef();
//   const chevRightRef = useRef();

//   //   useGSAP(() => {
//   //     const tl = gsap.timeline({ paused: true });

//   //     // Bar fill
//   //     tl.to(fillRef.current, {
//   //       scaleX: 1,
//   //       ease: "power2.out",
//   //       duration: 0.6,
//   //     })

//   //       // Bar tip
//   //       .to(
//   //         tipRef.current,
//   //         {
//   //           scaleX: 0.15,
//   //           xPercent: 100,
//   //           ease: "power2.out",
//   //           duration: 0.6,
//   //         },
//   //         "-=0.3"
//   //       )

//   //       // Chevron right
//   //       .to(
//   //         [fillRightRef.current, tipRightRef.current],
//   //         {
//   //           scaleX: (i) => (i ? 0.15 : 1), // tip = 0.15, fill = 1
//   //           xPercent: (i) => (i ? 100 : 0),
//   //           ease: "power3.out",
//   //           duration: 0.6,
//   //           stagger: 0.1,
//   //         },
//   //         "-=0.2"
//   //       )

//   //       // Chevron left
//   //       .to(
//   //         [fillLeftRef.current, tipLeftRef.current],
//   //         {
//   //           scaleX: (i) => (i ? 0.15 : 1),
//   //           xPercent: (i) => (i ? -100 : 0),
//   //           ease: "power3.out",
//   //           duration: 0.6,
//   //           stagger: 0.1,
//   //         },
//   //         "-=0.5"
//   //       ); // kick off slightly earlier

//   //     lineRef.current.addEventListener("mouseenter", () => tl.play());
//   //     lineRef.current.addEventListener("mouseleave", () => tl.reverse());
//   //   }, []);

//   useGSAP(() => {
//     const tl = gsap.timeline({ paused: true });

//     tl.to(fillRef.current, { scaleX: 1, ease: "power2.out", duration: 0.6 })
//       .to(
//         tipRef.current,
//         { scaleX: 0.15, xPercent: 100, ease: "power2.out", duration: 0.6 },
//         "-=0.3"
//       )
//       .to(
//         [fillRightRef.current, tipRightRef.current],
//         {
//           scaleX: (i) => (i ? 0.15 : 1),
//           xPercent: (i) => (i ? 100 : 0),
//           ease: "power3.out",
//           duration: 0.6,
//           stagger: 0.1,x
//         },
//         "-=0.2"
//       )
//       .to(
//         [fillLeftRef.current, tipLeftRef.current],
//         {
//           scaleX: (i) => (i ? 0.15 : 1),
//           xPercent: (i) => (i ? -100 : 0),
//           ease: "power3.out",
//           duration: 0.6,
//           stagger: 0.1,
//         },
//         "-=0.5"
//       );

//     lineRef.current.addEventListener("mouseenter", () => tl.play());
//     lineRef.current.addEventListener("mouseleave", () => tl.reverse());
//   }, []);

//   return (
//     <span className="arrow-wrapper" ref={lineRef}>
//       <span className="arrow-line">
//         <span className="line-fill" ref={fillRef}></span>
//         <span className="line-tip" ref={tipRef}></span>
//       </span>
//       <span className="arrow-chevron chevron-right" ref={chevRightRef}>
//         <span className="chev-fill" ref={fillRightRef}></span>
//         <span className="chev-tip" ref={tipRightRef}></span>
//       </span>

//       <span className="arrow-chevron chevron-left" ref={chevLeftRef}>
//         <span className="chev-fill" ref={fillLeftRef}></span>
//         <span className="chev-tip" ref={tipLeftRef}></span>
//       </span>
//     </span>
//   );
// }

export function ArrowLine() {
  const lineRef = useRef();
  const fillRef = useRef();
  const fillRightRef = useRef();
  const fillLeftRef = useRef();
  const tipRef = useRef();
  const tipLeftRef = useRef();
  const tipRightRef = useRef();

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

    lineRef.current.addEventListener("mouseenter", () => tl.play());
    lineRef.current.addEventListener("mouseleave", () => tl.reverse());
  }, []);

  return (
    <span className="arrow-wrapper" ref={lineRef}>
      <span className="arrow-line">
        <span className="line-fill" ref={fillRef}></span>
        <span className="line-tip" ref={tipRef}></span>
      </span>
      <span className="arrow-chevron chevron-right">
        <span className="chev-fill" ref={fillRightRef}></span>
        <span className="chev-tip" ref={tipRightRef}></span>
      </span>
      <span className="arrow-chevron chevron-left">
        <span className="chev-fill" ref={fillLeftRef}></span>
        <span className="chev-tip" ref={tipLeftRef}></span>
      </span>
    </span>
  );
}

export default function ArrowDemo() {
  const wrapperRef = useRef();
  const originalRef = useRef();
  const hoverRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(originalRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 0.3,
    }).to(
      hoverRef.current,
      {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      },
      "-=0.2"
    );

    wrapperRef.current.addEventListener("mouseenter", () => tl.play());
    wrapperRef.current.addEventListener("mouseleave", () => tl.reverse());
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="arrow-reveal-wrapper"
      style={{ position: "relative", display: "inline-flex" }}
    >
      <div ref={originalRef}>
        <span className="arrow-line">
          <span className="line-fill-static"></span>
          <span className="line-tip-static"></span>
        </span>
        <span className="arrow-chevron chevron-right">
          <span className="chev-fill-static"></span>
          <span className="chev-tip-static"></span>
        </span>
        <span className="arrow-chevron chevron-left">
          <span className="chev-fill-static"></span>
          <span className="chev-tip-static"></span>
        </span>
      </div>

      <div ref={hoverRef} className="arrow-hover">
        <ArrowLine />
      </div>
    </div>
  );
}
