'use client';
import { useEffect, useRef } from 'react';

export default function CDEKWidget({ onPointSelect }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3';

    script.onload = () => {
      if (window.CDEKWidget) {
        widgetRef.current = new window.CDEKWidget({
          from: 'Москва',
          root: 'cdek-widget',
          apiKey: '3134a676-b82e-4ad9-b210-e20c3dcf7772',
          defaultLocation: 'Москва',
          servicePath: '/api/cdek/service',
          type: 'pvz',

          onChoose: (type, tariff, target) => {
            onPointSelect({
              id: target.code,
              name: target.name,
              price: target.price || 300,
              address: target.address,
              city: target.city,
              fullAddress: `${target.city}, ${target.address}`,
              coordinates: {
                lat: target.location[0],
                lng: target.location[1]
              }
            });
          },

          onError: (error) => {
            console.error('CDEK Widget error:', error);
          }
        });
      }
    };

    document.body.appendChild(script);

    // Очистка при размонтировании
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, [onPointSelect]);

  return <div id="cdek-widget" style={{ width: '100%', height: '600px' }} />;
}
