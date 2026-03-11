import { useEffect, useMemo, useState } from 'react'
import { createProductByUser, getProductsByUser, uploadProductFile } from '../../../services/productService'
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

  async function addProduct(input: { name: string; price: number; imageFile: File }) {
    const uploadedFile = await uploadProductFile(token, input.imageFile)

    await createProductByUser(token, {
      name: input.name,
      description: input.name,
      price: input.price,
      file_id: uploadedFile.id,
    })

    setReloadTick((current) => current + 1)
  }

  return {
    isLoading,
    requestError,
    products: apiProducts,
    addProduct,
    reloadProducts: () => setReloadTick((current) => current + 1),
  }
}
