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
  id: number; // Or string if preferred
  name: string;
  link: string;
}

export interface Experience {
  company: string;
  startYear: number;
  endYear?: number; // Make endYear optional
  title: string;
}

