import InputField from '../ui/InputField'
import PrimaryButton from '../ui/PrimaryButton'
import './LoginFormCard.css'

function LoginFormCard() {
  return (
    <section className="login-card" aria-label="Formulario de login administrativo">
      <button className="login-card__tab" type="button">
        Sign Up
      </button>

      <div className="login-card__container">
        <h2>LOGIN ADMIN</h2>

        <form className="login-card__form" onSubmit={(event) => event.preventDefault()}>
          <InputField id="email" label="Email:" type="email" />
          <InputField id="password" label="Senha:" type="password" />
          <PrimaryButton type="submit">Logar</PrimaryButton>
        </form>
      </div>
    </section>
  )
}

export default LoginFormCard
