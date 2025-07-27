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
      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        description: String(data.description),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        author: typeof data.author === 'string' ? data.author : undefined,
        image: data.image as any,
      }
    })
    .filter((m): m is PostMeta => Boolean(m))

  return all.sort((a, b) => (a.date > b.date ? -1 : 1))
}
