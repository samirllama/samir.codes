/* eslint-disable @typescript-eslint/no-explicit-any */
// mdx-components.tsx
import React from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/**
 * Server-safe MDX components mapping.
 * Do NOT import client components (Gif, etc.) here — the page will attach them.
 */
export function getMDXComponents(
  components: Partial<MDXComponents> = {}
): MDXComponents {
  const base: MDXComponents = {
    // Headings
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-12 scroll-m-20 text-4xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b border-border pb-1 text-3xl font-semibold",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn("mt-8 scroll-m-20 text-2xl font-semibold", className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn("mt-6 scroll-m-20 text-xl font-semibold", className)}
        {...props}
      />
    ),

    // Text
    p: ({ className, ...props }) => (
      <p className={cn("leading-7 mt-6", className)} {...props} />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "font-medium underline underline-offset-4 hover:text-text-accent/80 transition-colors",
          className
        )}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-4 pl-6 italic text-text-muted border-border",
          className
        )}
        {...props}
      />
    ),

    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={cn("list-disc list-inside mt-6 space-y-2", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn("list-decimal list-inside mt-6 space-y-2", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("text-text-default", className)} {...props} />
    ),

    // Code & pre
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded bg-surface-muted px-1.5 py-1 font-mono text-sm text-code",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "rounded-md border border-border bg-surface-muted p-4 overflow-x-auto text-sm mt-6",
          className
        )}
        {...props}
      />
    ),

    // HR
    hr: ({ className, ...props }) => (
      <hr className={cn("my-10 border-border", className)} {...props} />
    ),

    // Images
    img: ({ className, alt = "", src, ...props }) => (
      <Image
        className={cn("rounded-lg border border-border my-6", className)}
        alt={alt}
        src={(src as string) || ""}
        width={800}
        height={450}
        {...(props as any)}
      />
    ),

    // Tables
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table
          className={cn(
            "w-full border-collapse border border-border",
            className
          )}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-border px-4 py-2 text-left font-bold bg-surface-muted",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn("border border-border px-4 py-2", className)}
        {...props}
      />
    ),

    // DO NOT add client components here.
  };

  return { ...base, ...components } as MDXComponents;
}

// alias some MDX toolchains expect
export const useMDXComponents = getMDXComponents;
export default getMDXComponents;
