import './styles.css'

function HomeAbout() {
  return (
    <section id="about" className="home-about" aria-label="Apresentacao da equipe">
      <div className="home-about__content">
        <div className="home-about__photo" aria-hidden />

        <div className="home-about__copy">
          <h2>Somos uma equipe centrada em levar o cupcake de melhor qualidade ate voce</h2>
          <p>
            A Cup&Cake e uma confeitaria especializada em criar cupcakes deliciosos e feitos com
            carinho. Usamos ingredientes frescos e receitas unicas para oferecer sabores que
            encantam a cada mordida.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout
