import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

// Define reusable gradient classes using Tailwind v3 utility classes
// Make sure primary/secondary are mapped in tailwind.config.ts
const gradientPrimaryText =
  "bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent";
const gradientSecondaryText =
  "bg-gradient-to-r from-accent-500 to-primary-500 dark:from-accent-400 dark:to-primary-400 bg-clip-text text-transparent"; // Assumes accent is mapped

export const componentsForMdx = {
  h2: ({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "mt-[2em] mb-[1em]",
        gradientPrimaryText,
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "mt-[1.8em] mb-[0.8em]",
        gradientSecondaryText,
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),

  a: ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal =
      href && (href.startsWith("http") || href.startsWith("//"));
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="prose-a prose-a-external"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a href={href} className="prose-a prose-a-internal" {...props}>
        {children}
      </a>
    );
  },

  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className={cn(
        "my-12 h-0.5 border-none rounded",
        "bg-primary-500 dark:bg-primary-400",
        "shadow-[0_0_10px_rgb(var(--primary-rgb)),0_0_20px_rgb(var(--primary-rgb)),0_0_30px_rgb(var(--accent-rgb))]",
        "animate-neonPulse",
        className
      )}
      {...props}
    />
  ),
} as MDXComponents;