import { useMemo } from 'react'
import { MOCK_TESTIMONIALS } from '../mockTestimonials'

export function useTestimonialsCatalog() {
  const testimonials = useMemo(() => MOCK_TESTIMONIALS, [])

  return {
    testimonials,
  }
}
