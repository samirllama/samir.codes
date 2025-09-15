// @/lib/posts.server.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // Import gray-matter for frontmatter parsing
import { Post, PostFrontmatter } from "@/types/post";
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { content, data } = matter(fileContents);
        const frontmatter = data as PostFrontmatter;

        const { content: compiledContent } = await compileMDX<{
            title: string;
            description: string;
            date: string;
            tags: string[];
            image?: string;
        }>({
            source: content,
            components: MDXComponents,
            options: {
                parseFrontmatter: false,
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
                                    if (!node.properties.className) {
                                        node.properties.className = [];
                                    }
                                    node.properties.className.push("line--highlighted");
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

        const stats = readingTime(content);

        return {
            slug,
            title: frontmatter.title ?? "",
            description: frontmatter.description ?? "",
            date: frontmatter.date ?? "",
            image: frontmatter.image,
            tags: frontmatter.tags || [],
            readingTime: stats.text,
            content: compiledContent,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}
export async function getAllPosts(): Promise<Post[]> {
    const slugs = getPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
    return posts
        .filter((post): post is Post => post !== null)
        .sort(
            (a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
        );
}
