// app/blog/page.tsx
import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/posts.server";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A running journal of software engineering, AI systems, projects I'm building, and lessons I'm still learning.",
  openGraph: {
    title: "Blog | Rants",
    description: "Articles about web development, design, and technology insights.",
  },
};

export default async function BlogPage() {
  // Works safely now that getAllPosts returns a typed Promise!
  const posts = await getAllPosts();

  return (
    <div className={styles.blogPage}>
      <div className="blog-container">
        <header className={styles.header}>
          <h1>The Logbook</h1>
          <p className={styles.subtitle}>
            A running journal of software engineering, AI systems, projects I&apos;m building, and
            lessons I&apos;m still learning.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {posts.map((post, index) => (
              /* content-omitted posts map perfectly down into display cards */
              <BlogCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
