'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import OffcanvasHeader from '../OffcanvasHeader/OffcanvasHeader';
import './Header.scss'
import { useCart } from "@/context/CartContext";

export default function Header() {
    const { cart } = useCart();

    const pathname = usePathname();
    const openButtonRef = useRef(null);
    const router = useRouter();

    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isFixed, setIsFixed] = useState(true);
    const [isDark, setIsDark] = useState(false);

    const handleOpenOffcanvas = async () => {
        const { Offcanvas } = await import('bootstrap');
        const offcanvasElement = document.getElementById('offcanvasRight');
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
        offcanvasInstance.show();
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > 100) {
                setIsDark(true);
            } else if (currentScrollTop < 100) {
                setIsDark(false);
            }

            if (currentScrollTop > lastScrollTop) {
                // Скроллим вниз
                setScrollDirection("down");
                setIsFixed(false);
            } else if (currentScrollTop < lastScrollTop) {
                // Скроллим вверх
                setScrollDirection("up");
                setIsFixed(true);
            }

            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollTop]);

    const isNonHomePage = pathname !== '/';
    const headerClasses = `all-header animate ${isFixed ? '' : 'translate'} ${isDark || isNonHomePage ? 'dark' : ''}`;

    return (

        <>
            <header className={headerClasses}>
                <button id='btn-menu' className="btn-menu" type="button" onClick={handleOpenOffcanvas}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path></svg>
                </button>
                <div className='menu'>
                    <Link href='/catalog'>Каталог</Link>
                    <Link href=''>О бренде</Link>
                    <Link href=''>Контакты</Link>
                    <Link href=''>Блог стилиста</Link>
                    <Link href=''>Информация</Link>
                </div>
                <Link href='/' className='logo-container'>

                    <div className='name'>
                        <svg width="165" height="50" viewBox="0 0 165 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.2412 45.5785C14.3603 47.4592 3.40897 47.7058 3.40897 47.7058V31.7362C3.40897 28.7989 10.2871 25.9141 12.9948 25.8638C25.614 25.6323 30.0926 39.8358 18.2412 45.5785ZM16.7334 16.4665C16.671 22.3663 6.77918 25.0351 3.40897 28.918V10.7563C8.21763 10.5814 16.8087 9.5527 16.7334 16.4665ZM30.5166 32.1576C28.4339 26.6218 19.7923 23.8726 14.5582 24.0292L19.392 20.9791C20.586 20.2216 21.5804 19.1568 22.1243 17.8542C22.9751 15.8127 22.7685 13.5142 20.7926 11.8357C17.1219 8.72351 11.8865 9.03994 5.03252 9.12167H4.95137L0 9.12761V49.8532L2.20623 49.8906C7.18405 50.1162 14.9708 50.2568 21.4181 47.5012C28.0213 44.689 33.3866 39.7856 30.5166 32.1576Z" fill="white" />
                            <path d="M70.1453 20.4072C68.5044 18.1749 66.6173 16.3795 64.4836 15.0202C62.3498 13.6609 60.1404 12.8486 57.8548 12.5829C54.5339 12.1971 51.6278 13.0427 49.1375 15.1198C46.6842 17.3096 45.2521 20.178 44.8409 23.7253C44.7665 24.3673 44.731 25.0317 44.7346 25.7184C44.7547 30.2912 46.1827 34.5764 49.0185 38.5735C50.6594 40.8058 52.5469 42.6016 54.6802 43.9605C56.814 45.3198 59.0234 46.1321 61.309 46.3978C64.6468 46.7859 67.5615 45.9321 70.0541 43.8372C71.2778 42.7692 72.2457 41.4953 72.9588 40.0155C73.6719 38.5356 74.1287 36.9311 74.3293 35.202C74.6042 32.8308 74.3913 30.3538 73.691 27.7703C72.9907 25.1869 71.8085 22.7322 70.1453 20.4072ZM46.2328 15.017C48.0314 13.0856 50.0772 11.6039 52.3687 10.5725C54.6606 9.54102 57.0693 9.02551 59.5951 9.02551C62.1032 9.02551 64.5032 9.54102 66.7951 10.5725C69.0871 11.6039 71.1324 13.0856 72.9314 15.017C74.7128 16.9676 76.0792 19.1853 77.0307 21.6702C77.9822 24.155 78.4577 26.7571 78.4577 29.4762C78.4577 32.2144 77.9822 34.8257 77.0307 37.3106C76.0792 39.7954 74.7128 42.0131 72.9314 43.9637C71.1324 45.8951 69.0871 47.3768 66.7951 48.4082C64.5032 49.4397 62.1032 49.9552 59.5951 49.9552C57.0693 49.9552 54.6606 49.4397 52.3687 48.4082C50.0772 47.3768 48.0314 45.8951 46.2328 43.9637C44.451 42.0131 43.0846 39.7954 42.1331 37.3106C41.1816 34.8257 40.7061 32.2144 40.7061 29.4762C40.7061 26.7571 41.1816 24.155 42.1331 21.6702C43.0846 19.1853 44.451 16.9676 46.2328 15.017Z" fill="white" />
                            <path d="M125.375 9.25349L106.506 49.9553H105.851L87.0566 9.25349H93.5399L107.667 40.8694L122.327 9.25349H125.375Z" fill="white" />
                            <path d="M135.57 9.1032H165V11.0775L141.129 10.9264V27.085L161.083 27.2357V28.7411L141.129 28.5905V48.1321L165 48.2827V49.9553H135.57V9.1032Z" fill="white" />
                            <path d="M151.704 1.13603C151.704 1.7634 151.196 2.27205 150.57 2.27205C149.943 2.27205 149.435 1.7634 149.435 1.13603C149.435 0.508657 149.943 4.05312e-06 150.57 4.05312e-06C151.196 4.05312e-06 151.704 0.508657 151.704 1.13603Z" fill="white" />
                        </svg>

                    </div>
                </Link>
                <div className='menu'>
                    <Link className='header-profile' href=''>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_638_31)">
                                <path d="M19.2636 2.89688C16.4636 2.23334 14.0032 3.86771 13.0584 5.01146L12.4939 5.69584L11.9303 5.01146C10.9886 3.8698 8.48865 2.24167 5.72719 2.89688C4.32302 3.22917 3.19177 3.97084 2.45219 5.05C1.7126 6.12813 1.3251 7.60521 1.52094 9.48021C1.68031 11.0281 2.45115 12.5885 3.49281 14.0427C4.52719 15.4917 5.78865 16.7781 6.85427 17.7719C8.80948 19.5948 10.4834 20.7479 12.4959 22.0031C14.5209 20.7448 16.2314 19.6125 18.1626 17.7771C20.5293 15.525 23.073 12.626 23.4709 9.46459C23.8876 6.15417 22.0293 3.55105 19.2626 2.89584L19.2636 2.89688ZM12.4939 3.4625C13.9084 2.14584 16.5564 0.722921 19.598 1.4448C23.1397 2.28334 25.4366 5.62917 24.9314 9.65313C24.4584 13.4021 21.5189 16.6271 19.1689 18.8646C17.0022 20.925 15.0886 22.1479 12.8772 23.5146L12.4939 23.75L12.1126 23.5146C9.88969 22.1396 8.03761 20.9031 5.85948 18.8688C4.7626 17.8448 3.41885 16.4823 2.30115 14.9198C1.18969 13.3646 0.256354 11.5521 0.0584376 9.63855C-0.166562 7.46667 0.270938 5.61875 1.24385 4.19792C2.21677 2.77709 3.68031 1.84896 5.39281 1.44375C8.39802 0.731255 11.0699 2.14584 12.4939 3.4625Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_638_31">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Избранное</span>
                    </Link>
                    <Link className='header-profile' href='/cart'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_638_28)">
                                <path d="M12.5 0.15625C9.39062 0.15625 6.85833 2.53125 6.85833 5.44479V5.59479L6.70729 5.63229H3.58646L0 24.8427H25L21.4135 5.64583H18.1542V5.45833C18.1542 2.53125 15.6229 0.15625 12.5 0.15625ZM8.04896 5.48333C8.04896 3.18125 10.0427 1.34375 12.5 1.34375C14.9573 1.34375 16.951 3.18333 16.951 5.45833V5.60833L16.8 5.64583H8.05V5.49583L8.04896 5.48333ZM20.424 6.82083L23.5708 23.6458H1.42917L4.57604 6.83333H6.85833V9.69375H8.04896V6.83333H16.9635V9.69479H18.1542V6.83333H20.4354L20.424 6.82083Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_638_28">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {cart.length > 0 && <div className="badge">{cart.length}</div>}
                        <span>Корзина</span>
                    </Link>
                </div>
            </header>
            <OffcanvasHeader />
        </>
    )
}