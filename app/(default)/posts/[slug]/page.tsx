import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostsMeta } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import { componentsForMdx } from '@/mdx-components';
import type { Metadata } from 'next';
import { defaultMetadata } from '@/app/metadata';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const title = `${post.title} | Samir S. S. Llama`;
  const description = post.description || defaultMetadata.description;
  const ogImage = post.image || defaultMetadata.openGraph?.images?.[0]?.url;

  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `https://samir.codes/posts/${post.slug}`,
      type: 'article',
      images: ogImage ? [{ url: ogImage }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: ogImage ? [ogImage] : defaultMetadata.twitter?.images,
    },
  };
}

export default async function PostPage({ params }: { params: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ }) {
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