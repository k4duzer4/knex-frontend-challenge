import { getNameInitial } from '../../../utils/string'
import type { HomeTestimonial } from '../types'
import IconButton from '../../../components/ui/IconButton'

type TestimonialCardProps = {
  testimonial: HomeTestimonial
  onRequestEdit: (testimonial: HomeTestimonial) => void
  onRequestDelete: (testimonial: HomeTestimonial) => void
}

function TestimonialCard({ testimonial, onRequestEdit, onRequestDelete }: TestimonialCardProps) {
  return (
    <article className="home-testimonials__card">
      <IconButton
        icon="✎"
        className="home-testimonials__edit"
        ariaLabel={`Editar ${testimonial.name}`}
        onClick={() => onRequestEdit(testimonial)}
      />
      <IconButton
        icon="-"
        className="home-testimonials__remove"
        ariaLabel={`Remover ${testimonial.name}`}
        onClick={() => onRequestDelete(testimonial)}
      />

      <div className="home-testimonials__card-head">
        <div className={`home-testimonials__avatar ${testimonial.accentClassName}`} aria-hidden>
          <span>{getNameInitial(testimonial.name)}</span>
        </div>

        <div className="home-testimonials__identity">
          <h3>{testimonial.name}</h3>
          <span>{testimonial.role}</span>
        </div>
      </div>

      <blockquote>
        <span className="home-testimonials__quote home-testimonials__quote--open" aria-hidden>
          “
        </span>
        <p>{testimonial.message}</p>
        <span className="home-testimonials__quote home-testimonials__quote--close" aria-hidden>
          ”
        </span>
      </blockquote>
    </article>
  )
}

export default TestimonialCard
