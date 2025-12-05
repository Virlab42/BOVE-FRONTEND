import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orderStore";

export async function GET(req, { params }) {
  const order = getOrder(params.orderId);

  if (!order) return NextResponse.json({ exists: false });

  return NextResponse.json({ exists: true, order });
}
