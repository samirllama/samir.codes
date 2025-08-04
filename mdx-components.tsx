import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { Gif } from "@/components/mdx/Gif";
import { NonceScript } from "@/components/nonce-script";
import { NonceStyle } from "@/components/nonce-style";

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
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "mt-6 scroll-m-20 text-xl font-semibold text-text-default",
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          "mt-4 scroll-m-20 text-lg font-semibold text-text-default",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          "mt-4 scroll-m-20 text-base font-semibold text-text-default",
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
          "font-medium underline underline-offset-4 text-text-accent hover:text-text-accent/80 transition-colors",
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
          "list-disc list-inside mt-6 text-text-default space-y-2",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "list-decimal list-inside mt-6 text-text-default space-y-2",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("text-text-default", className)} {...props} />
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
          "rounded-md border border-border bg-surface-muted p-4 overflow-x-auto text-sm mt-6",
          className
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("my-10 border-border", className)} {...props} />
    ),
    img: ({ className, alt = "", src, ...props }) => (
      <Image
        className={cn("rounded-lg border border-border my-6", className)}
        alt={alt}
        src={src || ""}
        width={800}
        height={450}
        {...props}
      />
    ),
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
    // Custom components
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
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("rounded-md border border-border shadow-sm", className)}
          width={width}
          height={height}
          unoptimized
          {...props}
        />
      </div>
    ),
    // Nonce-compliant script and style components
    script: ({ children, ...props }) => (
      <NonceScript {...props}>
        {typeof children === "string" ? children : ""}
      </NonceScript>
    ),
    style: ({ children, ...props }) => (
      <NonceStyle {...props}>
        {typeof children === "string" ? children : ""}
      </NonceStyle>
    ),
    Gif,
    NonceScript,
    NonceStyle,
    ...components,
  };
}
