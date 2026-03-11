import api from './api'
import type { Product } from '../types/product'

type UploadedFile = {
  id: string
  path: string
}

type CreateProductPayload = {
  name: string
  description: string
  price: number
  file_id: string
}

export async function getProductsByUser(token: string) {
  const { data } = await api.get<Product[]>('/products', {
    headers: {
      Authorization: token,
    },
  })

  return [...data].sort((left, right) => (left.index ?? 0) - (right.index ?? 0))
}

export async function uploadProductFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post<{ file: UploadedFile }>('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data.file
}

export async function createProductByUser(token: string, payload: CreateProductPayload) {
  const { data } = await api.post<{ product: Product }>('/products', payload, {
    headers: {
      Authorization: token,
    },
  })

  return data.product
}
