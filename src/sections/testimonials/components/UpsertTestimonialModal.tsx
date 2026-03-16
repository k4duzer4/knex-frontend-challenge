import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'

type UpsertTestimonialModalProps = {
  isOpen: boolean
  mode: 'create' | 'update'
  initialName?: string
  initialRole?: string
  initialMessage?: string
  onClose: () => void
  onSubmit: (input: { name: string; role: string; message: string }) => void
}

function UpsertTestimonialModal({
  isOpen,
  mode,
  initialName = '',
  initialRole = '',
  initialMessage = '',
  onClose,
  onSubmit,
}: UpsertTestimonialModalProps) {
  const [name, setName] = useState(initialName)
  const [role, setRole] = useState(initialRole)
  const [message, setMessage] = useState(initialMessage)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      onSubmit({
        name,
        role,
        message,
      })
      onClose()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Nao foi possivel salvar o depoimento agora.',
      )
    }
  }

  if (!isOpen) {
    return null
  }

  const modalTitle = mode === 'create' ? 'Adicionar depoimento' : 'Atualizar depoimento'

  const modalContent = (
    <div className="home-testimonials-modal__backdrop" role="presentation" onClick={onClose}>
      <div
        className="home-testimonials-modal"
        role="dialog"
        aria-modal="true"
        aria-label={modalTitle}
        onClick={(event) => event.stopPropagation()}
      >
        <form className="home-testimonials-modal__form" onSubmit={handleSubmit}>
          <h3 className="home-testimonials-modal__title">{modalTitle}</h3>

          <label htmlFor="testimonial-name" className="home-testimonials-modal__label">
            Nome
          </label>
          <input
            id="testimonial-name"
            className="home-testimonials-modal__input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="testimonial-role" className="home-testimonials-modal__label">
            Cargo
          </label>
          <input
            id="testimonial-role"
            className="home-testimonials-modal__input"
            type="text"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />

          <label htmlFor="testimonial-message" className="home-testimonials-modal__label">
            Depoimento
          </label>
          <textarea
            id="testimonial-message"
            className="home-testimonials-modal__textarea"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
          />

          <div className="home-testimonials-modal__actions">
            <button
              type="button"
              className="home-testimonials-modal__button home-testimonials-modal__button--cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="home-testimonials-modal__button home-testimonials-modal__button--confirm"
            >
              {mode === 'create' ? 'Salvar' : 'Atualizar'}
            </button>
          </div>

          {submitError ? <p className="home-testimonials-modal__error">{submitError}</p> : null}
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default UpsertTestimonialModal
