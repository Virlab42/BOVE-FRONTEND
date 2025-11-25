import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export function useCategories() {
  return useSWR('http://5.129.246.215:8000/productsV2/categories', fetcher, {
    dedupingInterval: 600000, // 10 минут кеш
    revalidateOnFocus: false, // не перезапрашивать при фокусе вкладки
  })
}
