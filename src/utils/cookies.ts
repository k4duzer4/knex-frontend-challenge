type CookieOptions = {
  path?: string
  maxAgeSeconds?: number
  sameSite?: 'lax' | 'strict' | 'none'
}

export function getCookieValue(name: string) {
  const encodedKey = encodeURIComponent(name)
  const match = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${encodedKey}=`))

  if (!match) return null

  const [, rawValue] = match.split('=')
  return decodeURIComponent(rawValue)
}

export function setCookieValue(name: string, value: string, options: CookieOptions = {}) {
  const path = options.path ?? '/'
  const sameSite = options.sameSite ?? 'lax'
  const encodedValue = encodeURIComponent(value)
  const maxAgePart = typeof options.maxAgeSeconds === 'number' ? `; max-age=${options.maxAgeSeconds}` : ''

  document.cookie = `${name}=${encodedValue}; path=${path}${maxAgePart}; samesite=${sameSite}`
}

export function deleteCookieValue(name: string, options: Pick<CookieOptions, 'path' | 'sameSite'> = {}) {
  setCookieValue(name, '', {
    path: options.path,
    sameSite: options.sameSite,
    maxAgeSeconds: 0,
  })
}
