import mainAxios from 'axios'

const axios = mainAxios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    common: { 'Content-Type': 'application/json', Accept: 'application/json' },
  },
})

export default axios
