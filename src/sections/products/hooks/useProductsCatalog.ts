import { useEffect, useMemo, useState } from 'react'
import { getProductsByUser } from '../../../services/productService'
import { MOCK_PRODUCTS } from '../mockProducts'
import type { Product } from '../../../types/product'
import { DEFAULT_VISIBLE_PRODUCTS } from '../constants'
import { mapProductsToDisplay } from '../utils'

export function useProductsCatalog(token: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [requestError, setRequestError] = useState('')
  const [reloadTick, setReloadTick] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        setIsLoading(true)
        setRequestError('')
        const response = await getProductsByUser(token)

        if (isMounted) {
          setProducts(response)
        }
      } catch {
        if (isMounted) {
          setRequestError('Nao foi possivel carregar os produtos agora.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
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

  const isUsingMock = apiProducts.length === 0

  return {
    isLoading,
    requestError,
    isUsingMock,
    products: isUsingMock ? MOCK_PRODUCTS : apiProducts,
    reloadProducts: () => setReloadTick((current) => current + 1),
  }
}
