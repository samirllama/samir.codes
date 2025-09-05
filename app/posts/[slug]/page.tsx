import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts.server";
import { PostAnimations } from "./PostAnimations";
import styles from "./post.module.css";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface HastElement {
  type: string;
  tagName: string;
  properties: Record<string, any>;
  children: Array<{ type: string; value: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: `/posts/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/posts/${post.slug}/opengraph-image`],
    },
  };
}

const mdxComponents = {
  h1: (props: any) => <h1 className={styles.heading1} {...props} />,
  h2: (props: any) => <h2 className={styles.heading2} {...props} />,
  h3: (props: any) => <h3 className={styles.heading3} {...props} />,
  p: (props: any) => <p className={styles.paragraph} {...props} />,
  a: (props: any) => <a className={styles.link} {...props} />,
  blockquote: (props: any) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
  ul: (props: any) => <ul className={styles.list} {...props} />,
  ol: (props: any) => <ol className={styles.orderedList} {...props} />,
  li: (props: any) => <li className={styles.listItem} {...props} />,
  hr: (props: any) => <hr className={styles.hr} {...props} />,
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <PostAnimations />
      <main>
        <article className={styles.post}>
          <div className="blog-container">
            <header className={`post-hero ${styles.postHeader}`}>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.meta}>
                <time dateTime={post.date} className={styles.date}>
                  {formatDate(post.date)}
                </time>
                {post.readingTime && (
                  <span className={styles.readingTime}>{post.readingTime}</span>
                )}
              </div>
              <p className={styles.description}>{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      # {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className={`post-content ${styles.content}`}>
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark",
                          keepBackground: false,
                          defaultLang: "plaintext",
                          onVisitLine(node: HastElement) {
                            if (node.children.length === 0) {
                              node.children = [{ type: "text", value: " " }];
                            }
                          },
                          onVisitHighlightedLine(node: HastElement) {
                            if (!node.properties.className) {
                              node.properties.className = [];
                            }
                            node.properties.className.push("line--highlighted");
                          },
                          onVisitHighlightedChars(node: HastElement) {
                            node.properties.className = ["word--highlighted"];
                          },
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
