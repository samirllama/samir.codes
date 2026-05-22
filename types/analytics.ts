export interface BaseProperties {
  sessionId?: string;
  userId?: string;
  [key: string]: unknown;
}

export interface LinkClickProperties extends BaseProperties {
  url: string;
  text: string;
  location: string;
}

export interface PageViewProperties extends BaseProperties {
  page: string;
  category: string;
}

export interface BlogPostProperties extends BaseProperties {
  title: string;
  category: string;
  readTime: number;
}

export interface SearchProperties extends BaseProperties {
  query: string;
  resultsCount: number;
}

export interface SubscriptionProperties extends BaseProperties {
  type: "newsletter" | "rss";
}

export interface SocialShareProperties extends BaseProperties {
  platform: string;
  url: string;
}

export interface UIClickProperties extends BaseProperties {
  elementType: string;
  elementText: string;
  location: string;
  additionalData?: Record<string, unknown>;
}

export type AnalyticsProperties =
  | LinkClickProperties
  | PageViewProperties
  | BlogPostProperties
  | SearchProperties
  | SubscriptionProperties
  | SocialShareProperties
  | UIClickProperties;
