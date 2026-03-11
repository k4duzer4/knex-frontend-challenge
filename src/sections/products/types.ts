export type HomeProductsProps = {
  token: string
}

export type DisplayProduct = {
  id: string | number
  name: string
  price: number | string
  image: string
}

export type CardsPerView = 1 | 2 | 3
