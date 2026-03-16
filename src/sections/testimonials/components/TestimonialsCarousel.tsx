import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { HomeTestimonial } from '../types'
import TestimonialCard from './TestimonialCard'

type CardsPerView = 1 | 2 | 3

type TestimonialsCarouselProps = {
  testimonials: HomeTestimonial[]
  onRequestEdit: (testimonial: HomeTestimonial) => void
  onRequestDelete: (testimonial: HomeTestimonial) => void
}

const CARD_WIDTH = 340

function getCardsPerViewByWidth(width: number): CardsPerView {
  if (width <= 700) return 1
  if (width <= 1100) return 2
  return 3
}

function getGapByCardsPerView(cardsPerView: CardsPerView) {
  if (cardsPerView === 1) return 16
  if (cardsPerView === 2) return 20
  return 26
}

function TestimonialsCarousel({ testimonials, onRequestEdit, onRequestDelete }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState<CardsPerView>(() => getCardsPerViewByWidth(window.innerWidth))

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getCardsPerViewByWidth(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalTestimonials = testimonials.length
  const maxIndex = Math.max(0, totalTestimonials - cardsPerView)
  const gap = getGapByCardsPerView(cardsPerView)

  const cardStep = CARD_WIDTH + gap
  const viewportWidth = cardsPerView * CARD_WIDTH + (cardsPerView - 1) * gap

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  const canGoPrevious = activeIndex > 0
  const canGoNext = activeIndex < maxIndex

  const translateX = useMemo(() => -(activeIndex * cardStep), [activeIndex, cardStep])

  function handlePrevious() {
    if (!canGoPrevious) return
    setActiveIndex((current) => Math.max(current - 1, 0))
  }

  function handleNext() {
    if (!canGoNext) return
    setActiveIndex((current) => Math.min(current + 1, maxIndex))
  }

  return (
    <div className="home-testimonials__showcase">
      <motion.button
        type="button"
        className="home-testimonials__arrow"
        aria-label="Depoimentos anteriores"
        disabled={!canGoPrevious}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePrevious}
      >
        &lt;
      </motion.button>

      <div className="home-testimonials__carousel-viewport" style={{ width: `min(${viewportWidth}px, calc(100vw - 24px))` }}>
        <motion.div
          className="home-testimonials__track"
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 130, damping: 24, mass: 0.9 }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onRequestEdit={onRequestEdit}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="home-testimonials__arrow"
        aria-label="Proximos depoimentos"
        disabled={!canGoNext}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleNext}
      >
        &gt;
      </motion.button>
    </div>
  )
}

export default TestimonialsCarousel
