import AuthBrand from '../../components/auth/AuthBrand'
import LoginFormCard from '../../components/auth/LoginFormCard'
import AuthFooter from '../../components/layout/AuthFooter'
import './LoginPage.css'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-page__content">
        <div className="login-page__brand-area">
          <AuthBrand />
        </div>
        <div className="login-page__form-area">
          <LoginFormCard />
        </div>
      </section>
      <AuthFooter brand="Cup&Cake" />
    </main>
  )
}

export default LoginPage
