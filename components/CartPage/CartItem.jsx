"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import "./CartItem.scss";
import Image from "next/image";

export default function CartItem({ item, index }) {
  const { remove, updateQuantity } = useCart();

  const handleDecrement = () => {
    if (item.quantity > 1) updateQuantity(index, item.quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(index, item.quantity + 1);
  };
  return (
    <div className="cart-item">
      <Link href={`${item.url}`} className="cart-item__image-link">
        <Image
          src={`${item.image}`}
          width={500}
          height={500}
          alt={item.title}
          className="cart-item__image"
        />
      </Link>

      <div className="cart-item__info">
        <Link href={`${item.url}`} className="cart-item__title">
          {item.title}
        </Link>
        <span className="cart-item__options">
          {item.size} | {item.color}
        </span>
        <span className="cart-item__price">{item.price} ₽</span>
      </div>

      <div className="cart-item__controls">
        <button className="cart-item__remove" onClick={() => remove(index)}>
          <svg
            data-v-4b9bbdf6=""
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#999999"
            stroke="none"
            strokeWidth="0"
          >
            <path d="M22.387 2.701h-6.19C15.45 1.094 13.83 0 12 0c-1.832 0-3.453 1.094-4.198 2.701H1.613a1 1 0 1 0 0 2.002h.611v.003L3.26 22.058C3.325 23.147 4.199 24 5.25 24H18.752c1.046 0 1.919-.851 1.988-1.942l1.036-17.352v-.003h.61a1 1 0 1 0 .001-2.002zM12 2.002c.676 0 1.299.267 1.772.699h-3.545A2.63 2.63 0 0 1 12 2.002zm6.75 19.995l-13.492-.059L4.229 4.703h15.542L18.75 21.997z"></path>
            <path d="M8.202 20.325c.019 0 .038 0 .058-.002a1 1 0 0 0 .943-1.056L8.535 7.339a.997.997 0 0 0-1.055-.944 1 1 0 0 0-.943 1.055l.667 11.929a1 1 0 0 0 .998.946zM15.739 20.323c.019.002.038.002.057.002.527 0 .97-.412.999-.946l.666-11.929a1.002 1.002 0 0 0-.943-1.056c-.539-.041-1.024.392-1.055.944l-.667 11.929a1 1 0 0 0 .943 1.056zM12 20.325c.553 0 1.001-.449 1.001-1.001V7.394a1 1 0 1 0-2.002 0v11.931a1 1 0 0 0 1.001 1z"></path>
          </svg>
        </button>
        <div className="cart-item__quantity">
          <button className="cart-item__quantity-btn" onClick={handleDecrement}>
            −
          </button>
          <span className="cart-item__quantity-value">{item.quantity}</span>
          <button className="cart-item__quantity-btn" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
