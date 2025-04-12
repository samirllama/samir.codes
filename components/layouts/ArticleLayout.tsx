// components/layouts/ArticleLayout.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Assuming your utility path

// Define props for the layout
interface ArticleLayoutProps {
  children: React.ReactNode; // The main MDX content
  meta?: {
    // Optional metadata object for the sidebar
    title?: string;
    author?: string;
    date?: string;
    // Add other fields you might have: tags, category, readingTime etc.
  };
  className?: string; // Allow passing additional classes
}

export default function ArticleLayout({
  children,
  meta,
  className,
}: ArticleLayoutProps) {
  return (
    // Container with overall padding and max-width
    <div
      className={cn(
        "w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12",
        className
      )}
    >
      {/* --- This is the core layout div --- */}
      {/* Uses Flexbox on large screens (lg:) to create columns */}
      <div className="lg:flex lg:flex-row lg:gap-8 xl:gap-12">
        {/* --- Main Content Area --- */}
        {/* flex-1 allows it to grow and take available space */}
        {/* lg:max-w- defines its maximum width within the flex container */}
        <main className="flex-1 w-full lg:max-w-4xl xl:max-w-5xl">
          {/* The MDX content ({children}) goes here */}
          {children}
        </main>

        {/* --- Sidebar --- */}
        {/* lg:w- defines fixed width on large screens */}
        {/* lg:shrink-0 prevents it from shrinking */}
        {/* Stacks below main content on smaller screens due to flex-wrap (default) */}
        <aside className="w-full lg:w-64 xl:w-72 lg:shrink-0 mt-12 lg:mt-0">
          {/* Sticky container for sidebar content */}
          <div className="lg:sticky lg:top-20 space-y-6">
            {" "}
            {/* Adjust top-20 based on header height */}
            {/* Metadata Section */}
            {meta && (
              <div className="p-5 rounded-2xl border border-gray-alpha-200 bg-slate-800/30 shadow-md">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">
                  Article Info
                </h3>
                <ul className="text-sm space-y-2">
                  {meta.date && (
                    <li className="flex justify-between">
                      <span className="text-slate-400">Published:</span>
                      <span className="text-slate-300">
                        {new Date(meta.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </li>
                  )}
                  {meta.author && (
                    <li className="flex justify-between">
                      <span className="text-slate-400">Author:</span>
                      <span className="text-slate-300">{meta.author}</span>
                    </li>
                  )}
                  {/* Add more meta items here */}
                </ul>
              </div>
            )}
            {/* Table of Contents Placeholder */}
            <div className="p-5 rounded-2xl border border-gray-alpha-200 bg-slate-800/30 shadow-md">
              <h3 className="text-lg font-semibold text-slate-200 mb-3">
                On this page
              </h3>
              <nav>
                <ul className="text-sm space-y-2">
                  {/* Links should match IDs in MDX */}
                  <li>
                    <a
                      href="#why-it-matters"
                      className="text-slate-400 hover:text-primary transition duration-150 ease-in-out"
                    >
                      Why Does Web Security Matter?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#core-pillars"
                      className="text-slate-400 hover:text-primary transition duration-150 ease-in-out"
                    >
                      Core Pillars
                    </a>
                  </li>
                  {/* Add more links */}
                </ul>
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
