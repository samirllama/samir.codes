// types/portfolio.ts

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  dateRange: string;
  description: string;
  techTags: string[];
  projectUrl?: string | null;
  projectScreenshotUrl?: string | null;
  companyLogoUrl?: string | null;
  /** Rail badge for the agentic-era roles, e.g. "4 production agents". */
  highlight?: string;
  /** Links the highlight into /work/[slug]. */
  caseStudySlug?: string;
  /** Distilled one-liners; presence expands the role into a quest card. */
  achievements?: string[];
}
