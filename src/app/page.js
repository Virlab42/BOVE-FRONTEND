import Image from "next/image";
import Hero from "../../components/Home/Hero/Hero";
import Categories from "../../components/Home/Categories/Categories";
import Best from "../../components/Home/Best/Best";
import About from "../../components/Home/About/About";


export const metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: 'https://'
  },
  keywords: [],
    openGraph: {
      title: "",
      description: "",
      url: `https://`,
      images: [
          {
              url: ``,
              alt: '',
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
