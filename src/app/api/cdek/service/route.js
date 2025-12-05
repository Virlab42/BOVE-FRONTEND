// app/api/cdek/service/route.js
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);

    return await handleRequest("GET", searchParams, null);
  } catch (error) {
    console.error("GET request error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);

    return await handleRequest("POST", searchParams, body);
  } catch (error) {
    console.error("POST request error:", error);
    return Response.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

class CDEKService {
  constructor() {
    this.login = "WFCrgWDvc92QvChUnJAEymD0VdSKoO44";
    this.secret = "0OjXOkQx8SwVXPu1ElBce0BJmEkAjILy";
    this.baseUrl = "https://api.cdek.ru/v2";
    this.authToken = null;
    this.metrics = [];
  }

  async process(requestData) {
    const time = this.startMetrics();

    if (!requestData.action) {
      return this.sendValidationError("Action is required");
    }

    await this.getAuthToken();

    switch (requestData.action) {
      case "offices":
        return await this.getOffices(requestData, time);
      case "calculate":
        return await this.calculate(requestData, time);
      default:
        return this.sendValidationError("Unknown action");
    }
  }

  sendValidationError(message) {
    return new Response(JSON.stringify({ message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "X-Service-Version": "3.11.1",
      },
    });
  }

  startMetrics() {
    return performance.now();
  }

  async httpRequest(method, data, useFormData = false, useJson = false) {
    const url = `${this.baseUrl}/${method}`;
    const headers = {
      Accept: "application/json",
      "X-App-Name": "widget_pvz",
      "X-App-Version": "3.11.1",
      "User-Agent": "widget/3.11.1",
    };

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    let options = {
      method: "GET",
      headers,
    };

    if (useFormData) {
      options.method = "POST";
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";

      const formData = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      options.body = formData;
    } else if (useJson) {
      options.method = "POST";
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    } else {
      // Для GET запросов добавляем параметры в URL
      const urlWithParams = new URL(url);
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlWithParams.searchParams.append(key, value);
        }
      });
      options.url = urlWithParams.toString();
    }

    try {
      const response = await fetch(options.url || url, options);

      const result = await response.text();
      const addedHeaders = this.getHeaderValue(response.headers);

      return {
        result,
        addedHeaders,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      console.error("HTTP request error:", error);
      throw new Error(`HTTP request failed: ${error.message}`);
    }
  }

  getHeaderValue(headers) {
    const addedHeaders = [];
    headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("x-")) {
        addedHeaders.push(`${key}: ${value}`);
      }
    });
    return addedHeaders;
  }

  endMetrics(metricName, metricDescription, start) {
    const time = performance.now() - start;
    this.metrics.push({
      name: metricName,
      description: metricDescription,
      time: Math.round(time * 100) / 100,
    });
  }

  sendResponse(data, start) {
    this.endMetrics("total", "Total Time", start);

    const headers = {
      "Content-Type": "application/json",
      "X-Service-Version": "3.11.1",
    };

    // Добавляем заголовки СДЭК
    if (data.addedHeaders && data.addedHeaders.length > 0) {
      data.addedHeaders.forEach((header) => {
        const [key, value] = header.split(": ");
        if (key && value) headers[key] = value;
      });
    }

    // Добавляем Server-Timing
    if (this.metrics.length > 0) {
      const serverTiming = this.metrics
        .map(
          (metric) =>
            `${metric.name};desc="${metric.description}";dur=${metric.time}`
        )
        .join(", ");
      headers["Server-Timing"] = serverTiming;
    }

    // ❗ ГАРАНТИРУЕМ, что ответ ВСЕГДА JSON
    let json;

    try {
      json = JSON.parse(data.result);
    } catch (e) {
      json = {
        error: true,
        raw: data.result,
        status: data.status,
        statusText: data.statusText,
      };
    }

    return new Response(JSON.stringify(json), {
      status: data.status || 200,
      headers,
    });
  }

  async getAuthToken() {
    const time = this.startMetrics();

    const tokenData = {
      grant_type: "client_credentials",
      client_id: this.login,
      client_secret: this.secret,
    };

    const token = await this.httpRequest("oauth/token", tokenData, true);
    this.endMetrics("auth", "Server Auth Time", time);

    const result = JSON.parse(token.result);

    if (!result.access_token) {
      throw new Error("Server not authorized to CDEK API");
    }

    this.authToken = result.access_token;
  }

  async getOffices(requestData, startTime) {
    const time = this.startMetrics();

    // Удаляем action из данных запроса
    const { action, ...params } = requestData;

    const result = await this.httpRequest("deliverypoints", params);
    this.endMetrics("office", "Offices Request", time);

    return this.sendResponse(result, startTime);
  }

  async calculate(requestData, startTime) {
    const time = this.startMetrics();

    // Удаляем action из данных запроса
    const { action, ...params } = requestData;

    const result = await this.httpRequest(
      "calculator/tarifflist",
      params,
      false,
      true
    );
    this.endMetrics("calc", "Calculate Request", time);

    return this.sendResponse(result, startTime);
  }
}

async function handleRequest(method, searchParams, body) {
  try {
    const service = new CDEKService();

    // Объединяем параметры из URL и body
    const requestData = { ...searchParams };
    if (body) {
      Object.assign(requestData, body);
    }

    console.log("CDEK Service request:", { method, requestData });

    return await service.process(requestData);
  } catch (error) {
    console.error("Service processing error:", error);
    return new Response(
      JSON.stringify({
        error: "Service error",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "X-Service-Version": "3.11.1",
        },
      }
    );
  }
}
