import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

async function login(data) {
  const response = await axios.post('/login', data)

  return response.data
}

export default function useLogin() {
  return useMutation(login)
}
