"use client";

// components/system-map/SystemMap.tsx
// Narrative beat 3b: the same architecture as a physical stack, top-down -
// language at the top, determinism at the bottom. Replaces the old skills tag
// cloud; every technology carries the system it earned its place in. Reveal
// comes from the shared hook, so the SSR markup is already the finished map.
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { systemLayers } from "@/lib/data/system-map";
import styles from "./SystemMap.module.css";

export const SystemMap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>System map</p>
        <h2 className={styles.heading} data-reveal-heading>
          One stack, every layer earned
        </h2>
        <p className={styles.lede}>
          The shape underneath all four systems. Natural language stays at the
          top; the things that must be right live at the bottom.
        </p>

        <ol className={styles.stack}>
          {systemLayers.map((layer) => (
            <li key={layer.id} className={styles.layer} data-reveal>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.layerHead}>
                <span className={styles.layerLabel}>{layer.label}</span>
              </div>
              <div className={styles.layerBody}>
                <p className={styles.layerRole}>{layer.role}</p>
                <div className={styles.techGrid}>
                  {layer.tech.map((tech) => (
                    <span key={tech.name} className={styles.tech}>
                      <span className={styles.techName}>{tech.name}</span>
                      <span className={styles.techProv}>{tech.provenance}</span>
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
