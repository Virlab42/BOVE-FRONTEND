import { NextResponse } from "next/server";
import { getOrder, updateOrder, deleteOrder } from "@/app/lib/orderStore";
import { sendToTelegram } from "@/app/lib/telegram";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    const order = getOrder(orderId);
    if (!order) {
      console.log("Order not found");
      return NextResponse.json({ ok: true });
    }

    if (status === "PAID") {
      updateOrder(orderId, { status: "paid" });

      // отправка заказа в Telegram
      await sendToTelegram(order, orderId);

      // можно удалять заказ
      deleteOrder(orderId);
    }

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error("Callback error:", e);
    return NextResponse.json({ ok: false });
  }
}
