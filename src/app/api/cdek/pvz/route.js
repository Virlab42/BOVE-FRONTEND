export async function GET() {
  try {
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

    const res = await fetch("https://api.cdek.ru/v2/deliverypoints?is_handout=true&size=500", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log(data);
    const points = (data.items || []).map(p => ({
      code: p.code,
      name: p.name,
      address: p.address_full || p.address,
      city: p.city,
      coords: [p.location.latitude, p.location.longitude] // <--- важно!
    }));

    return new Response(JSON.stringify(points), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("CDEK PVZ API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
