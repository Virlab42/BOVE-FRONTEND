'use client';
import Inputmask from 'inputmask';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import './CheckoutPage.scss';
import CDEKWidget from '../../../components/CDEKWidget/CDEKWidget';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Рассчитываем стоимость доставки
  const calculateDeliveryCost = () => {
    if (deliveryMethod === 'pickup') return 0;
    if (deliveryMethod === 'moscowCourier') return 800;
    if (deliveryMethod === 'cdek' && selectedPoint) {
      return selectedPoint.price || 300;
    }
    return 300;
  };

  const deliveryCost = calculateDeliveryCost();
  const finalTotal = total;

  // Маска для телефона
  useEffect(() => {
    const phoneInput = document.querySelector("input[name='phone']");
    if (phoneInput) {
      const im = new Inputmask('+7 (999) 999-99-99');
      im.mask(phoneInput);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (deliveryMethod === 'cdek') {
      if (!selectedPoint) {
        newErrors.delivery = 'Выберите пункт выдачи СДЭК';
      }
    } else if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (
      !/^[\+]?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(formData.phone)
    ) {
      newErrors.phone = 'Введите корректный телефон';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик выбора пункта СДЭК
  const handlePointSelect = (point) => {
    setSelectedPoint(point);

    // Автоматически заполняем адрес в форме
    setFormData((prev) => ({
      ...prev,
      address: point.fullAddress
    }));

    // Очищаем ошибку доставки, если была
    if (errors.delivery) {
      setErrors((prev) => ({
        ...prev,
        delivery: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        delivery: {
          method: deliveryMethod,
          point: deliveryMethod === 'cdek' ? selectedPoint : null,
          address: formData.address,
          cost: deliveryCost
        },
        items: cart,
        total: finalTotal,
        date: new Date().toISOString()
      };

      console.log('📦 Order data to send:', orderData);

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = result.paymentUrl;
      } else {
        alert('Ошибка при оформлении заказа');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при оформлении заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const cleanedPhone = formData.phone.replace(/\D/g, '');

  const isFormValid =
    formData.name.trim().length > 0 &&
    cleanedPhone.length === 11 &&
    formData.email.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.address.trim().length > 0 &&
    deliveryMethod.trim().length > 0 &&
    (deliveryMethod !== 'cdek' || selectedPoint) &&
    agreed;

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h1>Корзина пуста</h1>
          <p>Добавьте товары в корзину для оформления заказа</p>
          <button onClick={() => router.push('/')} className="back-to-shop">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Контактные данные</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя *"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__ *"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ваш email *"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group hidden-field">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder={
                      deliveryMethod === 'cdek' ? 'Адрес выбранного пункта *' : 'Ваш адрес *'
                    }
                    className={errors.address ? 'error' : ''}
                    readOnly={deliveryMethod === 'cdek'}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Способ получения</h2>

              <div className="delivery-methods">
                <label className="delivery-option">
                  <div className="delivery-info">
                    <input
                      type="radio"
                      name="delivery"
                      value="cdek"
                      checked={deliveryMethod === 'cdek'}
                      onChange={(e) => {
                        setDeliveryMethod(e.target.value);
                        setSelectedPoint(null);
                        setFormData((prev) => ({ ...prev, address: '' }));
                      }}
                    />
                    <div className='delivery-info-text'>
                      <span className="delivery-title">Доставка СДЭК</span>
                      <span className="delivery-desc">Доставим в ближайший пункт выдачи</span>
                      <span className="delivery-price">от 300 ₽</span>
                    </div>
                  </div>
                  {deliveryMethod === 'cdek' && (
                    <div className="widget-container">
                      <CDEKWidget onPointSelect={handlePointSelect} />

                      {/* Информация о выбранном пункте */}
                      {selectedPoint && (
                        <div className="selected-point-info">
                          <div className="selected-point-details">
                            <p>
                              <strong>Адрес:</strong> {selectedPoint.fullAddress}
                            </p>
                          </div>
                        </div>
                      )}

                      {errors.delivery && (
                        <span className="error-text delivery-error">{errors.delivery}</span>
                      )}
                    </div>
                  )}
                </label>

                <label className="delivery-option">
                  <div className="delivery-info">
                    <input
                      type="radio"
                      name="delivery"
                      value="moscowCourier"
                      checked={deliveryMethod === 'moscowCourier'}
                      onChange={(e) => {
                        setDeliveryMethod(e.target.value);
                        setSelectedPoint(null);
                        setFormData((prev) => ({ ...prev, address: '' }));
                      }}
                    />
                    <div className='delivery-info-text'>
                      <span className="delivery-title">Курьерская доставка по Москве</span>
                      <span className="delivery-desc">
                        — Москва (в пределах МКАД) 800 руб.
                        <br />
                        — Доставка до шоурума 1500 руб.
                        <br />
                        — Московская область (до 10 км от МКАД) 1200 руб.
                        <br />
                        — Московская область (10–30 км от МКАД) 1500 руб.
                        <br />— Московская область (30–50 км от МКАД) 2500 руб.
                      </span>
                      <span className="delivery-price">от 800 ₽</span>
                    </div>
                  </div>
                  {deliveryMethod === 'moscowCourier' && (
                    <div className="form-group">
                      <input
                        type="text"
                        value={formData.address}
                        placeholder="Введите адрес доставки *"
                        className={errors.address ? 'error' : ''}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, address: e.target.value }))
                        }
                      />
                      {errors.address && <span className="error-text">{errors.address}</span>}
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group checkout-agreement">
              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                Я согласен с{' '}
                <a
                  href="/docs/политика_конфиденциальности.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой конфиденциальности
                </a>
                *
              </label>
            </div>

            <button type="submit" className="submit-order-btn" disabled={isLoading || !isFormValid}>
              {isLoading ? 'Оформление...' : 'Оформить заказ'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Ваш заказ</h2>
          <div className="order-items">
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">× {item.quantity}</span>
                </div>
                <span className="item-price">{item.price * item.quantity} ₽</span>
              </div>
            ))}
          </div>
          <div className="order-totals">
            <div className="total-row">
              <span>Товары:</span>
              <span>{total} ₽</span>
            </div>
            <hr />
            <div className="total-row final-total">
              <span>Итого:</span>
              <span>{finalTotal} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
