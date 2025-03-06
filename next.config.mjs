/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com'], // Allow image optimization from Googleusercontent
    },
};

export default nextConfig;
