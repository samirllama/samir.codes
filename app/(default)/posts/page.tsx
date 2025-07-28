

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
