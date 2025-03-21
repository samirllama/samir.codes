// next.config.mjs
import { withContentlayer } from 'next-contentlayer'; // If using MDX

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      loaders: {
        // Needed for GSAP SVG animations
        '.svg': ['@svgr/webpack']
      }
    },
    optimizePackageImports: ['gsap']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

// If using MDX content
export default withContentlayer(nextConfig);
