"use client";
import { useState, useEffect } from "react";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Image from "next/image";

export default function Gallery({ images }) {

  const [isMobile, setIsMobile] = useState(false);

  // Отслеживаем размер экрана
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  if (!images?.length) return null;

  return (
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      selector="a"               // 🟢 главное исправление!
      thumbWidth={80}
      zoomFromOrigin={true}
      backdropDuration={300}
      mode="lg-fade"
      closable={true}
      elementClassNames="product-page__gallery"
    >
      {isMobile ? (
      <div className="product-swiper-container">
      <Swiper 
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
        pagination={{ type: "fraction", el: '.swiper-pagination' }}
        className="product-swiper"
      >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <a href={src} className="lg-item" data-src={src}>
              <Image width={2000} height={2000} src={src} alt={`${i + 1}/${images.length}`} />
            </a>
            </SwiperSlide>
          ))}
        <div className="gallery-controls">
        <button  className="swiper-btn-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Thin-big-left SVG Icon</title><path fill="currentColor" d="M6.5 5.5L0 12l6.5 6.5l.707-.707L1.914 12.5H24v-1H1.914l5.293-5.293L6.5 5.5Z"/></svg>
        </button>
        <div  className="swiper-pagination"></div>
        <button  className="swiper-btn-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Thin-big-right SVG Icon</title><path fill="currentColor" d="M17.5 18.5L24 12l-6.5-6.5l-.707.707l5.293 5.293H0v1h22.086l-5.293 5.293l.707.707Z"/></svg>
        </button>
      </div>
        </Swiper>
      </div>
      ) : (
        <div className="gallary-pc">
      {/* Главное изображение */}
      <a href={images[0]} data-src={images[0]}>
        <div className="gallery__main">
          <Image width={2000} height={2000} src={images[0]} alt={`1/${images.length}`} />
        </div>
      </a>

      {/* Остальные изображения */}
      <div className="gallery__grid">
        {images.slice(1).map((src, i) => (
          <a href={src} data-src={src} key={i}>
            <Image width={2000} height={2000} src={src} alt={`${i + 2}/${images.length}`} />
          </a>
        ))}
      </div>
      </div>
    )}
    </LightGallery>
  );
}
