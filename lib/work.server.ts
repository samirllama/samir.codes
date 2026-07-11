// @/lib/work.server.ts
import path from "path";
import {
  WorkFrontmatter,
  WorkMetric,
  WorkStatus,
  WorkStudy,
  WorkSummary,
} from "@/types/work";
import { compileMdxEntry, getCollectionSlugs, readFrontmatter } from "@/lib/mdx.server";

const workDirectory = path.join(process.cwd(), "content/work");

const WORK_STATUSES: readonly WorkStatus[] = ["live", "production", "nda"];

export function getWorkSlugs(): string[] {
  return getCollectionSlugs(workDirectory);
}

function normalizeStatus(status: unknown): WorkStatus {
  return WORK_STATUSES.includes(status as WorkStatus)
    ? (status as WorkStatus)
    : "production";
}

function normalizeStack(stack: unknown): string[] {
  if (!Array.isArray(stack)) return [];
  return stack.map((item) => String(item).trim()).filter(Boolean);
}

/** YAML leaves unquoted values ("4", "$0") as numbers/strings; coerce both. */
function normalizeMetrics(metrics: unknown): WorkMetric[] {
  if (!Array.isArray(metrics)) return [];
  return metrics
    .filter(
      (metric): metric is { label: unknown; value: unknown } =>
        typeof metric === "object" && metric !== null && "label" in metric && "value" in metric,
    )
    .map((metric) => ({ label: String(metric.label), value: String(metric.value) }));
}

function normalizeStudy(
  slug: string,
  data: WorkFrontmatter,
  readingTime: string,
): WorkSummary {
  return {
    slug,
    title: data.title || "",
    summary: data.summary || "",
    role: data.role || "",
    timeline: data.timeline || "",
    status: normalizeStatus(data.status),
    demoUrl: data.demoUrl,
    repoUrl: data.repoUrl,
    stack: normalizeStack(data.stack),
    metrics: normalizeMetrics(data.metrics),
    relatedPost: data.relatedPost,
    order: typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
    featured: data.featured === true,
    readingTime,
  };
}

/**
 * Fetches and compiles a single case study for its dedicated page view.
 */
export async function getWorkStudyBySlug(slug: string): Promise<WorkStudy | null> {
  const entry = await compileMdxEntry<WorkFrontmatter>(workDirectory, slug);
  if (!entry) return null;

  return {
    ...normalizeStudy(slug, entry.frontmatter, entry.readingTime),
    content: entry.content,
  };
}

/**
 * Frontmatter-only grab for listings and OG images; skips MDX compilation.
 */
export function getWorkSummaryBySlug(slug: string): WorkSummary | null {
  const entry = readFrontmatter<WorkFrontmatter>(workDirectory, slug);
  if (!entry) return null;
  return normalizeStudy(slug, entry.data, entry.readingTime);
}

/**
 * All case studies sorted by their curated `order`, cheapest path (no compile).
 */
export async function getAllWorkStudies(): Promise<WorkSummary[]> {
  const summaries = getWorkSlugs()
    .map((slug) => getWorkSummaryBySlug(slug))
    .filter((study): study is WorkSummary => study !== null);

  return summaries.sort((a, b) => a.order - b.order);
}
