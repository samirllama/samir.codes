"use client";

// components/what-i-build/WhatIBuild.tsx
// Narrative beat 2: what the work actually is, before the stack (SystemMap) that
// follows. Three system categories, each grounded in a shipped system so the
// claim reads as evidence. The principles behind this work live in the
// "Deterministic by Default" post rather than on the homepage. Reveal
// choreography comes from the shared hook; the SSR markup is the finished section.
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import styles from "./WhatIBuild.module.css";

const CAPABILITIES: readonly {
  title: string;
  body: string;
  seenIn: string;
}[] = [
  {
    title: "Multi-agent pipelines",
    body: "Freight quoting and supply-chain workflows split into focused agents - parse, retrieve, compute, draft - each doing one job and handing off to the next.",
    seenIn: "Atlas · bp",
  },
  {
    title: "Language-boundary orchestration",
    body: "The model parses inbound requests and writes the reply. Pricing, compliance, and math stay in deterministic code I can test and trust.",
    seenIn: "trade-agent · Atlas",
  },
  {
    title: "Human-in-the-loop review",
    body: "Every outbound action lands in an approval console first. Agents propose, a person decides, and the whole exchange is logged end to end.",
    seenIn: "Atlas · trade-agent",
  },
];

export const WhatIBuild = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="build" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>What I build</p>
        <h2 className={styles.heading} data-reveal-heading>
          Agentic systems with a deterministic core
        </h2>
        <p className={styles.lede}>
          Fifteen agents across four production systems. The pattern repeats: a
          model handles language, tested code makes the decisions, and a human
          signs off before anything ships.
        </p>

        <ul className={styles.grid}>
          {CAPABILITIES.map((cap) => (
            <li key={cap.title} className={styles.card} data-reveal>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardBody}>{cap.body}</p>
              <span className={styles.seenIn}>{cap.seenIn}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
