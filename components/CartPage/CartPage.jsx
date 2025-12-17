"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import "./CartPage.scss";
import CartItem from "./CartItem";

export default function CartPage() {
  const { cart } = useCart();

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  // === Загрузка сохранённого промокода ===
  useEffect(() => {
    const savedPromo = localStorage.getItem("cart_promo_code");
    const savedDiscount = localStorage.getItem("cart_promo_discount");

    if (savedPromo && savedDiscount) {
      setPromo(savedPromo);
      setDiscount(Number(savedDiscount));
      setPromoApplied(true);
      setPromoMessage("Промокод применён");
    }
  }, []);

  // === Суммы ===
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountValue = promoApplied
    ? Math.round((total * discount) / 100)
    : 0;

  const totalWithDiscount = total - discountValue;

  // === Применение промокода ===
  const applyPromo = async () => {
    if (!promo) return;

    try {
      const res = await fetch(
        `http://89.169.47.16:8000/promocode?promo_code=${promo}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Ошибка промокода");
      }

      const discountValue = Number(data.discount);

      setDiscount(discountValue);
      setPromoApplied(true);
      setPromoMessage("Промокод применён");

      localStorage.setItem("cart_promo_code", promo);
      localStorage.setItem(
        "cart_promo_discount",
        discountValue.toString()
      );
    } catch (err) {
      setPromoMessage(err.message);
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  // === Отмена промокода ===
  const cancelPromo = () => {
    setPromo("");
    setDiscount(0);
    setPromoApplied(false);
    setPromoMessage("");

    localStorage.removeItem("cart_promo_code");
    localStorage.removeItem("cart_promo_discount");
  };

  return (
    <div className="cart-page">
      <h1>Корзина</h1>

      {/* === Товары === */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} />
          ))
        )}
      </div>

      {/* === Промокод === */}
      <div className="cart-promo">
        <h2>Бонусы и скидки</h2>

        <div className="promo-row">
          <label>Промокод:</label>

          <div className="promo-container">
            <input
              type="text"
              value={promo}
              disabled={promoApplied}
              onChange={(e) => setPromo(e.target.value)}
              placeholder={
                promoApplied ? "Промокод применён" : "Введите промокод"
              }
            />

            {promo && !promoApplied && (
              <button className="clear-promo" onClick={() => setPromo("")}>
                ✕
              </button>
            )}
          </div>

          {!promoApplied ? (
            <button className="apply-promo" onClick={applyPromo}>
              Применить промокод
            </button>
          ) : (
            <button className="apply-promo cancel" onClick={cancelPromo}>
              Отменить промокод
            </button>
          )}
        </div>

        {promoMessage && (
          <div
            className={`promo-message ${
              promoApplied ? "success" : "error"
            }`}
          >
            {promoMessage}
          </div>
        )}
      </div>

      {/* === Сумма === */}
      <div className="cart-summary">
        <h2>Сумма заказа</h2>

        <div className="summary-row">
          <span>Количество товаров:</span>
          <span>{cart.length}</span>
        </div>

        <div className="summary-row">
          <span>Сумма товаров:</span>
          <span>{total} ₽</span>
        </div>

        {promoApplied && (
          <div className="summary-row discount">
            <span>Скидка ({discount}%):</span>
            <span>-{discountValue} ₽</span>
          </div>
        )}

        <hr />

        <div className="summary-total">
          <span>Итого:</span>
          <span>{totalWithDiscount} ₽</span>
        </div>

        <Link href="/checkout" className="checkout-btn">
          Выбрать способ получения
        </Link>
      </div>
    </div>
  );
}
