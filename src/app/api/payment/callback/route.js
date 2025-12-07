import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getOrder, updateOrder, deleteOrder } from "@/app/lib/orderStore";
import { sendToTelegram } from "@/app/lib/telegram";

// Запись в локальный лог-файл (для локальной отладки)
function writeLocalLog(data) {
  try {
    // Пишем только в dev, чтобы прод не пытался писать в файловую систему
    if (process.env.NODE_ENV === "production") return;

    const filePath = path.join(process.cwd(), "alfacallback.log");
    const line =
      `[${new Date().toISOString()}]\n` +
      JSON.stringify(data, null, 2) +
      "\n--------------------------------\n";

    fs.appendFileSync(filePath, line, "utf8");
  } catch (err) {
    console.error("Failed to write callback log:", err);
  }
}

export async function POST(req) {
  try {
    // Получаем тело как текст (важно для подписи)
    const bodyText = await req.text();

    // На случай кривого JSON — отдельно ловим
    let body;
    try {
      body = JSON.parse(bodyText || "{}");
    } catch (e) {
      console.log("❌ Cannot parse JSON from callback body");
      writeLocalLog({ parseError: String(e), rawBody: bodyText });
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    console.log("ОТВЕТ АЛЬФЫ (raw):", body);
    writeLocalLog({
      stage: "received",
      headers: Object.fromEntries(req.headers.entries()),
      body,
      bodyText,
    });

    // ==== Проверка подписи (симметричный токен в заголовке) ====
    const tokenHeader =
      req.headers.get("x-token") ||
      req.headers.get("token") ||
      req.headers.get("X-Token");

    if (!tokenHeader) {
      console.log("❌ No signature header");
      writeLocalLog({ stage: "no-signature-header", body });
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ALFABANK_CALLBACK_TOKEN)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== tokenHeader) {
      console.log("❌ Invalid signature");
      writeLocalLog({
        stage: "invalid-signature",
        expectedSignature,
        tokenHeader,
        body,
      });
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    console.log("🔥 Callback received (signature OK):", body);
    writeLocalLog({ stage: "signature-ok", body });

    // Альфа присылает orderNumber, а не orderId
    const orderId = body.orderNumber;
    const status = body.status || body.operation;

    if (!orderId) {
      console.log("❌ No orderNumber in callback");
      writeLocalLog({ stage: "no-orderNumber", body });
      // Возвращаем 200, чтобы Альфа не долбила повторно
      return NextResponse.json({ ok: true });
    }

    const order = getOrder(orderId);
    if (!order) {
      console.log("❌ Order not found:", orderId);
      writeLocalLog({ stage: "order-not-found", orderId, body });
      // Тоже окей — просто нам уже не нужен этот заказ
      return NextResponse.json({ ok: true });
    }

    // === Проверка успешного списания ===
    // У Альфы успешный статус — "1" или operation="deposited" / "PAID"
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
      writeLocalLog({
        stage: "order-paid",
        orderId,
        status,
        operation: body.operation,
      });
    } else {
      console.log("⚠️ Status not paid:", status);
      writeLocalLog({
        stage: "status-not-paid",
        orderId,
        status,
        operation: body.operation,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ Callback error:", e);
    writeLocalLog({ stage: "exception", error: String(e) });
    return NextResponse.json({ ok: false });
  }
}
