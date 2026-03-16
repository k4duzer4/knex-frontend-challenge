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
  const [productToEdit, setProductToEdit] = useState<DisplayProduct | null>(null)
  const [productToDelete, setProductToDelete] = useState<DisplayProduct | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const cardsPerView = useCardsPerView()
  const { products, isLoading, isRefreshing, requestError, addProduct, deleteProduct, updateProduct, reloadProducts } = useProductsCatalog(token)
  const hasProducts = products.length > 0
  const showSkeletonOverlay = !isLoading && (isCreating || isUpdating || isDeleting || isRefreshing)
  const showInitialSkeleton = isLoading && !requestError

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

  function handleOpenUpdateModal(product: DisplayProduct) {
    setProductToEdit(product)
  }

  function handleCloseUpdateModal() {
    if (isUpdating) {
      return
    }

    setProductToEdit(null)
  }

  async function handleCreateProduct(input: { name: string; price: number; imageFile?: File }) {
    if (!input.imageFile) {
      throw new Error('Selecione uma foto para o produto.')
    }

    try {
      setIsCreating(true)
      await addProduct({
        name: input.name,
        price: input.price,
        imageFile: input.imageFile,
      })
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

  async function handleUpdateProduct(input: { name: string; price: number }) {
    if (!productToEdit) {
      return
    }

    try {
      setIsUpdating(true)
      await updateProduct({
        id: productToEdit.id,
        name: input.name,
        price: input.price,
        ...(typeof productToEdit.index === 'number' ? { index: productToEdit.index } : {}),
      })
      toast.success('Produto atualizado com sucesso.')
      setProductToEdit(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel atualizar o produto agora.'
      toast.error(message)
      throw new Error(message)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <section id="products" className="home-products" aria-label="Vitrine de produtos">
      <div className="home-products__content">
        <div className="home-products__header">
          <SectionTitleWithLines as="h2" className="home-products__title">
            Nossos produtos
          </SectionTitleWithLines>
          {hasProducts ? (
            <IconButton
              icon="+"
              ariaLabel="Adicionar produto"
              className="home-products__header-button"
              onClick={() => setIsAddModalOpen(true)}
            />
          ) : null}
        </div>

        <p className="home-products__subtitle">Conheça nossas opções de gostosuras.</p>

        <FallbackInfo show={!isLoading && !!requestError} message={requestError} onReload={reloadProducts} />

        {showInitialSkeleton ? (
          <div className="home-products__showcase-shell is-initial-loading" aria-label="Carregando produtos">
            <div className="home-products__skeleton-overlay is-initial" aria-hidden>
              <div className="home-products__skeleton-track" style={{ gridTemplateColumns: `repeat(${cardsPerView}, 240px)` }}>
                {Array.from({ length: cardsPerView }).map((_, index) => (
                  <article className="home-products__skeleton-card" key={`initial-skeleton-${index}`}>
                    <div className="home-products__skeleton-image home-products__skeleton-shimmer" />
                    <div className="home-products__skeleton-details home-products__skeleton-shimmer" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {!isLoading && !requestError && hasProducts ? (
          <div className={`home-products__showcase-shell ${showSkeletonOverlay ? 'is-busy' : ''}`}>
            <ProductCarousel
              products={products}
              cardsPerView={cardsPerView}
              onRequestEdit={handleOpenUpdateModal}
              onRequestDelete={handleOpenDeleteModal}
            />

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

        {!isLoading && !requestError && !hasProducts ? (
          <div className="home-products__empty" role="status" aria-live="polite">
            <button
              type="button"
              className="home-products__notice-reload"
              aria-label="Adicionar primeiro produto"
              onClick={() => setIsAddModalOpen(true)}
            >
              <span aria-hidden>+</span>
            </button>
            <h3 className="home-products__notice-title">Nenhum produto cadastrado</h3>
            <p className="home-products__notice-copy">Clique no botao para cadastrar o primeiro produto.</p>
          </div>
        ) : null}
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="create"
        onSubmit={handleCreateProduct}
      />

      <AddProductModal
        isOpen={!!productToEdit}
        onClose={handleCloseUpdateModal}
        mode="update"
        initialName={productToEdit?.name}
        initialPrice={productToEdit?.price}
        onSubmit={handleUpdateProduct}
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
