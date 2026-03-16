import { BREAKPOINTS, CAROUSEL_GAP } from './constants'
import type { CardsPerView, DisplayProduct } from './types'
import type { Product } from '../../types/product'
import { resolveApiAssetUrl } from '../../utils/url'

export function mapProductsToDisplay(products: Product[]): DisplayProduct[] {
  return products
    .filter((product) => product.file?.path)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: resolveApiAssetUrl(product.file?.path),
      ...(typeof product.index === 'number' ? { index: product.index } : {}),
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
