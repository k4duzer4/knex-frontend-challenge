import './styles.css'
import HeroCopy from './components/HeroCopy'
import HeroVisual from './components/HeroVisual'
import { useHeroContent } from './hooks/useHeroContent'

function HomeHero() {
  const { content } = useHeroContent()

  return (
    <section id="hero" className="home-hero" aria-label="Apresentacao da confeitaria">
      <div className="home-hero__content">
        <HeroCopy content={content} />
        <HeroVisual />
      </div>
    </section>
  )
}

export default HomeHero
