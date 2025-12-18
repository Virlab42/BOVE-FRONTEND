//const TELEGRAM_BOT_TOKEN = "8001734265:AAFFTF2qy3-7W6xh9L2Ht-pr4Gwyp4TwA1k";
//const TELEGRAM_CHAT_ID = "-4809235355";

export async function sendToTelegram(order, orderId) {
  console.log(order.items);

  let deliveryInfo = "";
  if (order.delivery.method === "moscowCourier") {
    deliveryInfo = `Курьерская доставка по Москве\n${order.delivery.details}`;
  } else if (order.delivery.method === "cdek") {
    deliveryInfo = `Доставка СДЭК\nАдрес пункта выдачи: ${order.delivery.address}`;
  } else {
    deliveryInfo = "Самовывоз";
  }

  const items = order.items
    .map(
      (i) =>
        `${i.title} ${i.color} ${i.size} × ${i.quantity} = ${
          i.price * i.quantity
        } ₽`
    )
    .join("\n");

  const msg = `
<b>Заказ #${orderId}</b>
<b>Имя:</b> ${order.customer.name}
<b>Телефон:</b> ${order.customer.phone}
<b>Email:</b> ${order.customer.email}
<b>Способ доставки:</b> ${deliveryInfo}
<b>Адрес:</b> ${order.delivery.address}
<b>Стоимость доставки:</b> ${order.delivery.cost} ₽

<b>Итого к оплате:</b> ${order.total} ₽

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
