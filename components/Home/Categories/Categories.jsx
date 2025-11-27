'use client'
import Image from 'next/image'
import './Categories.scss'
import Link from 'next/link'
import { useCategories } from "@/hooks/useCategories"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function Categories() {
    const { data } = useCategories()
const API_URL = process.env.NEXT_PUBLIC_API_URL;
    return (
        <section className='categories-container'>
            <Swiper
                modules={[Autoplay]}
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
