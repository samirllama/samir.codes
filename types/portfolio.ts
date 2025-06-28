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
