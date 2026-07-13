// components/hero-pipeline/HeroSection.tsx
// Server component: the h1 is the LCP element and ships in initial HTML.
// All motion lives in the two client children (HeroReveal, AgentPipeline).
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import { AgentPipeline } from "./AgentPipeline";
import { HeroReveal } from "./HeroReveal";
import styles from "./HeroSection.module.css";

const STATS: readonly { value: string; label: string }[] = [
  { value: "15", label: "agents in production" },
  { value: "4", label: "systems shipped" },
  { value: "2", label: "live demos" },
];

export const HeroSection = () => (
  <section id="hero" className={styles.hero}>
    <div className={styles.heroTopSpace}></div>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.kicker} data-hero-kicker>
          ai engineer · Chicago
        </p>
        <div className={styles.heroContentGrid}>
          <h1 className={styles.headline} data-hero-headline>
            <span className={styles.line}>Building AI</span>
            <span className={styles.line}>that</span>
            <span className={styles.line}>people can trust.</span>
          </h1>
          <p className={styles.sub} data-hero-sub>
            I engineer AI systems with deterministic execution, human oversight, and complete
            auditability.
          </p>
        </div>
        <ul className={styles.stats} aria-label="Career statistics">
          {STATS.map((stat) => (
            <li key={stat.label} className={styles.stat} data-hero-stat>
              {/* data-stat-value carries the canonical target as an attribute:
                  the count-up writes to textContent, so it can't be the target
                  source or a soft-nav re-mount reads back the stale animated
                  value (see HeroReveal). */}
              <span className={styles.statValue} data-stat-value={stat.value}>
                {stat.value}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.ctas} data-hero-ctas>
          <TrackedLink href="/#work" location="Hero CTA" className={styles.ctaPrimary}>
            View Projects
          </TrackedLink>
          <TrackedLink href="/blog" location="Hero CTA" className={styles.ctaSecondary}>
            Logbook
            <svg
              className={styles.ctaArrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h15M13 5l7 7-7 7" />
            </svg>
          </TrackedLink>
        </div>
      </div>
      <div className={styles.visual} data-hero-visual>
        <AgentPipeline />
      </div>
    </div>
    <HeroReveal />
  </section>
);
