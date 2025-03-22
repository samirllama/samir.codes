// app/posts/page.tsx

import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { BlogPost } from "@/types/post";

export const metadata: Metadata = {
  title: "Technical Articles | Samir Codes",
  description:
    "Technical articles and blog posts about web development, programming, and technology.",
  openGraph: {
    title: "Technical Articles | Samir Codes",
    description:
      "Technical articles and blog posts about web development, programming, and technology.",
    type: "website",
    url: "https://samir.codes/posts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Articles | Samir Codes",
    description:
      "Technical articles and blog posts about web development, programming, and technology.",
  },
};

export default function PostsPage() {
  const posts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  console.log("Posts:", allPosts);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Technical Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <article
            key={post._id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-gray-100 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
