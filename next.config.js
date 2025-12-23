/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'imagedelivery.net'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.farcaster.xyz https://*.warpcast.com https://*.farcaster.com https://farcaster.xyz https://warpcast.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;









