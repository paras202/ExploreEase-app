/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com', // Replace the domain entry with a remote pattern
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.clerk.com', // Add Clerk domain configuration here
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
