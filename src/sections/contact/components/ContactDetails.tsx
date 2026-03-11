import ContactSocialIcon from './ContactSocialIcon'
import type { ContactSocialItem } from '../types'

type ContactDetailsProps = {
  socialTitle: string
  socialItems: ContactSocialItem[]
  hoursTitle: string
  hoursItems: string[]
}

function ContactDetails({ socialTitle, socialItems, hoursTitle, hoursItems }: ContactDetailsProps) {
  return (
    <aside className="home-contact__details">
      <div className="home-contact__details-block">
        <h3>{socialTitle}</h3>
        <div className="home-contact__social-icons" aria-label="Redes sociais">
          {socialItems.map((item) => (
            <button key={item.ariaLabel} type="button" className="home-contact__social-icon" aria-label={item.ariaLabel}>
              <ContactSocialIcon kind={item.iconKind} />
            </button>
          ))}
        </div>
      </div>

      <div className="home-contact__details-block">
        <h3>{hoursTitle}</h3>
        <ul>
          {hoursItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default ContactDetails
