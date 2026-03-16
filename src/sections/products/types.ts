export type HomeProductsProps = {
  token: string
  isReadOnlyMode: boolean
}

export type DisplayProduct = {
  id: string | number
  name: string
  price: number | string
  image: string
  index?: number
}

export type CardsPerView = 1 | 2 | 3
