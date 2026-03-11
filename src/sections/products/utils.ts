import { BREAKPOINTS, CAROUSEL_GAP } from './constants'
import type { CardsPerView, DisplayProduct } from './types'
import type { Product } from '../../types/product'

const appEnv = import.meta as ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string
  }
}

export function getImageUrl(path: string | undefined) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const baseUrl = appEnv.env?.VITE_API_BASE_URL ?? 'https://knex.zernis.space'
  return `${baseUrl}/${path.replace(/^\/+/, '')}`
}

export function formatPrice(value: number | string) {
  const numeric = typeof value === 'number' ? value : Number(value)

  if (Number.isNaN(numeric)) {
    return 'Preço indisponível'
  }

  return numeric.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function mapProductsToDisplay(products: Product[]): DisplayProduct[] {
  return products
    .filter((product) => product.file?.path)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getImageUrl(product.file?.path),
    }))
}

export function getCardsPerViewByWidth(width: number): CardsPerView {
  if (width <= BREAKPOINTS.mobile) return 1
  if (width <= BREAKPOINTS.tablet) return 2
  return 3
}

export function getGapByCardsPerView(cardsPerView: CardsPerView) {
  if (cardsPerView === 1) return CAROUSEL_GAP.mobile
  if (cardsPerView === 2) return CAROUSEL_GAP.tablet
  return CAROUSEL_GAP.desktop
}
