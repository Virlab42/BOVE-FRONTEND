'use client'
import Image from "next/image";
import '../Home/Form/Form.scss'
import Inputmask from 'inputmask';
import { useEffect, useRef, useState } from 'react';

export default function FormGallery() {

  const inputRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: ''});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false }).mask(inputRef.current);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawPhone = inputRef.current.inputmask.unmaskedvalue();

    if (!rawPhone || rawPhone.length !== 10) {
      setStatus('Введите корректный номер телефона.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Отправка...');

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('Заявка успешно отправлена!');
        setFormData({ name: '', phone: '', message: '' });
        setShowModal(true);
      } else {
        setStatus('Ошибка при отправке. Попробуйте снова.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Ошибка при отправке. Попробуйте снова.');
    }finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Закрыть модальное окно
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-head">
            <p className="form-title">Понравился проект?</p>
            <span>МЫ ПЕРЕЗВОНИМ И&nbsp;ОТВЕТИМ НА&nbsp;ВСЕ ВОПРОСЫ</span>
        </div>
        <div className="form-form">
                        <div className="group">      
                            <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                             />
                            <span className="bar"></span>
                            <label>Имя</label>
                        </div>
                        <div className="group">      
                          <input
                              ref={inputRef}
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                          />
                            <span className="bar"></span>
                            <label>Телефон</label>
                        </div>
            <span className="conf">Нажимая на кнопку “отправить заявку”, я соглашаюсь с условиями <a href="#"   type="button" data-bs-toggle="modal" data-bs-target="#сonfidentiality">политики конфиденциальности</a></span>
            <button type="submit" className="link-more" href='#' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span>ОТПРАВКА...</span>
                </>
              ) : (
                <>
                  <span>ОТПРАВИТЬ ЗАЯВКУ</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                  </svg>
                </>
              )}
                </button>
        </div>
      </form>
      {showModal && (
        <div className="modal-tg">
          <div className="modal-tg-content">
            <h2>Заявка отправлена!</h2>
            <p>Мы получили вашу заявку и свяжемся с вами в ближайшее время</p>
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}
