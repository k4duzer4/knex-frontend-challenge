import homeAboutImage from '../../../assets/images/HomeAboutImagem.png'

type AboutVisualProps = {
  altText: string
}

function AboutVisual({ altText }: AboutVisualProps) {
  return (
    <div className="home-about__image-wrap">
      <img className="home-about__photo" src={homeAboutImage} alt={altText} loading="lazy" />
    </div>
  )
}

export default AboutVisual
