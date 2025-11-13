import Form from '../../../components/Home/Form/Form';
import Portfolio from '../../../components/Portfolio/Portfolio';

export const metadata = {
    title: "Портфолио проектов загородных домов и интерьеров",
    description: "Реализованные проекты домов и интерьеров. Вдохновляйтесь и закажите свой уникальный проект!",
    alternates: {
      canonical: 'https://alyakina.ru/portfolio'
    },
    keywords: [
      'архитектурное портфолио',
      'портфолио дизайнера',
      'дизайн интерьеров портфолио',
      'проектирование интерьеров',
      'архитектурные проекты',
      'реализованные проекты',
      'жилые проекты',
      'коммерческие проекты',
      'уникальные интерьеры',
      'лучшие архитектурные проекты',
      'современные интерьеры',
      'профессиональные проекты',
      'портфолио студии дизайна',
      'портфолио проектов',
      'загородные дома, дизайн интерьера',
    ],
    openGraph: {
      title: "Портфолио проектов загородных домов и интерьеров",
      description: "Реализованные проекты домов и интерьеров. Вдохновляйтесь и закажите свой уникальный проект!",
      url: `https://alyakina.ru/portfolio`,
      images: [
          {
              url: `/favicon/favicon-96x96.png`,
              alt: 'Студия Софии Алякиной',
          },
      ],
  },
  };

export default function MainPortfolio(){
    return (
        <>
            <div className="container">
              <Portfolio />
            </div>
            <Form />
        </>
        
    );
};

