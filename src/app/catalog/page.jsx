import CatalogClient from "../../../components/Catalog/Catalog";

export const metadata = {
  title: "Мужская одежда - купить в брендовом онлайн-магазине BOVE",
  description:
    "BOVE предлагает купить мужскую одежду по доступной цене. Современная брендовая одежда для лучших мгновений.",
  alternates: {
    canonical: "",
  },
  keywords: [],
  openGraph: {
    title: "Мужская одежда - купить в брендовом онлайн-магазине BOVE",
    description:
      "BOVE предлагает купить мужскую одежду по доступной цене. Современная брендовая одежда для лучших мгновений.",
    url: ``,
    images: [
      {
        url: ``,
        alt: "",
      },
    ],
  },
};

// Добавляем async к функции
export default async function Catalog({ searchParams }) {
  // Используем await для получения searchParams
  const params = await searchParams;
  const catFromUrl = params.cat ? Number(params.cat) : null;

  return (
    <>
      <CatalogClient initialCat={catFromUrl} />
    </>
  );
}
