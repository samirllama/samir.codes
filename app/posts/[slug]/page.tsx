// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import MDXRenderer from "@/components/MDXRenderer";
import { Callout } from "@/components/mdx/Callout";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Get the post data
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="prose dark:prose-invert max-w-none">
        <MDXRenderer
          code={post.body.code}
          components={{
            Callout: Callout
          }}
        />
      </div>
    </article>
  );
}
