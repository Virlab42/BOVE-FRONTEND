'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductInfo({ product, onOpenSizeGuide }) {
  const { id, title, price, colors = [], sizes = [] } = product;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const { add } = useCart(); // получаем доступ к глобальной корзине

  const handleAddToCart = () => {
    add({
      id,
      title,
      price,
      color: selectedColor,
      size: selectedSize,
    });
    console.log('Добавлено в корзину:', { id, selectedColor, selectedSize });
  };

  return (
    <div className="product-page__info">

      <h1 className="title">{title}</h1>
      <div className="price">{price} ₽</div>

      {/* === Цвет === */}
      <div className="choose">
        <div className="label">Цвет: {selectedColor}</div>
        <div className="color-row">
          {colors.map((hex) => (
            <div
              key={hex}
              className={`color-swatch ${selectedColor === hex ? 'active' : ''}`}
              style={{ backgroundColor: hex }}
              onClick={() => setSelectedColor(hex)}
            />
          ))}
        </div>
      </div>

      {/* === Размер === */}
      <div className="choose">
        <div className="label">Размер</div>
        <div className="size-row">
          {sizes.map((s) => (
            <button
              key={s}
              className={`size-btn ${selectedSize === s ? 'active' : ''}`}
              onClick={() => setSelectedSize(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="size-guide-link" onClick={onOpenSizeGuide}>
        Таблица размеров
      </div>

      <button className='add-cart' onClick={handleAddToCart}>Добавить в корзину</button>

    </div>
  );
}
