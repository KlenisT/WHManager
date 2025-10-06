import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org"], // ✅ add your external image host here
  },
};

export default nextConfig;
