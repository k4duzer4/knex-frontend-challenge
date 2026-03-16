import './styles.css'
import AboutCopy from './components/AboutCopy'
import AboutVisual from './components/AboutVisual'
import { useAboutContent } from './hooks/useAboutContent'

function HomeAbout() {
  const { content } = useAboutContent()

  return (
    <section id="about" className="home-about" aria-label="Apresentacao da equipe">
      <div className="home-about__content">
        <AboutVisual altText={content.imageAlt} />
        <AboutCopy content={content} />
      </div>
    </section>
  )
}

export default HomeAbout
