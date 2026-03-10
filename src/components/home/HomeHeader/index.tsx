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
          <svg
            width="40"
            height="35"
            viewBox="0 0 34 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 29H5.33333C4.44928 29 3.60143 28.6839 2.97631 28.1213C2.35119 27.5587 2 26.7956 2 26V5C2 4.20435 2.35119 3.44129 2.97631 2.87868C3.60143 2.31607 4.44928 2 5.33333 2H12M23.6667 23L32 15.5M32 15.5L23.6667 8M32 15.5H12"
              stroke="#653321"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default HomeHeader
