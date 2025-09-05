"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

import { gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ExperienceEntry } from "@/types";
import styles from "./WorkTimeline.module.css";

const WorkTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP context for proper cleanup
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
    <div ref={containerRef}>
      <h2 className={styles.title}>Work Overview</h2>
      <div className={styles.timelineGrid}>
        {experience.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

const TimelineEntry = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className={`timeline-entry ${styles.entryGrid}`}>
      <div className={styles.dateWrapper}>
        <time className={styles.date}>{entry.dateRange}</time>
        <div className={`timeline-dot ${styles.dot}`}></div>
      </div>
      <ProjectCard entry={entry} />
    </div>
  );
};

const ProjectCard = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className={`timeline-content ${styles.projectCardTwo}`}>
      <div className={styles.leftFrame}>
        <h4 className={styles.cardCompany}>{entry.company}</h4>
        <div className={styles.cardImgFrame}>
          {entry.projectScreenshotUrl && (
            <Image
              src={entry.projectScreenshotUrl}
              alt={`Screenshot of ${entry.company}`}
              fill
              className={styles.cardImage}
            />
          )}
        </div>
      </div>

      <div className={styles.cardContentFrame}>
        <h4 className={styles.cardTitle}>{entry.title}</h4>
        <p className={styles.cardDescription}>{entry.description}</p>
        <div className={styles.tagsContainer}>
          {entry.techTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkTimeline;
