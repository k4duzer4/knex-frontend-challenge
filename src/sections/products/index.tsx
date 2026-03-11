import FallbackInfo from './components/FallbackInfo'
import ProductCarousel from './components/ProductCarousel'
import { useCardsPerView } from './hooks/useCardsPerView'
import { useProductsCatalog } from './hooks/useProductsCatalog'
import IconButton from '../../components/ui/IconButton'
import SectionTitleWithLines from '../../components/ui/SectionTitleWithLines'
import type { HomeProductsProps } from './types'
import './styles.css'

function HomeProducts({ token }: HomeProductsProps) {
  const cardsPerView = useCardsPerView()
  const { products, isLoading, requestError, isUsingMock, reloadProducts } = useProductsCatalog(token)

  return (
    <section id="products" className="home-products" aria-label="Vitrine de produtos">
      <div className="home-products__content">
        <div className="home-products__header">
          <SectionTitleWithLines as="h2" className="home-products__title">
            Nossos produtos
          </SectionTitleWithLines>
          <IconButton icon="+" ariaLabel="Adicionar produto" className="home-products__header-button" />
        </div>

        <p className="home-products__subtitle">Conheça nossas opções de gostosuras.</p>

        {isLoading ? <p className="home-products__status">Carregando produtos...</p> : null}

        <FallbackInfo show={!isLoading && !!requestError && isUsingMock} onReload={reloadProducts} />

        {!isLoading ? <ProductCarousel products={products} cardsPerView={cardsPerView} /> : null}
      </div>
    </section>
  )
}

export default HomeProducts
