import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const orderData = await request.json();

    // Достаем ключи из .env
    const token = process.env.VK_BOT_TOKEN;
    const peer_id = process.env.VK_CHAT_PEER_ID;
    const version = "5.199";

    // 1. Формируем список товаров для красивого вывода
    const itemsList = orderData.items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} (x${item.quantity}) — ${item.price * item.quantity} ₽`,
      )
      .join("\n");

    // 2. Формируем красивый текст сообщения
    const message = `
🔔 НОВЫЙ ЗАКАЗ С САЙТА!

👤 Клиент: ${orderData.customer.name}
📞 Телефон: ${orderData.customer.phone}
✉️ Email: ${orderData.customer.email}

📦 Способ доставки: ${orderData.delivery.description}
📍 Адрес: ${orderData.delivery.address || "Не указан"}

🛒 ТОВАРЫ:
${itemsList}

💰 Сумма товаров: ${orderData.subtotal} ₽
🚚 Доставка: ${orderData.delivery.cost} ₽
🔥 ИТОГО К ОПЛАТЕ: ${orderData.total} ₽
    `.trim();

    // 3. Отправляем запрос к API ВКонтакте
    const params = new URLSearchParams({
      peer_id: peer_id,
      message: message,
      random_id: Date.now().toString(), // Уникальный ID из времени
      access_token: token,
      v: version,
    });

    const vkResponse = await fetch(`https://api.vk.com/method/messages.send`, {
      method: "POST",
      body: params,
    });

    const vkData = await vkResponse.json();

    if (vkData.error) {
      console.error("Ошибка VK API:", vkData.error);
      return NextResponse.json(
        { success: false, error: vkData.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при отправке в ВК:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
