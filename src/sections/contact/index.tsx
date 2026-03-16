import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import './styles.css'
import ContactDetails from './components/ContactDetails'
import ContactForm from './components/ContactForm'
import ContactHeader from './components/ContactHeader'
import { useContactContent } from './hooks/useContactContent'
import { buildContactContent } from './utils'

function HomeContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const formElement = event.currentTarget
    formElement.reset()
    setIsSubmitting(false)
    toast.success('Formulario enviado com sucesso.')
  }

  const { content } = useContactContent()
  const contactContent = buildContactContent(content)

  return (
    <section id="contact" className="home-contact" aria-label="Informacoes de contato">
      <div className="home-contact__content">
        <ContactHeader
          title={contactContent.sectionTitle}
          subtitle={contactContent.sectionSubtitle}
        />

        <div className="home-contact__grid">
          <ContactForm
            title={contactContent.formTitle}
            fields={contactContent.fields}
            submitLabel={contactContent.submitLabel}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          <ContactDetails
            socialTitle={contactContent.detailsSocialTitle}
            socialItems={contactContent.socialItems}
            hoursTitle={contactContent.detailsHoursTitle}
            hoursItems={contactContent.detailsHoursItems}
          />
        </div>
      </div>
    </section>
  )
}

export default HomeContact
