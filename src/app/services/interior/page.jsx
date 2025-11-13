import Image from "next/image";
import Link from "next/link";
import Form from "../../../../components/Home/Form/Form";
import '../servicesinfo.scss'


export const metadata = {
  title: "Дизайн интерьера квартир и загородных домов",
  description: "Уникальный дизайн интерьера для вашего дома или квартиры. Реализуем ваши идеи!",
  alternates: {
    canonical: 'https://alyakina.ru/interior'
  },
  keywords: [
    'дизайн интерьера квартир',
    'дизайн интерьера домов',
    'уникальный дизайн интерьера',
    'дизайн интерьера под ключ',
    'интерьер для квартиры',
    'интерьер для дома',
    'современный дизайн интерьера',
    'архитектурный дизайн интерьера',
    'проектирование интерьера квартиры',
    'проектирование интерьера дома',
    'дизайн жилых помещений',
    'индивидуальный дизайн интерьера',
    'профессиональный дизайн интерьера',
    'дизайн интерьера от студии',
    'дизайн интерьера',
    'дизайн квартиры',
    'загородные дома',
    'интерьер дома',
    'дизайн проект',
  ],
  openGraph: {
    title: "Дизайн интерьера квартир и загородных домов",
    description: "Уникальный дизайн интерьера для вашего дома или квартиры. Реализуем ваши идеи!",
    url: `https://alyakina.ru/services/interior`,
    images: [
        {
            url: `/favicon/favicon-96x96.png`,
            alt: 'Студия Софии Алякиной',
        },
    ],
},
};

export default function Interior() {
  return (
    <>
      <div className="page-info">
        <h1>Дизайн интерьера квартир и домов</h1>
        <div className="introduction column">
            <p>
                Хороший ремонт для комфортной жизни начинается с профессионального дизайн-проекта квартиры. С командой дизайнеров и архитекторов нашей студии вы получите современный, стильный и функциональный интерьер.
                <br></br><br></br>
                Наша главная задача — создать комфортную среду для жизни и работы, учитывая все пожелания заказчика. Мы знаем, как сделать индивидуальный проект который будет актуален на протяжении долгих лет.
                
            </p>
            <div>
                <Image src={`/Services/interior.webp`} alt='Дизайн интерьера квартир и домов — студия Софии Алякиной' width={1000} height={1000}/>
                <div className="detailed-title">
                    <h2>Зачем необходим дизайн-проект?</h2>
                    <p>Авторский дизайн требует не только хорошего вкуса, но и умения применять правила эргономики, знаний в области архитектуры, строительства и других смежных сферах, а также практического опыта. В хорошем проекте интерьера все взаимосвязано — чтобы получить целостную картину, нужно продумать каждую мелочь на всех этапах, от планировки помещения до отделки и декорирования.</p>
                    <p>Главная задача дизайнера — создать эргономичное и комфортное пространство, в котором каждый метр будет использоваться максимально рационально. Специалист поможет разобраться в ваших желаниях, учтет потребности каждого члена семьи, заранее покажет результат ремонта и предотвратит ошибки при его выполнении, переделка которых может дорого обойтись.</p>
                </div>
            </div>
        </div>
        <div className="price">
          <h2>СТОИМОСТЬ ДИЗАЙНА ИНТЕРЬЕРА</h2>
          <div className="price-container">

            <div className="price-card">
              <p className="price-title">Базовый</p>
              <div className="price-price">
                <p>600₽</p>
                <span>[ за 1 кв.м. ]</span>
              </div>
              <div className="price-points">
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Эскизный проект</span>
              </div>
              <div className="price-buttons">
                <div>
                  <button  data-bs-toggle="modal" data-bs-target="#exampleModal">Заказать</button>
                </div>
              </div>
            </div>
            <div className="price-card">
              <p className="price-title">Стандартный</p>
              <div className="price-price">
                <p>1500₽</p>
                <span>[ за 1 кв.м. ]</span>
              </div>
              <div className="price-points">
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Эскизный проект</span>
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Рабочая документация</span>
              </div>
              <div className="price-buttons">
                <div>
                  <button  data-bs-toggle="modal" data-bs-target="#exampleModal">Заказать</button>
                </div>
              </div>
            </div>
            <div className="price-card">
              <p className="price-title">Максимальный</p>
              <div className="price-price">
                <p>2000₽</p>
                <span>[ за 1 кв.м. ]</span>
              </div>
              <div className="price-points">
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Эскизный проект</span>
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Рабочая документация</span>
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Визуализация</span>
              </div>
              <div className="price-buttons">
                <div>
                  <button  data-bs-toggle="modal" data-bs-target="#exampleModal">Заказать</button>
                </div>
              </div>
            </div>

          </div>
          <p className="min">*Минимальная стоимость проекта 40 000 руб.</p>
        </div>

        <div id="detailed" className="detailed">
          <div className="detailed-title">
            <h2>этапы работ по созданию проекта</h2>
            <p>Вы сможете увидеть интерьер до начала строительства. <br></br>
            В результате нашей работы вы получаете альбом с 3D-визуализациями помещений в различных ракурсах + альбом строительных чертежей.</p>
          </div>
          <div className="detailed-content">
            
            <div className="detailed-accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Планировочное решение и эскизный проект
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  <ul>
                    <li>Первая встреча, на которой мы знакомим вас с принципами и условиями нашей работы, рассматриваем исходные данные вашего объекта, согласуем сроки на проектирование и реализацию, а также ориентировочный бюджет</li>
                    <li>Обмеры помещений и фотофиксация</li>
                    <li>Формирование задания на проект: детальная беседа на тему ваших пожеланий, образа жизни и увлечений, а также ваших предпочтений по наполнению помещений, фактурам, цветовой гамме и др.</li>                  
                    <li>Разработка планировочного решения</li>
                    <li>Подбор референсов для определения стиля и цветовой гаммы</li>
                  </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  3D-визуализация проекта
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <ul>
                      <li>Разработка 3D-визуализации одного стилеобразующего помещения, чтобы передать основные дизайн-идеи</li>
                      <li>Разработка 3D-визуализаций остальных помещений на основе утвержденных решений по стилеобразующему помещению</li>
                      <li>3D-визуализации выполняются для всех согласованных помещений кроме подсобных и технических</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Рабочие чертежи
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <ul>
                      <li>Общие рекомендации</li>
                      <li>На стройке (информация для реализации проекта)</li>
                      <li>Эстетика</li>
                      <li>Содержание</li>
                      <li>План демонтажа</li>
                      <li>План монтажа</li>
                      <li>Обмерный план после перепланировки</li>
                      <li>План дверей</li>
                      <li>План расстановки мебели</li>
                      <li>Сантехническое оборудование</li>
                      <li>План освещения</li>
                      <li>План вкл выкл</li>
                      <li>План электрики</li>
                      <li>План напольного покрытия</li>
                      <li>План отопления</li>
                      <li>План потолка</li>
                      <li>План отделки стен</li>
                      <li>План развертки стен</li>
                      <li>Развертки всех стен</li>
                      <li>Ведомость отделки</li>
                      <li>Ведомость электрооборудования</li>
                      <li>Необходимые конструктивные разрезы</li>
                      <li>3D визуализация</li>
                    </ul>
                    <p>*И все необходимые чертежи, в зависимости от сложности проекта </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="detailed" className="detailed">
          <div className="detailed-title">
            <h2>дополнительные услуги при реализации проекта</h2>
          </div>
          <div className="detailed-content">
            
            <div className="detailed-accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseOne">
                  Авторское сопровождение проекта
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Готовый проект — план действий для строительной бригады. Но чтобы идея была воплощена в жизнь точно так, 
                    как задумал дизайнер, необходимо контролировать соответствие проведенных работ оригинальному проекту. 
                    Для этого нужен авторский надзор, цена которого зависит от количества месяцев, запланированных для реализации проекта.
                  <ul>
                    <li>Подбор подрядчиков на проект</li>
                    <li>Консультирование прораба бригады и других подрядчиков</li>
                    <li>Выезд 1 раз в неделю на объект</li>                  
                    <li>​Контроль соответствия строительных работ проекту</li>
                    <li>Внесение корректирующих изменений в чертежи</li>
                    <li>Формирование отчета о работах с фотографиями</li>
                    <li>Координация графика работ</li>
                    <li>Координация всех участников проекта</li>                  
                    <li>Создаем общее информационное поле по проекту с доступом для заказчика, подрядчиков и команды</li>
                  </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseTwo">
                  Комплектация
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Выбор, закупка, организация доставки материалов, мебели, декора, сантехнических и осветительных приборов в согласно графику работ.
                    <ul>
                      <li>Разработка графика поставок</li>
                      <li>Подбор отделочных материалов, фабричных и индивидуальных позиций в проект</li>
                      <li>Организация процесса изготовления индивидуальных позиций</li>
                      <li>Консультация поставщиков и производителей индивидуальных объектов по проекту</li>
                      <li>Проверка рабочих чертежей поставщиков на соответствие дизайн-проекту</li>
                      <li>Подбор образцов отделок с выездом в салоны</li>
                      <li>Переподбор позиций при необходимости</li>
                      <li>Организация общего поля проекта со всей документацией по закупкам</li>
                      <li>Формирование финального отчета по закупкам, актуализация сметы и графика</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Form />
    </>
  );
}
