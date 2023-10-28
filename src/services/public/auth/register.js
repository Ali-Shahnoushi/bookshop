import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

async function register(data) {
  const response = await axios.post('/register', data)
  return response.data
}

export default function useRegister() {
  return useMutation(register)
}
