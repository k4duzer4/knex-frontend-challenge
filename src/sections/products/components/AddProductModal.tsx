import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import IconButton from '../../../components/ui/IconButton'
import SectionTitleWithLines from '../../../components/ui/SectionTitleWithLines'
import { formatBrlInput, parseBrlInputToNumber } from '../../../utils/currency'

type AddProductModalProps = {
  isOpen: boolean
  mode?: 'create' | 'update'
  initialName?: string
  initialPrice?: number | string
  onClose: () => void
  onSubmit: (input: { name: string; price: number; imageFile?: File }) => Promise<void>
}

function AddProductModal({
  isOpen,
  mode = 'create',
  initialName = '',
  initialPrice,
  onClose,
  onSubmit,
}: AddProductModalProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageName, setImageName] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isCreateMode = mode === 'create'

  useEffect(() => {
    if (!isOpen) return

    setName(initialName)

    if (typeof initialPrice === 'number' && Number.isFinite(initialPrice)) {
      setPrice(formatBrlInput(String(Math.round(initialPrice * 100))))
    } else if (typeof initialPrice === 'string' && initialPrice.trim() !== '') {
      const parsed = Number(initialPrice)
      setPrice(Number.isFinite(parsed) ? formatBrlInput(String(Math.round(parsed * 100))) : '')
    } else {
      setPrice('')
    }

    if (!isCreateMode) {
      setImageFile(null)
      setImageName('')
      setPreviewImage('')
    }

    setSubmitError('')
  }, [initialName, initialPrice, isCreateMode, isOpen])

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

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imageDataUrl = String(reader.result ?? '')
      setImageFile(file)
      setImageName(file.name)
      setPreviewImage(imageDataUrl)
      setSubmitError('')
    }

    reader.readAsDataURL(file)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isCreateMode && !imageFile) {
      setSubmitError('Selecione uma foto para o produto.')
      return
    }

    const parsedPrice = parseBrlInputToNumber(price)

    if (parsedPrice <= 0) {
      setSubmitError('Informe um valor maior que zero.')
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError('')

      const payload = isCreateMode
        ? { name: name.trim(), price: parsedPrice, imageFile: imageFile as File }
        : { name: name.trim(), price: parsedPrice }

      await onSubmit(payload)

      setName('')
      setPrice('')
      setImageFile(null)
      setImageName('')
      setPreviewImage('')
      onClose()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Nao foi possivel criar o produto agora.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <div className="home-products-modal__backdrop" role="presentation" onClick={onClose}>
      <div
        className="home-products-modal"
        role="dialog"
        aria-modal="true"
        aria-label={isCreateMode ? 'Adicionar produtos' : 'Atualizar produtos'}
        onClick={(event) => event.stopPropagation()}
      >
        <form className="home-products-modal__form" onSubmit={handleSubmit}>
          <SectionTitleWithLines as="h3" className="home-products-modal__title" lineWidth={40} lineHeight={9}>
            {isCreateMode ? 'Adicionar produtos' : 'Atualizar produtos'}
          </SectionTitleWithLines>

          {isCreateMode ? (
            <>
              <label htmlFor="new-product-image" className="home-products-modal__label home-products-modal__label--photo">
                Foto:
              </label>
              <input id="new-product-image" className="home-products-modal__file-input" type="file" accept="image/*" onChange={handleImageChange} />

              <label htmlFor="new-product-image" className="home-products-modal__photo-upload" aria-label="Trocar foto do produto">
                {!previewImage ? (
                  <span className="home-products-modal__photo-placeholder" aria-hidden>
                    <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path
                        d="M46 34C46 35.0609 45.5786 36.0783 44.8284 36.8284C44.0783 37.5786 43.0609 38 42 38H6C4.93913 38 3.92172 37.5786 3.17157 36.8284C2.42143 36.0783 2 35.0609 2 34V12C2 10.9391 2.42143 9.92172 3.17157 9.17157C3.92172 8.42143 4.93913 8 6 8H14L18 2H30L34 8H42C43.0609 8 44.0783 8.42143 44.8284 9.17157C45.5786 9.92172 46 10.9391 46 12V34Z"
                        stroke="#694B41"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M24 30C28.4183 30 32 26.4183 32 22C32 17.5817 28.4183 14 24 14C19.5817 14 16 17.5817 16 22C16 26.4183 19.5817 30 24 30Z" stroke="#694B41" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : (
                  <img src={previewImage} alt="Pre-visualizacao da foto do produto" className="home-products-modal__preview-image" />
                )}

                {imageName ? <span className="home-products-modal__file-name">{imageName}</span> : null}
              </label>
            </>
          ) : null}

          <label htmlFor="new-product-name" className="home-products-modal__label home-products-modal__label--name">
            Nome:
          </label>
          <input
            id="new-product-name"
            type="text"
            className="home-products-modal__input home-products-modal__input--name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="new-product-price" className="home-products-modal__label home-products-modal__label--price">
            Valor:
          </label>
          <div className="home-products-modal__bottom-row">
            <input
              id="new-product-price"
              type="text"
              inputMode="decimal"
              className="home-products-modal__input home-products-modal__input--price"
              value={price}
              onChange={(event) => setPrice(formatBrlInput(event.target.value))}
              placeholder="R$ 0,00"
              required
            />
            <IconButton
              type="submit"
              icon={isCreateMode ? '+' : '✓'}
              ariaLabel={isCreateMode ? 'Confirmar adição de produto' : 'Confirmar atualização de produto'}
              className="home-products-modal__submit"
              disabled={isSubmitting}
            />
          </div>

          {submitError ? <p className="home-products-modal__error">{submitError}</p> : null}
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default AddProductModal
