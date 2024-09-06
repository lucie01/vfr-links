/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'yt3.googleusercontent.com',
          pathname: '/**',  // Allow all paths from this domain
        },
      ],
    },
  };
  
  export default nextConfig;
  