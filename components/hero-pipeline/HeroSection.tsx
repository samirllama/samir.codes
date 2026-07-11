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
  { value: "$0", label: "idle infra cost" },
];

export const HeroSection = () => (
  <section id="hero" className={styles.hero}>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.kicker} data-hero-kicker>
          AI systems engineer · Chicago
        </p>
        <h1 className={styles.headline} data-hero-headline>
          Agents that reason, act, and wait for a human to say yes.
        </h1>
        <p className={styles.sub} data-hero-sub>
          Since 2025 I have shipped fifteen production agents across freight
          quoting, trade compliance, and travel approvals. Every one runs
          behind deterministic guards, drafts instead of sends, and leaves an
          audit trail.
        </p>
        <ul className={styles.stats} aria-label="Career statistics">
          {STATS.map((stat) => (
            <li key={stat.label} className={styles.stat} data-hero-stat>
              <span className={styles.statValue} data-stat-value>
                {stat.value}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.ctas} data-hero-ctas>
          <TrackedLink
            href="/#work"
            location="Hero CTA"
            className={styles.ctaPrimary}
          >
            See the proof
          </TrackedLink>
          <TrackedLink
            href="/blog"
            location="Hero CTA"
            className={styles.ctaSecondary}
          >
            Read the engineering log
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
