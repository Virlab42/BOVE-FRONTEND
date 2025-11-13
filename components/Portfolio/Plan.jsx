'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Plan.scss'

export default function Plan({ photos, length, alt }) {
    return (
        <>
        <h4>План проекта</h4>
        <Swiper
              slidesPerView={1}
              spaceBetween={0}
              zoom={true}
              navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
              }}
              centeredSlides={true}
              pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                  },
              }}
              
              modules={[Navigation, Pagination, Zoom]}
              className="plan-swiper"
          >
            {Array.from({ length: length }, (_, index) => (
                                <SwiperSlide key={index} className="plan-item">
                                    <div className="swiper-zoom-container">
                                        <Image src={`/Portfolio/${photos}/План${index+1}.webp`} alt={`Проект дома ${alt}`} width={1300} height={1300}/>
                                    </div>
                                </SwiperSlide>
                            ))}
              
              <div className="swiper-pagination"></div>
            <button className="swiper-button-prev"></button>
            <button className="swiper-button-next"></button>
          </Swiper>
        </>
    );
  }