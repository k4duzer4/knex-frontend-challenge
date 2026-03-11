import { getCookieValue } from './cookies'

export const TOKEN_COOKIE_KEY = 'knex_auth_token'

export function getAuthTokenFromCookie() {
  return getCookieValue(TOKEN_COOKIE_KEY)
}

function decodeJwtPayload(token: string) {
  const parts = token.split('.')

  if (parts.length !== 3) {
    return null
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const normalizedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const payload = atob(normalizedBase64)

    return JSON.parse(payload) as { exp?: number }
  } catch {
    return null
  }
}

export function getTokenTtlSeconds(token: string) {
  const payload = decodeJwtPayload(token)

  if (!payload?.exp) {
    return null
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)
  return payload.exp - nowInSeconds
}

export function isTokenExpired(token: string) {
  const ttl = getTokenTtlSeconds(token)

  if (ttl === null) {
    return false
  }

  return ttl <= 0
}

export function hasValidAuthToken() {
  const token = getAuthTokenFromCookie()

  if (!token) {
    return false
  }

  return !isTokenExpired(token)
}
