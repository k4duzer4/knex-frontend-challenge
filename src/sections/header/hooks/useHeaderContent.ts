import { useMemo } from 'react'
import { HEADER_CONTENT } from '../constants'

export function useHeaderContent() {
  const content = useMemo(() => HEADER_CONTENT, [])

  return { content }
}
