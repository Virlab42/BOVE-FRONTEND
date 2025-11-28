"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export default function OffcanvasHeader() {
  const router = useRouter();
  const { data } = useCategories();

  const [isCatOpen, setIsCatOpen] = useState(false);

  const handleLinkClick = async (e, href, anchor = null) => {
  e.preventDefault();

  const { Offcanvas } = await import("bootstrap");
  const offcanvasElement = document.getElementById("offcanvasRight");
  const offcanvasInstance =
    Offcanvas.getInstance(offcanvasElement) || new Offcanvas(offcanvasElement);
  offcanvasInstance.hide();

  if (anchor) {
    const element = document.querySelector(anchor);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  } else {
    // Если ссылка на каталог с фильтром категории — обновляем страницу
    if (href.startsWith("/catalog?cat=")) {
      window.location.href = href;
    } else {
      // Для всех остальных страниц используем router.push
      router.push(href);
    }
  }
};

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="false"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="menu">
            <div className="logo-container">
              <Link
                href={"/"}
                onClick={(e) => handleLinkClick(e, "/")}
                className="name"
              >
                <img src="/BOVE_LOGO.svg" />
              </Link>
            </div>

            {/* ====== КАТАЛОГ ====== */}
            <button
              className={`link-close accordion-btn ${
                isCatOpen ? "open" : ""
              }`}
              onClick={() => setIsCatOpen((prev) => !prev)}
            >
              Каталог&nbsp;&nbsp;
              <span className="arrow">{isCatOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>Chevron-top SVG Icon</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30 20L16 8L2 20"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>Chevron-bottom SVG Icon</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30 12L16 24L2 12"/></svg>}</span>
            </button>

            {/* Подменю категорий */}
            {isCatOpen && (
              <div className="submenu">
                {data?.categories?.map((cat) => (
                  <Link
                    key={cat.id}
                    className="submenu__item"
                    href={`/catalog?cat=${cat.id}`}
                    onClick={(e) =>
                      handleLinkClick(e, `/catalog?cat=${cat.id}`)
                    }
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Остальные ссылки */}
            <Link
              className="link-close"
              href="/about"
              onClick={(e) => handleLinkClick(e, "/about")}
            >
              О бренде
            </Link>

            <Link
              className="link-close"
              href="/contacts"
              onClick={(e) => handleLinkClick(e, "/contacts")}
            >
              Контакты
            </Link>

            <Link
              className="link-close"
              href="/blog"
              onClick={(e) => handleLinkClick(e, "/blog")}
            >
              Блог стилиста
            </Link>

            <Link
              className="link-close"
              href="/info"
              onClick={(e) => handleLinkClick(e, "/info")}
            >
              Информация
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
