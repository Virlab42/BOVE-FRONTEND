'use client'
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ServicesPage() {
    return (
      <>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={0}
              freeMode={false}
              pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                  },
              }}
              
              modules={[FreeMode, Pagination]}
              className="services-page"
          >
              <SwiperSlide>
                <div className="services-card">
                    <p>Архитектурное проектировние</p>
                    <span>Дает понимание «Каким дом будет» и включает в себя разработку концепции, создание планировок, 3D визуализации и т.д.</span>
                    <Link href='/services/arhcitect'>Подробнее</Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="services-card">
                    <p>Дизайн<br></br>интерьера</p>
                    <span>Разработка чертежей внутреннего дизайна с подробными схемами, планами, развертками помещений и 3D визуализацией.</span>
                    <Link href='/services/interior'>Подробнее</Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="services-card">
                    <p>Авторское<br></br>сопровождение</p>
                    <span>Контроль реализации архитектурного замысла автора с эстетической точки зрения.</span>
                    <Link href='/services/author'>Подробнее</Link>
                </div>
              </SwiperSlide>
              <div className="swiper-pagination"></div>
          </Swiper>
      </>
    );
  }