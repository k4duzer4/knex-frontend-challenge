import './styles.css'

type AuthFooterProps = {
  brand: string
}

function AuthFooter({ brand }: AuthFooterProps) {
  return (
    <footer className="auth-footer" aria-label="Rodape da pagina de autenticacao">
      <p>{brand}</p>
    </footer>
  )
}

export default AuthFooter
