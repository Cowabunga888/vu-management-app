/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  swcMinify: true,

  images: {
    unoptimized: true
  }
}

module.exports = nextConfig