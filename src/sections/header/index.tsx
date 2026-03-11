import './styles.css'
import HeaderBrand from './components/HeaderBrand'
import HeaderLogoutButton from './components/HeaderLogoutButton'
import HeaderNav from './components/HeaderNav'
import { useHeaderContent } from './hooks/useHeaderContent'
import type { HomeHeaderProps } from './types'
import { buildHeaderContent } from './utils'

function HomeHeader({ onLogout }: HomeHeaderProps) {
  const { content } = useHeaderContent()
  const headerContent = buildHeaderContent(content)

  return (
    <header className="home-header">
      <div className="home-header__content">
        <HeaderBrand href={headerContent.brand.href} label={headerContent.brand.label} />
        <HeaderNav ariaLabel={headerContent.navAriaLabel} items={headerContent.navItems} />
        <HeaderLogoutButton onClick={onLogout} ariaLabel={headerContent.logoutAriaLabel} />
      </div>
    </header>
  )
}

export default HomeHeader
