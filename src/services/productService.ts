import api from './api'
import type { Product } from '../types/product'

export async function getProductsByUser(token: string) {
  const { data } = await api.get<Product[]>('/products', {
    headers: {
      Authorization: token,
    },
  })

  return [...data].sort((left, right) => (left.index ?? 0) - (right.index ?? 0))
}
