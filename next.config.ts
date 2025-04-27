// next.config.ts
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import createMDX from '@next/mdx';

// Import MDX Plugins ---
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Element } from 'hast';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'; //

//  Configure rehype-pretty-code
const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    // Match dark theme base (slate-900)
    dark: 'github-dark', // Example: Use GitHub Dark theme
    // Add light theme if desired
    light: 'github-light', // Example: Use GitHub Light theme
  },

  onVisitLine(node: Element) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: Element) {
    node.properties = node.properties || {};
    const currentClasses = node.properties.className;

    if (Array.isArray(currentClasses)) {
      // Already an array, push the new class
      currentClasses.push('line--highlighted');
    } else if (typeof currentClasses === 'string') {
      // It's a string, create a new array containing the existing class and the new one
      node.properties.className = [currentClasses, 'line--highlighted'];
    } else {
      // It's null, undefined, or something else - create a new array with just our class
      node.properties.className = ['line--highlighted'];
    }
  },

  onVisitHighlightedChars(node: Element) {
    node.properties = node.properties || {};
    node.properties.className = ['word--highlighted'];
  },

};


//  Main Next.js Config Function ---
const nextConfig = (phase: string): NextConfig => {
  // Call createMdx INSIDE the function ---
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

  // Define base config options
  const nextConfigOptions: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
      dynamicIO: true,
      typedRoutes: true,
      // mdxRs: false, // Explicitly ensure Rust compiler is off if relying on @mdx-js/loader
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Add other configs like CSP headers, images, redirects here later
  };

  return withMDX(nextConfigOptions);
};

export default nextConfig
