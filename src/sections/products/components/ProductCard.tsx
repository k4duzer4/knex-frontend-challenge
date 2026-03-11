import { formatPrice } from '../../../utils/currency'
import type { DisplayProduct } from '../types'
import IconButton from '../../../components/ui/IconButton'

type ProductCardProps = {
  product: DisplayProduct
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="home-products__card">
      <div className="home-products__image-wrapper">
        <IconButton icon="-" className="home-products__remove" ariaLabel={`Remover ${product.name}`} />

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
