"use client";
import Link from "next/link";
import "./Catalog.scss";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/useCategories"
import { useSearchParams } from "next/navigation";

function buildProductUrl(productName, colorName, id) {
  const translitMap = {
    а: "a", б: "b", в: "v", г: "g", д: "d",
    е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "i", к: "k", л: "l", м: "m", н: "n",
    о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "c", ч: "ch",
    ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
    э: "e", ю: "yu", я: "ya"
  };

  const translit = (str) =>
    str
      .toLowerCase()
      .split("")
      .map((char) => translitMap[char] ?? char)
      .join("");

  const slugify = (str) =>
    translit(str)
      .replace(/[^a-z0-9\s-]/g, "")   // убрать мусор
      .trim()
      .replace(/\s+/g, "-")           // пробелы → "-"
      .replace(/-+/g, "-");           // убрать двойные дефисы

  const productSlug = slugify(productName);
  const colorSlug = slugify(colorName);

  return `${productSlug}-${colorSlug}-${id}`;
}

export default function Catalog({ initialCat }) {
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sortType, setSortType] = useState("new");
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data } = useCategories()

  // === НОРМАЛИЗАЦИЯ ВАРИАНТОВ ===============================================
  const normalizeVariantImages = (variant) => {
    if (!variant.image) return [];

    if (Array.isArray(variant.image)) return variant.image;

    if (typeof variant.image === "string") {
      return variant.image
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean);
    }

    return [];
  };

  const normalizeProduct = (p) => ({
    ...p,
    available_sizes:
      typeof p.available_sizes_id === "string"
        ? JSON.parse(p.available_sizes_id)
        : [],

    variants: (p.variants || []).map((v) => ({
      ...v,
      images: normalizeVariantImages(v),
    })),
  });

  // === ЗАГРУЗКА ТОВАРОВ ======================================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://5.129.246.215:8000/productsV2");
        if (!res.ok) throw new Error("Ошибка загрузки товаров");

        const data = await res.json();
        const cleaned = (data.products || []).map(normalizeProduct);

        setProducts(cleaned);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // === ФИЛЬТР ================================================================
  const filtered = selectedCat
    ? products.filter((p) => p.category_id === selectedCat)
    : products;

  // === СОРТИРОВКА ============================================================
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "cheap") return a.base_price - b.base_price;
    if (sortType === "expensive") return b.base_price - a.base_price;
    if (sortType === "new") return b.id - a.id;
    return 0;
  });

  // === РАЗВОРОТ 1 ЦВЕТ = 1 КАРТОЧКА ==========================================
  const flattened = sorted.flatMap((p) =>
    p.variants.map((v) => ({
      product_id: p.id,
      variant_id: v.id,
      full_name: p.full_name,
      category_id: p.category_id,
      price: p.base_price,
      color: v.color,
      hex_color: v.hex_color,
      images: v.images,
    }))
  );

  const getProductImage = (product) => {
    if (product.images?.length) return "http://5.129.246.215:8000/" + product.images[0];
    return "/placeholder.jpg";
  };

  // === РЕНДЕР ================================================================
  if (loading)
    return <div className="catalog"><div className="loading">Загрузка...</div></div>;

  if (error)
    return <div className="catalog"><div className="error">{error}</div></div>;

  return (
    <div className="catalog">

      {/* Мобильный фильтр */}
      <div className="catalog__filter__mob">
        <ul>
          {data?.categories?.map((c) => (
            <li
              key={c.id}
              className={c.id === selectedCat ? "active" : ""}
              onClick={() =>
                setSelectedCat(c.id === selectedCat ? null : c.id)
              }
            >
              {c.name}
            </li>
          ))}
        </ul>

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="new">Сначала новинки</option>
          <option value="cheap">Сначала недорогие</option>
          <option value="expensive">Сначала дорогие</option>
        </select>
      </div>

      {/* Левый сайдбар */}
      <aside className="catalog__filter">
        <ul>
          {data?.categories?.map((c) => (
            <li
              key={c.id}
              className={c.id === selectedCat ? "active" : ""}
              onClick={() =>
                setSelectedCat(c.id === selectedCat ? null : c.id)
              }
            >
              {c.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Сетка товаров */}
      <div className="catalog__content">
        <div className="catalog__grid">
          {flattened.map((product) => (
            <Link
              href={`/catalog/${buildProductUrl(product.full_name, product.color, product.product_id)}?id=${product.product_id}&variant_id=${product.variant_id}`}
              className="product-card"
              key={`${product.product_id}-${product.color}`}
            >
              <div className="product-card__img">
                <img
                  src={getProductImage(product)}
                  alt={product.full_name}
                />

                <button
                  className={`fav ${favorites.includes(product.product_id) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFav(product.product_id);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.411 2.31742C13.171..."
                      fill="white"
                    />
                  </svg>
                </button>
              </div>

              <div className="product-card__title">{product.full_name}</div>
              <div className="product-card__price">
                {parseInt(product.price)} ₽
              </div>
            </Link>
          ))}

          {flattened.length === 0 && (
            <div className="catalog__empty">Нет товаров</div>
          )}
        </div>
      </div>

      {/* Правый сайдбар */}
      <aside className="catalog__sort">
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="new">Сначала новинки</option>
          <option value="cheap">Сначала недорогие</option>
          <option value="expensive">Сначала дорогие</option>
        </select>
      </aside>
    </div>
  );
}
