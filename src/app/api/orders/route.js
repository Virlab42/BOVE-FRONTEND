import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const orderData = await request.json();

    const orderId = "ORD-" + Date.now();

    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Заказ успешно создан",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при создании заказа",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
