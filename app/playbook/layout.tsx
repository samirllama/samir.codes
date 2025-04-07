import type { Metadata } from "next";
import styles from "./playbook.module.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Samir's Playbook",
    default: "Playbook",
  },
  description:
    "Engineering Playbook with insights on web development, security, and technology",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.blogContainer}>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
