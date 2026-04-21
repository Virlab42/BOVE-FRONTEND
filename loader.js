// loader.js
export default function yandexCloudLoader({ src }) {
  const cdnDomain = "https://cdn.bove-brand.ru";
  const apiDomain = "https://api.bove-brand.ru";

  // 1. Если картинка прилетает с твоего API
  if (src.startsWith(apiDomain)) {
    // Заменяем домен API на домен CDN, чтобы запрос шел через Яндекс
    return src.replace(apiDomain, cdnDomain);
  }

  // 2. Если картинка локальная (начинается со слэша /)
  if (src.startsWith("/")) {
    return `${cdnDomain}${src}`;
  }

  // 3. Если это какая-то другая внешняя ссылка или уже готовая ссылка CDN
  return src;
}
