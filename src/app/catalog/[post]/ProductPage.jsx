"use client";
import "./product.scss";

import { useState, useMemo } from "react";

import Gallery from "./components/Gallery";
import GalleryModal from "./components/GalleryModal";
import SizeGuideModal from "./components/SizeGuideModal";
import ProductInfo from "./components/ProductInfo";

export default function ProductPage({ product, selectedVariantId }) {
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  // ---- Выбираем вариант ----
  const initialVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const [activeVariant, setActiveVariant] = useState(initialVariant);

  // ---- Готовим изображения ----
  const images = useMemo(() => {
    if (!activeVariant?.image) return [];
    return activeVariant.image.split(",").map((img) => `${BASE_URL}/${img}`);
  }, [activeVariant]);

  // ---- Модалки ----
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="product-page">

      {/* ГАЛЕРЕЯ */}
      <Gallery
        images={images}
        onOpen={(i) => {
          setGalleryIndex(i);
          setGalleryOpen(true);
        }}
      />

      {/* ИНФО О ТОВАРЕ */}
      <ProductInfo
        product={product}
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* МОДАЛЬНАЯ ГАЛЕРЕЯ */}
      {galleryOpen && (
        <GalleryModal
          images={images}
          index={galleryIndex}
          setIndex={setGalleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {/* МОДАЛКА С РАЗМЕРАМИ */}
      {sizeGuideOpen && (
        <SizeGuideModal
          image={product.image_size} // ← вот так передаём
          onClose={() => setSizeGuideOpen(false)}
        />
      )}
    </div>
  );
}
