// next.config.mjs
import path from "path";
import createMDX from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

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
  transpilePackages: ["scichart"],
  async rewrites() {
    return [
      {
        source: "/scichart2d.wasm",
        destination: "/api/wasm/scichart2d.wasm",
      },
      {
        source: "/scichart2d.data",
        destination: "/api/wasm/scichart2d.data",
      },
    ];
  },
  env: {
    ANALYZE: process.env.ANALYZE,
  },
  poweredByHeader: false,
  compress: true,
  output: process.env.ANALYZE === "true" ? "standalone" : undefined,
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };

      config.module.rules.push({
        test: /.wasm$/,
        exclude: [
          /node_modules\/@vercel\/og/,
          /node_modules\/.*\/next\/dist\/compiled\/@vercel\/og/,
        ],
        type: "webassembly/async",
      });

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
      };
    }

    Object.assign(config.resolve.alias, {
      scichart: path.resolve("./node_modules/scichart"),
    });

    config.module.rules.push({
      test: /.(wasm)$/,
      include: [/node_modules\/@vercel\/og/, /node_modules\/.*\/next\/dist\/compiled\/@vercel\/og/],
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
            scichart: {
              test: /[\/]node_modules[\/]scichart[\/]/,
              name: "scichart",
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
            },
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
