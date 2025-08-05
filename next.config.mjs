import withBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
        path: false,
      };
    }
    //   ...config.resolve.alias,
    //   scichart: "scichart/index.js",
    // };

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
    remarkPlugins: [],
    rehypePlugins: [],
    development: process.env.NODE_ENV === "development",
  },
});

export default withMDX(config);
