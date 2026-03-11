import type { AboutContent } from './types'

export function buildTitle(content: AboutContent) {
  return {
    prefix: content.titlePrefix,
    highlight: content.titleHighlight,
    main: content.titleMain,
  }
}
