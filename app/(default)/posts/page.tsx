// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface OGImage {
  url: string;
  alt?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  tags?: string[];
  author?: string;
  image?: OGImage | OGImage[];
}

const postsPath = path.join(process.cwd(), "app", "(default)", "posts");

export function getAllPostsMeta(): PostMeta[] {
  const slugs = fs
    .readdirSync(postsPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const all = slugs
    .map((slug) => {
      const mdxFile = path.join(postsPath, slug, "page.mdx");
      if (!fs.existsSync(mdxFile)) return null;
      const { data } = matter(fs.readFileSync(mdxFile, "utf8"));
      if (!data.title || !data.date || !data.description) return null;
      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        description: String(data.description),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        author: typeof data.author === "string" ? data.author : undefined,
        image: data.image as any,
      };
    })
    .filter((m): m is PostMeta => Boolean(m));

  return all.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// app/(default)/posts/page.tsx
import Link from "next/link";
import { getAllPostsMeta, PostMeta } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all engineering blog posts",
};

export default function PostsIndexPage() {
  const posts: PostMeta[] = getAllPostsMeta();
  console.log({ posts });

  return (
    <article className="mx-auto py-16 h-screen border border-2">
      <h1 className="text-4xl font-bold mb-8">Engineering Blog</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/posts/${p.slug}`}
              className="text-2xl font-semibold text-primary hover:underline"
            >
              {p.title}
            </Link>
            <div className="text-sm text-muted-foreground">
              {p.date} • {p.author}
            </div>
            <p className="mt-2 text-base">{p.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
