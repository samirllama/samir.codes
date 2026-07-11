"use client";

// components/approach/Approach.tsx
// Narrative beat 3a: the constraints that make an agent safe in production, as
// a numbered rule set (terminal-indexed 01-05, built to scan). The SystemMap
// that follows shows the same principles as a physical stack.
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import styles from "./Approach.module.css";

const PRINCIPLES: readonly { title: string; body: string }[] = [
  {
    title: "Guards run before the model",
    body: "Deterministic checks validate every request before the LLM sees it. Anything that fails never reaches the model.",
  },
  {
    title: "The model stays at the language boundary",
    body: "LLMs parse and draft in natural language. Every decision that has to be right - pricing, compliance, math - is tested code.",
  },
  {
    title: "Nothing ships itself",
    body: "Agents draft; humans approve. A person signs off on every outbound action before it leaves the system.",
  },
  {
    title: "If it isn't logged, it didn't happen",
    body: "Every step emits a trace. When an agent acts, there is a record of what it saw and why it decided what it did.",
  },
  {
    title: "It costs nothing while it sleeps",
    body: "Serverless by default. The systems scale to zero and bill nothing between requests.",
  },
];

export const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="approach" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>How I think</p>
        <h2 className={styles.heading} data-reveal-heading>
          Five rules for agents in production
        </h2>
        <p className={styles.lede}>
          Autonomy is easy to demo and hard to trust. These are the constraints
          that make an agent safe to put in front of a real customer.
        </p>

        <ol className={styles.list}>
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className={styles.rule} data-reveal>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.ruleBody}>
                <h3 className={styles.ruleTitle}>{principle.title}</h3>
                <p className={styles.ruleText}>{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
