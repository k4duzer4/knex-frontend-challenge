import type { HomeTestimonial } from '../types'
import TestimonialCard from './TestimonialCard'

type TestimonialsGridProps = {
  testimonials: HomeTestimonial[]
}

function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="home-testimonials__grid">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
}

export default TestimonialsGrid
