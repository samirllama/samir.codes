import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { Gif } from "@/components/mdx/Gif";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-12 scroll-m-20 text-4xl font-bold tracking-tight text-text-default",
          className
        )}
        {...props}
      />
    ),

    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b border-border pb-1 text-3xl font-semibold text-text-default",
          className
        )}
        {...props}
      />
    ),

    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold text-text-default",
          className
        )}
        {...props}
      />
    ),

    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 mt-6 text-text-default", className)}
        {...props}
      />
    ),

    a: ({ className, ...props }) => (
      <a
        className={cn(
          "font-medium underline underline-offset-4 text-text-accent hover:text-text-accent/80",
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

    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "list-disc list-inside mt-6 text-text-default",
          className
        )}
        {...props}
      />
    ),

    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "list-decimal list-inside mt-6 text-text-default",
          className
        )}
        {...props}
      />
    ),

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
          "rounded-md border border-border bg-surface-muted p-4 overflow-x-auto text-sm",
          className
        )}
        {...props}
      />
    ),

    hr: ({ className, ...props }) => (
      <hr className={cn("my-10 border-border", className)} {...props} />
    ),

    img: ({ className, alt = "", ...props }) => (
      <Image
        className={cn("rounded-lg border border-border my-6", className)}
        alt={alt}
        {...props}
      />
    ),
    gif: ({
      className,
      alt = "",
      src = "",
      width = 800,
      height = 450,
      ...props
    }) => (
      <div className="my-6 flex justify-center">
        <Image
          src={src}
          alt={alt}
          className={cn("rounded-md border border-border shadow-sm", className)}
          width={width}
          height={height}
          unoptimized
          {...props}
        />
      </div>
    ),
    Gif,
    ...components,
  };
}
