'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext();

// Провайдер
export function CartProvider({ children }) {
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

  // Сохраняем корзину при изменениях
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Добавить товар
  const add = (item) => {
  setCart((prev) => {
    const existingIndex = prev.findIndex(
      (i) =>
        i.id === item.id &&
        i.variant_id === item.variant_id && // идентификатор варианта
        i.size === item.size                // выбранный размер
    );

    if (existingIndex >= 0) {
      // товар уже в корзине → увеличиваем
      const updated = [...prev];
      updated[existingIndex].quantity += 1;
      return updated;
    }

    // нового варианта в корзине нет → добавляем
    return [...prev, { ...item, quantity: 1 }];
  });
};


  // Удалить товар по индексу
  const remove = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Обновить количество
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return; // минимальное количество 1
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  // Очистить корзину
  const clear = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, add, remove, updateQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
}

// Хук для использования корзины
export const useCart = () => useContext(CartContext);
