"use client";

import Link from "next/link";
import Image from "next/image";
import "./favourites.scss";
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
      .map((c) => translitMap[c] ?? c)
      .join("");

  const slugify = (str) =>
    translit(str)
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  return `${slugify(productName)}-${slugify(colorName)}-${id}`;
}

export default function FavouritesPage() {
  const { favourites, toggleFavourite, isFavourite, clearFavourites } = useFavourite();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getProductImage = (item) =>
    item.img ? item.img : "/placeholder.jpg";

  return (
    <div className="favourites">

      <h1 className="favourites__title">
        Избранное
        <button
        className="clear-favourites"
        onClick={clearFavourites}
        >
            <svg
            data-v-4b9bbdf6=""
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#999999"
            stroke="none"
            strokeWidth="0"
          >
            <path d="M22.387 2.701h-6.19C15.45 1.094 13.83 0 12 0c-1.832 0-3.453 1.094-4.198 2.701H1.613a1 1 0 1 0 0 2.002h.611v.003L3.26 22.058C3.325 23.147 4.199 24 5.25 24H18.752c1.046 0 1.919-.851 1.988-1.942l1.036-17.352v-.003h.61a1 1 0 1 0 .001-2.002zM12 2.002c.676 0 1.299.267 1.772.699h-3.545A2.63 2.63 0 0 1 12 2.002zm6.75 19.995l-13.492-.059L4.229 4.703h15.542L18.75 21.997z"></path>
            <path d="M8.202 20.325c.019 0 .038 0 .058-.002a1 1 0 0 0 .943-1.056L8.535 7.339a.997.997 0 0 0-1.055-.944 1 1 0 0 0-.943 1.055l.667 11.929a1 1 0 0 0 .998.946zM15.739 20.323c.019.002.038.002.057.002.527 0 .97-.412.999-.946l.666-11.929a1.002 1.002 0 0 0-.943-1.056c-.539-.041-1.024.392-1.055.944l-.667 11.929a1 1 0 0 0 .943 1.056zM12 20.325c.553 0 1.001-.449 1.001-1.001V7.394a1 1 0 1 0-2.002 0v11.931a1 1 0 0 0 1.001 1z"></path>
          </svg>
          Очистить избранное
        </button>
        </h1>

      <div className="favourites__grid">
        {favourites.length === 0 && (
          <div className="favourites__empty">
            В избранном пока ничего нет
          </div>
        )}

        {favourites.map((item) => (
          <Link
            key={item.id}
            href={`/catalog/${buildProductUrl(item.name, item.colorName, item.productId)}?id=${item.productId}&variant_id=${item.id}`}
            className="product-card"
          >
            <div className="product-card__img">
              <Image
                width={1000}
                height={1000}
                src={getProductImage(item)}
                alt={item.name}
              />

              {/* Кнопка избранного */}
              <button
                className="favourite-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavourite(item);
                }}
              >
                {isFavourite(item.id) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="#c42b1c" stroke="#c42b1c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12" />
                  </svg>
                )}
              </button>
            </div>

            <div className="product-card__title">
              {item.name} {item.colorName}
            </div>

            <div className="product-card__price">
              {item.price > 0 ? `${parseInt(item.price)} ₽` : "Скоро будет"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
