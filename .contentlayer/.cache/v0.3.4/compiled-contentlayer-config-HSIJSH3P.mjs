// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      default: []
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => `${post._raw.flattenedPath.replace("posts/", "")}`
    },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace("posts/", "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  // Points to root content directory
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-HSIJSH3P.mjs.map
