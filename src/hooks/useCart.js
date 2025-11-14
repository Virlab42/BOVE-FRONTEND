'use client';

import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  // Загружаем корзину при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Добавить товар
  const add = (id) => {
    const updated = [...cart, id];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Удалить товар
  const remove = (id) => {
    const updated = cart.filter((item) => item !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Очистить корзину
  const clear = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return { cart, add, remove, clear };
}
