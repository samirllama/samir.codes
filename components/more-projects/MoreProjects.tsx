// components/more-projects/MoreProjects.tsx
// Compact grid of real side projects; the flagship work lives in CaseStudies.
import { sideProjects } from "@/lib/data/projects";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import styles from "./MoreProjects.module.css";

export const MoreProjects = () => (
  <section id="more-projects" className={styles.section}>
    <div className={styles.inner}>
      <p className={styles.kicker}>Also shipped</p>
      <h2 className={styles.heading}>More projects</h2>

      <div className={styles.grid}>
        {sideProjects.map((project) => (
          <article key={project.title} className={styles.card}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tech}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              <TrackedLink
                external
                href={project.repoUrl}
                location="More Projects"
                className={styles.link}
              >
                Code ↗
              </TrackedLink>
              {project.demoUrl && (
                <TrackedLink
                  external
                  href={project.demoUrl}
                  location="More Projects"
                  className={styles.link}
                >
                  Live ↗
                </TrackedLink>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
