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
  theme: 'github-dark', // Or 'one-dark-pro', 'poimandres', etc.
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
    extension: /\.mdx?$/, // Optional: If you want both .md and .mdx
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
    //  Add pageExtensions HERE
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Include mdx (and md if using the extension option above)
    reactStrictMode: true,
    poweredByHeader: false,
    experimental: {
      typedRoutes: true,
      // mdxRs: false, // Explicitly ensure Rust compiler is off if relying on @mdx-js/loader
    },
    // Add other configs like CSP headers, images, redirects here later
  };

  // Return the WRAPPED options object ---
  return withMDX(nextConfigOptions);
};

// Wrap the config export with the MDX plugin
export default nextConfig
