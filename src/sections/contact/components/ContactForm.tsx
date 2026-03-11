import type { ContactFormProps } from '../types'

function ContactForm({ title, fields, submitLabel, onSubmit }: ContactFormProps) {
  return (
    <form className="home-contact__form" onSubmit={onSubmit}>
      <h3>{title}</h3>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input id={field.id} name={field.name} type={field.type} className={field.className} />
        </div>
      ))}
      <button type="submit">{submitLabel}</button>
    </form>
  )
}

export default ContactForm
