const appEnv = import.meta as ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string
  }
}

export function resolveApiAssetUrl(path: string | undefined) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const baseUrl = appEnv.env?.VITE_API_BASE_URL ?? 'https://knex.zernis.space'
  return `${baseUrl}/${path.replace(/^\/+/, '')}`
}
