// lib/data/experience.ts

export interface ExperienceItemData {
  id: string;
  dateRange: string; // e.g., "June 2022 - Present"
  title: string;
  company: string;
  location: string;
  description: string[];
  tags?: string[];
}

export const professionalExperience: ExperienceItemData[] = [
  {
    id: 'bp',
    dateRange: 'June 2022 - Present',
    title: 'Senior Software Engineer',
    company: 'British Petroleum (BP)',
    location: 'Chicago, IL',
    description: [
      'Spearheaded the greenfield development and launch of a mission-critical co-processing application for the Bioverse platform, digitizing manual Excel workflows and boosting efficiency for 200+ auditors/stakeholders.',
      'Collaborated closely with product and design teams to implement user-centric features, resulting in a 35% increase in user engagement.',
      'Engineered scalable web applications using React, GraphQL, and Python, achieving a 30% reduction in API response times for internal users.',
      'Contributed significantly to migrating legacy systems to cloud-native architectures (AWS), improving scalability and cutting operational costs by 25%.',
    ],
    tags: ['React', 'GraphQL', 'Python', 'AWS', 'Next.js', 'TypeScript', 'Agile'],
  },
  {
    id: 'wf',
    dateRange: 'Dec 2021 – June 2022',
    title: 'Software Engineer',
    company: 'Wells Fargo',
    location: 'Chicago, IL',
    description: [
      'Architected and implemented serverless microservices using AWS Lambda and API Gateway, reducing infrastructure costs by 20% and enhancing system scalability.',
      'Optimized database queries and designed RESTful APIs, leading to a 25% reduction in response times and improved data accessibility.',
      'Developed and maintained a reusable React component library, increasing development team velocity by 20%.',
      'Mentored junior engineers on best practices in code quality, testing, and cloud-native development.',
    ],
    tags: ['AWS Lambda', 'API Gateway', 'Serverless', 'React', 'REST API', 'Mentorship'],
  },
  {
    id: 'di',
    dateRange: 'Sept 2020 – Dec 2021',
    title: 'Software Engineer',
    company: 'Dealer Inspire',
    location: 'Chicago, IL',
    description: [
      'Enhanced and maintained over 3000 dealership websites using TypeScript, React, and Node.js, improving average load times by 15% and user engagement by 10%.',
      'Designed and implemented a scalable CMS solution integrating React with headless CMS platforms (Contentful, Strapi) and AWS services, reducing content update cycles by 30%.',
      'Implemented Server-Side Rendering (SSR) and lazy loading techniques, significantly improving SEO rankings and achieving a 25% performance boost for sites with 1M+ monthly users, while ensuring WCAG accessibility compliance.',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'SSR', 'Headless CMS', 'AWS', 'Performance', 'Accessibility'],
  },
  {
    id: 'expedia',
    dateRange: 'Feb 2020 – Sept 2020',
    title: 'Software Developer',
    company: 'Expedia Group',
    location: 'Chicago, IL',
    description: [
      'Championed the adoption of Behavior-Driven Development (BDD) practices, resulting in a 40% reduction in post-release defects and increasing test coverage to 80%.',
      'Developed key features for a high-traffic travel platform using React and integrated GraphQL for efficient data fetching.',
      'Contributed to building and maintaining CI/CD pipelines, reducing average deployment times by 60%.',
    ],
    tags: ['React', 'GraphQL', 'BDD', 'Testing', 'CI/CD'],
  },
  // Add Education or other sections if desired
];

export interface TechSkill {
  category: string;
  items: string[];
}

export const techSkills: TechSkill[] = [
  { category: 'Languages', items: ['Go', 'Modern JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'] },
  { category: 'Client-Side', items: ['React', 'Next.js', 'Redux', 'GraphQL (Apollo Client)', 'MSAL', 'Testing (Jest, RTL)', 'Headless CMS (Contentful, Strapi)'] },
  { category: 'Server-Side', items: ['Node.js (Apollo Server, Prisma, Drizzle)', 'Python (SQLAlchemy)', 'GraphQL (Server)', 'AWS API Gateway'] },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'DynamoDB', 'Redis', 'AWS Aurora'] },
  { category: 'Cloud & Infra', items: ['AWS (Lambda, S3, Aurora, AppSync, CloudWatch)', 'Azure', 'Kubernetes', 'Docker', 'IaC (Terraform, CloudFormation)'] },
  { category: 'Dev Tools & Practices', items: ['Git', 'GitHub Actions', 'Jenkins', 'DataDog', 'LaunchDarkly', 'Agile', 'CI/CD'] },
];
