// components/selected-work/SelectedWork.tsx
// Homepage "Proof" section, merged: the four agentic case studies keep their
// prominence (flagship + NDA tiers linking into /work/[slug]) and the real
// side projects render as a compact "side quests" tier below. Server
// component - card data is frontmatter + static data read at build time.
//
// The hover layer is deliberately CSS-only (target-lock brackets, glow hook,
// press state); the pointer-driven layer (cursor-tracked glow, tilt, scramble
// readout) lands with the P5 micro-interaction pass on these same DOM hooks.
import { getAllWorkStudies } from "@/lib/work.server";
import { WORK_STATUS_LABELS } from "@/types/work";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import styles from "./SelectedWork.module.css";

const Brackets = () => (
  <span aria-hidden="true">
    <span className={`${styles.bracket} ${styles.bracketTl}`} />
    <span className={`${styles.bracket} ${styles.bracketTr}`} />
    <span className={`${styles.bracket} ${styles.bracketBl}`} />
    <span className={`${styles.bracket} ${styles.bracketBr}`} />
  </span>
);

export const SelectedWork = async () => {
  const studies = await getAllWorkStudies();
  const flagship = studies.filter((study) => study.featured);
  const professional = studies.filter((study) => !study.featured);

  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Work overview</p>
        {/* Alt headings: "Some of my projects" / "Systems + side quests" */}
        <h2 className={styles.heading}>Selected work</h2>
        <p className={styles.lede}>
          Production AI systems built around deterministic software, explicit service boundaries,
          and observable execution. Rather than giving models authority over business logic, these
          architectures constrain LLMs to narrowly defined roles-making complex AI systems reliable,
          auditable, and safe for production.
        </p>

        <div className={styles.flagshipGrid}>
          {flagship.map((study) => (
            <div key={study.slug} className={styles.flagshipCard}>
              <span className={styles.glow} aria-hidden="true" />
              <Brackets />
              <span className={styles.cardTop}>
                {study.status.map((s) => (
                  <span className={styles.badge} key={s} data-status={s}>
                    {WORK_STATUS_LABELS[s]}
                  </span>
                ))}
                <span className={styles.timeline}>{study.timeline}</span>
                <span className={styles.readout} aria-hidden="true">
                  target locked
                </span>
              </span>
              <span className={styles.cardTitle}>{study.title}</span>
              <span className={styles.cardSummary}>{study.summary}</span>
              <span className={styles.cardNote}>{study?.note}</span>
              {study.metrics.length > 0 && (
                <span className={styles.cardMetrics}>
                  {study.metrics.slice(0, 3).map((metric) => (
                    <span key={metric.label} className={styles.cardMetric}>
                      <span className={styles.cardMetricValue}>{metric.value}</span>
                      <span className={styles.cardMetricLabel}>{metric.label}</span>
                    </span>
                  ))}
                </span>
              )}
              {study.stack.length > 0 && (
                <span className={styles.cardStack}>
                  {study.stack.slice(0, 6).map((tech) => (
                    <span key={tech} className={styles.stackTag}>
                      {tech}
                    </span>
                  ))}
                </span>
              )}
              <TrackedLink
                href={`/work/${study.slug}`}
                location="Selected Work"

                ariaLabel={`Read the ${study.title} case study`}
              >
                <span className={styles.cardCta}>Read the case study →</span>
              </TrackedLink>
            </div>
          ))}
        </div>

        <div className={styles.professionalGrid}>
          {professional.map((study) => (
            <div key={study.slug} className={styles.professionalCard}>
              <Brackets />
              <span className={styles.cardTop}>
                {study.status.map((s) => (
                  <span key={s} className={styles.badge} data-status={s}>
                    {WORK_STATUS_LABELS[s]}
                  </span>
                ))}
                <span className={styles.timeline}>{study.timeline}</span>
                <span className={styles.readout} aria-hidden="true">
                  access restricted
                </span>
              </span>
              <span className={styles.cardTitleSmall}>{study.title}</span>
              <span className={styles.cardSummarySmall}>{study.summary}</span>
              <TrackedLink
                href={`/work/${study.slug}`}
                location="Selected Work"
                ariaLabel={`Read the ${study.title} case study`}
              >
                <span className={styles.cardCta}>Read the case study →</span>
              </TrackedLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
