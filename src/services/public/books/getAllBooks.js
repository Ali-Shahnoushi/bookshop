import { useQuery } from '@tanstack/react-query'
import axios from '/src/libs/axios'

async function index() {
  const resp = await axios.get('/book')
  return resp.data
}

export default function useGetAllBooks() {
  return useQuery(['books'], index)
}
