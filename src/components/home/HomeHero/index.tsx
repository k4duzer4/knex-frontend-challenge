import './styles.css'
import heroCupcakeImage from '../../../assets/images/HomeHeroCupcake.png'

function HomeHero() {
  return (
    <section id="hero" className="home-hero" aria-label="Apresentacao da confeitaria">
      <div className="home-hero__content">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">Fala ai</p>
          <h1>Qual vai querer?</h1>
          <p className="home-hero__description">
            Descubra o sabor que derrete na boca: cupcakes feitos com amor, perfeitos para
            adocar o seu dia.
          </p>
          <a href="#products">Conhecer agora</a>
        </div>

        <div className="home-hero__visual" aria-hidden>
          <img className="home-hero__cupcake" src={heroCupcakeImage} alt="" loading="eager" />
        </div>
      </div>
    </section>
  )
}

export default HomeHero
