'use client';

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { useFavourite } from "@/context/FavouriteContext";

export default function Attendant({ id }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { toggleFavourite, isFavourite } = useFavourite();

  // --- normalize images ---
  const normalizeVariantImages = (variant) => {
    if (!variant.image) return [];
    if (Array.isArray(variant.image)) return variant.image;
    if (typeof variant.image === "string") {
      return variant.image.split(",").map((i) => i.trim()).filter(Boolean);
    }
    return [];
  };

  const normalizeProduct = (p) => ({
    ...p,
    variants: (p.variants || []).map((v) => ({
      ...v,
      images: normalizeVariantImages(v),
    })),
  });

  // --- load related products ---
  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/productsV3/${id}/related`);
        if (!res.ok) throw new Error("Ошибка загрузки товаров");

        const data = await res.json();

        // правильный путь к товарам!
        const related = data?.related_products?.variants || [];

        setProducts(related);
      } catch (err) {
        console.log("ERR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, API_URL]);

  // --- URL generator (локальный) ---
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
      .map((c) => translitMap[c] ?? c)
      .join("");

  const slugify = (str) =>
    translit(str)
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const buildProductUrl = (name, color, id) =>
    `${slugify(name)}-${slugify(color)}-${id}`;

  const getProductImage = (p) =>
    p.image?.length ? `${API_URL}/${p.image}` : "/placeholder.jpg";


  if (loading || !products.length) return null;
    console.log(products);
  return (
    <div className="related">
      <h2>С этим товаром покупают</h2>

      <Swiper slidesPerView={2.2} spaceBetween={16} className="related-swiper">
        {products.map((product) => (
          <SwiperSlide key={product.variant_id}>
            <Link
              href={`/catalog/${buildProductUrl(
                product.full_name,
                product.color,
                product.product_id
              )}?id=${product.product_id}&variant_id=${product.variant_id}`}
              className="product-card"
            >
              <div className="product-card__img">
                <Image
                  width={800}
                  height={800}
                  src={getProductImage(product)}
                  alt={product.full_name}
                />

                <button
                  className="favourite-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavourite({
                      id: product.variant_id,
                      name: product.full_name,
                      colorName: product.color,
                      img: getProductImage(product),
                      productId: product.product_id,
                      price: product.price,
                    });
                  }}
                >
                  {isFavourite(product.variant_id) ? (
                    // заполненное сердечко
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#c42b1c" stroke="#c42b1c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                    </svg>
                  ) : (
                    // пустое сердечко
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="transparent" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="product-card__title">
                {product.full_name} {product.name_for_color}
              </div>

              <div className="product-card__price">
                {product.price > 0 ? `${parseInt(product.price)} ₽` : "Скоро будет"}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
