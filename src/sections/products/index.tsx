import { useState } from 'react'
import { toast } from 'react-toastify'
import AddProductModal from './components/AddProductModal'
import DeleteProductModal from './components/DeleteProductModal'
import FallbackInfo from './components/FallbackInfo'
import ProductCarousel from './components/ProductCarousel'
import { useCardsPerView } from './hooks/useCardsPerView'
import { useProductsCatalog } from './hooks/useProductsCatalog'
import IconButton from '../../components/ui/IconButton'
import SectionTitleWithLines from '../../components/ui/SectionTitleWithLines'
import type { DisplayProduct, HomeProductsProps } from './types'
import './styles.css'

function HomeProducts({ token }: HomeProductsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<DisplayProduct | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const cardsPerView = useCardsPerView()
  const { products, isLoading, isRefreshing, requestError, addProduct, deleteProduct, reloadProducts } = useProductsCatalog(token)
  const showSkeletonOverlay = !isLoading && (isCreating || isDeleting || isRefreshing)

  function handleOpenDeleteModal(product: DisplayProduct) {
    setDeleteError('')
    setProductToDelete(product)
  }

  function handleCloseDeleteModal() {
    if (isDeleting) {
      return
    }

    setDeleteError('')
    setProductToDelete(null)
  }

  async function handleCreateProduct(input: { name: string; price: number; imageFile: File }) {
    try {
      setIsCreating(true)
      await addProduct(input)
      toast.success('Produto criado com sucesso.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel criar o produto agora.'
      toast.error(message)
      throw new Error(message)
    } finally {
      setIsCreating(false)
    }
  }

  async function handleConfirmDeleteProduct() {
    if (!productToDelete) {
      return
    }

    try {
      setIsDeleting(true)
      setDeleteError('')
      await deleteProduct(productToDelete.id)
      toast.success('Produto apagado com sucesso.')
      setProductToDelete(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel apagar o produto agora.'
      setDeleteError(message)
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section id="products" className="home-products" aria-label="Vitrine de produtos">
      <div className="home-products__content">
        <div className="home-products__header">
          <SectionTitleWithLines as="h2" className="home-products__title">
            Nossos produtos
          </SectionTitleWithLines>
          <IconButton
            icon="+"
            ariaLabel="Adicionar produto"
            className="home-products__header-button"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>

        <p className="home-products__subtitle">Conheça nossas opções de gostosuras.</p>

        {isLoading ? <p className="home-products__status">Carregando produtos...</p> : null}

        <FallbackInfo show={!isLoading && !!requestError} message={requestError} onReload={reloadProducts} />

        {!isLoading ? (
          <div className={`home-products__showcase-shell ${showSkeletonOverlay ? 'is-busy' : ''}`}>
            <ProductCarousel products={products} cardsPerView={cardsPerView} onRequestDelete={handleOpenDeleteModal} />

            {showSkeletonOverlay ? (
              <div className="home-products__skeleton-overlay" aria-hidden>
                <div className="home-products__skeleton-track" style={{ gridTemplateColumns: `repeat(${cardsPerView}, 240px)` }}>
                  {Array.from({ length: cardsPerView }).map((_, index) => (
                    <article className="home-products__skeleton-card" key={`skeleton-${index}`}>
                      <div className="home-products__skeleton-image home-products__skeleton-shimmer" />
                      <div className="home-products__skeleton-details home-products__skeleton-shimmer" />
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreateProduct}
      />

      <DeleteProductModal
        isOpen={!!productToDelete}
        productName={productToDelete?.name ?? ''}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
      />
    </section>
  )
}

export default HomeProducts
