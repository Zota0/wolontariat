/** @type {import('next').NextConfig} */
const nextConfig = {
    
    async rewrites() {
        return [
            {
                source: '/back:path*',
                destination: 'http://127.0.0.1:6866/:path*',
            }
        ]
    },

    async headers() {
        return [
            {
                source: '/back:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*'
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization'
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
