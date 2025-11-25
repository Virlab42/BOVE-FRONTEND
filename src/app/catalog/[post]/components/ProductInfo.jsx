"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const BASE_URL = "http://5.129.246.215:8000";

function slugifyTranslit(productName, colorName, id) {
  const translitMap = {
    а: "a", б: "b", в: "v", г: "g", д: "d",
    е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "i", к: "k", л: "l", м: "m", н: "n",
    о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "c", ч: "ch",
    ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
    э: "e", ю: "yu", я: "ya"
  };

  const translit = (str = "") =>
    str
      .toLowerCase()
      .split("")
      .map((char) => translitMap[char] ?? char)
      .join("");

  const slugify = (str = "") =>
    translit(str)
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const productSlug = slugify(productName);
  const colorSlug = slugify(colorName);

  return `${productSlug}-${colorSlug}-${id}`;
}

function parseVariantImages(variant) {
  // variant.image может быть: null, "a.jpg" или "a.jpg,b.jpg" или уже массив
  if (!variant) return [];
  const raw = variant.image ?? variant.images ?? "";
  if (Array.isArray(raw)) {
    return raw.map((p) => `${BASE_URL}/${p}`.replace(/\/\/+/g, "/").replace("http:/", "http://"));
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((p) => `${BASE_URL}/${p}`.replace(/\/\/+/g, "/").replace("http:/", "http://"));
  }
  return [];
}

export default function ProductInfo({
  product,
  activeVariant,
  setActiveVariant,
  onOpenSizeGuide,
}) {
  const { add } = useCart();

  const {
    id,
    full_name,
    base_price,
    variants = [],
    product_stock = [],
  } = product || {};

  // safety: если product_stock пустой — allSizeIds пустой массив
  const allSizeIds = [...new Set((product_stock || []).map((s) => s.size_id))];

  // sizesWithQty для текущего варианта
  const sizesWithQty = allSizeIds.map((sizeId) => {
    const stock = (product_stock || []).find(
      (s) => s.variant_id === (activeVariant?.id ?? activeVariant?.variant_id) && s.size_id === sizeId
    );
    return {
      sizeId,
      quantity: stock?.quantity ?? 0,
    };
  });

  const variantIsOut = sizesWithQty.length === 0 || sizesWithQty.every((s) => s.quantity === 0);

  // По умолчанию первый доступный размер
  const initialSize = sizesWithQty.find((s) => s.quantity > 0)?.sizeId ?? null;
  const [selectedSize, setSelectedSize] = useState(initialSize);

  useEffect(() => {
    const firstAvailable = sizesWithQty.find((s) => s.quantity > 0)?.sizeId ?? null;
    setSelectedSize(firstAvailable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariant?.id]);

  // Получаем массив картинок для activeVariant (с BASE_URL)
  const variantImages = parseVariantImages(activeVariant);
  const firstImage = variantImages[0] ?? null;

  // Сборка URL
  const url = `/catalog/${slugifyTranslit(full_name, activeVariant?.color ?? "", id)}?id=${id}&variant_id=${activeVariant?.id ?? activeVariant?.variant_id
    }`;

  // === Добавление в корзину ===
  const handleAddToCart = () => {
    if (!selectedSize) return;

    add({
      id: id,
      variant_id: activeVariant?.id ?? activeVariant?.variant_id,
      title: full_name,
      price: activeVariant?.price ?? base_price,
      color: activeVariant?.color,
      size: selectedSize,
      image: firstImage, // безопасно: может быть null
      url,
    });
  };

  return (
    <div className="product-page__info">
      <h1 className="title">{full_name}</h1>
      <div className="price">{base_price} ₽</div>

      {/* ==== Цвета ==== */}
      <div className="choose">
        <div className="label">
          Цвет: {activeVariant?.color}
          {variantIsOut && " (Нет в наличии)"}
        </div>

        <div className="color-row">
          {variants.map((v) => (
            <div
              key={v.id}
              className={`color-swatch ${activeVariant?.id === v.id ? "active" : ""}`}
              style={{ backgroundColor: v.hex_color }}
              onClick={() => setActiveVariant(v)}
            />
          ))}
        </div>
      </div>

      {/* ==== Размеры ==== */}
      {!variantIsOut && (
        <div className="choose">
          <div className="label">Размер</div>
          <div className="size-row">
            {sizesWithQty.map(({ sizeId, quantity }) => (
              <button
                key={sizeId}
                className={`size-btn ${selectedSize === sizeId ? "active" : ""}`}
                disabled={quantity === 0}
                onClick={() => quantity > 0 && setSelectedSize(sizeId)}
              >
                {sizeId}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Таблица размеров */}
      <div className="size-guide-link" onClick={onOpenSizeGuide}>
        Таблица размеров
      </div>

      {/* ==== Кнопка "в корзину" ==== */}
      <button
        className="add-cart"
        disabled={!selectedSize || variantIsOut}
        onClick={handleAddToCart}
      >
        {variantIsOut ? "Нет в наличии" : "Добавить в корзину"}
      </button>
    </div>
  );
}
