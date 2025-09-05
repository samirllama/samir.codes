import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/posts.server";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about web development, design, and technology insights.",
  openGraph: {
    title: "Blog | Samir Lama",
    description:
      "Articles about web development, design, and technology insights.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.blogPage}>
      <div className="blog-container">
        <header className={styles.header}>
          <h1>Blog</h1>
          <p className={styles.subtitle}>
            Sharing insights about web development, design patterns, and the
            evolving landscape of modern technology.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
