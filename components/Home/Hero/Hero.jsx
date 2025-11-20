import Image from "next/image";
import "./hero.scss";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <Image
          className="hero-image"
          src="/Home/Hero.JPG"
          width={2000}
          height={2000}
          alt="BOVE"
        />
        <div className="hero-content">
          <p>
            Одежда для тех, кто превращает <br></br>
            мгновения в события
          </p>
          <Link className="hero-cta" href="">
            За покупками
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.625 17.5L22.9688 9.84375L21.4222 11.3903L26.4381 16.4062H4.375V18.5938H26.4381L21.4222 23.6097L22.9688 25.1562L30.625 17.5Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
