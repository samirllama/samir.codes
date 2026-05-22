"use client";

import React from "react";
import Link from "next/link";
import { trackLinkClick } from "@/hooks/use-analytics";
import type { ReactNode } from "react";
import type { LinkProps } from "next/link";

interface TrackedLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  children: ReactNode;
  location?: string;
  className?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  ariaLabel?: string;
  customText?: string;
}

// Recursively extract text from React elements to avoid losing click visual context
function getTextFromNode(node: ReactNode): string {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromNode).join(" ").replace(/\s+/g, " ").trim();
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props && props.children) {
      return getTextFromNode(props.children);
    }
  }
  return "";
}

export function TrackedLink({
  href,
  children,
  location = "content",
  className,
  external = false,
  ariaLabel = "",
  customText,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const parsedText = customText || getTextFromNode(children) || href;
      trackLinkClick(href, parsedText, location);
    } catch (err) {
      console.error("Failed to track link click in component:", err);
    }

    if (onClick) onClick(e);
  };

  if (external) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel || undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel || undefined}
      {...(props as any)}
    >
      {children}
    </Link>
  );
}
