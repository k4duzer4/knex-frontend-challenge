import type { HeaderContent } from './types'

export function buildHeaderContent(content: HeaderContent) {
  return {
    brand: {
      label: content.brandLabel,
      href: content.brandHref,
    },
    navItems: content.navItems,
    navAriaLabel: content.navAriaLabel,
    logoutAriaLabel: content.logoutAriaLabel,
  }
}
