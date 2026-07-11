// @/types/work.ts
import { ReactNode } from "react";

export type WorkStatus = "live" | "production" | "nda";

export interface WorkMetric {
  label: string;
  value: string;
}

/** Raw case-study YAML frontmatter; loose until normalized in lib/work.server. */
export interface WorkFrontmatter {
  title?: string;
  summary?: string;
  role?: string;
  timeline?: string;
  status?: WorkStatus;
  demoUrl?: string;
  repoUrl?: string;
  stack?: string[];
  metrics?: WorkMetric[];
  relatedPost?: string;
  order?: number;
  featured?: boolean;
}

export interface WorkStudy {
  slug: string;
  title: string;
  summary: string;
  role: string;
  timeline: string;
  status: WorkStatus;
  demoUrl?: string;
  repoUrl?: string;
  stack: string[];
  metrics: WorkMetric[];
  relatedPost?: string;
  order: number;
  featured: boolean;
  readingTime?: string;
  content: ReactNode; // Compiled MDX runtime tree, mirrors Post.content
}

export type WorkSummary = Omit<WorkStudy, "content">;

/** Badge copy per status, shared by homepage cards and the study header. */
export const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  live: "Live demo",
  production: "In production",
  nda: "Under NDA",
};
