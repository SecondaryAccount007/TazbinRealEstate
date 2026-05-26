/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any HTTPS image source — needed because admins can paste URLs from any host
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;
