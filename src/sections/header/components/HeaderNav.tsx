import type { HeaderNavItem } from '../types'

type HeaderNavProps = {
  ariaLabel: string
  items: HeaderNavItem[]
}

function HeaderNav({ ariaLabel, items }: HeaderNavProps) {
  return (
    <nav className="home-header__nav" aria-label={ariaLabel}>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default HeaderNav
