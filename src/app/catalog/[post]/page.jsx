import ProductPage from './ProductPage';

export async function generateMetadata({ params }) {
  const id = params.id;

  // Здесь в реальном проекте ты возьмёшь товар из БД
  const product = {
    id,
    title: 'Жилетка черная One Size',
    description: 'Классический мужской костюм прямого кроя.',
    images: ['/Home/Categories/Жилетки.jpg','/Home/Categories/Костюмы.jpg','/Home/Categories/Жилетки.jpg','/Home/Categories/Жилетки.jpg','/Home/Categories/Жилетки.jpg'],
    price: 12990
  };

  return {
    title: `${product.title} — купить за ${product.price} ₽`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[1]
    }
  };
}

export default function Page({ params }) {
    const product = {
    id: params.id,
    title: 'Жилетка черная One Size',
    description: 'Классическая жилетка прямого кроя.',
    images: ['/Home/Categories/Жилетки.jpg','/Home/Categories/Костюмы.jpg','/Home/Categories/Верхняя.jpg','/Home/Categories/Рубашки.jpg','/Home/Categories/Жилетки.jpg'],
    colors: ["#ffffff", "#000000", "#999999"],
    sizes: ["S", "M", "L", "XL"],
    price: 12990
  };
  return <ProductPage product={product} />;
}
