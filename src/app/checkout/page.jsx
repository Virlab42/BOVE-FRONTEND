"use client";
import Inputmask from "inputmask";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "./CheckoutPage.scss";
import CDEKWidget from "../../../components/CDEKWidget/CDEKWidget";

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const router = useRouter();

  const [promoCode, setPromoCode] = useState(null);
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [moscowDeliveryOption, setMoscowDeliveryOption] =
    useState("withinMkad");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log(cart);

  // Рассчитываем стоимость доставки ДЛЯ ОТОБРАЖЕНИЯ ИНФОРМАЦИИ
  const calculateDeliveryCostForDisplay = () => {
    if (deliveryMethod === "pickup") return 0;
    if (deliveryMethod === "moscowCourier") {
      switch (moscowDeliveryOption) {
        case "withinMkad":
          return 800;
        case "showroom":
          return 1500;
        case "mkad10km":
          return 1200;
        case "mkad1030km":
          return 1500;
        case "mkad3050km":
          return 2500;
        default:
          return 800;
      }
    }
    if (deliveryMethod === "cdek" && selectedPoint) {
      return selectedPoint.price || 300;
    }
    // Для СДЭК без выбранного пункта не показываем стоимость
    if (deliveryMethod === "cdek") return 0;
    return 300;
  };

  // Рассчитываем фактическую стоимость доставки ДЛЯ ОПЛАТЫ
  const calculateDeliveryCostForPayment = () => {
    if (deliveryMethod === "moscowCourier") {
      switch (moscowDeliveryOption) {
        case "withinMkad":
          return 800;
        case "showroom":
          return 1500;
        case "mkad10km":
          return 1200;
        case "mkad1030km":
          return 1500;
        case "mkad3050km":
          return 2500;
        default:
          return 800;
      }
    }
    // Для СДЭК и самовывоза доставка БЕСПЛАТНАЯ в платеже
    return 0;
  };

  const deliveryCostForDisplay = calculateDeliveryCostForDisplay();
  const deliveryCostForPayment = calculateDeliveryCostForPayment();
  const discountValue = promoCode ? Math.round((total * discount) / 100) : 0;
  const subtotal = total - discountValue;

  // Итоговая сумма ДЛЯ ОПЛАТЫ (включаем только московскую доставку)
  const finalTotal = subtotal + deliveryCostForPayment;

  useEffect(() => {
    const savedPromo = localStorage.getItem("cart_promo_code");
    const savedDiscount = localStorage.getItem("cart_promo_discount");

    if (savedPromo && savedDiscount) {
      setPromoCode(savedPromo);
      setDiscount(Number(savedDiscount));
    }
  }, []);

  // Маска для телефона
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

    if (deliveryMethod === "cdek") {
      if (!selectedPoint) {
        newErrors.delivery = "Выберите пункт выдачи СДЭК";
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

  // Обработчик выбора пункта СДЭК
  const handlePointSelect = (point) => {
    setSelectedPoint(point);

    setFormData((prev) => ({
      ...prev,
      address: point.fullAddress,
    }));

    if (errors.delivery) {
      setErrors((prev) => ({
        ...prev,
        delivery: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let deliveryDescription = "";
      if (deliveryMethod === "moscowCourier") {
        switch (moscowDeliveryOption) {
          case "withinMkad":
            deliveryDescription = "Москва (в пределах МКАД)";
            break;
          case "showroom":
            deliveryDescription = "Доставка до шоурума";
            break;
          case "mkad10km":
            deliveryDescription = "Московская область (до 10 км от МКАД)";
            break;
          case "mkad1030km":
            deliveryDescription = "Московская область (10–30 км от МКАД)";
            break;
          case "mkad3050km":
            deliveryDescription = "Московская область (30–50 км от МКАД)";
            break;
          default:
            deliveryDescription = "Курьерская доставка по Москве";
        }
      } else if (deliveryMethod === "cdek") {
        deliveryDescription = "Доставка СДЭК";
      }

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
          cost: deliveryCostForPayment, // Используем стоимость ДЛЯ ОПЛАТЫ
          option:
            deliveryMethod === "moscowCourier" ? moscowDeliveryOption : null,
          description: deliveryDescription,
          details:
            deliveryMethod === "moscowCourier"
              ? `Вариант: ${deliveryDescription}`
              : deliveryMethod === "cdek"
              ? "Пункт выдачи СДЭК (оплачивается отдельно при получении)"
              : "Самовывоз",
        },
        items: cart,
        total: finalTotal,
        date: new Date().toISOString(),
      };

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        clear();
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
                <div className="form-group hidden-field">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder={
                      deliveryMethod === "cdek"
                        ? "Адрес выбранного пункта *"
                        : "Ваш адрес *"
                    }
                    className={errors.address ? "error" : ""}
                    readOnly={deliveryMethod === "cdek"}
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
                <label className="delivery-option">
                  <div className="delivery-info">
                    <input
                      type="radio"
                      name="delivery"
                      value="cdek"
                      checked={deliveryMethod === "cdek"}
                      onChange={(e) => {
                        setDeliveryMethod(e.target.value);
                        setSelectedPoint(null);
                        setFormData((prev) => ({ ...prev, address: "" }));
                      }}
                    />
                    <div className="delivery-info-text">
                      <span className="delivery-title">Доставка СДЭК</span>
                      <span className="delivery-desc">
                        Доставим в ближайший пункт выдачи
                      </span>
                    </div>
                  </div>
                  {deliveryMethod === "cdek" && (
                    <div className="widget-container">
                      <CDEKWidget onPointSelect={handlePointSelect} />

                      {selectedPoint && (
                        <div className="selected-point-info">
                          <div className="selected-point-details">
                            <p>
                              <strong>Адрес:</strong>{" "}
                              {selectedPoint.fullAddress}
                            </p>
                            {selectedPoint.price && (
                              <p>
                                <strong>Стоимость доставки:</strong>{" "}
                                {selectedPoint.price} ₽ (оплачивается отдельно
                                при получении)
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {errors.delivery && (
                        <span className="error-text delivery-error">
                          {errors.delivery}
                        </span>
                      )}
                    </div>
                  )}
                </label>

                <label className="delivery-option">
                  <div className="delivery-info">
                    <input
                      type="radio"
                      name="delivery"
                      value="moscowCourier"
                      checked={deliveryMethod === "moscowCourier"}
                      onChange={(e) => {
                        setDeliveryMethod(e.target.value);
                        setSelectedPoint(null);
                        setFormData((prev) => ({ ...prev, address: "" }));
                        setMoscowDeliveryOption("withinMkad");
                      }}
                    />
                    <div className="delivery-info-text">
                      <span className="delivery-title">
                        Курьерская доставка по Москве
                      </span>
                      <span className="delivery-desc">
                        Выберите вариант доставки:
                      </span>
                    </div>
                  </div>
                  {deliveryMethod === "moscowCourier" && (
                    <div className="moscow-delivery-options">
                      <div className="moscow-option">
                        <label className="moscow-option-label">
                          <input
                            type="radio"
                            name="moscowDeliveryOption"
                            value="withinMkad"
                            checked={moscowDeliveryOption === "withinMkad"}
                            onChange={(e) =>
                              setMoscowDeliveryOption(e.target.value)
                            }
                          />
                          <span>Москва (в пределах МКАД) — 800 руб.</span>
                        </label>
                      </div>

                      <div className="moscow-option">
                        <label className="moscow-option-label">
                          <input
                            type="radio"
                            name="moscowDeliveryOption"
                            value="mkad10km"
                            checked={moscowDeliveryOption === "mkad10km"}
                            onChange={(e) =>
                              setMoscowDeliveryOption(e.target.value)
                            }
                          />
                          <span>
                            Московская область (до 10 км от МКАД) — 1200 руб.
                          </span>
                        </label>
                      </div>

                      <div className="moscow-option">
                        <label className="moscow-option-label">
                          <input
                            type="radio"
                            name="moscowDeliveryOption"
                            value="mkad1030km"
                            checked={moscowDeliveryOption === "mkad1030km"}
                            onChange={(e) =>
                              setMoscowDeliveryOption(e.target.value)
                            }
                          />
                          <span>
                            Московская область (10–30 км от МКАД) — 1500 руб.
                          </span>
                        </label>
                      </div>

                      <div className="moscow-option">
                        <label className="moscow-option-label">
                          <input
                            type="radio"
                            name="moscowDeliveryOption"
                            value="mkad3050km"
                            checked={moscowDeliveryOption === "mkad3050km"}
                            onChange={(e) =>
                              setMoscowDeliveryOption(e.target.value)
                            }
                          />
                          <span>
                            Московская область (30–50 км от МКАД) — 2500 руб.
                          </span>
                        </label>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          value={formData.address}
                          placeholder="Введите адрес доставки *"
                          className={errors.address ? "error" : ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                        />
                        {errors.address && (
                          <span className="error-text">{errors.address}</span>
                        )}
                      </div>
                    </div>
                  )}
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
            {promoCode && (
              <div className="total-row discount">
                <span>Скидка ({discount}%):</span>
                <span>-{discountValue} ₽</span>
              </div>
            )}

            {/* Отображаем стоимость доставки только для курьерской доставки по Москве */}
            {deliveryMethod === "moscowCourier" && (
              <div className="total-row">
                <span>Доставка:</span>
                <span>{deliveryCostForDisplay} ₽</span>
              </div>
            )}

            {/* Для СДЭК показываем информацию, но не включаем в сумму */}
            {deliveryMethod === "cdek" && deliveryCostForDisplay > 0 && (
              <div className="total-row delivery-note">
                <span>Доставка СДЭК:</span>
                <span>{deliveryCostForDisplay} ₽ (оплачивается отдельно)</span>
              </div>
            )}

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
