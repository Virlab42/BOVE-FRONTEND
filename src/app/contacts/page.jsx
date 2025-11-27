
import "./contacts.scss";
import Image from "next/image";

export default function ContactsPage() {
  return (
    <div className="contacts-page">
      <h1 className="contacts-page__title">Контакты</h1>

      <div className="contacts-page__content">
        {/* Контактные данные */}
        <div className="contacts-page__info">
          <div className="contacts-page__item">
            <span className="contacts-page__label">Телефон: </span>
            <a href="tel:+7 (996) 415-72-30" className="contacts-page__link">
              +7 (996) 415-72-30
            </a>
          </div>

          <div className="contacts-page__item">
            <span className="contacts-page__label">Email: </span>
            <a href="mailto:radostev.alexandr42@yandex.ru" className="contacts-page__link">
              radostev.alexandr42@yandex.ru
            </a>
          </div>

          <div className="contacts-page__item">
            <span className="contacts-page__label">Telegram: </span>
            <a href="https://t.me/alsergeevich" target="_blank" className="contacts-page__link">
              @alsergeevich
            </a>
          </div>
        </div>

        {/* Заглушка магазинов */}
        <div className="contacts-page__stores">
          <h2 className="contacts-page__stores-title">Наши магазины</h2>
          <p className="contacts-page__stores-text">
            Скоро здесь появятся магазины
          </p>
        </div>
      </div>
    </div>
  );
}
