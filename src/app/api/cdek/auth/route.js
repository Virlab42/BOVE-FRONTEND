// app/api/cdek/auth/route.js
export async function GET() {
  try {
    const response = await fetch("https://api.cdek.ru/v2/oauth/token", {
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

    if (!response.ok) {
      throw new Error(`CDEK Auth failed: ${response.status}`);
    }

    const data = await response.json();

    // Возвращаем только access_token без sensitive данных
    return Response.json({
      success: true,
      access_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.error("CDEK Auth Error:", error);
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
