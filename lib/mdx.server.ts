// @/lib/mdx.server.ts
// Collection-agnostic MDX machinery shared by content collections
// (blog posts in content/posts, case studies in content/work).
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { ReactNode } from "react";
import type { HastElement } from "@/types";
import { MDXComponents } from "@/components/mdx/MDXComponents";

export interface CompiledMdxEntry<TFrontmatter> {
  frontmatter: TFrontmatter;
  content: ReactNode;
  readingTime: string;
}

export interface RawFrontmatterEntry<TFrontmatter> {
  data: TFrontmatter;
  readingTime: string;
}

export function getCollectionSlugs(dirAbsPath: string): string[] {
  if (!fs.existsSync(dirAbsPath)) {
    return [];
  }
  return fs
    .readdirSync(dirAbsPath)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

/**
 * Full MDX compilation for a dedicated entry page view.
 */
export async function compileMdxEntry<TFrontmatter>(
  dirAbsPath: string,
  slug: string,
): Promise<CompiledMdxEntry<TFrontmatter> | null> {
  try {
    const fullPath = path.join(dirAbsPath, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { content, frontmatter } = await compileMDX<TFrontmatter>({
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
                keepBackground: true,
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

    return { frontmatter, content, readingTime: stats.text };
  } catch (error) {
    console.error(`Error compiling MDX entry ${slug} in ${dirAbsPath}:`, error);
    return null;
  }
}

/**
 * High-performance frontmatter grab for listing views.
 * Avoids full MDX compilation overhead entirely.
 */
export function readFrontmatter<TFrontmatter>(
  dirAbsPath: string,
  slug: string,
): RawFrontmatterEntry<TFrontmatter> | null {
  const fullPath = path.join(dirAbsPath, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const stats = readingTime(fileContents);

  return { data: data as TFrontmatter, readingTime: stats.text };
}
