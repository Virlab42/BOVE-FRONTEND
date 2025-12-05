export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3" crossorigin="anonymous"></script>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          background: transparent;
        }
        
        #widget-container {
          width: 100%;
          height: 500px;
          position: relative;
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-family: inherit;
          color: #666;
          background: #fff;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #a50034;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Стилизация виджета CDEK */
        .cdek-widget {
          font-family: inherit !important;
        }
        
        /* Стили для карты */
        [class*="ymaps-2"][class*="-ground-pane"] {
          filter: grayscale(0.1) !important;
        }
        
        /* Стили для списка пунктов выдачи */
        .point-list-item {
          border: 1px solid #d9d9d9 !important;
          border-radius: 0px !important;
          margin: 8px 0 !important;
          transition: all 0.3s ease !important;
        }
        
        .point-list-item:hover {
          border-color: #a50034 !important;
          box-shadow: 0 2px 8px rgba(165, 0, 52, 0.1) !important;
        }
        
        .point-list-item.selected {
          border-color: #a50034 !important;
          background-color: rgba(165, 0, 52, 0.05) !important;
        }
        
        /* Стили для кнопок в виджете */
        button {
          font-family: inherit !important;
          border-radius: 0px !important;
          transition: all 0.3s ease !important;
        }
        
        button:hover {
          opacity: 0.9 !important;
        }
        
        /* Стили для заголовков */
        h1, h2, h3, h4, h5, h6 {
          font-family: inherit !important;
          color: #a50034 !important;
        }
        
        /* Стили для полей ввода */
        input, select, textarea {
          font-family: inherit !important;
          border-radius: 0px !important;
          border: 1px solid #d9d9d9 !important;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: #a50034 !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(165, 0, 52, 0.1) !important;
        }
        
        /* Стили для выбранного пункта */
        .selected-point {
          background-color: rgba(165, 0, 52, 0.05) !important;
          border-left: 3px solid #a50034 !important;
        }
        
        /* Стили для цен */
        .price {
          color: #a50034 !important;
          font-weight: 600 !important;
        }
        
        /* Стили для информации о пункте */
        .point-info {
          padding: 12px !important;
          background: #fff !important;
        }
        
        .point-name {
          color: #333 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }
        
        .point-address {
          color: #666 !important;
          font-size: 13px !important;
          margin-top: 4px !important;
        }
        
        /* Стили для кнопки выбора */
        .select-button {
          background-color: #a50034 !important;
          color: white !important;
          border: none !important;
          padding: 10px 20px !important;
          cursor: pointer !important;
          font-weight: 500 !important;
        }
        
        .select-button:hover {
          background-color: #8a002c !important;
        }
        
        /* Стили для индикатора загрузки */
        .loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #a50034;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
      </style>
    </head>
    <body>
      <div id="widget-container"></div>
      <div id="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Загрузка карты...</p>
      </div>
      
      <script>
        let widgetInstance = null;
        let goodsWeight = 0.1;
        let selectedPointData = null;
        
        function initWidget() {
          try {
            if (window.CDEKWidget && typeof window.CDEKWidget === 'function') {
              const container = document.getElementById('widget-container');
              const loading = document.getElementById('loading');
              
              if (loading) {
                loading.style.display = 'none';
              }
              
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
                onReady: () => {
                  console.log('✅ CDEK Widget ready');
                  window.parent.postMessage({ type: 'WIDGET_READY' }, '*');
                  
                  // Попробуем получить данные через события виджета
                  setupWidgetEventListeners();
                },
                onChoose: (pointCode) => {
                  console.log('📍 Point selected (code):', pointCode);
                  
                  // Пробуем получить детали точки через API виджета
                  getPointDetails(pointCode);
                },
                onError: (error) => {
                  console.error('❌ Widget error:', error);
                  window.parent.postMessage({ 
                    type: 'WIDGET_ERROR',
                    payload: error.message || 'Ошибка загрузки карты'
                  }, '*');
                }
              };
              
              // Добавляем данные о товарах
              config.goods = [
                { weight: goodsWeight, length: 30, width: 30, height: 30 }
              ];
              
              widgetInstance = new window.CDEKWidget(config);
            } else {
              setTimeout(initWidget, 100);
            }
          } catch (error) {
            console.error('❌ Widget initialization error:', error);
            window.parent.postMessage({ 
              type: 'WIDGET_ERROR',
              payload: error.message || 'Ошибка инициализации'
            }, '*');
          }
        }
        
        function setupWidgetEventListeners() {
          // Слушаем события изменения состояния виджета
          setTimeout(() => {
            // Попробуем получить доступ к внутренним методам виджета
            if (widgetInstance && widgetInstance.getSelectedPoint) {
              console.log('Widget has getSelectedPoint method');
            }
            
            // Пробуем слушать DOM события
            document.addEventListener('click', function(e) {
              // Если клик по элементу точки
              if (e.target.closest('[data-point-code]')) {
                const pointCode = e.target.closest('[data-point-code]').getAttribute('data-point-code');
                console.log('Point clicked:', pointCode);
                getPointDetails(pointCode);
              }
            });
          }, 2000);
        }
        
        function getPointDetails(pointCode) {
          if (!pointCode) {
            console.log('No point code provided');
            return;
          }
          
          // Попробуем получить детали через API СДЭК
          const apiUrl = window.location.origin + '/api/cdek/service';
          
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'point_details',
              code: pointCode
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Point details from API:', data);
            
            if (data && data.entity) {
              const point = data.entity;
              const pointData = {
                id: point.code || point.id || pointCode,
                name: point.name || "Пункт выдачи СДЭК",
                address: point.location?.address || point.address || point.fullAddress || "",
                price: point.delivery_sum || 300,
                city: point.location?.city || point.city || "",
                deliveryPeriod: "3-5 дн."
              };
              
              console.log('📍 Processed point data:', pointData);
              selectedPointData = pointData;
              
              window.parent.postMessage({ 
                type: 'POINT_SELECTED',
                payload: pointData
              }, '*');
            } else {
              // Если API не вернул данные, создаем базовый объект
              const pointData = {
                id: pointCode,
                name: "Пункт выдачи СДЭК",
                address: "Адрес будет указан при оформлении",
                price: 300,
                city: "Москва",
                deliveryPeriod: "3-5 дн."
              };
              
              selectedPointData = pointData;
              window.parent.postMessage({ 
                type: 'POINT_SELECTED',
                payload: pointData
              }, '*');
            }
          })
          .catch(error => {
            console.error('Error fetching point details:', error);
            
            // Создаем базовый объект при ошибке
            const pointData = {
              id: pointCode,
              name: "Пункт выдачи СДЭК",
              address: "Адрес будет уточнен при доставке",
              price: 300,
              city: "Москва",
              deliveryPeriod: "3-5 дн."
            };
            
            selectedPointData = pointData;
            window.parent.postMessage({ 
              type: 'POINT_SELECTED',
              payload: pointData
            }, '*');
          });
        }
        
        // Альтернативный метод: слушаем изменения в DOM виджета
        function setupDOMMutationObserver() {
          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.type === 'childList') {
                // Ищем выбранные точки в DOM
                const selectedElements = document.querySelectorAll('[class*="selected"], [class*="active"], [data-selected="true"]');
                selectedElements.forEach(el => {
                  const pointCode = el.getAttribute('data-code') || 
                                   el.getAttribute('data-point-code') || 
                                   el.getAttribute('id');
                  if (pointCode && pointCode !== selectedPointData?.id) {
                    console.log('Found selected point in DOM:', pointCode);
                    getPointDetails(pointCode);
                  }
                });
              }
            });
          });
          
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'data-selected', 'data-code']
          });
        }
        
        // Обработка сообщений от родительского окна
        window.addEventListener('message', (event) => {
          console.log('Iframe received message:', event.data);
          if (event.data.type === 'SET_GOODS') {
            goodsWeight = event.data.payload.weight || 0.1;
            if (widgetInstance && widgetInstance.destroy) {
              widgetInstance.destroy();
              initWidget();
            }
          }
        });
        
        // Инициализация при загрузке
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function() {
            initWidget();
            setupDOMMutationObserver();
          });
        } else {
          initWidget();
          setupDOMMutationObserver();
        }
        
        // Отправляем сообщение о готовности
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.parent.postMessage({ type: 'IFRAME_LOADED' }, '*');
          }, 1000);
        });
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
