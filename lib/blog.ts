// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' // You have this installed

// Define the structure of your post metadata
export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string // Keep as string for consistency, format later
  author?: string
  tags?: string[]
}

// Define the structure for full post data including content
export interface PostData extends PostMeta {
  content: string // The raw Markdown/MDX content after frontmatter
}

// Path to blog posts directory within the app router structure
const postsDirectory = path.join(process.cwd(), 'app/blog');

export function getAllPostSlugs(): string[] {
  try {
    const slugs: string[] = [];
    const postDirs = fs.readdirSync(path.join(process.cwd(), 'app/blog'));

    postDirs.forEach((dirName) => {
      const dirPath = path.join(process.cwd(), 'app/blog', dirName);
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory() && dirName !== '[slug]') {
        slugs.push(dirName);
      }
    });

    return slugs;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostMetaBySlug(slug: string | undefined): PostMeta | null {
  if (!slug) {
    console.warn("getPostMetaBySlug called with undefined slug");
    return null;
  }

  // Construct the path to the page.mdx file
  const fullPath = path.join(process.cwd(), 'app/blog', slug, 'page.mdx');

  console.log("Get posts meta function in process", fullPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`No valid MDX file found for slug: ${slug}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (!data.title || !data.description || !data.date) {
      console.warn(`Post [${slug}] is missing required frontmatter.`);
      return null;
    }

    console.log("Get posts meta function, processing data", data);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date.toString(),
      author: data.author,
      tags: data.tags || [],
    } as PostMeta;
  } catch (error) {
    console.error(`Error reading metadata for slug ${slug}:`, error);
    return null;
  }
}



/**
 * Gets metadata for all blog posts, sorted by date descending.
 */
export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllPostSlugs()
  const allPostsData = slugs
    .map((slug) => getPostMetaBySlug(slug))
    .filter((post): post is PostMeta => post !== null) // Filter out null posts (errors/missing data)

  // Sort posts by date in descending order
  return allPostsData.sort((postA, postB) => {
    return new Date(postB.date).getTime() - new Date(postA.date).getTime()
  })
}

//  Optional: Function to get full post content (if needed outside MDX rendering) ---
// Usually not required when placing .mdx files in app router, as Next.js handles import/render.
/*
export function getPostDataBySlug(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post not found for slug: ${slug}`);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents); // Parse frontmatter and content

    if (!data.title || !data.description || !data.date) {
       console.warn(`Post [${slug}] is missing required frontmatter.`);
       return null;
    }

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date.toString(),
      author: data.author,
      tags: data.tags || [],
      content, // Include the raw MDX content
    } as PostData;
  } catch (error) {
    console.error(`Error reading post data for slug ${slug}:`, error);
    return null;
  }
}
*/

