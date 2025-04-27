/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If you're using webpack 5 (default in Next.js 12+), this is likely unnecessary
  // but added for completeness
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }
    return config
  },
}

module.exports = nextConfig
