import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type DeleteProductModalProps = {
  isOpen: boolean
  productName: string
  isDeleting: boolean
  errorMessage: string
  onCancel: () => void
  onConfirm: () => void
}

function DeleteProductModal({
  isOpen,
  productName,
  isDeleting,
  errorMessage,
  onCancel,
  onConfirm,
}: DeleteProductModalProps) {
  useEffect(() => {
    if (!isOpen || isDeleting) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isDeleting, onCancel])

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <div
      className="home-products-delete-modal__backdrop"
      role="presentation"
      onClick={() => {
        if (!isDeleting) {
          onCancel()
        }
      }}
    >
      <div
        className="home-products-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Confirmar remocao de ${productName}`}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="home-products-delete-modal__title">Deseja realmente apagar o produto:</p>

        <div className="home-products-delete-modal__actions">
          <button
            type="button"
            className="home-products-delete-modal__button home-products-delete-modal__button--cancel"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Nao
          </button>

          <button
            type="button"
            className="home-products-delete-modal__button home-products-delete-modal__button--confirm"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Apagando...' : 'Sim'}
          </button>
        </div>

        {errorMessage ? <p className="home-products-delete-modal__error">{errorMessage}</p> : null}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default DeleteProductModal
