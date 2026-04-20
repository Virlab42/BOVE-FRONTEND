import { NextResponse } from "next/server";
import { getOrder, saveOrder } from "@/app/lib/orderStore";

export async function POST(req) {
  try {
    const { orderId } = await req.json();
    console.log("🔵 [VERIFY] Начало проверки заказа:", orderId);

    if (!orderId) {
      return NextResponse.json({
        success: false,
        message: "Не передан orderId",
      });
    }

    // 1. ДОСТАЕМ ЗАКАЗ
    const orderData = await getOrder(orderId);
    if (!orderData) {
      console.log("🔴 [VERIFY] Заказ не найден в базе!");
      return NextResponse.json({ success: false, message: "Заказ не найден" });
    }

    if (orderData.vkNotified) {
      console.log("🟡 [VERIFY] Заказ уже был отправлен в ВК ранее.");
      return NextResponse.json({ success: true, message: "Уже уведомлены" });
    }

    // 2. ИДЕМ В АЛЬФА-БАНК
    const payload = new URLSearchParams({
      token: process.env.ALFA_PAYMENT_TOKEN,
      orderId: orderData.bankOrderId,
    });

    console.log("🔵 [VERIFY] Делаем запрос к Альфе...");
    const bankRes = await fetch(
      "https://payment.alfabank.ru/payment/rest/getOrderStatusExtended.do",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      },
    );

    const bankJson = await bankRes.json();
    console.log(
      "🟢 [VERIFY] Ответ от Альфа-банка:",
      bankJson.orderStatus,
      bankJson.errorMessage || "без ошибок",
    );

    // ВАЖНО: Иногда банк возвращает статус как строку "2", а иногда как число 2.
    // Также, если у тебя деньги сначала замораживаются, статус может быть 1.
    // Пока разрешим и 1 (холдирование) и 2 (полная оплата)
    if (bankJson.orderStatus != 1 && bankJson.orderStatus != 2) {
      console.log(
        "🔴 [VERIFY] Банк ответил, что заказ не оплачен. Статус:",
        bankJson.orderStatus,
      );
      return NextResponse.json({
        success: false,
        message: "Заказ еще не оплачен",
      });
    }

    // 3. ОТПРАВЛЯЕМ В ВК
    console.log("🔵 [VERIFY] Оплата подтверждена. Формируем сообщение в ВК...");
    const token = process.env.VK_BOT_TOKEN;
    const peer_id = process.env.VK_CHAT_PEER_ID;

    if (!token || !peer_id) {
      console.log(
        "🔴 [VERIFY] ОШИБКА: Нет токена ВК или peer_id в файле .env!",
      );
    }

    const itemsList = orderData.items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} (x${item.quantity}) — ${item.price * item.quantity} ₽`,
      )
      .join("\n");

    const message = `
✅ ЗАКАЗ ОПЛАЧЕН!

Номер: ${orderId}
👤 Клиент: ${orderData.customer.name}
📞 Телефон: ${orderData.customer.phone}
✉️ Email: ${orderData.customer.email}

📦 Способ доставки: ${orderData.delivery.description}
📍 Адрес: ${orderData.delivery.address || "Не указан"}

🛒 ТОВАРЫ:
${itemsList}

💰 Сумма товаров: ${orderData.subtotal} ₽
🚚 Доставка: ${orderData.delivery.cost} ₽
🔥 ИТОГО ОПЛАЧЕНО: ${orderData.total} ₽
    `.trim();

    const vkParams = new URLSearchParams({
      peer_id: peer_id,
      message: message,
      random_id: Date.now().toString(),
      access_token: token,
      v: "5.199",
    });

    const vkRes = await fetch(`https://api.vk.com/method/messages.send`, {
      method: "POST",
      body: vkParams,
    });

    const vkJson = await vkRes.json();
    console.log("🟢 [VERIFY] Ответ от серверов ВК:", vkJson);

    // 4. СОХРАНЯЕМ СТАТУС
    orderData.vkNotified = true;
    saveOrder(orderId, orderData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔴 [VERIFY] Глобальная ошибка:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
