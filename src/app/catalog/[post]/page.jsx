import ProductPage from "./ProductPage";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// ======== Server Fetch ========
async function getProduct(productId) {
  const res = await fetch(`${BASE_URL}/productsV3/${productId}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) return null;
  return res.json();
}

// ======== Metadata Generation ========
export async function generateMetadata({ params, searchParams }) {
  const productId = searchParams.id;
  if (!productId) return { title: "Товар" };

  const data = await getProduct(productId);
  if (!data?.product) return { title: "Товар" };

  const p = data.product;

  const firstVariant = p.variants?.[0];
  const firstImage = firstVariant?.image?.split(",")[0];

  return {
    title: `${p.full_name} — купить`,
    description: p.description || `Купить ${p.full_name} в наличии.`,
    openGraph: {
      title: p.full_name,
      description: p.description || "",
      images: firstImage ? `${BASE_URL}/${firstImage}` : "",
    },
  };
}

// ======== Page Component ========
export default async function Page({ params, searchParams }) {
  const productId = searchParams.id;
  const variantId = searchParams.variant_id;

  const data = await getProduct(productId);

  return (
    <ProductPage
      product={data?.product}
      selectedVariantId={Number(variantId)}
    />
  );
}
