'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function ProductInfo({ id, onOpenSizeGuide }) {
  const [color, setColor] = useState('Белый');
  const [size, setSize] = useState('M');

  const { add } = useCart();

  const handleAddToCart = () => {
    add(id);
  };

  return (
    <div className="product-page__info">

      <h1 className="title">Костюм мужской Classic</h1>
      <div className="price">12 990 ₽</div>

      <div className="choose">
        <div className="label">Цвет</div>
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option>Белый</option>
          <option>Черный</option>
          <option>Серый</option>
        </select>
      </div>

      <div className="choose">
        <div className="label">Размер</div>
        <select value={size} onChange={e => setSize(e.target.value)}>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>

      <div className="size-guide-link" onClick={onOpenSizeGuide}>
        Таблица размеров
      </div>

      <div className="desc-block">
        <div className="label">Описание</div>
        <p>Классический костюм с прямым кроем…</p>
      </div>

      <div className="desc-block">
        <div className="label">Состав</div>
        <p>Хлопок 80%, ПЭ 20%</p>
      </div>

      <button className="add-cart" onClick={handleAddToCart}>
        Добавить в корзину
      </button>

    </div>
  );
}
