"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useFavourite } from "@/context/FavouriteContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
  if (!variant) return [];
  const raw = variant.image ?? variant.images ?? "";
  if (Array.isArray(raw)) {
    return raw.map((p) =>
      `${BASE_URL}/${p}`.replace(/\/\/+/g, "/").replace("http:/", "http://")
    );
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
  const { toggleFavourite, isFavourite } = useFavourite();
  console.log(product);

  // product may be undefined briefly — guard
  const {
    id,
    full_name,
    base_price,
    description,
    composition_material,
    variants = [],
    product_stock = [],
    // two possible shapes: available_sizes (array of objects) OR available_sizes_id (string)
    available_sizes,
    available_sizes_id,
  } = product || {};

  // --- Build size map: id -> label (e.g. 4 -> "S-M") ---
  // Handle multiple shapes:
  // - product.available_sizes = [{id: 4, size: "S-M"}, ...]
  // - product.available_sizes_id = "[1,2]" (legacy) => fallback to id->id label
  const sizeMap = {};
  if (Array.isArray(available_sizes) && available_sizes.length > 0) {
    available_sizes.forEach((s) => {
      if (s && (s.id ?? s.size)) sizeMap[s.id] = s.size ?? String(s.id);
    });
  } else if (typeof available_sizes_id === "string") {
    try {
      const arr = JSON.parse(available_sizes_id);
      if (Array.isArray(arr)) {
        arr.forEach((idVal) => {
          sizeMap[idVal] = String(idVal); // no labels available — fallback to id string
        });
      }
    } catch {
      // ignore parse errors
    }
  }

  // --- get all size ids present in product_stock (unique) ---
  const allSizeIds = [...new Set((product_stock || []).map((s) => s.size_id))];

  // compute sizesWithQty for the currently active variant
  const activeVariantId = activeVariant?.id ?? activeVariant?.variant_id ?? null;

  const sizesWithQty = allSizeIds.map((sizeId) => {
    const stock = (product_stock || []).find(
      (s) => s.variant_id === activeVariantId && s.size_id === sizeId
    );
    return {
      sizeId,
      quantity: stock?.quantity ?? 0,
    };
  });

  const variantIsOut = sizesWithQty.length === 0 || sizesWithQty.every((s) => s.quantity === 0);

  // default initial size id (the id, not label)
  const defaultSizeId = sizesWithQty.find((s) => s.quantity > 0)?.sizeId ?? null;
  const [selectedSizeId, setSelectedSizeId] = useState(defaultSizeId);

  // when activeVariant or availability changes, reset selected size to first available
  useEffect(() => {
    setSelectedSizeId(sizesWithQty.find((s) => s.quantity > 0)?.sizeId ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariantId]);

  // variant images
  const variantImages = parseVariantImages(activeVariant);
  const firstImage = variantImages[0] ?? null;

  // build product url
  const url = `/catalog/${slugifyTranslit(full_name, activeVariant?.color ?? "", id)}?id=${id}&variant_id=${activeVariantId}`;

  // Add to cart: pass label for size (if available), else pass id
  const handleAddToCart = () => {
    if (!selectedSizeId) return;

    add({
      id: id,
      variant_id: activeVariantId,
      title: full_name,
      price: activeVariant?.price ?? base_price,
      color: activeVariant?.color,
      // pass readable label:
      size: sizeMap[selectedSizeId] ?? selectedSizeId,
      image: firstImage, // can be null
      url,
    });
  };

  return (
    <div className="product-page__info">
      <h1 className="title">{full_name}</h1>
      <div className="price">{base_price > 0 ? `${base_price} ₽` : "Скоро будет"}</div>

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
              className={`color-swatch ${activeVariantId === v.id ? "active" : ""}`}
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
                className={`size-btn ${selectedSizeId === sizeId ? "active" : ""}`}
                disabled={quantity === 0}
                onClick={() => quantity > 0 && setSelectedSizeId(sizeId)}
              >
                {sizeMap[sizeId] ?? sizeId}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Таблица размеров */}
      <div className="size-guide-link" onClick={onOpenSizeGuide}>
        Таблица размеров
      </div>
      {description ? <div>{description}</div> : ''}
      <div>Состав:<br></br>
        {composition_material}
      </div>
      {/* ==== Кнопка "в корзину" ==== */}
      <div className="cart-favourite">
        <button
          className="add-cart"
          disabled={!selectedSizeId || variantIsOut}
          onClick={handleAddToCart}
        >
          {variantIsOut ? "Нет в наличии" : "Добавить в корзину"}
        </button>
        <button
          className="favourite-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavourite({
              id: activeVariantId,
              name: full_name,
              colorName: activeVariant?.color,
              img: firstImage,
              productId: id,
              price: activeVariant?.price ?? base_price
            });
          }}
        >

          {isFavourite(activeVariantId) ? (
            // заполненное сердечко
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path fill="#c42b1c" stroke="#c42b1c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
            </svg>
          ) : (
            // пустое сердечко
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path fill="transparent" stroke="#42424299" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
