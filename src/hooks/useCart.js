'use client';

import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  // Загружаем корзину из localStorage
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

  // Сохраняем корзину при любом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Добавить товар
  const add = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Удалить товар
  const remove = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Очистить
  const clear = () => setCart([]);

  return { cart, add, remove, clear };
}
