import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostsMeta } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import { componentsForMdx } from '@/mdx-components';
import type { Metadata } from 'next';
import { defaultMetadata } from '@/app/metadata';
import { OGImage } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {};
  }

  const title = `${post.title} | Samir S. S. Llama`;
  const description = post.description || defaultMetadata.description || '';

  let ogImageUrl: string | undefined;
  if (post.image) {
    ogImageUrl = Array.isArray(post.image) ? post.image[0]?.url : post.image.url;
  } else if (defaultMetadata.openGraph?.images && Array.isArray(defaultMetadata.openGraph.images) && defaultMetadata.openGraph.images.length > 0) {
    ogImageUrl = (defaultMetadata.openGraph.images[0] as OGImage).url;
  }

  
  const finalOgImages = ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : defaultMetadata.openGraph?.images || [];
  const finalTwitterImages = ogImageUrl ? [ogImageUrl] : defaultMetadata.twitter?.images || [];


  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `https://samir.codes/posts/${post.slug}`,
      type: 'article',
      images: finalOgImages,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: finalTwitterImages,
    },
  };
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

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