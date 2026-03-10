import { useCallback } from 'react'

export const TOKEN_COOKIE_KEY = 'knex_auth_token'
const ONE_DAY_IN_SECONDS = 60 * 60 * 24

function parseCookie(name: string) {
  const encodedKey = encodeURIComponent(name)
  const match = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${encodedKey}=`))

  if (!match) return null

  const [, rawValue] = match.split('=')
  return decodeURIComponent(rawValue)
}

export function getAuthTokenFromCookie() {
  return parseCookie(TOKEN_COOKIE_KEY)
}

export function useAuth() {
  const saveToken = useCallback((token: string) => {
    const encodedToken = encodeURIComponent(token)
    document.cookie = `${TOKEN_COOKIE_KEY}=${encodedToken}; path=/; max-age=${ONE_DAY_IN_SECONDS}; samesite=lax`
  }, [])

  const getToken = useCallback(() => getAuthTokenFromCookie(), [])

  const clearToken = useCallback(() => {
    document.cookie = `${TOKEN_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`
  }, [])

  return {
    saveToken,
    getToken,
    clearToken,
    tokenCookieKey: TOKEN_COOKIE_KEY,
  }
}
