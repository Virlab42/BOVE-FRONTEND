//import fetch from "node-fetch";

export async function POST(req) {
  try {
    const body = await req.json();
    const { code, weight = 0.1, length = 30, width = 30, height = 30 } = body;

    const tokenRes = await fetch("https://api.cdek.ru/v2/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CDEK_LOGIN,
        client_secret: process.env.CDEK_SECRET
      })
    });
    const tokenData = await tokenRes.json();
    const authToken = tokenData.access_token;

    const res = await fetch("https://api.cdek.ru/v2/calculator/tarifflist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        from_location: "Москва",
        to_location: code,
        goods: [{ weight, length, width, height }]
      })
    });

    const data = await res.json();
    const price = data.tariffs?.[0]?.price || 0;

    return new Response(JSON.stringify({ price }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("CDEK Calc API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
