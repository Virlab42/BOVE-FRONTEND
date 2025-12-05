"use client";

import { useEffect, useState } from "react";

export default function CdekMap({ onSelect }) {
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
  const loadMap = async () => {
    await new Promise(resolve => {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YMAP_KEY}&lang=ru_RU`;
      script.onload = resolve;
      document.head.appendChild(script);
    });

    window.ymaps.ready(async () => {
      const ym = window.ymaps;

      // Получаем ПВЗ
      const res = await fetch("/api/cdek/pvz");
      const pvzList = await res.json();
      console.log("ПВЗ:", pvzList);

      const mapInstance = new ym.Map("map", {
        center: pvzList.length ? pvzList[0].coords : [55.751244, 37.618423],
        zoom: 10,
        controls: ["zoomControl"]
      });
      setMap(mapInstance);

      pvzList.forEach(p => {
        const placemark = new ym.Placemark(
          p.coords,
          {
            balloonContent: `<b>${p.name}</b><br>${p.address}`
          },
          { preset: "islands#redDotIcon" }
        );

        // Выбор по клику на маркер
        placemark.events.add("click", () => {
          onSelect(p);
        });

        mapInstance.geoObjects.add(placemark);
      });

      setPoints(pvzList);
    });
  };

  if (!window.ymaps) loadMap();
}, [onSelect]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}
