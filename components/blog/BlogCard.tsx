import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import styles from "./blog.module.css";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className={styles.card}>
      <Link href={`/posts/${post.slug}`} className={styles.cardLink}>
        {post.image && (
          <div className={styles.imageContainer}>
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.meta}>
            <time dateTime={post.date} className={styles.date}>
              {formatDate(post.date)}
            </time>
            {post.readingTime && (
              <span className={styles.readingTime}>{post.readingTime}</span>
            )}
          </div>

          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.description}>{post.description}</p>

          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
