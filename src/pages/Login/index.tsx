import { useState } from 'react'
import AuthBrand from '../../components/auth/AuthBrand'
import LoginFormCard from '../../components/auth/LoginFormCard'
import RegisterFormCard from '../../components/auth/RegisterFormCard'
import AuthFooter from '../../components/layout/AuthFooter'
import './LoginPage.css'

function LoginPage() {
  const [activeCard, setActiveCard] = useState<'login' | 'register'>('login')

  return (
    <main className="login-page">
      <section className="login-page__content">
        <div className="login-page__brand-area">
          <AuthBrand />
        </div>
        <div className="login-page__form-area">
          <div key={activeCard} className={`auth-card-switcher auth-card-switcher--${activeCard}`}>
            {activeCard === 'login' ? (
              <LoginFormCard onSwitchToSignUp={() => setActiveCard('register')} />
            ) : (
              <RegisterFormCard onSwitchToLogin={() => setActiveCard('login')} />
            )}
          </div>
        </div>
      </section>
      <AuthFooter brand="Cup&Cake" />
    </main>
  )
}

export default LoginPage
