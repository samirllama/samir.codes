// @/lib/posts.server.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { HastElement } from "@/types";
import { MDXComponents } from "@/components/mdx/MDXComponents";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs
        .readdirSync(postsDirectory)
        .filter((name) => name.endsWith(".mdx"))
        .map((name) => name.replace(/\.mdx$/, ""));
}

/**
 * Normalizes tags field regardless of whether YAML formatted it as a string or string[]
 */
function normalizeTags(tags: unknown): string[] {
    if (!tags) return [];
    return Array.isArray(tags)
        ? tags.map((t) => String(t).trim())
        : String(tags).split(",").map((t) => t.trim()).filter(Boolean);
}

/**
 * Fetches and compiles a single post for its dedicated page view.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { content: compiledContent, frontmatter } = await compileMDX<{
            title?: string;
            description?: string;
            date?: string;
            tags?: string[] | string;
            image?: string;
        }>({
            source: fileContents,
            components: MDXComponents,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                        [
                            rehypePrettyCode,
                            {
                                theme: "github-dark",
                                keepBackground: false,
                                defaultLang: "plaintext",
                                onVisitLine(node: HastElement) {
                                    if (node.children.length === 0) {
                                        node.children = [{ type: "text", value: " " }];
                                    }
                                },
                                onVisitHighlightedLine(node: HastElement) {
                                    const currentClass = node.properties.className;
                                    const classList = Array.isArray(currentClass) ? currentClass : [];
                                    node.properties.className = [...classList, "line--highlighted"];
                                },
                                onVisitHighlightedChars(node: HastElement) {
                                    node.properties.className = ["word--highlighted"];
                                },
                            },
                        ],
                    ],
                },
            },
        });

        const stats = readingTime(fileContents);

        return {
            slug,
            title: frontmatter.title || "",
            description: frontmatter.description || "",
            date: frontmatter.date || "",
            image: frontmatter.image,
            tags: normalizeTags(frontmatter.tags),
            readingTime: stats.text,
            content: compiledContent,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

/**
 * High-performance list grab. Avoids full MDX rendering overhead entirely.
 * Returns Omit<Post, 'content'> to avoid hydration payloads on the listing view.
 */
export async function getAllPosts(): Promise<Omit<Post, "content">[]> {
    try {
        const slugs = getPostSlugs();

        // 1. Explicitly type the map array to allow either the valid Omit type OR null
        const posts: (Omit<Post, "content"> | null)[] = slugs.map((slug) => {
            const fullPath = path.join(postsDirectory, `${slug}.mdx`);
            if (!fs.existsSync(fullPath)) return null;

            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);
            const stats = readingTime(fileContents);

            return {
                slug,
                title: data.title || "",
                description: data.description || "",
                date: data.date || "",
                image: data.image,
                tags: normalizeTags(data.tags),
                readingTime: stats.text,
            };
        });

        return posts
            .filter((post): post is Omit<Post, "content"> => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Error reading all posts:", error);
        return [];
    }
}
