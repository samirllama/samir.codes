// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // Using your installed dependency safely
import { Post, PostFrontmatter } from "@/types/post";
import readingTime from "reading-time";

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

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Robust parsing via gray-matter handles space variants and line endings safely
    const { data, content } = matter(fileContents);
    const rawFrontmatter = data as PostFrontmatter;

    const stats = readingTime(content);

    // Normalize array formatting safely regardless of whether YAML provided a string or array
    let normalizedTags: string[] = [];
    if (rawFrontmatter.tags) {
      normalizedTags = Array.isArray(rawFrontmatter.tags)
        ? rawFrontmatter.tags.map((t) => String(t).trim())
        : String(rawFrontmatter.tags).split(",").map((t) => t.trim()).filter(Boolean);
    }

    return {
      slug,
      title: rawFrontmatter.title || "",
      description: rawFrontmatter.description || "",
      date: rawFrontmatter.date || "",
      image: rawFrontmatter.image,
      tags: normalizedTags,
      readingTime: stats.text,
      content, // Returns raw MDX string content to be handled safely by the layout compiler
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
