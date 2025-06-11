// next.config.ts
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';

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

const nextConfig = (phase: string): NextConfig => {
  const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    },
  });

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('happy building session ;)');
  }

  const nextConfigOptions: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
      dynamicIO: true,
      typedRoutes: true,
      // mdxRs: false, // Explicitly ensure Rust compiler is off if relying on @mdx-js/loader
    },


    // TODO: Replace https://* with the exact domains needed for the application.
    async headers() {
      const csp = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https://*;
        connect-src 'self' vitals.vercel-insights.com https://*;
        font-src 'self' https://*;
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
          // headers: [
          //   {
          //     key: 'Content-Security-Policy',
          //     value: `
          //       default-src 'self' 'unsafe-eval';
          //       script-src 'self' 'unsafe-inline' 'unsafe-eval';
          //       style-src 'self' 'unsafe-inline';
          //       img-src 'self' data:;
          //       connect-src 'self';
          //       font-src 'self';
          //       object-src 'none';
          //       base-uri 'self';
          //       form-action 'self';
          //       frame-ancestors 'none';
          //     `.replace(/\s{2,}/g, ' ').trim(),
          //   },
          // ],

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
  return withMDX(nextConfigOptions);
};

export default nextConfig;
