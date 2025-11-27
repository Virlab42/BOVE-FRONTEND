/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "5.129.246.215",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
