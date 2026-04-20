import { NextResponse } from "next/server";
import { getOrder, updateOrder, deleteOrder } from "@/app/lib/orderStore";
import { sendToTelegram, sendToVK } from "@/app/lib/telegram"; // <--- ДОБАВИЛИ sendToVK
import { sendToMail } from "@/app/lib/mail";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const orderId = searchParams.get("orderNumber");
    const status = searchParams.get("status");
    const operation = searchParams.get("operation");

    console.log("🔥 ALFA CALLBACK", {
      orderId,
      status,
      operation,
      raw: Object.fromEntries(searchParams),
    });

    // если нет номера заказа — просто отвечаем 200
    if (!orderId) {
      return NextResponse.json({ ok: true });
    }

    const order = getOrder(orderId);
    if (!order) {
      console.log("⚠️ Order not found:", orderId);
      return NextResponse.json({ ok: true });
    }

    // у Альфы успешная оплата
    const isPaid =
      status === "1" || status === "PAID" || operation === "deposited";

    if (!isPaid) {
      console.log("⚠️ Payment not successful:", status, operation);
      return NextResponse.json({ ok: true });
    }

    // защита от повторных callback'ов
    if (order.status === "paid") {
      console.log("♻️ Order already paid:", orderId);
      return NextResponse.json({ ok: true });
    }

    updateOrder(orderId, { status: "paid" });

    // --- ОТПРАВЛЯЕМ ВО ВСЕ МЕССЕНДЖЕРЫ ---
    await sendToMail(order, orderId);
    await sendToTelegram(order, orderId);
    await sendToVK(order, orderId); // <--- ВЫЗЫВАЕМ ОТПРАВКУ В ВК
    // -------------------------------------

    deleteOrder(orderId);

    console.log("✅ Order PAID:", orderId);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ Alfa callback error:", e);
    // даже при ошибке лучше вернуть 200, чтобы Альфа не долбила повторно
    return NextResponse.json({ ok: true });
  }
}
