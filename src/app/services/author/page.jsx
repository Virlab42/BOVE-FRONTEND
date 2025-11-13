import Image from "next/image";
import Link from "next/link";
import Form from "../../../../components/Home/Form/Form";
import '../servicesinfo.scss'


export const metadata = {
  title: "Авторский надзор за строительством и реализацией проектов",
  description: "Профессиональный авторский надзор за строительством вашего дома. Доверьтесь экспертам!",
  alternates: {
    canonical: 'https://alyakina.ru/services/author'
  },
  keywords: [
    'авторское сопровождение',
    'авторский надзор',
    'контроль за проектом',
    'сопровождение архитектурных проектов',
    'сопровождение дизайнерских проектов',
    'проектный контроль',
    'проектное сопровождение',
    'контроль качества на стройке',
    'поддержка на всех этапах',
    'реализация архитектурных проектов',
    'реализация дизайнерских решений',
    'сопровождение строительства',
    'строительство домов',
    'реализация проектов',
    'загородные дома',
  ],
  openGraph: {
    title: "Авторский надзор за строительством и реализацией проектов",
    description: "Профессиональный авторский надзор за строительством вашего дома. Доверьтесь экспертам!",
    url: `https://alyakina.ru/services/author`,
    images: [
        {
            url: `/favicon/favicon-96x96.png`,
            alt: 'Студия Софии Алякиной',
        },
    ],
},
};

export default function Author() {
  return (
    <>
      <div className="page-info">
        <h1>Авторский надзор</h1>
        <div className="introduction">
            <p>
                Авторский надзор — самый ответственный этап в работе дизайнера, от которого зависит конечный результат. Идеально подобранная концепция интерьера, наличие визуализации и строительных чертежей не гарантируют, что ремонтная бригада будет строго их придерживаться. Кроме этого, во время ремонта могут возникать непредвиденные сложности, которые потребуют корректировок.
                
            </p>
        </div>

        <div id="detailed" className="detailed">
          <div className="detailed-title">
            <h2>Стоимость услуги</h2>
            <p>Авторский надзор дизайнера подразумевает контроль строительных работ и уточнение деталей, которые невозможно было предусмотреть на этапе проектирования. Благодаря этой услуге можно точно воссоздать первоначальный замысел, а также избежать необоснованных переплат и переделок.</p>
          </div>
          <div className="detailed-content">
            <div className="price-num">
              <div>
                <p> от 40 000* руб/мес</p>
                <span>*зависит от площади и удаленности объекта</span>
              </div>
            </div>

          </div>
        </div>

        <div id="detailed" className="detailed">
          <div className="detailed-title">
            <h2>Что включает услуга авторского
            сопровождения</h2>
          </div>
          <div className="detailed-content">
            
            <div className="detailed-accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Помощь в подборе профессиональных подрядчиков
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Проводим тендер среди проверенных подрядчиков, чтобы подобрать строительную бригаду, которая успешно справится с реализацией проекта. Участвуем в составлении графика строительных работ.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Консультации по дизайн-проекту
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  В процессе авторского сопровождения дизайн-проекта консультируем строителей по эскизам и технической документации, даем рекомендации, чтобы избежать возможных ошибок.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Внесение корректировок
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Необходимость правок может быть обусловлена новыми обстоятельствами, которые открылись в ходе проведения работ. В этом случае дизайнер интерьера скорректирует чертежи таким образом, чтобы не нарушить общую концепцию.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Посещение объекта
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  По договору на регулярной основе дизайнер выезжает на объект, чтобы сверить проделанные работы с дизайн-проектом. Это позволяет вовремя выявить недостатки и исправить их без глобальных вложений.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
                  Ведение отчетов
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Благодаря отчетности вы сможете удаленно контролировать процесс и будете иметь полное представление о ходе ремонтных работ.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="detailed-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseFour">
                  Контроль сроков
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                  </button>
                </h2>
                <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Мы будем контролировать соблюдение графика строительства, чтобы обеспечить своевременную сдачу объекта.
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
