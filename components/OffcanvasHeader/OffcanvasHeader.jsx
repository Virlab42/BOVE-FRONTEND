'use client'
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';

export default function OffcanvasHeader(){
    const handleLinkClick = async (e, target) => {
        e.preventDefault();

        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        const { Offcanvas } = await import('bootstrap');
        const offcanvasElement = document.getElementById('offcanvasRight');
        const offcanvasInstance = Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
        offcanvasInstance.hide();
    };
    return(
        <>
            <div className="offcanvas offcanvas-end" data-bs-scroll="false" data-bs-backdrop="false" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='menu'>
                        <div className='logo-container'>
                            <div className='name'>
                                {/* <Logo width={196} height={196} /> */}
                                <img src='/voxlogo3.png' />
                            </div>
                        </div>
                        <Link className='link-close' href='#services' onClick={(e) => handleLinkClick(e, '#services')}>Направления</Link>
                        <Link className='link-close' href='#record'  onClick={(e) => handleLinkClick(e, '#record')}>Звукозапись</Link>
                        <Link className='link-close' href='#contacts'  onClick={(e) => handleLinkClick(e, '#contacts')}>Контакты</Link>
                        <Link className='link-close' href='#team'  onClick={(e) => handleLinkClick(e, '#team')}>Команда</Link>
                        <Link className='link-close' href='#reviews'  onClick={(e) => handleLinkClick(e, '#reviews')}>Наши ученики</Link>
                        <Link className='link-close' href='#certificates'  onClick={(e) => handleLinkClick(e, '#certificates')}>Сертификаты</Link>
                        <div className='footer-contacts'>
                        <div className='links'>
                            <a href="https://vk.com/voxkemerovo">
                                <svg width="50" height="35" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_320_227)">
                                    <path d="M33.873 0C48.5654 5.32311e-10 55.9516 0.000514721 60.4756 4.56348C64.9995 9.12646 65 16.4735 65 31.127V33.873C65 48.5292 65.0385 55.8735 60.4756 60.4365C55.9126 64.9995 48.5654 65 33.873 65H31.166C16.4709 65 9.12549 64.9995 4.5625 60.4365C2.62781e-05 55.8735 2.68118e-10 48.5287 0 33.873V31.127C1.37822e-10 16.4688 1.66608e-05 9.1265 4.5625 4.56348C9.12549 0.000495679 16.4709 1.8621e-10 31.166 0H33.873ZM10.9844 19.7988C11.3302 36.6961 20.2248 46.8651 34.8809 46.8652H35.7314V37.1982C41.0666 37.7391 45.0498 41.7224 46.6748 46.8652H54.3682C52.2805 39.172 46.8672 34.918 43.5029 33.293C46.8672 31.2831 51.6225 26.4106 52.7432 19.7988H45.7461C44.2747 25.1729 39.9068 30.0449 35.7314 30.5078V19.7988H28.6152V38.5527C24.2862 37.479 18.6387 32.2112 18.4072 19.7988H10.9844Z" fill="currentColor"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_320_227">
                                    <rect width="65" height="65" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="https://t.me/voxmusickemerovo">
                                <svg width="50" height="35" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_320_225)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5ZM33.6647 23.9929C30.5035 25.3077 24.1858 28.0291 14.7114 32.1569C13.1729 32.7687 12.3669 33.3672 12.2936 33.9525C12.1696 34.9416 13.4082 35.331 15.0948 35.8614C15.3242 35.9335 15.562 36.0083 15.8057 36.0875C17.4651 36.6269 19.6972 37.2579 20.8577 37.283C21.9103 37.3057 23.0851 36.8718 24.3822 35.9811C33.2344 30.0056 37.8039 26.9853 38.0908 26.9202C38.2932 26.8743 38.5737 26.8165 38.7637 26.9854C38.9538 27.1543 38.9351 27.4742 38.915 27.56C38.7923 28.0831 33.9303 32.6032 31.4143 34.9423C30.6299 35.6715 30.0735 36.1888 29.9598 36.3069C29.705 36.5716 29.4453 36.8219 29.1958 37.0625C27.6542 38.5486 26.4981 39.6631 29.2598 41.483C30.5869 42.3575 31.6489 43.0808 32.7084 43.8023C33.8655 44.5902 35.0195 45.3761 36.5127 46.3549C36.8931 46.6043 37.2565 46.8633 37.6103 47.1156C38.9569 48.0756 40.1666 48.938 41.6612 48.8005C42.5296 48.7205 43.4267 47.9039 43.8822 45.4685C44.9589 39.7127 47.0752 27.2416 47.5643 22.1026C47.6072 21.6524 47.5533 21.0762 47.51 20.8232C47.4667 20.5703 47.3762 20.2099 47.0474 19.9431C46.6581 19.6271 46.0569 19.5605 45.7881 19.5652C44.5657 19.5868 42.6902 20.2389 33.6647 23.9929Z" fill="currentColor"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_320_225">
                                    <rect width="65" height="65" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                        <div className='contacts-container'>
                            <div className='tel'>
                            <a href='tel:+7 905 916-92-86'>+7 905 916-92-86</a></div>
                        </div>
                        <a href='mailto:voxmusickemerovo@gmail.com'>voxmusickemerovo@gmail.com</a>
                        <button className="link-more"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><span>Оставить заявку</span>
                            </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}