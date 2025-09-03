import { getAllPosts } from "@/lib/posts";

export async function GET() {
    const posts = getAllPosts();
    const baseUrl = "https://samir.codes";

    const rssItems = posts
        .map((post) => {
            return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.description}]]></description>
          <link>${baseUrl}/posts/${post.slug}</link>
          <guid>${baseUrl}/posts/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.tags?.map((tag) => `<category>${tag}</category>`).join("") ||
                ""
                }
        </item>
      `;
        })
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Samir Lama - Blog</title>
    <description>Articles about web development, design, and technology insights.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>john@johndoe.dev (Samir Lama)</managingEditor>
    <webMaster>john@johndoe.dev (Samir Lama)</webMaster>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
