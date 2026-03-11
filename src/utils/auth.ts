import { getCookieValue } from './cookies'

export const TOKEN_COOKIE_KEY = 'knex_auth_token'

export function getAuthTokenFromCookie() {
  return getCookieValue(TOKEN_COOKIE_KEY)
}
