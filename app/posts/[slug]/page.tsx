import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getPostBySlug, getPostSlugs } from "@/lib/posts.server";
import { TrackedLink } from "@/features/analytics/components/tracked-link";
import { PostAnimations } from "./PostAnimations";
import { FigmaSVG } from "@/components/app-header/NameLogo";

import styles from "./post.module.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: `/posts/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/posts/${post.slug}/opengraph-image`],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) notFound();

  return (
    <>
      <PostAnimations />
      <div className={styles.container}>
        <div className={styles.nav}>
          <TrackedLink
            href="/blog"
            location="Header Logo"
            aria-label="Navigate to blog page"
          >
            <span className={styles.logo}>
              <FigmaSVG />
            </span>
            <span className={styles.logoBlog}>/ BLOG</span>
          </TrackedLink>
        </div>
        <main>
          <article className={styles.post}>
            <div className="blog-container">
              <header className={`post-hero ${styles.postHeader}`}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                  <time dateTime={post.date} className={styles.date}>
                    {formatDate(post.date)}
                  </time>
                  {post.readingTime && (
                    <span className={styles.readingTime}>
                      {post.readingTime}
                    </span>
                  )}
                </div>
                <p className={styles.description}>{post.description}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className={`post-content ${styles.content}`}>
                {post.content}
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
