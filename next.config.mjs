// next.config.mjs
import createMDX from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unpkg.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://va.vercel-scripts.com",
              "media-src 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },
  env: {
    ANALYZE: process.env.ANALYZE,
  },
  poweredByHeader: false,
  compress: true,
  output: process.env.ANALYZE === "true" ? "standalone" : undefined,
  webpack: (config, { dev }) => {
    // @vercel/og ships its wasm as an asset so the OG image routes
    // (opengraph-image.tsx) can load it. Everything else is Next's defaults.
    config.module.rules.push({
      test: /.(wasm)$/,
      include: [
        /node_modules\/@vercel\/og/,
        /node_modules\/.*\/next\/dist\/compiled\/@vercel\/og/,
      ],
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[name].hash",
      },
    });

    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vercelOg: {
              test: /[\/]node_modules[\/]@vercel[\/]og[\/]/,
              name: "vercel-og",
              chunks: "all",
              priority: 9,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\/]node_modules[\/]/,
              name: "vendors",
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    if (process.env.ANALYZE === "true") {
      config.devtool = "source-map";
      config.output = {
        ...config.output,
        chunkFilename: dev ? "[name].js" : "[name].[contenthash].js",
      };
    }

    return config;
  },
};

const config =
  process.env.ANALYZE === "true"
    ? withBundleAnalyzer({
        enabled: true,
        openAnalyzer: true,
      })(nextConfig)
    : nextConfig;

const withMDX = createMDX({
  options: {
    mdxRs: true,
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      "rehype-highlight",
      "rehype-pretty-code",
      "rehype-autolink-headings",
    ],
  },
});

export default withMDX(config);
