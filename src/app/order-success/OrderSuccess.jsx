"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./OrderSuccess.scss";
import { useCart } from "@/context/CartContext";

// 1. Выносим основную логику во внутренний компонент
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderDataParam = searchParams.get("data");

  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("loading"); // Статус проверки

  const { clear } = useCart();

  useEffect(() => {
    // Парсим локальные данные, если они есть
    if (orderDataParam) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(orderDataParam));
        setOrderDetails(parsedOrder);
      } catch (e) {
        console.error("Не удалось распарсить заказ:", e);
      }
    }

    // Запускаем верификацию платежа и отправку в ВК
    if (orderId) {
      const verifyPayment = async () => {
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });

          const data = await res.json();

          if (data.success) {
            setPaymentStatus("success");
            // ОЧИЩАЕМ КОРЗИНУ ТОЛЬКО КОГДА ОПЛАТА ПРОШЛА УСПЕШНО
            clear();
          } else {
            console.error("Оплата не подтверждена:", data.message);
            setPaymentStatus("pending");
          }
        } catch (err) {
          console.error("Ошибка проверки:", err);
          setPaymentStatus("error");
        }
      };

      verifyPayment();
    }
  }, [orderId, orderDataParam, clear]); // Зависимости useEffect

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

          {/* Показываем статус проверки для пользователя */}
          {paymentStatus === "loading" && (
            <p className="status-message">Проверяем статус платежа...</p>
          )}

          {paymentStatus === "pending" && (
            <p className="status-message pending">
              Платеж еще обрабатывается банком. Это может занять несколько
              минут.
            </p>
          )}

          {paymentStatus === "success" && (
            <p className="success-message">
              Спасибо за ваш заказ. Оплата получена, мы уже начали его собирать
              и свяжемся с вами в ближайшее время!
            </p>
          )}

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

// 2. Оборачиваем в Suspense для корректной работы Next.js
export default function OrderSuccess() {
  return (
    <Suspense fallback={<div className="loading-container">Загрузка...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
