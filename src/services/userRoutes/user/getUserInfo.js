import { useQuery } from '@tanstack/react-query'
import axios from '/src/libs/axios'

async function getUserInfo() {
  const resp = await axios.get('/user/get/info')
  return resp.data
}

export default function useGetUserInfo() {
  return useQuery(['books'], getUserInfo)
}
