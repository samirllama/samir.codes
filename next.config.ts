import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgSize from 'rehype-img-size';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: 'github-dark', light: 'github-light' },
  onVisitLine(node) {
    if (node.children.length === 0) { node.children = [{ type: 'text', value: ' ' }]; }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ['line--highlighted'];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['word--highlighted'];
  },
};

const nextConfigBase = (phase: string): NextConfig => {
  const config: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
      
      typedRoutes: true,
      useCache: true,

    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'jwdtwbbgwku6ttxc.public.blob.vercel-storage.com',
          pathname: '**',
        },
      ],
    },
    async headers() {
      const csp = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https://*;
        connect-src 'self' vitals.vercel-insights.com https://*;
        font-src 'self' https://*;;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
        report-to default;
      `
        .replace(/\s{2,}/g, " ")
        .trim();

      return [
        {
          source: '/(.*)',


          headers: [
            {
              key: "Content-Security-Policy",
              value: csp,
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains; preload",
            },
          ],
        },
      ];
    },
  };

  const withMDXConfig = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkGfm, remarkA11yEmoji],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], [rehypeImgSize, { dir: 'public' }]],
    },
  })(config);

  return withBundleAnalyzer(withMDXConfig);
};

export default nextConfigBase;