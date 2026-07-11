import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts.server";
import { getAllWorkStudies } from "@/lib/work.server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const workStudies = await getAllWorkStudies();
    const baseUrl = "https://samir.codes";

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const workUrls = workStudies.map((study) => ({
        url: `${baseUrl}/work/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...workUrls,
        ...postUrls,
    ];
}
