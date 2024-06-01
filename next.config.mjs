/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async redirects() {
      return [
          {
              source: '/',
              destination: '/chat',
              permanent: true
          }
      ]
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/screens/:path*',
            },
        ]
    },
};

export default nextConfig;
