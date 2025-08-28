"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

import { gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ExperienceEntry } from "@/types";

/* ======================================================= */
/* MOBILE-ONLY LAYOUT (uses `md:hidden` to hide on desktop) */
/* ======================================================= */
const _TimelineMobileEntry = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="flex relative mb-8">
      {/* Date */}
      <div className="w-16 min-w-[64px] text-left pt-1">
        <time className="text-sm font-medium">{entry.dateRange}</time>
      </div>
      {/* Timeline dot */}
      <div className="absolute left-[12px] top-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-timeline-dot z-10" />
      </div>
      {/* Content: Role and Company */}
      <div className="flex-1 pl-4 pt-1">
        <p className="text-sm">
          <span className="font-medium">{entry.title}, </span>
          {entry.projectUrl && (
            <a href={entry.projectUrl} className="underline">
              {entry.company}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

const WorkExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
      entries.forEach((entry) => {
        const dot = entry.querySelector(".timeline-dot");
        const content = entry.querySelector(".timeline-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.set([dot, content], { autoAlpha: 0 });

        tl.fromTo(
          dot,
          { scale: 0.5, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "power2.inOut",
          }
        );

        tl.fromTo(
          content,
          { x: 50 },
          {
            x: 0,
            autoAlpha: 1,
            ease: "power2.out",
          },
          "<"
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-fluid-xl text-timeline-text w-full">
      <div ref={containerRef}>
        <h2 className="text-fluid-h2 my-fluid-lg">Work Overview</h2>

        {/* main grid - two columns: dates and content */}
        <div className="grid grid-cols-[auto_1fr] gap-2 md:gap-4 relative">
          {experience.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="timeline-entry col-span-full py-fluid-lg">
      {/* Nested grid handles internal layout.
        Two columns: 'auto' for the date/dot and '1fr' for the content.
      */}
      <div className="grid grid-cols-[1fr] md:grid-cols-[auto_1fr] md:gap-2 items-center relative">
        <div className="flex justify-around items-center gap-2 mr-auto py-fluid-md">
          <time className="-order-1 md:order-first text-fluid-meta">
            {entry.dateRange}
          </time>
          <div className="order-first md:order-last timeline-dot w-2 h-2 rounded-full bg-timeline-dot z-10 mx-auto"></div>
        </div>

        <ProjectCard entry={entry} />
      </div>
    </div>
  );
};

const ProjectCard = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="project-card timeline-content">
      <div className="leftHead">
        <h3 className="text-fluid-h3 mt-0 mb-fluid-lg text-timeline-text">
          {entry.company}
        </h3>
        {entry.projectScreenshotUrl && (
          <Image
            src={entry.projectScreenshotUrl}
            alt={`Screenshot of ${entry.company}`}
            fill
            className="max-w-[100%] m-[0] block w-full object-fit rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        )}
      </div>
      <div className="rightContent bg-timeline-bg">
        <h4 className="text-fluid-h4 mb-fluid-lg text-timeline-text">
          {entry.title}
        </h4>
        <p className="text-fluid-caption">{entry.description}</p>
        <div className="mt-fluid-lg flex flex-wrap gap-2">
          {entry.techTags.map((tag) => (
            <span
              key={tag}
              className="border-timeline-border text-timeline-text text-fluid-meta px-3 py-1 rounded-md border border-timeline-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceTimeline;
