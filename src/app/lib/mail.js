import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function sendToMail(order, orderId) {
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
    if (order.delivery && order.delivery.method) {
       if (order.delivery.method === "moscowCourier") {
         deliveryInfo = `Курьерская доставка по Москве\nАдрес: ${order.delivery.address || "не указан"}`;
       } else if (order.delivery.method === "cdek") {
         deliveryInfo = `Доставка СДЭК\nПункт выдачи: ${order.delivery.address || "не выбран"}`;
       }
     }

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

    const transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: "sersur42@yandex.ru",
            pass: "xidetvxcflvenyqk",
          },
        });
    
        const to = "radostev.alexandr42@yandex.ru";
    
        const mailOptions = {
          from: `"Bove-brand" <sersur42@yandex.ru>`, // ОБЯЗАТЕЛЬНО ваш адрес Яндекса
          to: to,
          subject: `Заявка с сайта Bove-brand`,
          html: message.replace(/\n/g, '<br>'), // Чтобы HTML из Telegram корректно отобразился в почте
        };
        await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error(`❌ Ошибка отправки заказа #${orderId} по почте:`, error);
    return false;
  }
}
