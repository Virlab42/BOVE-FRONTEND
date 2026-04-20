"use client";
import Inputmask from "inputmask";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "./CheckoutPage.scss";
import CDEKWidget from "../../../components/CDEKWidget/CDEKWidget"; // Временно отключено

export default function CheckoutPage() {
  const { cart, clear } = useCart();
  const router = useRouter();

  const [promoCode, setPromoCode] = useState(null);
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "", // Временно отключено
  });

  // Состояния для доставки (временно не используются, но оставлены для будущего восстановления)
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [moscowDeliveryOption, setMoscowDeliveryOption] =
    useState("withinMkad");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  // Состояние для отслеживания посещенных полей (для показа ошибок валидации)
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phone: false,
    email: false,
    address: false, // Временно отключено
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log(cart);

  // БЛОК РАСЧЕТА ДОСТАВКИ - ВРЕМЕННО ОТКЛЮЧЕН
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
    return 0;
  };

  const deliveryCostForDisplay = calculateDeliveryCostForDisplay();
  const deliveryCostForPayment = calculateDeliveryCostForPayment();

  const discountValue = promoCode ? Math.round((total * discount) / 100) : 0;
  const subtotal = total - discountValue;

  // Итоговая сумма ДЛЯ ОПЛАТЫ (без учета доставки)
  const finalTotal = subtotal + deliveryCostForPayment; // Было с доставкой
  //const finalTotal = subtotal; // Сейчас только товары со скидкой

  // Загрузка промокода из localStorage
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

  /**
   * Валидация отдельного поля
   * @param {string} name - имя поля
   * @param {string} value - значение поля
   * @returns {string} - текст ошибки или пустая строка
   */
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Введите имя";
        if (value.trim().length < 2)
          return "Имя должно содержать минимум 2 символа";
        if (!/^[а-яА-Яa-zA-Z\s-]+$/.test(value.trim()))
          return "Имя может содержать только буквы, пробелы и дефис";
        return "";

      case "phone":
        const cleanedPhone = value.replace(/\D/g, "");
        if (!value.trim()) return "Введите телефон";
        if (cleanedPhone.length === 0) return "Введите телефон";
        if (cleanedPhone.length < 11) return "Телефон должен содержать 11 цифр";
        if (cleanedPhone.length > 11)
          return "Телефон содержит слишком много цифр";
        if (!/^[78]/.test(cleanedPhone))
          return "Телефон должен начинаться с 7 или 8";
        return "";

      case "email":
        if (!value.trim()) return "Введите email";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Введите корректный email";
        if (value.length > 254) return "Email слишком длинный";
        return "";

      // Валидация адреса - временно отключена
      case "address":
        if (!value.trim()) return "Введите адрес";
        if (value.trim().length < 5)
          return "Адрес должен содержать минимум 5 символов";
        return "";

      default:
        return "";
    }
  };

  /**
   * Валидация всей формы
   * @returns {boolean} - true если форма валидна
   */
  const validateForm = () => {
    const newErrors = {};

    const nameError = validateField("name", formData.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validateField("phone", formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.email = emailError;

    // Валидация доставки - временно отключена
    if (deliveryMethod === "cdek") {
      if (!selectedPoint) {
        newErrors.delivery = "Выберите пункт выдачи СДЭК";
      }
    } else if (!formData.address.trim()) {
      newErrors.address = "Введите адрес";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик изменения полей ввода
   * Выполняет валидацию в реальном времени
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Валидация при вводе
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  /**
   * Обработчик потери фокуса поля
   * Помечает поле как посещенное и валидирует
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // Обработчик выбора пункта СДЭК - временно отключен
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

  /**
   * Отправка формы заказа
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Помечаем все поля как посещенные при отправке
    setTouchedFields({
      name: true,
      phone: true,
      email: true,
      // address: true, // Временно отключено
    });

    if (!validateForm()) {
      // Прокручиваем к первому полю с ошибкой
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`input[name="${firstError}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsLoading(true);

    try {
      // БЛОК ФОРМИРОВАНИЯ ОПИСАНИЯ ДОСТАВКИ - ВРЕМЕННО ОТКЛЮЧЕН
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

      // Формируем данные заказа
      const orderData = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim().toLowerCase(),
        },

        // БЛОК ДАННЫХ ДОСТАВКИ - ВРЕМЕННО ОТКЛЮЧЕН
        delivery: {
          method: deliveryMethod,
          point: deliveryMethod === "cdek" ? selectedPoint : null,
          address: formData.address,
          cost: 0, // Доставка бесплатная
          option:
            deliveryMethod === "moscowCourier" ? moscowDeliveryOption : null,
          description: deliveryDescription,
          details: "Доставка бесплатная",
        },

        items: cart,
        subtotal: total,
        discount: {
          code: promoCode,
          percent: discount,
          value: discountValue,
        },
        total: finalTotal,
        date: new Date().toISOString(),
        status: "pending",
      };

      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(orderData),
      // }); // ЭТО РАСКОМЕНТИТЬ ДЛЯ ТЕСТОВ, ЧТОБЫ МИНОВАТЬ ОПЛАТУ А СРАЗУ ПЕРЕЙТИ К ЗАЯВКЕ

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // clear(); // Раскомментировать, когда будет готова очистка корзины
        window.location.href = result.paymentUrl;
      } else {
        alert(
          "Ошибка при оформлении заказа: " +
            (result.error || "Неизвестная ошибка"),
        );
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert(
        "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Очистка телефона от символов форматирования для валидации
  const cleanedPhone = formData.phone.replace(/\D/g, "");

  // Проверка валидности всей формы для активации кнопки
  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[а-яА-Яa-zA-Z\s-]+$/.test(formData.name.trim()) &&
    cleanedPhone.length === 11 &&
    /^[78]/.test(cleanedPhone) &&
    formData.email.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.email.length <= 254 &&
    formData.address.trim().length >= 5 && // Временно отключено
    deliveryMethod.trim().length > 0 && // Временно отключено
    (deliveryMethod !== "cdek" || selectedPoint) && // Временно отключено
    agreed;

  // Если корзина пуста - показываем сообщение
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
            {/* БЛОК КОНТАКТНЫХ ДАННЫХ */}
            <div className="form-section">
              <h2>Контактные данные</h2>

              {/* Поля ввода в две колонки */}
              <div className="form-row">
                {/* Поле Имя */}
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Ваше имя *"
                    className={errors.name && touchedFields.name ? "error" : ""}
                    disabled={isLoading}
                  />
                  {errors.name && touchedFields.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                {/* Поле Телефон */}
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="+7 (___) ___-__-__ *"
                    className={
                      errors.phone && touchedFields.phone ? "error" : ""
                    }
                    disabled={isLoading}
                  />
                  {errors.phone && touchedFields.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* Поле Email */}
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Ваш email *"
                    className={
                      errors.email && touchedFields.email ? "error" : ""
                    }
                    disabled={isLoading}
                  />
                  {errors.email && touchedFields.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                {/* <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Ваш адрес *"
                    className={errors.address && touchedFields.address ? "error" : ""}
                    disabled={isLoading}
                  />
                  {errors.address && touchedFields.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div> */}
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
                                <strong>
                                  Бесплатная доставка осуществляется от 40 000Р,
                                  при заказе на меньшую сумму, стоимость
                                  доставки рассчитывается индивидуально исходя
                                  из адреса
                                </strong>
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
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Введите адрес доставки *"
                          className={errors.address ? "error" : ""}
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

            {/* БЛОК СОГЛАСИЯ */}
            <div className="form-group checkout-agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={isLoading}
                />
                Я согласен с{" "}
                <a
                  href="/docs/policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой конфиденциальности
                </a>{" "}
                и{" "}
                <a
                  href="/docs/return-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  правилами возврата и обмена товаров
                </a>
              </label>
            </div>

            {/* КНОПКА ОТПРАВКИ */}
            <button
              type="submit"
              className="submit-order-btn"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <span className="loading-spinner">Оформление...</span>
              ) : (
                "Оформить заказ"
              )}
            </button>
          </form>
        </div>

        {/* БЛОК СУММАРНОГО ЗАКАЗА */}
        <div className="order-summary">
          <h2>Ваш заказ</h2>

          {/* Список товаров */}
          <div className="order-items">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  {item.size && (
                    <span className="item-size">Размер: {item.size}</span>
                  )}
                  {item.color && (
                    <span className="item-color">Цвет: {item.color}</span>
                  )}
                  <span className="item-quantity">× {item.quantity}</span>
                </div>
                <span className="item-price">
                  {item.price * item.quantity} ₽
                </span>
              </div>
            ))}
          </div>

          {/* Блок итогов */}
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

            {deliveryMethod === "moscowCourier" && (
              <div className="total-row">
                <span>Доставка:</span>
                <span>{deliveryCostForDisplay} ₽</span>
              </div>
            )}

            {deliveryMethod === "cdek" && deliveryCostForDisplay > 0 && (
              <div className="total-row delivery-note">
                <span>Доставка СДЭК:</span>
                <span>{deliveryCostForDisplay} ₽ (оплачивается отдельно)</span>
              </div>
            )}

            <hr />

            <div className="total-row final-total">
              <span>Итого к оплате:</span>
              <span>{finalTotal} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
