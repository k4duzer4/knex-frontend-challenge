import axios from 'axios'
import { deleteCookieValue } from '../utils/cookies'
import { TOKEN_COOKIE_KEY } from '../utils/auth'

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

let isRedirectingToLogin = false

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const responseData = error?.response?.data
    const responseText =
      typeof responseData === 'string'
        ? responseData.toLowerCase()
        : JSON.stringify(responseData ?? '').toLowerCase()
    const isExpiredSession =
      status === 401 ||
      responseText.includes('tokenexpirederror') ||
      responseText.includes('jwt expired')

    if (isExpiredSession && typeof window !== 'undefined') {
      deleteCookieValue(TOKEN_COOKIE_KEY, { path: '/', sameSite: 'lax' })

      if (!isRedirectingToLogin && window.location.pathname !== '/') {
        isRedirectingToLogin = true
        window.location.replace('/')
      }
    }

    return Promise.reject(error)
  },
)

export default api
