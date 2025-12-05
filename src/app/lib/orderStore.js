
const orders = new Map();

// Создать заказ
export function saveOrder(orderId, data) {
  orders.set(orderId, {
    ...data,
    status: "pending",
    createdAt: Date.now(),
  });
}

// Получить заказ
export function getOrder(orderId) {
  return orders.get(orderId);
}

// Обновить
export function updateOrder(orderId, updates) {
  if (!orders.has(orderId)) return;
  orders.set(orderId, { ...orders.get(orderId), ...updates });
}

// Удалить
export function deleteOrder(orderId) {
  orders.delete(orderId);
}
