// components/layouts/ArticleLayout.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ArticleLayoutProps {
  children: React.ReactNode;
  tableOfContents?: React.ReactNode;
  className?: string;
}

export default function ArticleLayout({
  children,
  tableOfContents,
  className,
}: ArticleLayoutProps) {
  return (
    <div
      className={cn(
        "w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12",
        className
      )}
    >
      <div className="lg:flex lg:flex-row lg:gap-8 xl:gap-12">
        <main className="flex-1 w-full lg:max-w-4xl xl:max-w-5xl mdx-prose dark:mdx-prose max-w-none">
          {/* Render the MDX content (which includes its own <h1>) */}
          {children}
        </main>

        <aside className="w-full lg:w-64 xl:w-72 lg:shrink-0 mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-20 space-y-6">
            {tableOfContents && (
              <div className="p-5 rounded-2xl border border-border bg-muted/30 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">On this page</h3>
                {tableOfContents}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
