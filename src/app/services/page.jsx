import Image from "next/image";
import './services.scss'
import './servicesinfo.scss'
import Link from "next/link";
import Form from "../../../components/Home/Form/Form";
import ServicesPage from "../../../components/ServicesPage/ServicesPage";


export const metadata = {
  title: "Услуги по дизайну интерьера и проектированию домов",
  description: "Профессиональные услуги: дизайн интерьера, проектирование домов, авторский надзор. Закажите проект!",
  alternates: {
    canonical: 'https://alyakina.ru/services'
  },
  keywords: [
    'услуги архитектуры',
    'услуги дизайна интерьеров',
    'архитектурное проектирование',
    'дизайн интерьеров',
    'авторский надзор',
    'разработка интерьера',
    'проектирование интерьера',
    'архитектурные услуги',
    'дизайнерские услуги',
    'услуги для дома',
    'услуги для бизнеса',
    'дизайн квартир',
    'дизайн домов',
    'создание интерьера',
    'проектирование помещений',
    'услуги дизайн интерьера',
    'проектирование домов',
    'заказать проект',
    'дизайн студия',
  ],
  openGraph: {
    title: "Услуги по дизайну интерьера и проектированию домов",
    description: "Профессиональные услуги: дизайн интерьера, проектирование домов, авторский надзор. Закажите проект!",
    url: `https://alyakina.ru/services/interior`,
    images: [
        {
            url: `/favicon/favicon-96x96.png`,
            alt: 'Студия Софии Алякиной',
        },
    ],
},
};

export default function Services() {
  return (
    <>
      <div className="page">
        <h1>Услуги</h1>
        <div className="services-container">
          <div className="services-pc">
            <div className="services-card">
                <p>Индивидуальное проектировние</p>
                <span>Дает понимание «Каким будет дом» и включает в себя полный комплекс проектирования дома.</span>
                <Link href='/services/arhcitect'>Подробнее</Link>
            </div>
            <div className="services-card">
                <p>Дизайн<br></br>интерьера</p>
                <span>Дает представление об интерьере и включает планы, схемы и 3D-визуализацию.</span>
                <Link href='/services/interior'>Подробнее</Link>
            </div>
            <div className="services-card">
                <p>Авторское<br></br>сопровождение</p>
                <span>Контроль реализации архитектурного замысла автора с эстетической точки зрения.</span>
                <Link href='/services/author'>Подробнее</Link>
            </div>
          </div>
          <ServicesPage />

        </div>
      </div>
      <Form/>
    </>
  );
}
