// components/work/Metric.tsx
// Glass stat chip for case studies: frontmatter metric rows on the study
// header + ad-hoc <Metric /> callouts inside MDX bodies.
import styles from "./Metric.module.css";

interface MetricProps {
  value: string;
  label: string;
}

export const Metric = ({ value, label }: MetricProps) => (
  <span className={styles.metric}>
    <span className={styles.value}>{value}</span>
    <span className={styles.label}>{label}</span>
  </span>
);
