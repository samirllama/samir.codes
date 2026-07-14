"use client";

// components/career-journey/CareerJourney.tsx
// Homepage "Experience" beat as a campaign log. The energy rail fills with
// scroll, the agentic-era roles render as always-open quest cards (the
// 30-90s scan never has to click), and earlier roles compress to one-line
// checkpoints. Reveal choreography is the HUD vocabulary: bracket lock-on,
// drawn ticks, scramble-decoded dates - real numbers only, no invented XP.
// Reduced motion and no-JS read the complete static log: the SSR default
// state IS the final state.

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { MOTION_DUR, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";
import { experience } from "@/lib/data/work-exp";
import type { ExperienceEntry } from "@/types";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import { cn } from "@/lib/utils";
import styles from "./CareerJourney.module.css";

const STACK_LIMIT = 7;
const SCRAMBLE_CHARS = "▮▯01";

const isActiveRole = (entry: ExperienceEntry): boolean => entry.dateRange.includes("Present");

/** "Dec 2021 — Jun 2022" -> "2021-2022"; "Feb 2020 — Oct 2020" -> "2020". */
const yearRange = (dateRange: string): string => {
  const years = dateRange.match(/\d{4}/g);
  if (!years || years.length === 0) return dateRange;
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : `${first}-${last}`;
};

const Brackets = () => (
  <span aria-hidden="true">
    <span className={`${styles.bracket} ${styles.bracketTl}`} />
    <span className={`${styles.bracket} ${styles.bracketTr}`} />
    <span className={`${styles.bracket} ${styles.bracketBl}`} />
    <span className={`${styles.bracket} ${styles.bracketBr}`} />
  </span>
);

const Tick = () => (
  <svg className={styles.tick} viewBox="0 0 14 14" aria-hidden="true" focusable="false">
    <path className={styles.tickPath} data-tick-path d="M2.5 7.5 5.5 10.5 11.5 3.5" />
  </svg>
);

const QuestCard = ({ entry }: { entry: ExperienceEntry }) => {
  const active = isActiveRole(entry);
  return (
    <li className={cn(styles.quest, { [styles.questActive]: active })} data-quest>
      <span className={styles.node} aria-hidden="true">
        {active && <span className={styles.nodeRing} data-node-ring />}
      </span>
      <article className={styles.card}>
        <span className={styles.flash} data-flash aria-hidden="true" />
        <Brackets />
        <div className={styles.cardTop}>
          <span className={cn(styles.status, { [styles.statusActive]: active })}>
            {active ? "Active" : "Cleared"}
          </span>
          <span className={styles.date} data-decode>
            {entry.dateRange}
          </span>
        </div>
        <h3 className={styles.role}>
          {entry.title} · {entry.company}
        </h3>
        {entry.highlight && entry.caseStudySlug && (
          <TrackedLink
            href={`/work/${entry.caseStudySlug}`}
            location="Career Journey"
            className={styles.highlight}
            ariaLabel={`${entry.highlight} - read the ${entry.company} case study`}
          >
            <span data-decode>{entry.highlight}</span>
            <span className={styles.highlightCta}>case study →</span>
          </TrackedLink>
        )}
        {entry.achievements && entry.achievements.length > 0 && (
          <ul className={styles.achievements}>
            {entry.achievements.map((achievement) => (
              <li key={achievement} className={styles.achievement}>
                <Tick />
                {achievement}
              </li>
            ))}
          </ul>
        )}
        {entry.techTags.length > 0 && (
          <div className={styles.stack}>
            {entry.techTags.slice(0, STACK_LIMIT).map((tag) => (
              <span key={tag} className={styles.stackTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </li>
  );
};

const CheckpointRow = ({ entry }: { entry: ExperienceEntry }) => (
  <li className={styles.checkpoint} data-checkpoint>
    <span className={styles.nodeSmall} aria-hidden="true" />
    <span className={styles.checkpointDate}>{yearRange(entry.dateRange)}</span>
    <span className={styles.checkpointRole}>
      {entry.title} · {entry.company}
    </span>
  </li>
);

export const CareerJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion adds no context on purpose: the SSR markup is already
      // the completed log (rail charged, brackets locked, real text).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        if (!section) return;
        const q = gsap.utils.selector(section);

        const rail = q("[data-rail-fill]");
        const quests = q("[data-quest]") as HTMLElement[];
        const rows = q("[data-checkpoint]") as HTMLElement[];
        const ticks = q("[data-tick-path]");
        const ring = q("[data-node-ring]");
        const timelineEl = (q("[data-timeline]") as HTMLElement[])[0];

        // JS-only pre-reveal states; every tween below animates back to the
        // SSR default.
        quests.forEach((quest) => quest.classList.add(styles.pending));
        gsap.set(quests, { autoAlpha: 0, y: 28, scale: 0.96 });
        gsap.set(rows, { autoAlpha: 0, y: 14 });
        if (ticks.length) gsap.set(ticks, { drawSVG: "0%" });
        gsap.set(rail, { scaleY: 0 });

        // Energy rail charges as the log scrolls through the viewport.
        gsap.to(rail, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineEl,
            start: "top 72%",
            end: "bottom 60%",
            scrub: true,
          },
        });

        const revealQuest = (quest: HTMLElement, index: number): void => {
          const cq = gsap.utils.selector(quest);
          const tl = gsap.timeline({ delay: index * MOTION_STAGGER.loose });
          tl.to(quest, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: MOTION_DUR.base,
            ease: MOTION_EASE.out,
          });
          // Brackets snap in on their own springy CSS transition.
          tl.add(() => quest.classList.remove(styles.pending), "-=0.45");
          tl.fromTo(
            cq("[data-flash]"),
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.18,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            "-=0.4",
          );
          (cq("[data-decode]") as HTMLElement[]).forEach((el) => {
            tl.to(
              el,
              {
                scrambleText: {
                  text: el.textContent ?? "",
                  chars: SCRAMBLE_CHARS,
                  speed: 0.4,
                },
                duration: 0.6,
                ease: "none",
              },
              "-=0.5",
            );
          });
          tl.to(
            cq("[data-tick-path]"),
            {
              drawSVG: "100%",
              duration: MOTION_DUR.fast,
              ease: MOTION_EASE.out,
              stagger: MOTION_STAGGER.base,
            },
            "-=0.35",
          );
        };

        ScrollTrigger.batch(quests, {
          start: "top 82%",
          once: true,
          onEnter: (batch) => batch.forEach((el, index) => revealQuest(el as HTMLElement, index)),
        });

        ScrollTrigger.batch(rows, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: MOTION_DUR.fast,
              ease: MOTION_EASE.out,
              stagger: MOTION_STAGGER.base,
            }),
        });

        // Active-quest pulse: transient decorative ring, paused offscreen.
        let pulse: gsap.core.Tween | undefined;
        let pulseTrigger: ScrollTrigger | undefined;
        if (ring.length) {
          pulse = gsap.fromTo(
            ring,
            { scale: 1, opacity: 0.7, transformOrigin: "50% 50%" },
            {
              scale: 2.1,
              opacity: 0,
              duration: 1.4,
              ease: "power1.out",
              repeat: -1,
              repeatDelay: 1.4,
              paused: true,
            },
          );
          pulseTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? pulse?.play() : pulse?.pause()),
          });
        }

        return () => {
          pulseTrigger?.kill();
          pulse?.kill();
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Career log</p>
        <h2 className={styles.heading}>Career journey</h2>

        <div className={styles.timeline} data-timeline>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} data-rail-fill />
          </div>
          <ol className={styles.entries}>
            {experience.map((entry) =>
              entry.achievements && entry.achievements.length > 0 ? (
                <QuestCard key={entry.id} entry={entry} />
              ) : (
                <CheckpointRow key={entry.id} entry={entry} />
              ),
            )}
          </ol>
        </div>
      </div>
    </section>
  );
};
