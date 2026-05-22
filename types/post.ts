// @/types/post.ts
import { ReactNode } from "react";

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    tags: string[];
    readingTime?: string;
    content: ReactNode; // Maps directly to the compiled runtime tree output
}

export type PostSummary = Omit<Post, 'content'>;

export interface PostFrontmatter {
    title?: string;
    description?: string;
    date?: string;
    image?: string;
    tags?: string[] | string;
}

export interface HastElement {
    type: string;
    tagName: string;
    properties: Record<string, unknown>;
    children: Array<{ type: string; value: string }>;
}
