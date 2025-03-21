import { allPosts } from 'contentlayer/generated';
import Link from 'next/link'

export default function PostsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Technical Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post: any) => (
          <article key={post._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
