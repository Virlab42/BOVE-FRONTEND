'use client'
import Image from 'next/image'
import './Categories.scss'
import Link from 'next/link'
import { useCategories } from "@/hooks/useCategories"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'

export default function Categories() {
    const { data } = useCategories()
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    return (
        <section className='categories-container'>
            <div className="categories-controls">
                <button className="swiper-btn-prev-cat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Thin-big-left SVG Icon</title><path fill="currentColor" d="M6.5 5.5L0 12l6.5 6.5l.707-.707L1.914 12.5H24v-1H1.914l5.293-5.293L6.5 5.5Z" /></svg>
                </button>
                <button className="swiper-btn-next-cat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Thin-big-right SVG Icon</title><path fill="currentColor" d="M17.5 18.5L24 12l-6.5-6.5l-.707.707l5.293 5.293H0v1h22.086l-5.293 5.293l.707.707Z" /></svg>
                </button>
            </div>
            <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{ prevEl: '.swiper-btn-prev-cat', nextEl: '.swiper-btn-next-cat' }}
                breakpoints={{
                    360: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className='categories-card-container'
            >
                {data?.categories?.map(c => (
                    <SwiperSlide key={c.id}>
                        <Link href={`/catalog?cat=${c.id}`} className='categories-card'>
                            <Image
                                src={`${API_URL}/${c.category_image}`}
                                width={1000}
                                height={1000}
                                alt={c.name}
                            />
                            <p>{c.name}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
