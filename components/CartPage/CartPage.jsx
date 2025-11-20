'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import './CartPage.scss';
import CartItem from './CartItem';

export default function CartPage() {
  const { cart, remove, updateQuantity } = useCart();
  const [promo, setPromo] = useState('');

  // Считаем общую сумму
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      {/* === Блок товаров === */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          cart.map((item, index) => <CartItem key={index} item={item} index={index} />)
        )}
      </div>

      {/* === Блок промокода === */}
      <div className="cart-promo">
        <h2>Бонусы и скидки</h2>
        <div className="promo-row">
          <label>Промокод:</label>
          <div className='promo-container'>
          <input 
            type="text" 
            value={promo} 
            onChange={e => setPromo(e.target.value)} 
            placeholder="Введите промокод"
          />
          {promo && <button className="clear-promo" onClick={() => setPromo('')}>✕</button>}
          </div>
          <button className="apply-promo">Применить промокод</button>
        </div>
      </div>

      {/* === Блок суммы заказа === */}
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
        <hr />
        <div className="summary-total">
          <span>Итого:</span>
          <span>{total} ₽</span>
        </div>
        <Link href="/checkout" className="checkout-btn">Выбрать способ получения</Link>
      </div>
    </div>
  );
}
