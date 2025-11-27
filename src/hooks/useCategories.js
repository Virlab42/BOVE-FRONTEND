import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useCategories() {
  return useSWR('https://api.bove-brand.ru/productsV2/categories', fetcher, {
    dedupingInterval: 600000, // 10 минут кеш
    revalidateOnFocus: false, // не перезапрашивать при фокусе вкладки
  })
}
