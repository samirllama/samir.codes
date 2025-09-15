
import type { JSX, ReactElement } from 'react';

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    tags?: string[];
    readingTime?: string;
    content: JSX.Element | ReactElement;
}

export interface PostFrontmatter {
    title?: string;
    description?: string;
    date?: string;
    image?: string;
    tags?: string[];
}


export interface HastElement {
    type: string;
    tagName: string;
    properties: Record<string, any>;
    children: Array<{ type: string; value: string }>;
}
