import InputField from '../ui/InputField'
import PrimaryButton from '../ui/PrimaryButton'
import './LoginFormCard.css'

type LoginFormCardProps = {
  onSwitchToSignUp: () => void
}

function LoginFormCard({ onSwitchToSignUp }: LoginFormCardProps) {
  return (
    <section className="login-card" aria-label="Formulario de login administrativo">
      <button className="login-card__tab" type="button" onClick={onSwitchToSignUp}>
        Sign Up
      </button>

      <div className="login-card__container">
        <h2>LOGIN ADMIN</h2>

        <form className="login-card__form" onSubmit={(event) => event.preventDefault()}>
          <InputField id="email" label="Email:" type="email" autoComplete="email" />
          <InputField
            id="password"
            label="Senha:"
            type="password"
            autoComplete="current-password"
          />
          <PrimaryButton type="submit">Logar</PrimaryButton>
        </form>
      </div>
    </section>
  )
}

export default LoginFormCard
