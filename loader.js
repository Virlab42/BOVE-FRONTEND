export default function yandexCloudLoader({ src }) {
  const cdnDomain = "https://cdn.bove-brand.ru";
  const apiDomain = "https://api.bove-brand.ru";
  const brokenApiDomain = "https:/api.bove-brand.ru"; // Тот самый вариант с одним слешем

  // 1. Лечим битую ссылку с одним слешем
  if (src.startsWith(brokenApiDomain)) {
    return src.replace(brokenApiDomain, cdnDomain);
  }

  // 2. Если картинка прилетает с нормального API
  if (src.startsWith(apiDomain)) {
    return src.replace(apiDomain, cdnDomain);
  }

  // 3. Если картинка локальная (из /public)
  if (src.startsWith("/")) {
    return `${cdnDomain}${src}`;
  }

  // 4. На случай, если src — это просто "uploads_imag/file.jpg" без слеша в начале
  if (!src.startsWith("http")) {
    return `${cdnDomain}/${src}`;
  }

  return src;
}
