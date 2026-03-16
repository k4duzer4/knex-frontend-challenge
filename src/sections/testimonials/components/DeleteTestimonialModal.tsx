import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type DeleteTestimonialModalProps = {
  isOpen: boolean
  testimonialName: string
  onCancel: () => void
  onConfirm: () => void
}

function DeleteTestimonialModal({
  isOpen,
  testimonialName,
  onCancel,
  onConfirm,
}: DeleteTestimonialModalProps) {
  useEffect(() => {
    if (!isOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onCancel])

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <div
      className="home-testimonials-delete-modal__backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="home-testimonials-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Confirmar remocao de ${testimonialName}`}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="home-testimonials-delete-modal__title">
          Deseja realmente apagar o depoimento?
        </p>

        <div className="home-testimonials-delete-modal__actions">
          <button
            type="button"
            className="home-testimonials-delete-modal__button home-testimonials-delete-modal__button--cancel"
            onClick={onCancel}
          >
            Nao
          </button>
          <button
            type="button"
            className="home-testimonials-delete-modal__button home-testimonials-delete-modal__button--confirm"
            onClick={onConfirm}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default DeleteTestimonialModal
