// app/(default)/posts/[slug]/page.tsx
import { compileMDX } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const mdPath = path.join(
    process.cwd(),
    "app",
    "(default)",
    "posts",
    params.slug,
    "page.mdx"
  );

  if (!fs.existsSync(mdPath)) notFound();

  const source = await fs.promises.readFile(mdPath, "utf8");

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date?: string;
    description?: string;
    author?: string;
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                light: "github-light",
                dark: "github-dark",
              },
              tokensMap: {
                fn: "entity.name.function",
                keyword: "keyword",
              },
            },
          ],
        ],
      },
    },
    components: getMDXComponents({}),
  });

  return (
    <article className="prose lg:prose-xl dark:prose-invert mx-auto py-8">
      <h1 className="mb-2">{frontmatter.title}</h1>
      {frontmatter.date && (
        <div className="text-sm text-muted-foreground mb-4">
          {frontmatter.date} • {frontmatter.author}
        </div>
      )}
      {content}
    </article>
  );
}
