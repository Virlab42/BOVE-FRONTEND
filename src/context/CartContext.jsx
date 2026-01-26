'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
  // CartContext.jsx — заменить add на это
const add = (item) => {
  setCart((prev) => {
    const sameIndex = prev.findIndex(
      (i) =>
        i.id === item.id &&
        i.variant_id === item.variant_id &&
        ((i.size_id != null && item.size_id != null && Number(i.size_id) === Number(item.size_id)) ||
          (i.size_id == null && item.size_id == null && i.size === item.size))
    );

    if (sameIndex >= 0) {
      const updated = [...prev];
      const current = updated[sameIndex];

      const maxQty = typeof current.maxQty === "number" ? current.maxQty : null;

      // ✅ если maxQty 0 или меньше — не даём увеличивать (но и не делаем 0!)
      if (typeof maxQty === "number" && maxQty <= 0) {
        return updated;
      }

      const nextQty =
        typeof maxQty === "number"
          ? Math.min(current.quantity + 1, maxQty)
          : current.quantity + 1;

      updated[sameIndex] = { ...current, quantity: nextQty };
      return updated;
    }

    return [
      ...prev,
      {
        ...item,
        quantity: 1,
        available: undefined,
        maxQty: undefined,
      },
    ];
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

  const refreshAvailability = async () => {
  if (!BASE_URL) return { ok: true, hasOutOfStock: false };
  if (cart.length === 0) return { ok: true, hasOutOfStock: false };

  const productIds = [...new Set(cart.map((i) => Number(i.id)))].filter(
    (x) => Number.isFinite(x)
  );

  const products = await Promise.all(
    productIds.map(async (pid) => {
      try {
        const res = await fetch(`${BASE_URL}/productsV3/${pid}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.log("[AVAIL] fetch fail", pid, res.status, txt.slice(0, 200));
          return null;
        }

        const data = await res.json();
        return data?.product ?? data; // ✅ ВОТ ЭТО ГЛАВНАЯ ПРАВКА
      } catch (e) {
        console.log("[AVAIL] fetch error", pid, e?.message);
        return null;
      }
    })
  );

  // ✅ теперь p.id существует (12), Map будет нормальный
  const productMap = new Map(
    products.filter(Boolean).map((p) => [Number(p.id), p])
  );

  let hasOutOfStock = false;

  setCart((prev) =>
    prev.map((item) => {
      const productId = Number(item.id);
      const p = productMap.get(productId);
      console.log("MAP_GET", { productId, pId: p?.id, keys: [...productMap.keys()] });

      if (!p) {
        // ⚠️ тут можно потом заменить на available: undefined (ошибка проверки),
        // но пока оставим как у тебя
        hasOutOfStock = true;
        return { ...item, available: false, maxQty: 0 };
      }

      let sizeId = item.size_id != null ? Number(item.size_id) : NaN;

      if (!Number.isFinite(sizeId)) {
        const match = (p.available_sizes || []).find((s) => s.size === item.size);
        sizeId = match ? Number(match.id) : NaN;
      }

      if (!Number.isFinite(sizeId)) {
        hasOutOfStock = true;
        return { ...item, available: false, maxQty: 0 };
      }

      const variantId = Number(item.variant_id);

      const stockRow = (p.product_stock || []).find(
        (s) => Number(s.variant_id) === variantId && Number(s.size_id) === sizeId
      );

      const qty = Number(stockRow?.quantity ?? 0);

      console.log("CHECK", {
        productId,
        variantId,
        sizeId,
        qty,
        stock: (p.product_stock || []).map((s) => ({
          v: Number(s.variant_id),
          sz: Number(s.size_id),
          q: Number(s.quantity),
        })),
      });

      const available = qty > 0;
      if (!available) hasOutOfStock = true;

      return {
        ...item,
        size_id: sizeId,
        available,
        maxQty: qty,
        quantity: available ? Math.min(item.quantity, qty) : item.quantity,
      };
    })
  );

  return { ok: true, hasOutOfStock };
};



  return (
    <CartContext.Provider value={{ cart, add, remove, updateQuantity, clear, refreshAvailability }}>
      {children}
    </CartContext.Provider>
  );
}

// Хук для использования корзины
export const useCart = () => useContext(CartContext);
