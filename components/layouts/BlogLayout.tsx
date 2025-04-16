// components/layouts/BlogLayout.tsx
import type { PostMeta } from "@/lib/blog"; // Import the metadata type
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  meta: PostMeta; // Pass the frontmatter metadata
  children: React.ReactNode; // The compiled MDX content
}

export default function BlogLayout({ meta, children }: BlogLayoutProps) {
  return (
    // Main container for the article
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <article>
        {/* Article Header */}
        <header className="mb-8">
          {/* Title */}
          <h1 className="h1 text-[rgb(var(--foreground))] mb-3">
            {meta.title}
          </h1>

          {/* Metadata (Date, Author) */}
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span>Published on </span>
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {meta.author && (
              <span className="text-slate-600 dark:text-slate-500">
                {" "}
                by {meta.author}
              </span>
            )}
          </div>

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
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
        </header>

        {/* Separator */}
        <hr className="my-8 border-t border-[rgb(var(--border-subtle-rgb))] dark:border-[rgb(var(--border-subtle-rgb))]" />

        {/* MDX Content Area */}
        {/* Apply the .mdx-prose class here for styling */}
        <div className="mdx-prose">
          {" "}
          {/* THIS IS KEY for styling */}
          {children}
        </div>

        {/* Optional: Footer navigation, comments section, etc. */}
      </article>
    </div>
  );
}
