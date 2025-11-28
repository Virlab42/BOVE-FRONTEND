import localFont from "next/font/local";
import "./globals.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Bootstrap from "../../components/Bootstrap/Bootstrap";
import ModalForm from "../../components/ModalForm/ModalForm";
import Confidentiality from "../../components/Confidentiality/confidentiality";
import YandexMetrika from "../../components/YandexMetrika/YandexMEtrika";
import { CartProvider } from '@/context/CartContext';
import { FavouriteProvider } from '@/context/FavouriteContext';

export const metadata = {
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', url: '/favicon/favicon-96x96.png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

const Inter = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});




export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Bootstrap />
        <CartProvider>
          <FavouriteProvider>
            <Header />
            {children}
          </FavouriteProvider>
        </CartProvider>
        <Footer />
        {/* <ModalForm /> */}
        {/* <Confidentiality />
        <YandexMetrika /> */}
      </body>
    </html>
  );
}
