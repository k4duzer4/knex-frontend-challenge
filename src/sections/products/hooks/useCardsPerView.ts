import { useEffect, useState } from 'react'
import type { CardsPerView } from '../types'
import { getCardsPerViewByWidth } from '../utils'

export function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState<CardsPerView>(() =>
    getCardsPerViewByWidth(window.innerWidth),
  )

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getCardsPerViewByWidth(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return cardsPerView
}
