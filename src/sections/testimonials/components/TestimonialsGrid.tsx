import type { HomeTestimonial } from '../types'
import TestimonialCard from './TestimonialCard'

type TestimonialsGridProps = {
  testimonials: HomeTestimonial[]
  onRequestEdit: (testimonial: HomeTestimonial) => void
  onRequestDelete: (testimonial: HomeTestimonial) => void
}

function TestimonialsGrid({ testimonials, onRequestEdit, onRequestDelete }: TestimonialsGridProps) {
  return (
    <div className="home-testimonials__grid">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          onRequestEdit={onRequestEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  )
}

export default TestimonialsGrid
