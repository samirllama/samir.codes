import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeImgSize from "rehype-img-size";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark", light: "github-light" },
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ["line--highlighted"];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word--highlighted"];
  },
};

const config: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
    // Note: `useCache` is a valid flag, but modern data fetching in Next.js
    // relies more on the React `cache` function for granular control.
    // This flag can remain, but be aware of the new patterns.
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jwdtwbbgwku6ttxc.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ],
  },
  // The headers block has been removed as per our documentation's recommendation
  // to handle security headers in middleware.ts.
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkA11yEmoji],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [rehypeImgSize, { dir: "public" }],
    ],
  },
});

export default withBundleAnalyzer(withMDX(config));