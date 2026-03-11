import { useMemo } from 'react'
import { ABOUT_CONTENT } from '../constants'

export function useAboutContent() {
  const content = useMemo(() => ABOUT_CONTENT, [])

  return { content }
}
