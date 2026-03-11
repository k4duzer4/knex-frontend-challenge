export type HomeHeaderProps = {
  onLogout: () => void
}

export type HeaderNavItem = {
  label: string
  href: string
}

export type HeaderContent = {
  brandLabel: string
  brandHref: string
  navItems: HeaderNavItem[]
  navAriaLabel: string
  logoutAriaLabel: string
}
