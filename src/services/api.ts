import axios from 'axios'

const appEnv = import.meta as ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string
  }
}

const api = axios.create({
  baseURL: appEnv.env?.VITE_API_BASE_URL ?? 'https://knex.zernis.space',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
