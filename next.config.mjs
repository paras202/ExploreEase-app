/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.clerk.com',
          port: '',
          pathname: '/**',
        }, 
      ], // Add the external hostname here
    },
  };
  
  export default nextConfig;
  