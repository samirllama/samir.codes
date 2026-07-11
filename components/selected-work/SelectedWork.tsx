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
import { sideProjects } from "@/lib/data/projects";
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
        <p className={styles.kicker}>Proof</p>
        {/* Alt headings: "Some of my projects" / "Systems + side quests" */}
        <h2 className={styles.heading}>Selected work</h2>
        <p className={styles.lede}>
          Four systems carry the argument: two you can inspect end to end, and
          two shipped inside enterprises behind NDAs. Every one runs guarded,
          drafts instead of sends, and logs what it did.
        </p>

        <div className={styles.flagshipGrid}>
          {flagship.map((study) => (
            <TrackedLink
              key={study.slug}
              href={`/work/${study.slug}`}
              location="Selected Work"
              className={styles.flagshipCard}
              ariaLabel={`Read the ${study.title} case study`}
            >
              <span className={styles.glow} aria-hidden="true" />
              <Brackets />
              <span className={styles.cardTop}>
                <span className={styles.badge} data-status={study.status}>
                  {WORK_STATUS_LABELS[study.status]}
                </span>
                <span className={styles.timeline}>{study.timeline}</span>
                <span className={styles.readout} aria-hidden="true">
                  target locked
                </span>
              </span>
              <span className={styles.cardTitle}>{study.title}</span>
              <span className={styles.cardSummary}>{study.summary}</span>
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
              <span className={styles.cardCta}>Read the case study →</span>
            </TrackedLink>
          ))}
        </div>

        <div className={styles.professionalGrid}>
          {professional.map((study) => (
            <TrackedLink
              key={study.slug}
              href={`/work/${study.slug}`}
              location="Selected Work"
              className={styles.professionalCard}
              ariaLabel={`Read the ${study.title} case study`}
            >
              <Brackets />
              <span className={styles.cardTop}>
                <span className={styles.badge} data-status={study.status}>
                  {WORK_STATUS_LABELS[study.status]}
                </span>
                <span className={styles.timeline}>{study.timeline}</span>
                <span className={styles.readout} aria-hidden="true">
                  access restricted
                </span>
              </span>
              <span className={styles.cardTitleSmall}>{study.title}</span>
              <span className={styles.cardSummarySmall}>{study.summary}</span>
              <span className={styles.cardCta}>Read the case study →</span>
            </TrackedLink>
          ))}
        </div>

        <div className={styles.sideQuests}>
          {/* Alt sub-headings: "Also shipped" / "Off-duty builds" */}
          <h3 className={styles.subheading}>Side quests</h3>
          <p className={styles.subLede}>
            Smaller builds that keep the tools sharp.
          </p>
          <div className={styles.sideGrid}>
            {sideProjects.map((project) => (
              <article key={project.title} className={styles.sideCard}>
                <Brackets />
                <span className={styles.sideTop}>
                  <h4 className={styles.sideTitle}>{project.title}</h4>
                  <span className={styles.readout} aria-hidden="true">
                    view source
                  </span>
                </span>
                <p className={styles.sideDescription}>{project.description}</p>
                <span className={styles.cardStack}>
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} className={styles.stackTag}>
                      {tech}
                    </span>
                  ))}
                </span>
                <span className={styles.sideLinks}>
                  <TrackedLink
                    external
                    href={project.repoUrl}
                    location="Side Quests"
                    className={styles.sideLink}
                  >
                    Code ↗
                  </TrackedLink>
                  {project.demoUrl && (
                    <TrackedLink
                      external
                      href={project.demoUrl}
                      location="Side Quests"
                      className={styles.sideLink}
                    >
                      Live ↗
                    </TrackedLink>
                  )}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
