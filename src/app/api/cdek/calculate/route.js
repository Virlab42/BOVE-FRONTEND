// app/api/cdek/calculate/route.js
export async function POST(request) {
  try {
    // Авторизация
    const authResponse = await fetch("https://api.cdek.ru/v2/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "WFCrgWDvc92QvChUnJAEymD0VdSKoO44",
        client_secret: "0OjXOkQx8SwVXPu1ElBce0BJmEkAjILy",
      }),
    });

    if (!authResponse.ok) {
      throw new Error(`Auth failed: ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Получаем данные для расчета
    const { from_location, to_location, packages, tariff_code } =
      await request.json();

    // Данные для расчета (адаптируйте под ваши нужды)
    const calculationData = {
      tariff_code: tariff_code || 136, // Код тарифа СДЭК (136 - Посылка склад-склад)
      from_location: from_location || {
        address: "г Москва, ул Ленина, д 1",
        code: 44, // Москва
      },
      to_location: to_location,
      packages: packages || [
        {
          weight: 1000, // вес в граммах
          length: 30, // длина в см
          width: 20, // ширина в см
          height: 10, // высота в см
        },
      ],
    };

    const response = await fetch("https://api.cdek.ru/v2/calculator/tariff", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calculationData),
    });

    if (!response.ok) {
      throw new Error(`Calculation failed: ${response.status}`);
    }

    const data = await response.json();

    return Response.json({
      success: true,
      delivery_sum: data.delivery_sum,
      period_min: data.period_min,
      period_max: data.period_max,
      weight_calc: data.weight_calc,
    });
  } catch (error) {
    console.error("CDEK Calculation Error:", error);
    return Response.json({
      success: false,
      error: error.message,
      delivery_sum: 300, // Стоимость по умолчанию
      period_min: 3,
      period_max: 5,
    });
  }
}
