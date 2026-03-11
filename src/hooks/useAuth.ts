import { useCallback } from 'react'
import { getAuthTokenFromCookie, TOKEN_COOKIE_KEY } from '../utils/auth'
import { deleteCookieValue, setCookieValue } from '../utils/cookies'

const ONE_DAY_IN_SECONDS = 60 * 60 * 24

export function useAuth() {
  const saveToken = useCallback((token: string) => {
    setCookieValue(TOKEN_COOKIE_KEY, token, {
      path: '/',
      maxAgeSeconds: ONE_DAY_IN_SECONDS,
      sameSite: 'lax',
    })
  }, [])

  const getToken = useCallback(() => getAuthTokenFromCookie(), [])

  const clearToken = useCallback(() => {
    deleteCookieValue(TOKEN_COOKIE_KEY, { path: '/', sameSite: 'lax' })
  }, [])

  return {
    saveToken,
    getToken,
    clearToken,
    tokenCookieKey: TOKEN_COOKIE_KEY,
  }
}
