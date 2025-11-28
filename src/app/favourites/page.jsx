export const metadata = {
  title: "Избранное",
  description: "Одежда для тех, кто превращает мгновения в события",
  alternates: {
    canonical: "https://",
  },
  openGraph: {
    title: "Избранное",
    description: "BOVE - Одежда для тех, кто превращает мгновения в события",
    url: "https://",
    images: [{ url: "", alt: "" }],
  }
};

import FavouritesPage from "./FavouritesPage";

export default function Page() {
  return <FavouritesPage />;
}
