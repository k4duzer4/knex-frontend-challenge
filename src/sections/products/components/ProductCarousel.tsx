import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CARD_WIDTH } from '../constants'
import type { CardsPerView, DisplayProduct } from '../types'
import { getGapByCardsPerView } from '../utils'
import ProductCard from './ProductCard'

type ProductCarouselProps = {
  products: DisplayProduct[]
  cardsPerView: CardsPerView
  onRequestEdit: (product: DisplayProduct) => void
  onRequestDelete: (product: DisplayProduct) => void
}

function ProductCarousel({ products, cardsPerView, onRequestEdit, onRequestDelete }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  const totalProducts = products.length
  const maxIndex = Math.max(0, totalProducts - cardsPerView)
  const gap = getGapByCardsPerView(cardsPerView)

  const cardStep = CARD_WIDTH + gap
  const viewportWidth = cardsPerView * CARD_WIDTH + (cardsPerView - 1) * gap

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  const canGoPrevious = activeIndex > 0 && !isSliding
  const canGoNext = activeIndex < maxIndex && !isSliding

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
    <div className="home-products__showcase">
      <motion.button
        type="button"
        className="home-products__arrow"
        aria-label="Produtos anteriores"
        disabled={!canGoPrevious}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handlePrevious}
      >
        &lt;
      </motion.button>

      <div className="home-products__carousel-viewport" style={{ width: `${viewportWidth}px` }}>
        <motion.div
          className="home-products__track"
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 130, damping: 24, mass: 0.9 }}
          onAnimationStart={() => setIsSliding(true)}
          onAnimationComplete={() => setIsSliding(false)}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestEdit={onRequestEdit}
              onRequestDelete={onRequestDelete}
            />
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="home-products__arrow"
        aria-label="Proximos produtos"
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

export default ProductCarousel
