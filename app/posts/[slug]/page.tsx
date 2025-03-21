import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

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
        <MDXContent components={{
          Callout: require('@/components/mdx/Callout').Callout
        }} />
      </div>
    </article>
  )
}
