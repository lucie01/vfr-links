/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yt3.googleusercontent.com',
            },
        ],
    },
};

export default nextConfig;
