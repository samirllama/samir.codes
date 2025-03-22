import { Post as ContentLayerPost } from 'contentlayer/generated'

export interface BlogPost extends ContentLayerPost {
  _id: string
  slug: string
  title: string
  summary: string
  tags?: string[]
  date: string
}

export type PostType = ContentLayerPost
