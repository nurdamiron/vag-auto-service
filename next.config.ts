import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image-optimization quota for the account is exhausted: every
    // /_next/image answered 402 on 2026-10-23 and photos vanished. Serve the
    // originals until the quota is raised or reset, then remove this line.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
