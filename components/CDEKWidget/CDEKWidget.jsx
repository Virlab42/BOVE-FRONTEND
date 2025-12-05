"use client";

import { useEffect } from "react";

export default function CDEKWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3/dist/widget.js";
    script.async = true;

    script.onload = () => {
      if (!window.CDEKWidget) {
        console.error("CDEK Widget не загрузился");
        return;
      }

      // ⚡️ Минимальная инициализация для проверки отрисовки ПВЗ
      new window.CDEKWidget({
        from: "Москва",             // город отправителя
        root: "cdek-widget",        // id контейнера
        apiKey: "3134a676-b82e-4ad9-b210-e20c3dcf7772", // ключ Yandex Maps, нужен обязательно
        servicePath: "/api/cdek/service", // путь к вашему API роуту
        defaultLocation: "Москва",  // центр карты при загрузке
        type: "pvz",                // только ПВЗ
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="cdek-widget" style={{ width: "100%", height: "600px" }} />;
}
