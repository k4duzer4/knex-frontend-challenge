import './styles.css'
import TestimonialsGrid from './components/TestimonialsGrid'
import { TESTIMONIALS_SECTION_SUBTITLE, TESTIMONIALS_SECTION_TITLE } from './constants'
import { useTestimonialsCatalog } from './hooks/useTestimonialsCatalog'
import type { HomeTestimonialsProps } from './types'
import IconButton from '../../components/ui/IconButton'
import SectionTitleWithLines from '../../components/ui/SectionTitleWithLines'

function HomeTestimonials(_: HomeTestimonialsProps) {
  const { testimonials } = useTestimonialsCatalog()

  return (
    <section id="testimonials" className="home-testimonials" aria-label="Depoimentos de clientes">
      <div className="home-testimonials__content">
        <div className="home-testimonials__header">
          <SectionTitleWithLines as="h2" className="home-testimonials__title">
            {TESTIMONIALS_SECTION_TITLE}
          </SectionTitleWithLines>
          <IconButton icon="+" ariaLabel="Adicionar depoimento" className="home-testimonials__add-button" />
        </div>

        <p className="home-testimonials__subtitle">{TESTIMONIALS_SECTION_SUBTITLE}</p>

        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  )
}

export default HomeTestimonials
