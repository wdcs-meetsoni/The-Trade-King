/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  images:{
    hostname: "http://localhost:8000/",
  }
}

module.exports = nextConfig
