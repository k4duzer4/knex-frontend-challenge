import './styles.css'

type HomeHeaderProps = {
  onLogout: () => void
}

function HomeHeader({ onLogout }: HomeHeaderProps) {
  return (
    <header className="home-header">
      <div className="home-header__content">
        <a className="home-header__brand" href="#hero">
          Cup&Cake
        </a>

        <nav className="home-header__nav" aria-label="Navegacao principal da loja">
          <a href="#about">Quem somos?</a>
          <a href="#products">Produtos</a>
          <a href="#testimonials">Depoimentos</a>
          <a href="#contact">Contato</a>
        </nav>

        <button className="home-header__logout" type="button" onClick={onLogout} aria-label="Sair da conta">
          Sair
        </button>
      </div>
    </header>
  )
}

export default HomeHeader
