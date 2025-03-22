import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: []
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => `${post._raw.flattenedPath.replace('posts/', '')}`,
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace('posts/', '')}`,
    }
  }
}))

export default makeSource({
  contentDirPath: 'content',  // Points to root content directory
  documentTypes: [Post]
})
