//const TELEGRAM_BOT_TOKEN = "8001734265:AAFFTF2qy3-7W6xh9L2Ht-pr4Gwyp4TwA1k";
//const TELEGRAM_CHAT_ID = "-4809235355";

export async function sendToTelegram(order, orderId) {
  const items = order.items
    .map((i) => `${i.name} × ${i.quantity} = ${i.price * i.quantity} ₽`)
    .join("\n");

  const msg = `
<b>Оплачен заказ #${orderId}</b>
<b>Имя:</b> ${order.customer.name}
<b>Телефон:</b> ${order.customer.phone}
<b>Email:</b> ${order.customer.email}
<b>Отправка:</b> ${order.delivery.method}
<b>Адрес:</b> ${
    order.delivery.point.fullAddress ||
    order.delivery.point.address ||
    order.delivery.address
  }
<b>Итого:</b> ${order.total} ₽

<b>Товары:</b>
${items}
  `;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "HTML",
      }),
    }
  );
}
