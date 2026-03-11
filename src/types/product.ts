export type ProductFile = {
  path: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number | string
  index?: number
  file?: ProductFile | null
}
