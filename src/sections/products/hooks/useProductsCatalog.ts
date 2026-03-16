import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createProductByUser,
  deleteProductByUser,
  getProductsByUser,
  updateProductByUser,
  uploadProductFile,
} from '../../../services/productService'
import type { Product } from '../../../types/product'
import { DEFAULT_VISIBLE_PRODUCTS } from '../constants'
import { mapProductsToDisplay } from '../utils'

export function useProductsCatalog(token: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [reloadTick, setReloadTick] = useState(0)
  const hasLoadedOnceRef = useRef(false)

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        if (!hasLoadedOnceRef.current) {
          setIsLoading(true)
        } else {
          setIsRefreshing(true)
        }

        setRequestError('')
        const response = await getProductsByUser(token)

        if (isMounted) {
          setProducts(response)
          hasLoadedOnceRef.current = true
        }
      } catch {
        if (isMounted) {
          setRequestError('Nao foi possivel carregar os produtos agora.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
          setIsRefreshing(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [token, reloadTick])

  const visibleProducts = useMemo(
    () => products.slice(0, DEFAULT_VISIBLE_PRODUCTS),
    [products],
  )

  const apiProducts = useMemo(() => mapProductsToDisplay(visibleProducts), [visibleProducts])

  function toApiPriceInt(value: number) {
    return Math.round(value * 100)
  }

  async function addProduct(input: { name: string; price: number; imageFile: File }) {
    const uploadedFile = await uploadProductFile(token, input.imageFile)

    await createProductByUser(token, {
      name: input.name,
      description: input.name,
      price: toApiPriceInt(input.price),
      file_id: uploadedFile.id,
    })

    setReloadTick((current) => current + 1)
  }

  async function removeProduct(productId: string | number) {
    await deleteProductByUser(token, productId)
    setReloadTick((current) => current + 1)
  }

  async function updateProduct(input: { id: string | number; name: string; price: number; index?: number }) {
    await updateProductByUser(token, input.id, {
      name: input.name,
      description: input.name,
      price: toApiPriceInt(input.price),
      ...(typeof input.index === 'number' ? { index: input.index } : {}),
    })

    setReloadTick((current) => current + 1)
  }

  return {
    isLoading,
    isRefreshing,
    requestError,
    products: apiProducts,
    addProduct,
    deleteProduct: removeProduct,
    updateProduct,
    reloadProducts: () => setReloadTick((current) => current + 1),
  }
}
