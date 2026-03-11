import { formatPrice } from '../utils'
import type { DisplayProduct } from '../types'

type ProductCardProps = {
  product: DisplayProduct
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="home-products__card">
      <div className="home-products__image-wrapper">
        <button type="button" className="home-products__remove" aria-label={`Remover ${product.name}`}>
          -
        </button>

        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="home-products__details">
        <h3>{product.name}</h3>
        <strong>
          <small>R$</small>
          {formatPrice(product.price)}
          <span>/un</span>
        </strong>
      </div>
    </article>
  )
}

export default ProductCard
