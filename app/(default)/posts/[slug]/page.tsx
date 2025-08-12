// app/(default)/posts/[slug]/page.tsx
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compilePostMDX, getPostPath, readMDXFileSync } from "@/lib/mdx";
import { getAllPostsMeta } from "@/lib/posts";
// client components (should have "use client" at top of their files)
// client components: Gif/NonceScript/NonceStyle are named exports
import { Gif } from "@/components/mdx/Gif";
import { NonceScript } from "@/components/nonce-script";
import { NonceStyle } from "@/components/nonce-style";

type Props = { params: { slug: string } };

export const dynamic = "force-static";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const postsDir = path.join(process.cwd(), "app", "(default)", "posts");
  const entries = await fs.promises.readdir(postsDir, { withFileTypes: true });

  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(postsDir, entry.name, "page.mdx"))
    )
    .map((entry) => ({ slug: entry.name }));

  return slugs;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const posts = getAllPostsMeta();
  const match = posts.find((p) => p.slug === params.slug);
  if (!match) return undefined;
  return { title: match.title, description: match.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const mdPath = getPostPath(slug);

  if (!slug || !mdPath || !mdPath.endsWith(".mdx")) {
    return notFound();
  }

  const source = readMDXFileSync(mdPath);

  // Compile MDX with default + custom components
  const { content: MDXContent, frontmatter } = await compilePostMDX(source, {
    Gif,
    NonceScript,
    NonceStyle,
  });

  return (
    <article className="mx-auto max-w-3xl py-16 px-4">
      <header className="mb-8">
        <h1 className="text-fluid-h1 font-heading-transitional">
          {frontmatter.title}
        </h1>
        {frontmatter.date && (
          <time className="block text-fluid-meta mt-2">{frontmatter.date}</time>
        )}
        {frontmatter.description && (
          <p className="text-fluid-body mt-4">{frontmatter.description}</p>
        )}
      </header>

      <section className="prose mdx-prose">{MDXContent}</section>
    </article>
  );
}
