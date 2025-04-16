// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Route } from "next";
import { getAllPostsMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts and insights on technology, development, and more.",
};

export default async function BlogIndexPage() {
  const posts = getAllPostsMeta();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="h1 mb-4 text-center md:text-left">Blog</h1>
      <p className="text-lg text-slate-400 mb-10 md:mb-12 text-center md:text-left">
        {metadata.description}
      </p>
      {posts.length === 0 ? (
        <p className="text-center text-slate-400">
          No blog posts published yet. Check back soon!
        </p>
      ) : (
        <ul className="list-none p-0 m-0 space-y-10">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="pb-10 border-b border-[rgb(var(--border-subtle-rgb))] dark:border-[rgb(var(--border-subtle-rgb))] last:pb-0 last:border-none"
            >
              <article>
                <Link
                  href={`/blog/${post.slug}` as Route} // Link to the dynamic route
                  className="block mb-2"
                >
                  <h2 className="h3 text-[rgb(var(--primary))] hover:text-[rgb(var(--secondary))] transition-colors duration-150 ease-in-out">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.author && (
                    <span className="text-slate-600 dark:text-slate-500">
                      {" "}
                      by {post.author}
                    </span>
                  )}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "inline-block text-xs font-medium rounded-full",
                          "px-2.5 py-0.5",
                          "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}` as Route}
                  className="inline-flex items-center font-medium text-[rgb(var(--primary))] hover:text-[rgb(var(--secondary))] transition-colors duration-150 ease-in-out group"
                >
                  <span>Read more</span>
                  <span className="tracking-normal text-[rgb(var(--primary))] group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    ->
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
