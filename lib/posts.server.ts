// @/lib/posts.server.ts
import path from "path";
import { Post, PostFrontmatter } from "@/types/post";
import { compileMdxEntry, getCollectionSlugs, readFrontmatter } from "@/lib/mdx.server";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  return getCollectionSlugs(postsDirectory);
}

/**
 * Normalizes tags field regardless of whether YAML formatted it as a string or string[]
 */
function normalizeTags(tags: unknown): string[] {
  if (!tags) return [];
  return Array.isArray(tags)
    ? tags.map((t) => String(t).trim())
    : String(tags)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
}

/**
 * Fetches and compiles a single post for its dedicated page view.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const entry = await compileMdxEntry<PostFrontmatter>(postsDirectory, slug);
  if (!entry) return null;

  const { frontmatter, content, readingTime } = entry;

  return {
    slug,
    title: frontmatter.title || "",
    description: frontmatter.description || "",
    date: frontmatter.date || "",
    image: frontmatter.image,
    tags: normalizeTags(frontmatter.tags),
    readingTime,
    content,
  };
}

/**
 * High-performance list grab. Avoids full MDX rendering overhead entirely.
 * Returns Omit<Post, 'content'> to avoid hydration payloads on the listing view.
 */
export async function getAllPosts(): Promise<Omit<Post, "content">[]> {
  try {
    const slugs = getPostSlugs();

    const posts: (Omit<Post, "content"> | null)[] = slugs.map((slug) => {
      const entry = readFrontmatter<PostFrontmatter>(postsDirectory, slug);
      if (!entry) return null;

      const { data, readingTime } = entry;

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        image: data.image,
        tags: normalizeTags(data.tags),
        readingTime,
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
