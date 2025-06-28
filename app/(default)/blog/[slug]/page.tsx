import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostsMeta } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import { componentsForMdx } from '@/mdx-components';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: componentsForMdx,
    options: {
      parseFrontmatter: true,
    },
  });

  return (
    <article className="prose dark:prose-invert mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-text-muted text-sm mb-8">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      {content}
    </article>
  );
}