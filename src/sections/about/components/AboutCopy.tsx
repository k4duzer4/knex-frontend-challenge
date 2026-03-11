import SectionTitleWithLines from '../../../components/ui/SectionTitleWithLines'
import { buildTitle } from '../utils'
import type { AboutContent } from '../types'

type AboutCopyProps = {
  content: AboutContent
}

function AboutCopy({ content }: AboutCopyProps) {
  const title = buildTitle(content)

  return (
    <div className="home-about__copy">
      <SectionTitleWithLines as="p" className="home-about__title-top" lineWidth={113} lineHeight={9}>
        <span className="home-about__title-text">
          {title.prefix} <span>{title.highlight}</span>
        </span>
      </SectionTitleWithLines>

      <h2>{title.main}</h2>

      <div className="home-about__divider" aria-hidden />

      <p className="home-about__description">{content.description}</p>
    </div>
  )
}

export default AboutCopy
