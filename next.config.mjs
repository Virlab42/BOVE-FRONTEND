/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bove-brand.ru",
        port: "",
        pathname: "/**",
      },
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
