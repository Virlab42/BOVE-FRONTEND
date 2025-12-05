"use client";
import Inputmask from "inputmask";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "./CheckoutPage.scss";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const widgetContainerRef = useRef(null);
  const iframeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [showSimpleSelector, setShowSimpleSelector] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Рассчитываем стоимость доставки
  const calculateDeliveryCost = () => {
    if (deliveryMethod === "pickup") return 0;
    if (deliveryMethod === "moscowCourier") return 800;
    if (deliveryMethod === "cdek" && selectedPoint) {
      return selectedPoint.price || 300;
    }
    return 300; // базовая цена СДЭК
  };

  const deliveryCost = calculateDeliveryCost();
  const finalTotal = total + deliveryCost;

  // Маска для телефона
  useEffect(() => {
    const phoneInput = document.querySelector("input[name='phone']");
    if (phoneInput) {
      const im = new Inputmask("+7 (999) 999-99-99");
      im.mask(phoneInput);
    }
  }, []);

  // Тестовые пункты выдачи для простого выбора
  const testPoints = [
    {
      id: "test1",
      name: "Пункт выдачи СДЭК (Центр)",
      address: "Москва, ул. Тверская, д. 1",
      price: 300,
      deliveryPeriod: "3-5 дней",
      description: "Работает с 9:00 до 21:00, есть примерочная",
    },
    {
      id: "test2",
      name: "Пункт выдачи СДЭК (Арбат)",
      address: "Москва, ул. Арбат, д. 15",
      price: 350,
      deliveryPeriod: "2-4 дня",
      description: "Работает с 10:00 до 22:00, принимает наличные",
    },
    {
      id: "test3",
      name: "Пункт выдачи СДЭК (Юг)",
      address: "Москва, ул. Профсоюзная, д. 25",
      price: 320,
      deliveryPeriod: "3-5 дней",
      description: "Работает с 8:00 до 20:00, есть парковка",
    },
  ];

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

    // Для СДЭК адрес берется из выбранного пункта
    if (deliveryMethod === "cdek") {
      if (!selectedPoint) {
        newErrors.delivery = "Выберите пункт выдачи СДЭК";
      } else {
        // Адрес уже установлен из selectedPoint
      }
    } else if (!formData.address.trim()) {
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

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("📨 Message received from iframe:", event.data);

      if (event.data.type === "POINT_SELECTED") {
        const point = event.data.payload;
        console.log("📍 Point selected from iframe:", point);

        // Убедимся, что у нас есть все необходимые поля
        const pointWithDefaults = {
          id: point.id || `point_${Date.now()}`,
          name: point.name || "Пункт выдачи СДЭК",
          address: point.address || "Адрес не указан",
          price: point.price || 300,
          city: point.city || "Москва",
          deliveryPeriod: point.deliveryPeriod || "3-5 дн.",
        };

        console.log("📍 Processed point:", pointWithDefaults);

        setSelectedPoint(pointWithDefaults);

        // Автоматически подставляем адрес в форму
        setFormData((prev) => ({
          ...prev,
          address: `${pointWithDefaults.name}, ${pointWithDefaults.address}`,
        }));
      }
      if (
        event.data.type === "WIDGET_READY" ||
        event.data.type === "IFRAME_LOADED"
      ) {
        console.log("✅ Widget/iframe ready");
        setIframeLoading(false);
      }
      if (event.data.type === "WIDGET_ERROR") {
        console.error("❌ Widget error:", event.data.payload);
        setIframeLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Обработка выбора пункта из простого селектора
  useEffect(() => {
    if (selectedPoint && deliveryMethod === "cdek") {
      console.log("🔄 Updating form with selected point:", selectedPoint);
      // Подставляем адрес в форму
      setFormData((prev) => ({
        ...prev,
        address: `${selectedPoint.name}, ${selectedPoint.address}`,
      }));
    }
  }, [selectedPoint, deliveryMethod]);

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
          point: deliveryMethod === "cdek" ? selectedPoint : null,
          address: formData.address,
          cost: deliveryCost,
        },
        items: cart,
        total: finalTotal,
        date: new Date().toISOString(),
      };

      console.log("📦 Order data to send:", orderData);

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = result.paymentUrl;
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

  const cleanedPhone = formData.phone.replace(/\D/g, "");

  const isFormValid =
    formData.name.trim().length > 0 &&
    cleanedPhone.length === 11 &&
    formData.email.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.address.trim().length > 0 &&
    deliveryMethod.trim().length > 0 &&
    (deliveryMethod !== "cdek" || selectedPoint) &&
    agreed;

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
                    placeholder="+7 (___) ___-__-__ *"
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
                    placeholder={
                      deliveryMethod === "cdek"
                        ? "Адрес выбранного пункта *"
                        : "Ваш адрес *"
                    }
                    className={errors.address ? "error" : ""}
                    readOnly={deliveryMethod === "cdek" && selectedPoint}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                  {deliveryMethod === "cdek" && selectedPoint && (
                    <div className="address-hint">
                      Адрес автоматически заполнен из выбранного пункта
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Способ получения</h2>

              <div className="delivery-methods">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setSelectedPoint(null);
                      // Очищаем адрес при смене метода
                      setFormData((prev) => ({ ...prev, address: "" }));
                    }}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">Самовывоз</span>
                    <span className="delivery-desc">
                      Забрать заказ из нашего магазина
                    </span>
                    <span className="delivery-price">Бесплатно</span>
                  </div>
                </label>

                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="cdek"
                    checked={deliveryMethod === "cdek"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setSelectedPoint(null);
                      setShowSimpleSelector(false);
                      setIframeLoading(true);
                      // Очищаем адрес при переключении на СДЭК
                      setFormData((prev) => ({ ...prev, address: "" }));
                    }}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">Доставка СДЭК</span>
                    <span className="delivery-desc">
                      Доставим в ближайший пункт выдачи
                    </span>
                    <span className="delivery-price">от 300 ₽</span>

                    {deliveryMethod === "cdek" && (
                      <div className="cdek-widget-section">
                        {showSimpleSelector ? (
                          <div
                            key="simple-selector"
                            className="simple-selector"
                          >
                            <h3>Выберите пункт выдачи:</h3>
                            <div className="points-list">
                              {testPoints.map((point) => (
                                <div
                                  key={point.id}
                                  className={`point-item ${
                                    selectedPoint?.id === point.id
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelectedPoint(point);
                                    setFormData((prev) => ({
                                      ...prev,
                                      address: `${point.name}, ${point.address}`,
                                    }));
                                  }}
                                >
                                  <div className="point-header">
                                    <input
                                      type="radio"
                                      name="cdek-point"
                                      checked={selectedPoint?.id === point.id}
                                      onChange={() => {}}
                                    />
                                    <span className="point-name">
                                      {point.name}
                                    </span>
                                    <span className="point-price">
                                      {point.price} ₽
                                    </span>
                                  </div>
                                  <div className="point-details">
                                    <p className="point-address">
                                      {point.address}
                                    </p>
                                    <p className="point-period">
                                      Срок: {point.deliveryPeriod}
                                    </p>
                                    <p className="point-description">
                                      {point.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="widget-fallback-actions">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowSimpleSelector(false);
                                }}
                                className="try-widget-again"
                              >
                                Попробовать загрузить карту снова
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="widget-container">
                            <div
                              ref={widgetContainerRef}
                              className="widget-placeholder"
                              style={{
                                width: "100%",
                                minHeight: "500px",
                                marginTop: "15px",
                                position: "relative",
                                border: "1px solid #d9d9d9",
                                borderRadius: "0px",
                                overflow: "hidden",
                              }}
                            >
                              <iframe
                                ref={iframeRef}
                                src="/api/cdek-widget"
                                style={{
                                  width: "100%",
                                  height: "500px",
                                  border: "none",
                                }}
                                title="CDEK Widget"
                                sandbox="allow-scripts allow-same-origin"
                                onLoad={(e) => {
                                  console.log("🔄 Iframe loaded");
                                  const goods = cart.reduce(
                                    (sum, item) =>
                                      sum +
                                      (item.weight || 0.5) * item.quantity,
                                    0
                                  );

                                  e.target.contentWindow.postMessage(
                                    {
                                      type: "SET_GOODS",
                                      payload: { weight: Math.max(goods, 0.1) },
                                    },
                                    "*"
                                  );
                                }}
                              />
                              {iframeLoading && (
                                <div className="widget-loading-overlay">
                                  <p>Загрузка карты пунктов выдачи...</p>
                                  <button
                                    type="button"
                                    onClick={() => setShowSimpleSelector(true)}
                                    className="loading-fallback-btn"
                                  >
                                    Выбрать из списка
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Информация о выбранном пункте */}
                            {selectedPoint && !showSimpleSelector && (
                              <div className="selected-point-info">
                                <div className="selected-point-header">
                                  <h4>✅ Выбран пункт выдачи</h4>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedPoint(null);
                                      setIframeLoading(true);
                                      // Очищаем адрес
                                      setFormData((prev) => ({
                                        ...prev,
                                        address: "",
                                      }));
                                    }}
                                    className="change-point-btn"
                                  >
                                    Изменить
                                  </button>
                                </div>
                                <div className="selected-point-details">
                                  <p>
                                    <strong>Название:</strong>{" "}
                                    {selectedPoint.name}
                                  </p>
                                  <p>
                                    <strong>Адрес:</strong>{" "}
                                    {selectedPoint.address}
                                  </p>
                                  <p>
                                    <strong>Стоимость доставки:</strong>{" "}
                                    {selectedPoint.price} ₽
                                  </p>
                                  <p>
                                    <strong>Срок доставки:</strong>{" "}
                                    {selectedPoint.deliveryPeriod}
                                  </p>
                                </div>
                              </div>
                            )}

                            {errors.delivery && !showSimpleSelector && (
                              <span className="error-text delivery-error">
                                {errors.delivery}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </label>

                <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="moscowCourier"
                    checked={deliveryMethod === "moscowCourier"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setSelectedPoint(null);
                      // Сбрасываем адрес для курьерской доставки
                      setFormData((prev) => ({ ...prev, address: "" }));
                    }}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">
                      Курьерская доставка по Москве
                    </span>
                    <span className="delivery-desc">
                      — Москва (в пределах МКАД) 800 руб.
                      <br />
                      — Доставка до шоурума 1500 руб.
                      <br />
                      — Московская область (до 10 км от МКАД) 1200 руб.
                      <br />
                      — Московская область (10–30 км от МКАД) 1500 руб.
                      <br />— Московская область (30–50 км от МКАД) 2500 руб.
                    </span>
                    <span className="delivery-price">от 800 ₽</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group checkout-agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                Я согласен с{" "}
                <a
                  href="/docs/политика_конфиденциальности.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой конфиденциальности
                </a>
                *
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
              <span>
                {deliveryMethod === "pickup"
                  ? "Бесплатно"
                  : deliveryMethod === "cdek"
                  ? selectedPoint
                    ? `${selectedPoint.price} ₽`
                    : "от 300 ₽"
                  : "от 800 ₽"}
              </span>
            </div>
            <hr />
            <div className="total-row final-total">
              <span>Итого:</span>
              <span>{finalTotal} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
