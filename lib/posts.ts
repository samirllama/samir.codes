// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface OGImage {
  url: string
  alt?: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string   // YYYY-MM-DD
  description: string
  tags?: string[]
  author?: string
  image?: OGImage | OGImage[]
}


function isOGImage(image: unknown): image is OGImage {
  return (
    typeof image === "object" &&
    image !== null &&
    "url" in image &&
    typeof (image as OGImage).url === "string"
  );
}

function isOGImageArray(images: unknown): images is OGImage[] {
  return Array.isArray(images) && images.every(isOGImage);
}

const postsPath = path.join(process.cwd(), 'app', '(default)', 'posts')

export function getAllPostsMeta(): PostMeta[] {
  const slugs = fs
    .readdirSync(postsPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const all = slugs
    .map((slug) => {
      const mdxFile = path.join(postsPath, slug, 'page.mdx')
      if (!fs.existsSync(mdxFile)) return null
      const { data } = matter(fs.readFileSync(mdxFile, 'utf8'))
      if (!data.title || !data.date || !data.description) return null
      
      let image: OGImage | OGImage[] | undefined = undefined;
      if (isOGImage(data.image)) {
        image = data.image;
      } else if (isOGImageArray(data.image)) {
        image = data.image;
      }

      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        description: String(data.description),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        author: typeof data.author === 'string' ? data.author : undefined,
        image,
      }
    })
    .filter((m): m is PostMeta => Boolean(m))

  return all.sort((a, b) => (a.date > b.date ? -1 : 1))
}
