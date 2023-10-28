import { useQuery } from '@tanstack/react-query'
import axios from '../../../libs/axios'

async function getUserInfo(userToken) {
  const resp = await axios.get('/user/get/info', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  return resp.data.data
}

export default function useGetUserInfo(userToken) {
  return useQuery(['userInfo', userToken], () => getUserInfo(userToken))
}
