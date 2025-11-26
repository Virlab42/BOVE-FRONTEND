import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8001734265:AAFFTF2qy3-7W6xh9L2Ht-pr4Gwyp4TwA1k";
const TELEGRAM_CHAT_ID = "-4809235355";

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML", // можно использовать жирный, переносы и т.д.
    }),
  });
}

export async function POST(request) {
  try {
    const orderData = await request.json();

    const orderId = "ORD-" + Date.now();

    // Формируем сообщение для Telegram
    const { customer, delivery, items, total } = orderData;
    const itemList = items
  .map(
    (i) => `${i.title} (${i.color}, размер ${i.size}) × ${i.quantity} = ${i.price * i.quantity} ₽`
  )
  .join("\n");

    const message = `
<b>Новый заказ #${orderId}</b>
<b>Имя:</b> ${customer.name}
<b>Телефон:</b> ${customer.phone}
<b>Email:</b> ${customer.email}
<b>Адрес:</b> ${delivery.address || "—"}
<b>Доставка:</b> ${delivery.method === "cdek" ? "Доставка СДЭК" : "Курьерская доставка по Москве"}
<b>Сумма товаров:</b> ${total} ₽
<b>Доставка:</b> от ${delivery.cost} ₽
<b>Итого:</b> ${total} ₽

<b>Товары:</b>
${itemList}
`;

    await sendToTelegram(message);

    return NextResponse.json({
      success: true,
      orderId,
      message: "Заказ успешно создан и отправлен в Telegram",
    });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при создании заказа" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
