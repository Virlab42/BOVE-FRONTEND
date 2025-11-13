import Image from 'next/image'
import './Categories.scss'
import Link from 'next/link'

export default function Categories() {
    return (
        <>
            <section className='categories-container'>
                <div className='categories-card-container'>
                    <Link href='' className='categories-card'>
                        <Image src='/Home/Categories/Жилетки.jpg' width={1000} height={800} alt='Костюмы' />
                        <p>Жилетки</p>
                    </Link>
                    <Link href='' className='categories-card'>
                        <Image src='/Home/Categories/Костюмы.jpg' width={1000} height={800} alt='Жилетки' />
                        <p>Костюмы</p>
                    </Link>
                    <Link href='' className='categories-card'>
                        <Image src='/Home/Categories/Рубашки.jpg' width={1000} height={800} alt='Рубашки' />
                        <p>Рубашки</p>
                    </Link>
                    <Link href='' className='categories-card'>
                        <Image src='/Home/Categories/Верхняя.jpg' width={1000} height={800} alt='Верхняя одежда' />
                        <p>Верхняя одежда</p>
                    </Link>
                </div>
            </section>
        </>
    )
}