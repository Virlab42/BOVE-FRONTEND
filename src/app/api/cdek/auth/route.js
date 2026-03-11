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
        client_id: "QeiBus1oDFStcyvln3XKYXWvbxDRAEbc",
        client_secret: "9xZM2fZE8S4vUyf1TJH9OxOVukoTSp71",
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
