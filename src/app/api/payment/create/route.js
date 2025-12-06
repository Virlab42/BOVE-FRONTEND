import { NextResponse } from "next/server";
import { saveOrder } from "@/app/lib/orderStore";

//const RETURN_URL = "https://bove-brand.ru/order-success";
//const FAIL_URL = "https://bove-brand.ru/checkout";

const RETURN_URL = "http://localhost:3000/order-success";
const FAIL_URL = "http://localhost:3000/checkout";

export async function POST(req) {
  try {
    const order = await req.json();
    const orderId = "ORD-" + Date.now();

    saveOrder(orderId, order);
    console.log("Сохранили заказ:", orderId, order);

    // Формируем payload для банка
    const payload = new URLSearchParams({
      token: process.env.ALFA_PAYMENT_TOKEN, // ваш боевой токен
      //password: process.env.ALFA_PAYMENT_TOKEN, // токен же используется вместо пароля
      orderNumber: orderId,
      amount: (order.total * 100).toString(), // сумма в копейках, только товары
      returnUrl: `${RETURN_URL}?orderId=${orderId}`,
      failUrl: `${FAIL_URL}?failed=true`,
      description: `Оплата заказа ${orderId} в магазине bove-brand.ru`
    });

    const bankRes = await fetch(
      "https://payment.alfabank.ru/payment/rest/register.do",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString()
      }
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
      paymentUrl: bankJson.formUrl
    });

  } catch (e) {
    console.error("Ошибка при создании платежа:", e);
    return NextResponse.json({ success: false, message: "Ошибка сервера" });
  }
}
