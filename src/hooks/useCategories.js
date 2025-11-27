import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export function useCategories() {
  return useSWR(`${BASE_URL}/productsV2/categories`, fetcher, {
    dedupingInterval: 600000, // 10 минут кеш
    revalidateOnFocus: false, // не перезапрашивать при фокусе вкладки
  })
}
