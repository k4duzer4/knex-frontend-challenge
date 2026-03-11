import './styles.css'
import homeAboutImage from '../../../assets/images/HomeAboutImagem.png'

function HomeAbout() {
  return (
    <section id="about" className="home-about" aria-label="Apresentacao da equipe">
      <div className="home-about__content">
        <div className="home-about__image-wrap" aria-hidden>
          <img className="home-about__photo" src={homeAboutImage} alt="" loading="lazy" />
        </div>

        <div className="home-about__copy">
          <div className="home-about__title-top">
            <span className="home-about__title-line" aria-hidden />
            <p>
              Somos uma equipe <span>Centrada</span>
            </p>
            <span className="home-about__title-line" aria-hidden />
          </div>

          <h2>Em levar o cupcake de melhor qualidade até você</h2>

          <div className="home-about__divider" aria-hidden />

          <p className="home-about__description">
            A Cup&Cake é uma confeitaria especializada em criar cupcakes deliciosos e feitos com carinho. Usamos ingredientes frescos e receitas únicas para oferecer sabores que encantam a cada mordida. Nosso objetivo é adoçar seus momentos especiais, seja com um mimo do dia a dia ou em grandes celebrações!
          </p>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout
