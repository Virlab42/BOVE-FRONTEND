"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./OrderSuccess.scss";
import { useCart } from "@/context/CartContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clear } = useCart();

  // Очищаем корзину только один раз при загрузке страницы с номером заказа
  useEffect(() => {
    if (orderId) {
      clear();
    }
  }, [orderId, clear]);

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
            Спасибо за ваш заказ. Мы уже начали его собирать и свяжемся с вами в
            ближайшее время!
          </p>

          <p className="order-number">
            Номер вашего заказа: <strong>{orderId}</strong>
          </p>

          <Link href="/" className="back-to-home">
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}

// Оборачиваем в Suspense для корректной работы Next.js с параметрами URL
export default function OrderSuccess() {
  return (
    <Suspense fallback={<div className="loading-container">Загрузка...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
