// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// The metadata structure we expect from frontmatter
export interface PostMeta {
  slug: string; // URL slug derived from the folder name
  title: string;
  date: string; // Keep as string for sorting, format YYYY-MM-DD
  description: string;
  tags?: string[]; // Optional tags
  author?: string; // Optional author
}

// Define the structure for the full post including content
export interface Post extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Gets metadata for all posts, sorted by date descending.
 */
export function getAllPostsMeta(): PostMeta[] {
  let postFolders: string[] = [];
  try {
    postFolders = fs.readdirSync(postsDirectory).filter((item) => {
      const itemPath = path.join(postsDirectory, item);
      // Ensure it's a directory and NOT the blog index page itself or other special files/folders
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('_') && !item.startsWith('.');

    });
  } catch (error) {
    console.error('Error reading blog directory:', postsDirectory, error);
    return [];
  }

  const allPostsData = postFolders.map((slug): PostMeta | null => {
    const fullPath = path.join(postsDirectory, slug, 'page.mdx'); // follows `page.mdx` convention

    console.log("Parsing Posts Data, PostMeta:", slug)


    if (!fs.existsSync(fullPath)) {
      // console.warn(`MDX file not found for slug: ${slug}`);
      return null; // Skip if file doesn't exist
    }

    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents); // Extract frontmatter

      // Basic validation
      if (!data.title || !data.date || !data.description) {
        console.warn(`Skipping ${slug}: Missing required frontmatter (title, date, description).`);
        return null;
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        author: data.author || 'Samir Lama', // Default author
      };
    } catch (error) {
      console.error(`Error processing file ${fullPath}:`, error);
      return null; // Skip on error
    }
  });

  // Filter out any null entries from skipped folders/errors
  const validPosts = allPostsData.filter((post): post is PostMeta => post !== null);

  // Sort posts by date in descending order (newest first)
  return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Gets full content and metadata for a single post by slug.
 */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, slug, 'page.mdx');

  if (!fs.existsSync(fullPath)) {
    console.error(`Post file not found for slug: ${slug} at ${fullPath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data.title || !data.date || !data.description) {
      console.warn(`Missing required frontmatter (title, date, description) in ${fullPath}`);
      // Decide if you still want to return content even if frontmatter is incomplete
    }

    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString().split('T')[0], // Default date
      description: data.description || '',
      tags: data.tags || [],
      author: data.author || 'Your Name',
      content, // The actual MDX content
    };
  } catch (error) {
    console.error(`Error reading or parsing post ${fullPath}:`, error);
    return null;
  }
}
