/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/mdx.ts
import fs from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { compileMDX } from "next-mdx-remote/rsc";
import getMDXComponents from "@/mdx-components";

export type CompiledMDX = {
    content: any; // React Server Component returned by compileMDX
    frontmatter: Record<string, any>;
};

export async function compilePostMDX(source: string, extraComponents: Record<string, React.ComponentType<any>> = {}): Promise<CompiledMDX> {
    const result = await compileMDX({
        components: {
            ...getMDXComponents(),
            ...extraComponents
        },
        source,
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
                            theme: {
                                light: "github-light", dark: "github-dark",
                            },
                            tokensMap: {
                                fn: "entity.name.function", keyword: "keyword",
                            },
                        },
                    ],
                ],
            },
        },
    });

    return { content: result.content, frontmatter: result.frontmatter };
}

export function readMDXFileSync(filePath: string): string {
    return fs.readFileSync(filePath, "utf8");
}

/**
 * Get the absolute path to a slug’s MDX file.
 */
export function getPostPath(slug: string): string {
    return path.join(process.cwd(), "app", "(default)", "posts", slug, "page.mdx");
}
