import Image from "next/image";
import Link from "next/link";
import Form from "../../../../components/Home/Form/Form";
import '../servicesinfo.scss'


export const metadata = {
  title: "Индивидуальное проектирование домов и коттеджей",
  description: "Создаем уникальные проекты домов с учетом ваших пожеланий. Закажите проект уже сегодня!",
  alternates: {
    canonical: 'https://alyakina.ru/services/architect'
  },
  keywords: [
    'индивидуальное проектирование',
    'архитектурное проектирование',
    'проектирование жилых помещений',
    'проектирование коммерческих объектов',
    'эксклюзивное проектирование',
    'персонализированный дизайн',
    'создание архитектурных проектов',
    'проектирование для дома',
    'проектирование для бизнеса',
    'проектирование под ключ',
    'дизайн под заказ',
    'проектирование домов',
    'индивидуальный проект',
    'загородные дома',
  ],
    openGraph: {
      title: "Индивидуальное проектирование домов и коттеджей",
      description: "Создаем уникальные проекты домов с учетом ваших пожеланий. Закажите проект уже сегодня!",
      url: `https://alyakina.ru/services/architect`,
      images: [
          {
              url: `/favicon/favicon-96x96.png`,
              alt: 'Студия Софии Алякиной',
          },
      ],
  },
};

export default function Arhcitect() {
  return (
    <>
      <div className="page-info">
        <h1>Индивидуальное проектирование домов и&nbsp;коттеджей</h1>
        <div className="introduction">
            <p>
                В нашей студии архитектуры и дизайна мы следуем комплексному подходу, 
                объединяющему архитектурное проектирование и проработку интерьера до мельчайших деталей. 
                Мы создаем не просто здания, а гармоничные пространства, где каждый элемент связан общей идеей.
                <br></br><br></br>
                Наша команда профессионалов работает над проектами от разработки концепции до финальных штрихов в интерьере. 
                Мы убеждены, что архитектура и дизайн — это единое целое, и стремимся создавать решения, где они находятся в идеальной гармонии. 
                При оформлении интерьеров мы учитываем архитектурные особенности, чтобы создавать атмосферу, которая отражает ваш стиль и образ жизни.
                <br></br><br></br>
                Синергия архитектурных и дизайнерских решений открывает перед нами новые возможности. 
                Это позволяет реализовывать проекты, которые становятся уникальными, функциональными и полностью соответствуют вашим ожиданиям, 
                превращая ваши идеи в реальность.
            </p>
            <Image src={`/Services/architect.webp`} alt='Проектирование домов и коттеджей, индивидуальное проектирование частных загородных домов' width={1000} height={1000}/>
        </div>
        <div className="price">
          <h2 className="price-non-points">СТОИМОСТЬ ПРОЕКТИРОВАНИЯ ДОМОВ И КОТТЕДЖЕЙ</h2>
          <div className="price-container non-points">

            <div className="price-card non-points">
              <div>
                <div className="price-price">
                  <p>500₽</p>
                  <span>[ за 1 кв.м. ]</span>
                </div>
                <p className="min-non-points">*Минимальная стоимость 60 000 руб.</p>
              </div>
              <div className="price-points">
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Эскизный проект</span>
                  <span><svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                  Архитектурный проект</span>
              </div>
              <div className="price-buttons">
                <div>
                  <button  data-bs-toggle="modal" data-bs-target="#exampleModal">Заказать</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="detailed" className="detailed">
          <div className="detailed-title">
            <h2>Что входит в индивидуальный проект частного дома</h2>
            <p>Готовый проект — это полный пакет документации, на основании которого ведется строительство загородного дома. Услуга проектирования включает:</p>
          </div>
          <div className="detailed-content">
            
            <div className="detailed-accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Эскизный проект
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Он определяет общую архитектурную концепцию будущего дома. На этапе эскизного проекта определяются внешний вид объекта, его расположение на участке, планы этажей, планировочное решение, функциональный состав помещений с расстановкой мебели, а также выполняется реалистичная 3D визуализация, которая дает представление, как будет выглядеть дом.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Архитектурный проект
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <ul>
                      <li>Общие данные о проекте и спецификация материалов</li>
                      <li>Разбивочный план осей</li>
                      <li>Генеральный план с привязкой</li>
                      <li>Кладочные и маркировочные планы</li>
                      <li>Фасады со всеми высотными отметками</li>
                      <li>Основные разрезы по дому</li>
                      <li>Экспликация полов, особенности заполнения проемов окон и дверей</li>
                      <li>План кровли</li>
                      <li>3D визуализация объекта</li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>

          </div>
        </div>

        <div className="service-advantage">
          <div className="advantage-title">
            <h2>В ЧЕМ ЗАКЛЮЧАЮТСЯ ПРЕИМУЩЕСТВА ИНДИВИДУАЛЬНОГО ПРОЕКТА?</h2>
            <p>Индивидуальное проектирование частных домов и коттеджей — единственная возможность получить качественное, надежное строение без лишних переплат</p>
          </div>
          <div className="advantage-container">
            <div className="advantage-card">
              <svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
              <div className="advantage-text">
                <p>Комплексная разработка архитектуры загородного дома</p>
                <span>Возможность учесть все пожелания и решения будущего дома.</span>
              </div>
            </div>
            <div className="advantage-card">
              <svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
              <div className="advantage-text">
                <p>Учет индивидуальных потребностей и пожеланий</p>
                <span>Разработка проекта дома ведется в интересах конкретного заказчика и адаптируется под его задачи, привычки, образ жизни. </span>
              </div>
            </div>
            <div className="advantage-card">
              <svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
              <div className="advantage-text">
                <p>Выбор наилучшего расположения на участке</p>
                <span>Специалисты проводят всесторонний анализ участка: размер, особенности грунта, рельефа, расположение коммуникаций, соседних зданий и т.д.</span>
              </div>
            </div>
            <div className="advantage-card">
              <svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
              <div className="advantage-text">
                <p>Снижение риска ошибок</p>
                <span>При проектировании коттеджей определяются наиболее оптимальные решения и продумывается каждая деталь, включая нагрузку на фундамент, стены и перекрытия, наиболее подходящие материалы и т.д. Это значит, что во время и после строительства не придется вносить глобальные корректировки.</span>
              </div>
            </div>
            <div className="advantage-card">
              <svg width="64px" height="64px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
              <div className="advantage-text">
                <p>Подготовка к строительству</p>
                <span>Проект позволяет заложить все необходимые расходы, составить точный бюджет и планировать сроки строительных работ.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Form />
    </>
  );
}
