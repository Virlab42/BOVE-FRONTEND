// app/api/cdek/points/route.js
export async function POST(request) {
  try {
    // Сначала получаем токен авторизации
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

    // Получаем параметры из запроса
    const { city, search, postalCode } = await request.json();

    // Строим URL для поиска пунктов выдачи
    let url = "https://api.cdek.ru/v2/deliverypoints?";
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (postalCode) params.append("postal_code", postalCode);
    if (search) params.append("fias_guid", search); // Можно добавить другие параметры поиска

    // Основные фильтры
    params.append("type", "PVZ"); // Только пункты выдачи
    params.append("country_codes", "RU");
    params.append("is_handout", "true"); // Только пункты выдачи
    params.append("is_reception", "true"); // Только пункты приема
    params.append("take_only", "false");
    params.append("have_cashless", "true"); // С безналичной оплатой
    params.append("allowed_cod", "true"); // С наложенным платежом
    params.append("weight_max", "20000"); // Максимальный вес 20кг

    url += params.toString();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`CDEK API Error: ${response.status}`);
    }

    const data = await response.json();

    // Преобразуем данные в удобный формат
    const points = data.map((point) => ({
      code: point.code,
      name: point.name,
      address: point.location.address_full,
      city: point.location.city,
      postal_code: point.location.postal_code,
      price: calculateDeliveryPrice(point), // Функция расчета стоимости
      workTime: formatWorkTime(point.work_time),
      phone: point.phones?.[0]?.number || "",
      coordinates: {
        lat: point.location.latitude,
        lng: point.location.longitude,
      },
      dimensions: {
        width: point.dimensions?.width,
        height: point.dimensions?.height,
        depth: point.dimensions?.depth,
      },
      services: point.services || [],
      is_dressing_room: point.is_dressing_room || false,
    }));

    return Response.json({
      success: true,
      points: points.slice(0, 50), // Ограничиваем количество для производительности
    });
  } catch (error) {
    console.error("CDEK Points Error:", error);

    // Возвращаем тестовые данные в случае ошибки
    return Response.json({
      success: true,
      points: getMockPoints(city),
      isMock: true,
    });
  }
}

// Функция расчета стоимости доставки
function calculateDeliveryPrice(point) {
  // Базовая стоимость
  let price = 300;

  // Дополнительные наценки в зависимости от региона
  if (point.location.region === "Московская область") {
    price = 350;
  }

  return price;
}

// Форматирование времени работы
function formatWorkTime(workTime) {
  if (!workTime) return "";

  return workTime
    .map((period) => {
      const days = getDayName(period.day);
      const time = `${
        period.time ||
        period.periods?.map((p) => `${p.from}-${p.to}`).join(", ")
      }`;
      return `${days}: ${time}`;
    })
    .join("; ");
}

function getDayName(day) {
  const days = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    7: "Вс",
  };
  return days[day] || day;
}

// Функция с мок-данными на случай ошибки API
function getMockPoints(city = "Москва") {
  return [
    {
      code: "MSK1",
      name: "СДЭК - Арбат",
      address: `${city}, ул. Арбат, д. 25`,
      city: city,
      postal_code: "119002",
      price: 300,
      workTime: "Пн-Пт: 10:00-20:00; Сб-Вс: 11:00-18:00",
      phone: "+7 (495) 123-45-67",
      coordinates: { lat: 55.751244, lng: 37.618423 },
    },
    {
      code: "MSK2",
      name: "СДЭК - Тверская",
      address: `${city}, ул. Тверская, д. 15`,
      city: city,
      postal_code: "125009",
      price: 300,
      workTime: "Пн-Вс: 09:00-21:00",
      phone: "+7 (495) 765-43-21",
      coordinates: { lat: 55.761, lng: 37.613 },
    },
    {
      code: "MSK3",
      name: "СДЭК - Киевская",
      address: `${city}, Киевское шоссе, д. 1`,
      city: city,
      postal_code: "121059",
      price: 350,
      workTime: "Пн-Пт: 08:00-22:00; Сб-Вс: 10:00-20:00",
      phone: "+7 (495) 987-65-43",
      coordinates: { lat: 55.744, lng: 37.567 },
    },
  ];
}
