import Image from "next/image";
import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
import Best from "../../components/Home/Best/Best";
import About from "../../components/Home/About/About";


export const metadata = {
  title: "BOVE — Мужская одежда для особых моментов",
  description: "Одежда для тех, кто превращает мгновения в события. Купить мужскую брендовую одежду в интернет-магазине. Доставка по России.",
  alternates: {
    canonical: 'https://bove-brand.ru'
  },
  keywords: [
    "купить одежду премиум", "элегантная одежда магазин", "брендовая одежда для событий",
    "одежда для мероприятий", "премиум одежда интернет магазин", "BOVE официальный сайт",
    "люкс одежда Москва", "одежда для особых случаев", "качественная одежда бренд",
    "модная одежда премиум класса", "вечерняя одежда", "деловая одежда премиум"
  ].join(", "),
    openGraph: {
      title: "BOVE — Мужская одежда для особых моментов",
      description: "Одежда для тех, кто превращает мгновения в события. Купить элегантную мужскую одежду в интернет-магазине. Доставка по России.",
      url: `https://bove-brand.ru`,
      images: [
          {
              url: `/бове.jpg`,
              alt: 'BOVE — Мужская одежда для особых моментов',
          },
      ],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Best />
      <About />
    </>
  );
}
