"use client";

import Link from "next/link";
import { trackLinkClick } from "@/hooks/use-analytics";
import type { ReactNode } from "react";
import type { LinkProps } from "next/link";

interface TrackedLinkProps extends LinkProps {
  children: ReactNode;
  location?: string;
  className?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({
  href,
  children,
  location = "content",
  className,
  external = false,
  ariaLabel = "",
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = typeof children === "string" ? children : href;
    trackLinkClick(href, text, location);

    if (onClick) onClick(e);
  };

  if (external) {
    return (
      <a
        href={href as string}
        onClick={handleClick}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
