// next.config.ts
import type { NextConfig } from "next"

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { /* …your flags… */ },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jwdtwbbgwku6ttxc.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ],
  },
  // We handle headers/CSP in middleware.ts now
}

export default withBundleAnalyzer(nextConfig)


// import withBundleAnalyzer from '@next/bundle-analyzer';
// const withConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: false, // Optional: prevents opening browser automatically
// });
// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // ... more config
// };
// export default withConfig(nextConfig);
