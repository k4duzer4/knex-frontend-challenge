import { useMemo } from 'react'
import { CONTACT_CONTENT } from '../constants'

export function useContactContent() {
  const content = useMemo(() => CONTACT_CONTENT, [])

  return { content }
}
