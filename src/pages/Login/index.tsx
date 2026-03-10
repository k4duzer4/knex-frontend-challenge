import AuthFooter from '../../components/layout/AuthFooter'
import './LoginPage.css'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-page__content">
        <div className="login-page__brand-area" />
        <div className="login-page__form-area" />
      </section>
      <AuthFooter brand="Cup&Cake" />
    </main>
  )
}

export default LoginPage
