import type { Metadata } from "next";
import styles from "./playbook.module.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Samir's Blog",
    default: "Blog",
  },
  description: "Personal blog about web development, security, and technology",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.blogContainer}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
}
