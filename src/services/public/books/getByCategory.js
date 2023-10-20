import { useQuery } from '@tanstack/react-query'
import axios from '../../../libs/axios'

async function byCategory(categoryURL) {
  const resp = await axios.get(`/books/${categoryURL}`)
  return resp.data
}

export default function useGetBooksByCategory(categoryURL) {
  return useQuery(['books', categoryURL], () => byCategory(categoryURL))
}
