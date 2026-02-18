import { NextResponse } from "next/server";
import { saveOrder, getOrder } from "@/app/lib/orderStore";
import { sendToTelegram } from "@/app/lib/telegram";

const RETURN_URL = "https://bove-brand.ru/order-success";
const FAIL_URL = "https://bove-brand.ru/checkout";

export async function POST(req) {
  try {
    const order = await req.json();
    const orderId = "ORD-" + Date.now();

    // Сохраняем заказ
    saveOrder(orderId, order);
    console.log("✅ Заказ сохранен:", orderId);

    // Отправляем в Telegram (НЕ ждем завершения, чтобы не задерживать ответ)
    sendToTelegram(order, orderId).catch((err) => {
      console.error("❌ Ошибка отправки в Telegram (фоновая):", err);
    });

    // Формируем payload для банка
    const payload = new URLSearchParams({
      token: process.env.ALFA_PAYMENT_TOKEN,
      orderNumber: orderId,
      amount: (order.total * 100).toString(),
      returnUrl: `${RETURN_URL}?orderId=${orderId}`,
      failUrl: `${FAIL_URL}?failed=true`,
      description: `Оплата заказа ${orderId} в магазине bove-brand.ru`,
    });

    const bankRes = await fetch(
      "https://payment.alfabank.ru/payment/rest/register.do",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      },
    );

    const bankJson = await bankRes.json();

    if (!bankJson.formUrl) {
      console.error("Ошибка банка:", bankJson);
      return NextResponse.json({ success: false, message: "Ошибка у банка" });
    }

    // Возвращаем клиенту ссылку на форму оплаты
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl: bankJson.formUrl,
    });
  } catch (e) {
    console.error("❌ Ошибка при создании платежа:", e);
    return NextResponse.json({ success: false, message: "Ошибка сервера" });
  }
}
