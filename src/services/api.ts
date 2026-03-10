import axios from 'axios'

const appEnv = import.meta as ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string
  }
}

const api = axios.create({
  baseURL: appEnv.env?.VITE_API_BASE_URL ?? 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
