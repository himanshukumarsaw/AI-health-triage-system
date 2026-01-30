/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images from external domains if needed
  images: {
    unoptimized: false,
  },

  // Production optimizations
  poweredByHeader: false,

  // Compress responses
  compress: true,
};

export default nextConfig;
