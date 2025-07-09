"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function TimelineDemo() {
  const container = useRef<HTMLElement>(null);
  const tl = useRef<GSAPTimeline>(null);

  const toggleTimeline = () => {
    if (tl.current) {
      tl.current.reversed(!tl.current.reversed());
    }
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLDivElement>(".box");
      tl.current = gsap
        .timeline()
        .to(boxes[0], { className: "+=box-1-animate" })
        .to(boxes[1], { className: "+=box-2-animate" })
        .to(boxes[2], { className: "+=box-3-animate" })
        .reverse();
    },
    { scope: container }
  );

  return (
    <main>
      <section className="boxes-container" ref={container}>
        <h2>Use the button to toggle a Timeline</h2>
        <div>
          <button onClick={toggleTimeline}>Toggle Timeline</button>
        </div>
        <div className="box gradient-green">Box 1</div>
        <div className="box gradient-blue">Box 2</div>
        <div className="box gradient-blue">Box 3</div>
      </section>
    </main>
  );
}
