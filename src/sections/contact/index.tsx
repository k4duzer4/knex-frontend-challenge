import type { FormEvent } from 'react'
import './styles.css'
import ContactDetails from './components/ContactDetails'
import ContactForm from './components/ContactForm'
import ContactHeader from './components/ContactHeader'
import { useContactContent } from './hooks/useContactContent'
import type { HomeContactProps } from './types'
import { buildContactContent } from './utils'

function HomeContact(_: HomeContactProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
  }

  const { content } = useContactContent()
  const contactContent = buildContactContent(content)

  return (
    <section id="contact" className="home-contact" aria-label="Informacoes de contato">
      <div className="home-contact__content">
        <ContactHeader title={contactContent.sectionTitle} subtitle={contactContent.sectionSubtitle} />

        <div className="home-contact__grid">
          <ContactForm
            title={contactContent.formTitle}
            fields={contactContent.fields}
            submitLabel={contactContent.submitLabel}
            onSubmit={handleSubmit}
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
