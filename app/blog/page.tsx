// app/blog/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta, PostMeta } from "@/lib/posts";
import styles from "./blog.module.css";
import { Route } from 'next';

export const metadata: Metadata = {
  title: "Blog page",
};
// This page is rendered on the server (or at build time)
export default async function BlogIndexPage() {
  // Fetch metadata for all posts using our helper function
  const posts: PostMeta[] = getAllPostsMeta();

  return (
    <div>
      <h1>My Blog</h1>
      <p className={styles.subtitle}>
        Thoughts and learnings on web development, security, and technology.
      </p>

      {posts.length === 0 ? (
        <p>No posts published yet. Check back soon!</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <article>
                {" "}
                {/* Use article tag for semantics */}
                <Link href={`/blog/${post.slug}` as Route} className={styles.postLink}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                </Link>
                <p className={styles.postMeta}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.author && ` by ${post.author}`}
                </p>
                <p className={styles.postDescription}>{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className={styles.readMoreLink}
                >
                  Read more →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
