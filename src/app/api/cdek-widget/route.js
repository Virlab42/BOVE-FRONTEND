export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3" crossorigin="anonymous"></script>
<style>
  body { margin:0; font-family: sans-serif; background: transparent; }
  #widget-container { width: 100%; height: 500px; }
  .loading { display:flex; justify-content:center; align-items:center; height:100%; }
  .loader { border:3px solid #f3f3f3; border-top:3px solid #a50034; border-radius:50%; width:24px; height:24px; animation:spin 1s linear infinite; }
  @keyframes spin { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }
</style>
</head>
<body>
<div id="widget-container"></div>
<div id="loading" class="loading"><div class="loader"></div></div>

<script>
let widgetInstance = null;
let goodsWeight = 0.1;

function initWidget() {
  if (!window.CDEKWidget) {
    setTimeout(initWidget, 100);
    return;
  }

  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';

  const config = {
    from: "Москва",
    root: "widget-container",
    apiKey: "3134a676-b82e-4ad9-b210-e20c3dcf7772",
    servicePath: window.location.origin + "/api/cdek/service",
    defaultLocation: "Москва",
    canChoose: true,
    lang: "rus",
    currency: "RUB",
    date: new Date().toISOString().split('T')[0],
    debug: false,
    events: true,
    goods: [{ weight: goodsWeight, length: 30, width: 30, height: 30 }],
    onReady: () => window.parent.postMessage({ type: 'WIDGET_READY' }, '*'),
    onError: (error) => window.parent.postMessage({ type: 'WIDGET_ERROR', payload: error.message || 'Ошибка виджета' }, '*')
  };

  widgetInstance = new window.CDEKWidget(config);

  // 🔑 Главное: ловим выбор напрямую через API виджета
  widgetInstance.on("select", async (data) => {
  console.log("Выбран ПВЗ или адрес:", data);

  if (data.code) { // любое событие с code — это ПВЗ
    try {
      const res = await fetch("/api/cdek/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "point",
          code: data.code,
          tariff: "dd" // можно заменить на выбранный тариф
        })
      });
      const pointData = await res.json();

      window.parent.postMessage({
        type: "POINT_SELECTED",
        payload: pointData
      }, "*");

    } catch (err) {
      console.error("Ошибка получения ПВЗ:", err);
    }
  } else if (data.location) { // адресная доставка
    window.parent.postMessage({
      type: "POINT_SELECTED",
      payload: {
        type: "door",
        address: data.location,
        tariff: data.tariff || null
      }
    }, "*");
  }
});
}

// Слушаем команды от родителя (например, меняем вес товара)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'SET_GOODS') {
    goodsWeight = event.data.payload.weight || 0.1;
    if (widgetInstance?.destroy) {
      widgetInstance.destroy();
      initWidget();
    }
  }
});

// Инициализация
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}
</script>
</body>
</html>
`;
  return new Response(html, { headers:{ "Content-Type":"text/html" } });
}
