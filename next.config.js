/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['unpkg.com'], // Pour les icônes Leaflet externes
  },
};

module.exports = nextConfig;
