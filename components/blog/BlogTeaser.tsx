"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import BlogCard from "./BlogCard";
import styles from "./blog.module.css";

interface BlogTeaserProps {
  posts: Post[];
}

const BlogTeaser = ({ posts }: BlogTeaserProps) => {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className={`section blog-teaser ${styles.blogTeaser}`}>
      <div className={styles.background}>
        <div className="blog-teaser-bg"></div>
      </div>

      <div className="container">
        <div className={styles.header}>
          <h2>Latest from the Blog</h2>
          <p className={styles.subtitle}>
            Thoughts on web development, design, and the ever-evolving tech
            landscape.
          </p>
        </div>

        <div className={`blog-cards ${styles.blogCards}`}>
          {featuredPosts.map((post) => (
            <div key={post.slug} className="blog-card">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/blog" className="btn btn-primary">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
