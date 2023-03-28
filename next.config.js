/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    },
    webpack5: true,
    webpack: (config, {isServer}) => {
        if (!isServer) config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };

        return config;
    },
}

module.exports = nextConfig
