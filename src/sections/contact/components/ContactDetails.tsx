import ContactSocialIcon from './ContactSocialIcon'
import type { ContactSocialItem } from '../types'

const KNEX_INSTAGRAM_URL = 'https://www.instagram.com/knexjr/'

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
            <a
              key={item.ariaLabel}
              className="home-contact__social-icon"
              aria-label={item.ariaLabel}
              href={KNEX_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ContactSocialIcon kind={item.iconKind} />
            </a>
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
