import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel Image Optimization is not used: the account's quota is exhausted
    // (every /_next/image answered 402 on 2026-10-23 and photos vanished).
    // Photos go through our own resizer instead, src/app/api/img, which is
    // cached by the CDN. Emergency rollback to plain originals: replace the
    // two loader lines with `unoptimized: true`.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
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
    // Keep these in sync with src/lib/imageConfig.ts.
    qualities: [85],
    formats: ["image/webp"],
    deviceSizes: [640, 1080, 1600, 2048],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
