/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 使用 Next.js 15 正确的配置方式
  serverExternalPackages: [],
  experimental: {
    // 在 Next.js 15 中，使用这个配置来增加请求体大小限制
    serverMaxRequestSizeBytes: 50 * 1024 * 1024,
  },
}

export default nextConfig