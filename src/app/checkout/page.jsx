"use client";
import Inputmask from "inputmask";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "./CheckoutPage.scss";

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost =
    deliveryMethod === "pickup"
      ? 0
      : deliveryMethod === "cdek"
        ? 300
        : deliveryMethod === "moscowCourier"
          ? 800 // базовая цена, при желании можно уточнять
          : 0;


  useEffect(() => {
    const phoneInput = document.querySelector("input[name='phone']");
    if (phoneInput) {
      const im = new Inputmask("+7 (999) 999-99-99");
      im.mask(phoneInput);
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Введите адрес";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите телефон";
    } else if (
      !/^[\+]?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Введите корректный телефон";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        delivery: {
          method: deliveryMethod,
          point: deliveryMethod,
          address: formData.address,
          cost: deliveryCost,
        },
        items: cart,
        total: total,
        date: new Date().toISOString(),
      };
      console.log(orderData);
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        clear();
        const encodedOrder = encodeURIComponent(JSON.stringify(orderData));
        router.push(`/order-success?orderId=${result.orderId}&data=${encodedOrder}`);
      } else {
        alert("Ошибка при оформлении заказа");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при оформлении заказа");
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h1>Корзина пуста</h1>
          <p>Добавьте товары в корзину для оформления заказа</p>
          <button onClick={() => router.push("/")} className="back-to-shop">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  const cleanedPhone = formData.phone.replace(/\D/g, ""); // Очищаем номер

  const isFormValid =
  formData.name.trim().length > 0 &&
  cleanedPhone.length === 11 &&
  formData.email.trim().length > 0 &&
  /^\S+@\S+\.\S+$/.test(formData.email) &&
  formData.address.trim().length > 0 &&
  deliveryMethod.trim().length > 0 &&
  agreed;;
  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Контактные данные</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя *"
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-row">

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ваш email *"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Ваш адрес *"
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Способ получения</h2>

              <div className="delivery-methods">

                {/* Доставка СДЭК — без списка пунктов */}
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="cdek"
                    checked={deliveryMethod === "cdek"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">Доставка СДЭК</span>
                    <span className="delivery-desc">
                      Доставим в ближайший к вам пункт выдачи. Доставка оплачивается отдельно при получении.
                    </span>
                    <span className="delivery-price">от 300 ₽</span>
                  </div>
                </label>

                {/* Курьерская доставка по Москве */}
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="moscowCourier"
                    checked={deliveryMethod === "moscowCourier"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">Курьерская доставка по Москве</span>
                    <span className="delivery-desc">
                      — Москва (в пределах МКАД) 800 руб.<br />
                      — Доставка до шоурума 1500 руб.<br />
                      — Московская область (до 10 км от МКАД) 1200 руб.<br />
                      — Московская область (10–30 км от МКАД) 1500 руб.<br />
                      — Московская область (30–50 км от МКАД) 2500 руб.
                    </span>
                  </div>
                </label>

              </div>



            </div>
<div className="form-group checkout-agreement">
  <label>
    <span>
    <input
      type="checkbox"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
    />
      Я согласен с{" "}
      <a href="/docs/политика_конфиденциальности.pdf" target="_blank" rel="noopener noreferrer">
        политикой конфиденциальности
      </a>
      *
    </span>
  </label>
</div>
            <button
              type="submit"
              className="submit-order-btn"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Оформление..." : "Оформить заказ"}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Ваш заказ</h2>

          <div className="order-items">
            {cart.map((item, index) => (
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

          <div className="order-totals">
            <div className="total-row">
              <span>Товары:</span>
              <span>{total} ₽</span>
            </div>
            <div className="total-row">
              <span>Доставка:</span>
              <span>от {deliveryCost} ₽</span>
            </div>
            <hr />
            <div className="total-row final-total">
              <span>Итого:</span>
              <span>{total} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
