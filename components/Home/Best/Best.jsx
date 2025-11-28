"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./Best.scss";
import { useFavourite } from "@/context/FavouriteContext";

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

export default function Best() {
  const { toggleFavourite, isFavourite } = useFavourite();
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBest = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productsV2/popular`);
        const data = await res.json();

        const products = data.products.map((p) => {
          const images = JSON.parse(p.variant_image); // Преобразуем строку в массив
          return {
            id: p.variant_id,
            name: p.product_full_name,
            colorName: p.name_for_colors,
            price: `${p.product_base_price.toLocaleString("ru-RU")} ₽`,
            img: images[0], // берем первую картинку
            productId: p.product_id
          };
        });

        setBestSellers(products);
      } catch (error) {
        console.error("Ошибка при загрузке бестселлеров:", error);
      }
    };

    fetchBest();
  }, []);

  return (
    <section className="best-container">
      <h2>Best Sellers</h2>
      <div className="best-card-container">
        {bestSellers.map((item) => (
          <Link href={`/catalog/${buildProductUrl(item.name, item.colorName, item.id)}?id=${item.productId}&variant_id=${item.id}`} className="best-card" key={item.id}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img}`}
              width={1000}
              height={1000}
              alt={item.name}
            />
            <button
              className="favourite-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavourite({
                  id: item.id,
                  name: item.name,
                  colorName: item.colorName,
                  img: item.img,
                  productId: item.productId,
                  price: item.price
                });
              }}
            >

              {isFavourite(item.id) ? (
                // заполненное сердечко
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <path fill="#c42b1c" stroke="#c42b1c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                </svg>
              ) : (
                // пустое сердечко
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                </svg>
              )}
            </button>
            <div className="card-info">
              <p>{item.name} {item.colorName}</p>
              <span>{item.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
