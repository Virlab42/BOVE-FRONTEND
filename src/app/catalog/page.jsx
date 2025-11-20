import CatalogClient from "../../../components/Catalog/Catalog";


export const metadata = {
    title: "Мужская одежда - купить в брендовом онлайн-магазине BOVE",
    description: "BOVE предлагает купить мужскую одежду по доступной цене. Современная брендовая одежда для лучших мгновений.",
    alternates: {
      canonical: ''
    },
    keywords: [],
    openGraph: {
      title: "Мужская одежда - купить в брендовом онлайн-магазине BOVE",
      description: "BOVE предлагает купить мужскую одежду по доступной цене. Современная брендовая одежда для лучших мгновений.",
      url: ``,
      images: [
          {
              url: ``,
              alt: '',
          },
      ],
  },
  };

export default function Catalog(){
    return (
        <>
            <CatalogClient />
        </>
        
    );
};

