import heroCupcakeImage from '../../../assets/images/HomeHeroCupcake.png'

function HeroVisual() {
  return (
    <div className="home-hero__visual" aria-hidden>
      <img className="home-hero__cupcake" src={heroCupcakeImage} alt="" loading="eager" />
    </div>
  )
}

export default HeroVisual
