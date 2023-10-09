import { useQuery } from '@tanstack/react-query'
import axios from '../../../libs/axios'

async function show(id) {
  const resp = await axios.get(`/book/${id}`)
  return resp.data
}

export default function useGetOneBook(id) {
  return useQuery(['books',id], ()=>show(id))
}
