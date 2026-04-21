/** @type {import('next').NextConfig} */
console.log("!!! CONFIG LOADED WITH CDN PATH:", "https://cdn.bove-brand.ru");
// 1. Проверяем, запущено ли приложение в продакшене
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // 2. Включаем префикс для всех статических файлов Next.js (JS, CSS, шрифты)
  assetPrefix: "https://cdn.bove-brand.ru",

  images: {
    // 3. Настройка для раздачи картинок из /public через CDN
    loader: "custom",
    loaderFile: "./loader.js",

    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bove-brand.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "89.169.47.16",
        port: "8000",
        pathname: "/**",
      },
      // Добавляем домен CDN в разрешенные паттерны
      {
        protocol: "https",
        hostname: "cdn.bove-brand.ru",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    serverComponents: false,
    appDir: false,
    rsc: false,
  },

  // 4. Заголовки безопасности
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Поменяли DENY на SAMEORIGIN
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Сделали чуть мягче для внешних API
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "Permissions-Policy",
            // Разрешили геолокацию
            value:
              "camera=(), microphone=(), geolocation=*, interest-cohort=()",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  generateEtags: true,

  serverRuntimeConfig: {
    maxRequestBodySize: "10mb",
  },

  compress: true,

  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/_next/static/chunks/rsc",
          has: [
            {
              type: "header",
              key: "x-rsc-validator",
              value: ".+",
            },
          ],
          destination: "/_next/static/chunks/rsc",
        },
      ],
    };
  },
};

export default nextConfig;
