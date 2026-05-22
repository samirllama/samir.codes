/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import BlogCard from "../BlogCard";
import { PostSummary } from "@/types/post";

// Mock next/image since it is a Next.js specific element
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, src, alt, className }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill ? "true" : undefined}
        data-priority={priority ? "true" : undefined}
      />
    );
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: any) => {
    return <a href={href} {...rest}>{children}</a>;
  },
}));

describe("BlogCard Component", () => {
  const mockPost: PostSummary = {
    slug: "test-post",
    title: "Test Post Title",
    description: "Test description for the post.",
    date: "2026-05-22",
    image: "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/test-image.png",
    tags: ["React", "Testing"],
    readingTime: "5 min read",
  };

  it("renders the blog card with basic content", () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Test description for the post.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("renders the image when provided", () => {
    render(<BlogCard post={mockPost} />);

    const img = screen.getByAltText("Test Post Title");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPost.image);
  });

  it("does not render the image when not provided", () => {
    const postWithoutImage = { ...mockPost, image: undefined };
    render(<BlogCard post={postWithoutImage} />);

    const img = screen.queryByAltText("Test Post Title");
    expect(img).not.toBeInTheDocument();
  });

  it("applies priority attribute to Next.js Image component when priority is true", () => {
    render(<BlogCard post={mockPost} priority={true} />);

    const img = screen.getByAltText("Test Post Title");
    expect(img).toHaveAttribute("data-priority", "true");
  });
});
