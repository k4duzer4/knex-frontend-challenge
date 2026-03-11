import { useMemo } from 'react'
import { HERO_CONTENT } from '../constants'

export function useHeroContent() {
  const content = useMemo(() => HERO_CONTENT, [])

  return { content }
}
