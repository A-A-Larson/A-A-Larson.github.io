/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (served from the root of A-A-Larson.github.io).
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

module.exports = nextConfig
