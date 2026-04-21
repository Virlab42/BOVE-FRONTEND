// loader.js
export default function yandexCloudLoader({ src }) {
  // Этот лоадер просто склеивает домен CDN и путь к картинке
  return `https://cdn.bove-brand.ru${src}`;
}
