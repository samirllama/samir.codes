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
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unpkg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placeholder.svg",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "jwdtwbbgwku6ttxc.public.blob.vercel-storage.com",
      "cdn.jsdelivr.net",
      "unpkg.com",
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self'",
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
  webpack: (config, { isServer, dev }) => {
    // Only enable custom WASM handling for client-side and exclude @vercel/og
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };

      config.module.rules.push({
        test: /\.wasm$/,
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
      test: /\.(wasm)$/,
      include: [
        /node_modules\/@vercel\/og/,
        /node_modules\/.*\/next\/dist\/compiled\/@vercel\/og/,
      ],
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[name].[hash][ext]",
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
              test: /[\\/]node_modules[\\/]scichart[\\/]/,
              name: "scichart",
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
            },
            vercelOg: {
              test: /[\\/]node_modules[\\/]@vercel[\\/]og[\\/]/,
              name: "vercel-og",
              chunks: "all",
              priority: 9,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
          defaultLang: "plaintext",
          transformers: [
            {
              name: "add-line-numbers",
              pre(node) {
                this.addClassToHast(node, "line-numbers");
              },
            },
          ],
          // Ensure proper processing
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            if (!node.properties.className) {
              node.properties.className = [];
            }
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedChars(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
    ],
  },
});

export default withMDX(config);
