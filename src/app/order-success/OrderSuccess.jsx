"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./OrderSuccess.scss";
import { useCart } from '@/context/CartContext';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderDataParam = searchParams.get("data");
  const [orderDetails, setOrderDetails] = useState(null);

  const { clear } = useCart();

  useEffect(() => {
    if (orderDataParam) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(orderDataParam));
        setOrderDetails(parsedOrder);
      } catch (e) {
        console.error("Не удалось распарсить заказ:", e);
      }
    }
  }, [orderDataParam]);

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
  clear();
  return (
    <div className="order-success">
      <div className="container">
        <div className="success-header">
          <h1>Заказ успешно оформлен!</h1>
          <p className="success-message">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
        </div>

        
      </div>
    </div>
  );
}
