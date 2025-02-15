import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = false; // ✅ Ensures Next.js recognizes symlinks properly

    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // ✅ Forces Next.js to detect file changes inside Docker
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
