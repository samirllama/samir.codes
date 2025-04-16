// app/blog/[slug]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostMetaBySlug } from "@/lib/blog";
import BlogLayout from "@/components/layouts/BlogLayout";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  console.log("generateMetadata called with params:", params); // Add this
  const meta = getPostMetaBySlug(params.slug);

  if (!meta) {
    return {
      title: "Post Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function PostLayout({ children, params }: LayoutProps) {
  console.log("PostLayout called with params:", params); // Add this
  const meta = getPostMetaBySlug(params.slug);

  if (!meta) {
    notFound();
  }

  return <BlogLayout meta={meta}>{children}</BlogLayout>;
}
