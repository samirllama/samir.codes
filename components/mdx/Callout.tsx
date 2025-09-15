// components/mdx/Callout.tsx
import styles from "./mdx.module.css";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}

export const Callout: React.FC<CalloutProps> = ({
  children,
  type = "info",
}) => {
  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <span className={styles.calloutEmoji}>💡</span>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  );
};
