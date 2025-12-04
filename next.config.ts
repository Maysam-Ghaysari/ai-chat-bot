/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⛔ Disable Turbopack transforms in Next.js 15+
  compiler: {
    turboLoader: false,
  },

  experimental: {
    turbo: false, // keeps backward compatibility for older versions
  },
};

module.exports = nextConfig;
