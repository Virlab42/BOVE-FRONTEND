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
    ],
  },
};

export default nextConfig;
