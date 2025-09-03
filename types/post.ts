export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    tags?: string[];
    readingTime?: string;
    content: string;
}

export interface PostFrontmatter {
    title?: string;
    description?: string;
    date?: string;
    image?: string;
    tags?: string;
}
