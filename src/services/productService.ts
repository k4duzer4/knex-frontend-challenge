import api from './api'
import type { Product } from '../types/product'

type UploadedFile = {
  id: string
  path: string
}

function isUploadedFile(value: unknown): value is UploadedFile {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as { id?: unknown; path?: unknown }
  return typeof candidate.id === 'string' && typeof candidate.path === 'string'
}

function buildUniqueUploadFile(file: File) {
  const uniquePrefix =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : String(Date.now())

  return new File([file], `${uniquePrefix}-${file.name}`, {
    type: file.type,
    lastModified: file.lastModified,
  })
}

function extractApiErrorMessage(error: unknown) {
  const defaultMessage = 'Nao foi possivel criar o produto agora.'

  if (!error || typeof error !== 'object' || !('response' in error)) {
    return defaultMessage
  }

  const response = (error as { response?: { data?: unknown } }).response
  const responseData = response?.data
  const responseText =
    typeof responseData === 'string'
      ? responseData.toLowerCase()
      : JSON.stringify(responseData ?? '').toLowerCase()

  if (responseText.includes('duplicate key value violates unique constraint')) {
    return 'A API recusou o cadastro por conflito de chave unica. Tente novamente com outra imagem.'
  }

  if (responseText.includes('jwt expired') || responseText.includes('tokenexpirederror')) {
    return 'Sua sessao expirou. Faca login novamente.'
  }

  return defaultMessage
}

type CreateProductPayload = {
  name: string
  description: string
  price: number
  file_id: string
}

export async function getProductsByUser(token: string) {
  const { data } = await api.get<{ products?: Product[] } | Product[]>('/products', {
    headers: {
      Authorization: token,
    },
  })

  const products = Array.isArray(data) ? data : data.products ?? []

  return [...products].sort((left, right) => (left.index ?? 0) - (right.index ?? 0))
}

export async function uploadProductFile(token: string, file: File) {
  const uniqueFile = buildUniqueUploadFile(file)
  const formData = new FormData()
  formData.append('file', uniqueFile)

  const { data } = await api.post<{ file?: UploadedFile } | UploadedFile>('/files', formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  })

  const uploadedFile = 'file' in data ? data.file : data

  if (!isUploadedFile(uploadedFile)) {
    throw new Error('Falha ao enviar imagem do produto.')
  }

  return uploadedFile
}

export async function createProductByUser(token: string, payload: CreateProductPayload) {
  try {
    const { data } = await api.post<{ product: Product }>('/products', payload, {
      headers: {
        Authorization: token,
      },
    })

    return data.product
  } catch (error) {
    throw new Error(extractApiErrorMessage(error))
  }
}
