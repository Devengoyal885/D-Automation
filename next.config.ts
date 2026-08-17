import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection warning (multiple lockfiles)
  outputFileTracingRoot: path.join(__dirname, "./"),

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Suppress noisy ESLint failures during build — warnings don't block CI
  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    // TS errors already caught by IDE; don't double-fail the build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
