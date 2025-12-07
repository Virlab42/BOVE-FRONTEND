import { NextResponse } from "next/server";
import crypto from "crypto";
import { getOrder, updateOrder, deleteOrder } from "@/app/lib/orderStore";
import { sendToTelegram } from "@/app/lib/telegram";

export async function POST(req) {
  try {
    // Получаем тело как текст (важно для подписи)
    const bodyText = await req.text();
    const body = JSON.parse(bodyText);
    console.log(body); 
    
    // ==== Проверка подписи симметричной ==== 
    const tokenHeader =
      req.headers.get("x-token") ||
      req.headers.get("token") ||
      req.headers.get("X-Token");

    if (!tokenHeader) {
      console.log("❌ No signature header");
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ALFABANK_CALLBACK_TOKEN)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== tokenHeader) {
      console.log("❌ Invalid signature");
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    console.log("🔥 Callback received:", body);

    // Альфа присылает orderNumber, а не orderId
    const orderId = body.orderNumber;
    const status = body.status || body.operation;

    if (!orderId) {
      console.log("❌ No orderNumber in callback");
      return NextResponse.json({ ok: true });
    }

    const order = getOrder(orderId);
    if (!order) {
      console.log("❌ Order not found:", orderId);
      return NextResponse.json({ ok: true });
    }

    // === Проверка успешного списания ===
    // У Альфы успешный статус — "1" или operation="deposited"
    const isPaid =
      status === "1" ||
      status === "PAID" ||
      body.operation === "deposited";

    if (isPaid) {
      updateOrder(orderId, { status: "paid" });

      // отправка заказа в Telegram
      await sendToTelegram(order, orderId);

      // удаление заказа из временного хранилища
      deleteOrder(orderId);

      console.log("✅ Order marked as PAID:", orderId);
    } else {
      console.log("⚠️ Status not paid:", status);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ Callback error:", e);
    return NextResponse.json({ ok: false });
  }
}
