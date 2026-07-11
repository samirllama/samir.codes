// app/work/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkStudyBySlug, getWorkSlugs } from "@/lib/work.server";
import { getAllPosts } from "@/lib/posts.server";
import { WORK_STATUS_LABELS } from "@/types/work";
import { Metric } from "@/components/work/Metric";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import { FigmaSVG } from "@/components/app-header/NameLogo";
import styles from "./work.module.css";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getWorkStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} · Case study`,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
      images: [
        {
          url: `/work/${study.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary,
      images: [`/work/${study.slug}/opengraph-image`],
    },
  };
}

export default async function WorkStudyPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const study = await getWorkStudyBySlug(slug);

  if (!study) notFound();

  const relatedPost = study.relatedPost
    ? (await getAllPosts()).find((post) => post.slug === study.relatedPost)
    : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <TrackedLink
          href="/#work"
          location="Work Study Header"
          aria-label="Back to the case studies section"
        >
          <span className={styles.logo}>
            <FigmaSVG />
          </span>
          <span className={styles.logoSuffix}>/ Work</span>
        </TrackedLink>
      </div>

      <main>
        <article className={styles.study}>
          <header className={styles.header}>
            <p className={styles.meta}>
              <span className={styles.badge} data-status={study.status}>
                {WORK_STATUS_LABELS[study.status]}
              </span>
              {study.timeline && <span className={styles.metaItem}>{study.timeline}</span>}
              {study.role && <span className={styles.metaItem}>{study.role}</span>}
            </p>

            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.summary}>{study.summary}</p>

            {study.metrics.length > 0 && (
              <ul className={styles.metrics} aria-label="Key metrics">
                {study.metrics.map((metric) => (
                  <li key={metric.label} className={styles.metricItem}>
                    <Metric value={metric.value} label={metric.label} />
                  </li>
                ))}
              </ul>
            )}

            {(study.demoUrl || study.repoUrl || relatedPost) && (
              <div className={styles.links}>
                {study.demoUrl && (
                  <TrackedLink
                    external
                    href={study.demoUrl}
                    location="Work Study Links"
                    className={styles.linkPrimary}
                  >
                    Open the live demo
                  </TrackedLink>
                )}
                {study.repoUrl && (
                  <TrackedLink
                    external
                    href={study.repoUrl}
                    location="Work Study Links"
                    className={styles.linkSecondary}
                  >
                    View the source
                  </TrackedLink>
                )}
                {relatedPost && (
                  <TrackedLink
                    href={`/posts/${relatedPost.slug}`}
                    location="Work Study Links"
                    className={styles.linkSecondary}
                  >
                    Read the deep dive
                  </TrackedLink>
                )}
              </div>
            )}

            {study.stack.length > 0 && (
              <div className={styles.stack} aria-label="Technology stack">
                {study.stack.map((tech) => (
                  <span key={tech} className={styles.stackTag}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className={styles.content}>{study.content}</div>
        </article>
      </main>
    </div>
  );
}
