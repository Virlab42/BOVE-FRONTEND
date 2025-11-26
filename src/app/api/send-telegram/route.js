import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json(); // Получаем данные из тела запроса
    const { name, phone } = body;

    const CHAT_ID = '-4809235355'; // Chat ID
    const BOT_TOKEN = '8001734265:AAFFTF2qy3-7W6xh9L2Ht-pr4Gwyp4TwA1k'; // Bot Token
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const text = `
    📌 <b>Новая заявка с сайта</b>
    👤 <b>Имя:</b> ${name}
    📞 <b>Телефон:</b> ${phone}
    `;

    await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'HTML',
    });

    return new Response(JSON.stringify({ success: true, message: 'Заявка отправлена!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: 'Ошибка при отправке заявки' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
