"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./OrderSuccess.scss";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (orderId) {
      const mockOrder = {
        id: orderId,
        customer: {
          name: "Иван Иванов",
          email: "ivan@example.com",
          phone: "+7 (999) 999-99-99",
        },
        delivery: {
          method: "cdek",
          address: "г. Москва, ул. Тверская, д. 1",
          cost: 300,
        },
        items: [
          { name: "Товар 1", price: 1500, quantity: 1 },
          { name: "Товар 2", price: 2500, quantity: 2 },
        ],
        total: 6700,
        estimatedDelivery: "2024-01-15",
      };
      setOrderDetails(mockOrder);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="order-success">
        <div className="container">
          <div className="error-message">
            <h1>Заказ не найден</h1>
            <p>Не удалось найти информацию о заказе</p>
            <Link href="/" className="back-to-home">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="container">
        <div className="success-header">
          <h1>Заказ успешно оформлен!</h1>
          <p className="success-message">
            Спасибо за ваш заказ. Мы отправили подтверждение на вашу почту.
          </p>
        </div>

        <div className="order-info">
          <div className="info-section">
            <h2>Информация о заказе</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Номер заказа:</span>
                <span className="value">{orderId}</span>
              </div>
              <div className="info-item">
                <span className="label">Статус:</span>
                <span className="value status-processing">В обработке</span>
              </div>
              <div className="info-item">
                <span className="label">Дата оформления:</span>
                <span className="value">
                  {new Date().toLocaleDateString("ru-RU")}
                </span>
              </div>
              {orderDetails?.estimatedDelivery && (
                <div className="info-item">
                  <span className="label">Примерная дата доставки:</span>
                  <span className="value">
                    {new Date(
                      orderDetails.estimatedDelivery
                    ).toLocaleDateString("ru-RU")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {orderDetails?.customer && (
            <div className="info-section">
              <h2>Данные покупателя</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Имя:</span>
                  <span className="value">{orderDetails.customer.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Телефон:</span>
                  <span className="value">{orderDetails.customer.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{orderDetails.customer.email}</span>
                </div>
              </div>
            </div>
          )}

          {orderDetails?.delivery && (
            <div className="info-section">
              <h2>Способ получения</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Способ:</span>
                  <span className="value">
                    {orderDetails.delivery.method === "pickup"
                      ? "Самовывоз"
                      : "Доставка СДЭК"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Адрес:</span>
                  <span className="value">{orderDetails.delivery.address}</span>
                </div>
                <div className="info-item">
                  <span className="label">Стоимость доставки:</span>
                  <span className="value">{orderDetails.delivery.cost} ₽</span>
                </div>
              </div>
            </div>
          )}

          {orderDetails?.items && (
            <div className="info-section">
              <h2>Состав заказа</h2>
              <div className="order-items">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">× {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      {item.price * item.quantity} ₽
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <div className="total-row">
                  <span>Итого:</span>
                  <span className="total-amount">{orderDetails.total} ₽</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <Link href="/" className="btn btn-primary">
            Продолжить покупки
          </Link>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            Распечатать заказ
          </button>
        </div>

        <div className="additional-info">
          <div className="info-card">
            <h3>Что дальше?</h3>
            <ul>
              <li>
                Мы свяжемся с вами для подтверждения заказа в течение 30 минут
              </li>
              <li>Отслеживание заказа будет доступно после отправки</li>
              <li>
                По всем вопросам обращайтесь по телефону: +7 (999) 999-99-99
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
