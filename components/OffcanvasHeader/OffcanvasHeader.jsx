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
                                <img src='/BOVE_LOGO.svg' />
                            </div>
                        </div>
                        <Link className='link-close' href='/catalog' onClick={(e) => handleLinkClick(e, '/catalog')}>Каталог</Link>
                        <Link className='link-close' href=''  onClick={(e) => handleLinkClick(e, '')}>О бренде</Link>
                        <Link className='link-close' href=''  onClick={(e) => handleLinkClick(e, '')}>Контакты</Link>
                        <Link className='link-close' href=''  onClick={(e) => handleLinkClick(e, '')}>Блог стилиста</Link>
                        <Link className='link-close' href=''  onClick={(e) => handleLinkClick(e, '')}>Информация</Link>
                    </div>
                </div>
            </div>
        </>
    )
}