import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { city } = await request.json();

    const mockPoints = [
      {
        code: "MSK-001",
        name: "Пункт выдачи СДЭК - Центр",
        address: "г. Москва, ул. Тверская, д. 1",
        price: 300,
      },
      {
        code: "MSK-002",
        name: "Пункт выдачи СДЭК - СВАО",
        address: "г. Москва, ул. Мира, д. 25",
        price: 300,
      },
      {
        code: "MSK-003",
        name: "Пункт выдачи СДЭК - ЮАО",
        address: "г. Москва, ул. Профсоюзная, д. 56",
        price: 300,
      },
    ];

    return NextResponse.json({
      success: true,
      points: mockPoints,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при загрузке пунктов выдачи",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
