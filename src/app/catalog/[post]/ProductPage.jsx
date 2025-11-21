"use client";
import "./product.scss";

import { useState } from "react";

import Gallery from "./components/Gallery";
import GalleryModal from "./components/GalleryModal";
import SizeGuideModal from "./components/SizeGuideModal";
import ProductInfo from "./components/ProductInfo";

export default function ProductPage({ product }) {
  const { id, title, price, description, images } = product;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // временные фото
  //const images = ['/img/p1.jpg','/img/p2.jpg','/img/p3.jpg','/img/p4.jpg'];

  return (
    <div className="product-page">
      <Gallery
        images={images}
        onOpen={(i) => {
          setGalleryIndex(i);
          setGalleryOpen(true);
        }}
      />

      <ProductInfo
        product={product}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {galleryOpen && (
        <GalleryModal
          images={images}
          index={galleryIndex}
          setIndex={setGalleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
    </div>
  );
}
