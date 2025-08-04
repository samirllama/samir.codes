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
}

export function TrackedLink_({
  href,
  children,
  location = "content",
  className,
  external = false,
}: TrackedLinkProps) {
  const handleClick = () => {
    const text = typeof children === "string" ? children : href;
    trackLinkClick(href, text, location);
  };

  if (external) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

export function TrackedLink({
  href,
  children,
  location = "content",
  className,
  external = false,
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
