
import fs from "fs";
import path from "path";
import { Post, PostFrontmatter } from "@/types/post";
import readingTime from "reading-time";

const allowedKeys: (keyof PostFrontmatter)[] = [
  "title",
  "description",
  "date",
  "image",
  "tags",
];

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
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Extract frontmatter
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = frontmatterRegex.exec(fileContents);

    if (!match) return null;

    const frontmatterYaml = match[1];
    const content = fileContents.replace(frontmatterRegex, "").trim();

    // Parse frontmatter (simple YAML parser)
    const frontmatter: PostFrontmatter = {};
    frontmatterYaml.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {

        const trimmedK = key.trim() as keyof PostFrontmatter;

        if (allowedKeys.includes(trimmedK)) {

          const value = valueParts
            .join(":")
            .trim()
            .replace(/^["']|["']$/g, "");
          frontmatter[trimmedK] = value;
        }
      }
    });

    const stats = readingTime(content);

    return {
      slug,
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      date: frontmatter.date || "",
      image: frontmatter.image,
      tags: frontmatter.tags
        ? frontmatter.tags.split(",").map((t) => t.trim())
        : [],
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
