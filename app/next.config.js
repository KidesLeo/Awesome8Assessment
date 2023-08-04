/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bookcoverarchive.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'bookcoverarchive.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
