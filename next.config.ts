import path from "path";
import fs from "fs";
import { NextConfig } from "next";

// Get the client modules path from environment variable
const clientModulesDir = process.env.CLIENT_MODULES_PATH
  ? path.resolve(process.env.CLIENT_MODULES_PATH)
  : "";

if (!clientModulesDir || !fs.existsSync(clientModulesDir)) {
  console.warn(`⚠️ No client modules found at ${clientModulesDir}. Proceeding with base system only.`);
} else {
  console.log("📂 Using Client `modules/` directory:", clientModulesDir);
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["modular-nextjs-skeleton"],
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack: (config) => {
    console.log("🔄 Custom Webpack Configuration for Modules");

    if (clientModulesDir && fs.existsSync(clientModulesDir)) {
      config.resolve.modules = config.resolve.modules || [];
      config.resolve.modules.push(clientModulesDir);
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
