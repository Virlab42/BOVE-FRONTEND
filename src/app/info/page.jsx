"use client";
import { useState } from "react";
import "./InfoPage.scss";
import Image from "next/image";

export default function InfoPage() {
  const [openSection, setOpenSection] = useState("contacts");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="info-page">
      <h1 className="info-page__title">Информация</h1>

      <div className="info-page__accordion">
        {/* Контакты */}
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection("contacts")}
          >
            Контакты
            <span
              className={`accordion-icon ${
                openSection === "contacts" ? "open" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`accordion-body ${
              openSection === "contacts" ? "open" : ""
            }`}
          >
            <div className="contacts-item">
              Телефон: <a href="tel:+7 (996) 415-72-30">+7 (996) 415-72-30</a>
            </div>
            <div className="contacts-item">
              Email:{" "}
              <a href="mailto:radostev.alexandr42@yandex.ru">
                radostev.alexandr42@yandex.ru
              </a>
            </div>
            <div className="contacts-item">
              Telegram:{" "}
              <a href="https://t.me/@alsergeevich" target="_blank">
                @alsergeevich
              </a>
            </div>
          </div>
        </div>

        {/* Документы */}
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection("documents")}
          >
            Документы
            <span
              className={`accordion-icon ${
                openSection === "documents" ? "open" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`accordion-body ${
              openSection === "documents" ? "open" : ""
            }`}
          >
            <ul>
              <li>
                <a href="/docs/политика_конфиденциальности.pdf" target="_blank">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/docs/согласие_на_обработку_пдн.pdf" target="_blank">
                  Согласие на обработку ПДН
                </a>
              </li>
              <li>
                <a
                  href="/docs/согласие_на_обработку_пдн_в_целях_рассылки.pdf"
                  target="_blank"
                >
                  Согласие на обработку ПДН в целях рассылки
                </a>
              </li>
              <li>
                <a href="/docs/согласие_на_передачу_пдн.pdf" target="_blank">
                  Согласие на передачу ПДН
                </a>
              </li>
              <li>
                <a
                  href="/docs/согласие_на_получение_рекламы.pdf"
                  target="_blank"
                >
                  Согласие на получение рекламы
                </a>
              </li>
              <li>
                <a href="/docs/публичная_оферта.pdf" target="_blank">
                  Публичная оферта
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Наши магазины */}
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection("stores")}
          >
            Наши магазины
            <span
              className={`accordion-icon ${
                openSection === "stores" ? "open" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`accordion-body ${
              openSection === "stores" ? "open" : ""
            }`}
          >
            <p>Скоро здесь появятся магазины</p>
          </div>
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection("delivery")}
          >
            Доставка
            <span
              className={`accordion-icon ${
                openSection === "delivery" ? "open" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`accordion-body ${
              openSection === "delivery" ? "open" : ""
            }`}
          >
            <p>
              Доставка осуществляется до пункта выдачи в вашем городе. Стоимость
              доставки через службу СДЭК рассчитывается индивидуально. Срок
              доставки 1-6 дней.
            </p>
            <p>
              Доставка по Москве в пределах МКАД 800₽. За пределами МКАД,
              рассчитывается индивидуально.
            </p>
            <p>
              Доставка осуществляется компанией СДЭК. Если коробка пришла в
              непрезентабельном виде (помятая, разорванная), то пожалуйста
              свяжитесь с нами в пункте выдачи.
            </p>
          </div>
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection("return")}
          >
            Возврат
            <span
              className={`accordion-icon ${
                openSection === "return" ? "open" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`accordion-body ${
              openSection === "return" ? "open" : ""
            }`}
          >
            <p>
              Вы можете оформить возврат в течение 7 дней с момента получения
              заказа при условии сохранения его товарного вида: без следов
              эксплуатации, с заводскими бирками, в первоначальной упаковке
              (Федеральный закон о защите прав потребителей, ст.26.1)
            </p>
            <p>
              Обратите внимание: товар бывший в употреблении, не подлежит
              возврату.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
