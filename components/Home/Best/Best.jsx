import Image from 'next/image'
import './Best.scss'
import Link from 'next/link'

export default function Best() {

    const bestSellers = [
        {
            id: 1,
            img: "image1.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        },
        {
            id: 2,
            img: "image2.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        },
        {
            id: 3,
            img: "image3.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        },
        {
            id: 4,
            img: "image5.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        },
        {
            id: 5,
            img: "image6.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        },
        {
            id: 6,
            img: "image4.jpg",
            name: "Жилетка черная One Size",
            price: "20 000 ₽",
        }
    ];

    return (
        <>
            <section className='best-container'>
                <h2>Best Sellers</h2>
                <div className='best-card-container'>
                    {bestSellers.map((item) => (
                    <Link href='' className='best-card' key={item.id}>
                        <Image src={`/Home/Best/${item.img}`} width={1000} height={1000} alt='Хит продаж BOVE' />
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_668_10)">
                                <path d="M15.411 2.31742C13.171 1.78658 11.2027 3.09408 10.4468 4.00908L9.99518 4.55659L9.54435 4.00908C8.79101 3.09575 6.79101 1.79325 4.58185 2.31742C3.45851 2.58325 2.55351 3.17658 1.96185 4.03992C1.37018 4.90242 1.06018 6.08408 1.21685 7.58408C1.34435 8.82242 1.96101 10.0708 2.79435 11.2341C3.62185 12.3933 4.63101 13.4224 5.48351 14.2174C7.04768 15.6758 8.38685 16.5983 9.99685 17.6024C11.6168 16.5958 12.9852 15.6899 14.5302 14.2216C16.4235 12.4199 18.4585 10.1008 18.7768 7.57159C19.1102 4.92325 17.6235 2.84075 15.4102 2.31658L15.411 2.31742ZM9.99518 2.76992C11.1268 1.71658 13.2452 0.578251 15.6785 1.15575C18.5118 1.82658 20.3493 4.50325 19.9452 7.72242C19.5668 10.7216 17.2152 13.3016 15.3352 15.0916C13.6018 16.7399 12.071 17.7183 10.3018 18.8116L9.99518 18.9999L9.69018 18.8116C7.91185 17.7116 6.43018 16.7224 4.68768 15.0949C3.81018 14.2758 2.73518 13.1858 1.84101 11.9358C0.951848 10.6916 0.205181 9.24159 0.0468477 7.71075C-0.133152 5.97325 0.216848 4.49492 0.995181 3.35825C1.77351 2.22159 2.94435 1.47908 4.31435 1.15492C6.71851 0.584918 8.85601 1.71658 9.99518 2.76992Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_668_10">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div className='card-info'>
                            <p>{item.name}</p>
                            <span>{item.price}</span>
                        </div>
                    </Link>
                    ))}
                </div>
            </section>
        </>
    )
}