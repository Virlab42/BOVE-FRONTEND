"use client";
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
  });

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === "pickup" ? 0 : 300;

  const loadCdekPoints = async () => {
    if (deliveryMethod !== "cdek") return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/cdek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: "Москва",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDeliveryPoints(data.points);
      }
    } catch (error) {
      console.error("Ошибка загрузки пунктов выдачи:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCdekPoints();
  }, [deliveryMethod]);

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

    if (deliveryMethod === "cdek" && !selectedPoint) {
      newErrors.delivery = "Выберите пункт выдачи";
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
        customer: formData,
        delivery: {
          method: deliveryMethod,
          point: deliveryMethod === "cdek" ? selectedPoint : null,
          cost: deliveryCost,
        },
        items: cart,
        total: total + deliveryCost,
      };

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
        router.push(`/order-success?orderId=${result.orderId}`);
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
                    placeholder="Введите имя *"
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
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

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Введите почту *"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Способ получения</h2>

              <div className="delivery-methods">
                {/* <label className="delivery-option">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <div className="delivery-info">
                    <span className="delivery-title">Самовывоз</span>
                    <span className="delivery-desc">
                      г. Москва, ул. Примерная, д. 123
                    </span>
                    <span className="delivery-price">Бесплатно</span>
                  </div>
                </label> */}

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
                      Доставка до пункта выдачи
                    </span>
                    <span className="delivery-price">300 ₽</span>
                  </div>
                </label>
              </div>

              {deliveryMethod === "cdek" && (
                <div className="delivery-points">
                  <h3>Выберите пункт выдачи</h3>
                  {isLoading ? (
                    <div className="loading">Загрузка пунктов выдачи...</div>
                  ) : (
                    <div className="points-list">
                      {deliveryPoints.map((point) => (
                        <label key={point.code} className="point-option">
                          <input
                            type="radio"
                            name="deliveryPoint"
                            value={point.code}
                            checked={selectedPoint === point.code}
                            onChange={(e) => setSelectedPoint(e.target.value)}
                          />
                          <div className="point-info">
                            <span className="point-name">{point.name}</span>
                            <span className="point-address">
                              {point.address}
                            </span>
                            <span className="point-price">{point.price} ₽</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                  {errors.delivery && (
                    <span className="error-text">{errors.delivery}</span>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-order-btn"
              disabled={isLoading}
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
              <span>{deliveryCost} ₽</span>
            </div>
            <hr />
            <div className="total-row final-total">
              <span>Итого:</span>
              <span>{total + deliveryCost} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
