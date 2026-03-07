const TELEGRAM_BOT_TOKEN = "8001734265:AAFFTF2qy3-7W6xh9L2Ht-pr4Gwyp4TwA1k";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendToTelegram(order, orderId) {
  try {
    console.log(`📤 Начинаем отправку заказа #${orderId} в Telegram...`);

    // Проверяем наличие обязательных полей
    if (!order || !order.customer) {
      throw new Error("Некорректные данные заказа");
    }

    // Формируем список товаров с проверкой наличия полей
    const itemsList =
      order.items
    .map(
      (i) =>
        `${i.title} ${i.color} ${i.size} × ${i.quantity} = ${
          i.price * i.quantity
        } ₽`
    )
    .join("\n");

    // Информация о доставке (с проверкой наличия)
    let deliveryInfo = "Доставка не выбрана";
    // if (order.delivery && order.delivery.method) {
    //   if (order.delivery.method === "moscowCourier") {
    //     deliveryInfo = `Курьерская доставка по Москве\nАдрес: ${order.delivery.address || "не указан"}`;
    //   } else if (order.delivery.method === "cdek") {
    //     deliveryInfo = `Доставка СДЭК\nПункт выдачи: ${order.delivery.address || "не выбран"}`;
    //   }
    // }

    const msg = `
✅ <b>НОВЫЙ ЗАКАЗ #${orderId}</b>

👤 <b>Клиент:</b>
Имя: ${order.customer.name || "не указано"}
Телефон: ${order.customer.phone || "не указан"}
Email: ${order.customer.email || "не указан"}

📦 <b>Товары:</b>
${itemsList}

🚚 <b>Доставка:</b>
${deliveryInfo}

💰 <b>Итого к оплате:</b> ${order.total || 0} ₽

📅 ${new Date().toLocaleString("ru-RU")}
    `;

    console.log(
      `📝 Сообщение для Telegram сформировано, длина: ${msg.length} символов`,
    );

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: "HTML",
        }),
      },
    );

    const result = await response.json();

    if (result.ok) {
      console.log(`✅ Заказ #${orderId} успешно отправлен в Telegram`);
      return true;
    } else {
      console.error("❌ Ошибка Telegram API:", result);
      return false;
    }
  } catch (error) {
    console.error(`❌ Ошибка отправки заказа #${orderId} в Telegram:`, error);
    return false; // Возвращаем false, но не пробрасываем ошибку
  }
}
