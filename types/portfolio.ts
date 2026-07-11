// types/portfolio.ts
export interface Skill {
  name: string;
  url: string;
  animatedGradientUnderline?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: number;
  name: string;
  link: string;
  projectScreenshotUrl?: string;
  altText?: string;
  subtitle?: string;
}

export interface Experience {
  company: string;
  startYear: number;
  endYear?: number; // Make endYear optional
  title: string;
}


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

export interface ProjectEntry {
  id?: string;
  role?: string;
  altText?: string;
  subtitle?: string;
  company: string;
  title: string;
  dateRange: string;
  description: string;
  techTags: string[];
  projectUrl?: string | null;
  projectScreenshotUrl?: string | null;
}
