import CatalogClient from "../../../components/Catalog/Catalog";


export const metadata = {
    title: "",
    description: "",
    alternates: {
      canonical: ''
    },
    keywords: [],
    openGraph: {
      title: "",
      description: "",
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

