import { useEffect, useMemo, useState } from 'react'
import { getProductsByUser } from '../../../services/productService'
import type { Product } from '../../../types/product'
import './styles.css'

type HomeProductsProps = {
  token: string
}

const appEnv = import.meta as ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string
  }
}

function getImageUrl(path: string | undefined) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const baseUrl = appEnv.env?.VITE_API_BASE_URL ?? 'https://knex.zernis.space'
  return `${baseUrl}/${path.replace(/^\/+/, '')}`
}

function formatPrice(value: number | string) {
  const numeric = typeof value === 'number' ? value : Number(value)

  if (Number.isNaN(numeric)) {
    return 'Preco indisponivel'
  }

  return numeric.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function HomeProducts({ token }: HomeProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [requestError, setRequestError] = useState('')

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
  }, [token])

  const visibleProducts = useMemo(() => products.slice(0, 6), [products])

  return (
    <section id="products" className="home-products" aria-label="Vitrine de produtos">
      <div className="home-products__content">
        <h2>Nossos produtos</h2>
        <p>Conheca nossas opcoes de gostosuras.</p>

        {isLoading ? <p className="home-products__status">Carregando produtos...</p> : null}
        {requestError ? <p className="home-products__status home-products__status--error">{requestError}</p> : null}

        {!isLoading && !requestError ? (
          <div className="home-products__grid">
            {visibleProducts.length ? (
              visibleProducts.map((product) => (
                <article key={product.id} className="home-products__card">
                  <div className="home-products__image-wrapper">
                    {product.file?.path ? (
                      <img src={getImageUrl(product.file.path)} alt={product.name} loading="lazy" />
                    ) : (
                      <div className="home-products__placeholder">Sem imagem</div>
                    )}
                  </div>
                  <div className="home-products__details">
                    <h3>{product.name}</h3>
                    <p>{product.description || 'Descricao nao informada.'}</p>
                    <strong>{formatPrice(product.price)}</strong>
                  </div>
                </article>
              ))
            ) : (
              <p className="home-products__status">Nenhum produto cadastrado ainda.</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default HomeProducts
