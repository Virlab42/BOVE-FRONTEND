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

    return (
        <section className='categories-container'>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                className='categories-card-container'
            >
                {data?.categories?.map(c => (
                    <SwiperSlide key={c.id}>
                        <Link href={`/catalog?cat=${c.id}`} className='categories-card'>
                            <Image
                                src={`http://5.129.246.215:8000/${c.category_image}`}
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
