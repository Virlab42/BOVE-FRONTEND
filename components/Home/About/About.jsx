import Image from "next/image";
import "./About.scss";
import Link from "next/link";

export default function About() {
  return (
    <>
      <section className="about-container">
        <div className="left-container">
          <Image
            src="/Home/About/image1.jpg"
            width={1000}
            height={1000}
            alt="О бренде BOVE"
          />
        </div>
        <div className="right-container">
          <h2>About BOVÉ</h2>
          <p>
            В эпоху нестабильности жажда жизни вспыхивает как никогда ярко.
            Отправиться неожиданно в&nbsp;путешествие, танцевать на закрытой
            вечеринке всю ночь, не&nbsp;задумываясь о&nbsp;том, что будет
            завтра, утонуть в&nbsp;разговорах с&nbsp;друзьями за&nbsp;чашкой
            кофе в&nbsp;центре или&nbsp;начать своё утро с&nbsp;бокала любимого
            игристого — всё это не бунт, а новый ритуал существования. Мой бренд
            — манифест. Против серости, правил, навязанных обществом,
            и&nbsp;&quot;классической базы&quot;. Это — гимн дерзкой
            индивидуальности, жизни без пауз, без оглядки, с&nbsp;упоением
            в&nbsp;каждом вздохе. Здесь и&nbsp;сейчас — единственное время,
            которое имеет значение
          </p>
          <div className="image-container">
            <Image
              className="left-img"
              src="/Home/About/image2.jpg"
              width={1000}
              height={1000}
              alt="О бренде BOVE"
            />
            <div className="about-cta">
              <Image
                src="/Home/About/image4.jpg"
                width={1000}
                height={1000}
                alt="О бренде BOVE"
              />
              <Link href="/about">
                Подробнее о нас
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35 20L26.25 11.25L24.4825 13.0175L30.215 18.75H5V21.25H30.215L24.4825 26.9825L26.25 28.75L35 20Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
