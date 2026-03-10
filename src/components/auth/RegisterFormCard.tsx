import InputField from '../ui/InputField'
import PrimaryButton from '../ui/PrimaryButton'
import './LoginFormCard.css'
import './RegisterFormCard.css'

type RegisterFormCardProps = {
  onSwitchToLogin: () => void
}

function RegisterFormCard({ onSwitchToLogin }: RegisterFormCardProps) {
  return (
    <section className="login-card register-card" aria-label="Formulario de cadastro administrativo">
      <button className="login-card__tab" type="button" onClick={onSwitchToLogin}>
        Login
      </button>

      <div className="login-card__container">
        <h2>CADASTRO ADMIN</h2>

        <form className="login-card__form" onSubmit={(event) => event.preventDefault()}>
          <InputField id="register-email" label="Email:" type="email" autoComplete="email" />
          <InputField
            id="register-password"
            label="Senha:"
            type="password"
            autoComplete="new-password"
          />
          <InputField
            id="register-confirm-password"
            label="Confirmar Senha:"
            type="password"
            autoComplete="new-password"
          />
          <PrimaryButton type="submit">Cadastrar</PrimaryButton>
        </form>
      </div>
    </section>
  )
}

export default RegisterFormCard
