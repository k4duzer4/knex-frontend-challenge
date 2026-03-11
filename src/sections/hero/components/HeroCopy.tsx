import type { HeroContent } from '../types'

type HeroCopyProps = {
  content: HeroContent
}

function HeroCopy({ content }: HeroCopyProps) {
  return (
    <div className="home-hero__copy">
      <p className="home-hero__eyebrow">{content.eyebrow}</p>
      <h1>{content.title}</h1>
      <p className="home-hero__description">{content.description}</p>
      <a href={content.ctaHref}>{content.ctaLabel}</a>
    </div>
  )
}

export default HeroCopy
