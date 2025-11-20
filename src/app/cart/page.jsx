import CartPage from "../../../components/CartPage/CartPage";

export const metadata = {
    title: "Корзина",
    description: "Корзина",
    alternates: {
      canonical: ''
    },
    keywords: [],
    openGraph: {
      title: "Корзина",
      description: "Корзина",
      url: ``,
      images: [
          {
              url: ``,
              alt: '',
          },
      ],
  },
  };

export default function Cart(){
    return(
        <>
            <CartPage />
        </>
    )
}