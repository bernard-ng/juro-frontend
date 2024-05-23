/** @type {import('next').NextConfig} */
const nextConfig = {
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
