/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    poweredByHeader: false,
    env: {
        API_HOST: process.env['API_HOST'],
        API_PORT: process.env['API_PORT'],
    },
    images: {
        domains: [process.env['API_HOST']],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `http://${process.env['API_PORT']}:${process.env['API_PORT']}/api/:path*`,
            },
            {
                source: '/uploads/:path*',
                destination: `http://localhost:3001/user_files/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
