import type { FormEvent } from 'react'
import './styles.css'

function HomeContact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="home-contact" aria-label="Informacoes de contato">
      <div className="home-contact__content">
        <h2>Contato</h2>
        <p>Conecte-se conosco.</p>

        <div className="home-contact__grid">
          <form className="home-contact__form" onSubmit={handleSubmit}>
            <h3>Receba nossas promocoes</h3>
            <label htmlFor="promo-name">Nome</label>
            <input id="promo-name" name="name" type="text" />
            <label htmlFor="promo-email">Email</label>
            <input id="promo-email" name="email" type="email" />
            <label htmlFor="promo-phone">Telefone</label>
            <input id="promo-phone" name="phone" type="tel" />
            <button type="submit">Enviar</button>
          </form>

          <aside className="home-contact__details">
            <h3>Redes sociais</h3>
            <p>WhatsApp | Email | Instagram</p>

            <h3>Horario de funcionamento</h3>
            <ul>
              <li>8h as 21h (exceto segunda)</li>
              <li>Nao abrimos feriados</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default HomeContact
