import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable optimization for Vercel Blob
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
      // Add placeholder.svg support
      {
        protocol: "https",
        hostname: "placeholder.svg",
        port: "",
        pathname: "/**",
      },
    ],
    // Alternative domains configuration (deprecated but still supported)
    domains: [
      "jwdtwbbgwku6ttxc.public.blob.vercel-storage.com", // Specific Vercel Blob hostname
      "cdn.jsdelivr.net",
      "unpkg.com",
    ],
    //
    // Image optimization settings
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // Enable WebAssembly support but let Next.js handle @vercel/og
    webVitalsAttribution: ["CLS", "LCP"],
  },
  webpack: (config, { isServer, dev }) => {
    // Only enable custom WASM handling for client-side and exclude @vercel/og
    if (!isServer) {
      // Handle WASM files but exclude @vercel/og WASM files
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };

      // Add WASM file handling ONLY for SciChart, not @vercel/og
      config.module.rules.push({
        test: /\.wasm$/,
        exclude: [
          /node_modules\/@vercel\/og/,
          /node_modules\/.*\/next\/dist\/compiled\/@vercel\/og/,
        ],
        type: "webassembly/async",
      });

      // Fallback for client-side
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

    // Handle SciChart specific configurations
    config.resolve.alias = {
      ...config.resolve.alias,
      scichart: "scichart/index.js",
    };

    // Exclude problematic WASM files from processing
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

    // Optimize for production
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
            // Separate @vercel/og to avoid conflicts
            vercelOg: {
              test: /[\\/]node_modules[\\/]@vercel[\\/]og[\\/]/,
              name: "vercel-og",
              chunks: "all",
              priority: 9,
              reuseExistingChunk: true,
            },
            // Separate vendor chunks for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
            // Common chunks
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

    // Bundle analyzer specific optimizations
    if (process.env.ANALYZE === "true") {
      // Add source maps for better analysis
      config.devtool = "source-map";

      // Ensure proper chunk naming for analysis
      config.output = {
        ...config.output,
        chunkFilename: dev ? "[name].js" : "[name].[contenthash].js",
      };
    }

    return config;
  },
  transpilePackages: ["scichart"],

  // Rewrites for WASM files (only for SciChart)
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

  // Environment-specific configurations
  env: {
    ANALYZE: process.env.ANALYZE,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Output configuration for better bundle analysis
  output: process.env.ANALYZE === "true" ? "standalone" : undefined,
};

// Conditionally wrap with bundle analyzer
const config =
  process.env.ANALYZE === "true"
    ? withBundleAnalyzer({
        enabled: true,
        openAnalyzer: true,
      })(nextConfig)
    : nextConfig;

export default config;
