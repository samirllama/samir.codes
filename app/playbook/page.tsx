// app/playbook/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta, PostMeta } from "@/lib/posts";
import { Route } from "next"; // Keep for typed links
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Engineering Playbook",
  description: "Insights on web development, security, and technology",
};

export default async function PlaybookIndexPage() {
  // Fetch metadata for all posts from the hardcoded 'app/playbook' directory
  // NOTE: Removed the ("playbook") argument as the function doesn't accept it
  const posts: PostMeta[] = getAllPostsMeta();

  return (
    // Container with consistent padding/width
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Title */}
      <h1 className="h1 mb-4 text-center md:text-left">Engineering Playbook</h1>
      {/* Subtitle */}
      <p className="text-lg text-slate-400 mb-10 md:mb-12 text-center md:text-left">
        Insights and learnings on web development, security, and technology.
      </p>

      {/* Post List */}
      {posts.length === 0 ? (
        <p className="text-center text-slate-400">
          No playbook entries published yet. Check back soon!
        </p>
      ) : (
        // List container
        <ul className="list-none p-0 m-0 space-y-10">
          {posts.map((post) => (
            // List item with separator
            <li
              key={post.slug}
              className="pb-10 border-b border-gray-alpha-200 last:pb-0 last:border-none"
            >
              <article>
                {/* Post Title */}
                <Link
                  href={`/playbook/${post.slug}` as Route}
                  className="block mb-2"
                >
                  <h2 className="h3 text-primary hover:text-secondary transition-colors duration-150 ease-in-out">
                    {post.title}
                  </h2>
                </Link>

                {/* Post Metadata (Date/Author) */}
                <p className="text-sm text-slate-500 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.author && (
                    <span className="text-slate-600"> by {post.author}</span>
                  )}
                </p>

                {/* --- Tags Section --- */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      // Render each tag as a styled span (or Link later)
                      <span
                        key={tag}
                        className={cn(
                          "inline-block text-xs font-medium rounded-full",
                          "px-2.5 py-0.5", // Padding
                          "bg-slate-700/50 text-primary", // Background and text color
                          // Optional hover effect:
                          "hover:bg-slate-600/70"
                        )}
                      >
                        {tag}
                      </span>
                      /* --- If linking later ---
                      <Link
                        key={tag}
                        href={`/playbook/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}` as Route} // Example slug generation
                        className={cn(
                          "inline-block text-xs font-medium rounded-full",
                          "px-2.5 py-0.5",
                          "bg-slate-700/50 text-primary",
                          "hover:bg-slate-600/70 hover:text-secondary" // Example hover
                        )}
                      >
                        {tag}
                      </Link>
                      */
                    ))}
                  </div>
                )}
                {/* --- End Tags Section --- */}

                {/* Post Description */}
                <p className="text-slate-400 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/playbook/${post.slug}` as Route}
                  className="inline-flex items-center font-medium text-primary hover:text-secondary transition-colors duration-150 ease-in-out group"
                >
                  <span>Read more</span>
                  <span className="tracking-normal text-primary group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
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
