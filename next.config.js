/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    optimizeFonts: false,
    env: {
        APP_URL: process.env.REACT_APP_URL,
        APP_ENV: process.env.REACT_APP_ENV,
        APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    },

    images: {
        domains: [
            'asset.cloudinary.com',
        ]
    },

    async rewrites(){
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4200/api/:path*'
            }
        ]
    }
}

module.exports = nextConfig
