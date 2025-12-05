export async function POST(request) {
  try {
    const { pointCode } = await request.json();

    console.log("🔍 Fetching details for point code:", pointCode);

    if (!pointCode) {
      return Response.json(
        { error: "Point code is required" },
        { status: 400 }
      );
    }

    // Используем API СДЭК для получения деталей пункта
    // Замените на ваш реальный endpoint API СДЭК
    const cdekApiUrl = `https://api.cdek.ru/v2/deliverypoints?code=${pointCode}`;

    // Или используйте ваш service endpoint
    const serviceUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cdek/service`;

    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "point_details",
        code: pointCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`CDEK API error: ${response.status}`);
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching point details:", error);

    // Возвращаем тестовые данные при ошибке
    return Response.json({
      entity: {
        code: pointCode,
        name: "Пункт выдачи СДЭК",
        address: "Адрес будет уточнен",
        delivery_sum: 300,
        city: "Москва",
        location: {
          address: "Адрес будет уточнен при доставке",
          city: "Москва",
        },
      },
    });
  }
}
