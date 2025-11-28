import './about.scss'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "О бренде BOVÉ",
  description: "Одежда для тех, кто превращает мгновения в события",
  alternates: {
    canonical: 'https://'
  },
  keywords: [],
    openGraph: {
      title: "BOVE",
      description: "Одежда для тех, кто превращает мгновения в события",
      url: `https://`,
      images: [
          {
              url: ``,
              alt: '',
          },
      ],
  },
};

export default function About() {
    return (
        <>
            <section className='about-page'>
                <div className='about-img'>
                    <Image src={'/About/about.jpg'} width={2000} height={1500} alt='о BOVE' />
                    <div className='about-text'>
                        <div>
                            <h1>BOVÉ</h1>
                            <h2>Одежда для тех, кто превращает мгновения в события</h2>
                        </div>
                        <p>В эпоху нестабильности жажда жизни вспыхивает как никогда ярко. Отправиться неожиданно в путешествие, танцевать на закрытой вечеринке всю ночь, не задумываясь о том, что будет завтра, утонуть в разговорах с друзьями за чашкой кофе в центре или начать своё утро с бокала любимого игристого — всё это не бунт, а новый ритуал существования.</p>
                        <Image className='img-about-mob' src={'/About/about.jpg'} width={2000} height={1500} alt='о BOVE' />
                        <p>Мой бренд — манифест. Против серости, правил, навязанных обществом, и «классической базы». Это — гимн дерзкой индивидуальности, жизни без пауз, без оглядки, с упоением в каждом вздохе. Здесь и сейчас — единственное время, которое имеет значение.</p>
                        <div>
                            <p>С любовью к твоей смелости,<br></br>
                                основатель бренда <strong>BOVÉ, Александр&nbsp;Радостев</strong></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}