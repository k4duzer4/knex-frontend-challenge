import type { ContactFormProps } from '../types'
import { formatPhoneMask } from '../../../utils/string'

function ContactForm({
  title,
  fields,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: ContactFormProps) {
  return (
    <form className="home-contact__form" onSubmit={onSubmit}>
      <h3>{title}</h3>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            id={field.id}
            name={field.name}
            type={field.type}
            className={field.className}
            disabled={isSubmitting}
            required
            maxLength={field.name === 'phone' ? 16 : undefined}
            onChange={
              field.name === 'phone'
                ? (event) => {
                    event.currentTarget.value = formatPhoneMask(event.currentTarget.value)
                  }
                : undefined
            }
          />
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : submitLabel}
      </button>
    </form>
  )
}

export default ContactForm
