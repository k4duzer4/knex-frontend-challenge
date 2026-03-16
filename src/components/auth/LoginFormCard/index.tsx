import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema, type LoginSchemaType } from '../../../schemas/loginSchema'
import { useAuth } from '../../../hooks/useAuth'
import { loginUser } from '../../../services/authService'
import InputField from '../../ui/InputField'
import PrimaryButton from '../../ui/PrimaryButton'
import './styles.css'

type LoginFormCardProps = {
  onSwitchToSignUp: () => void
}

function LoginFormCard({ onSwitchToSignUp }: LoginFormCardProps) {
  const { saveToken } = useAuth()
  const navigate = useNavigate()
  const [requestError, setRequestError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async (values) => {
    setRequestError('')

    try {
      const response = await loginUser(values)
      saveToken(response.token)
      toast.success('Login realizado com sucesso.')
      navigate('/home', { replace: true })
    } catch {
      setRequestError('Falha no login. Verifique email e senha.')
    }
  })

  return (
    <section className="login-card" aria-label="Formulario de login administrativo">
      <button className="login-card__tab" type="button" onClick={onSwitchToSignUp} disabled={isSubmitting}>
        Cadastro
      </button>

      <div className="login-card__container">
        <h2>LOGIN ADMIN</h2>

        <form className="login-card__form" onSubmit={onSubmit} noValidate>
          <InputField
            id="email"
            label="Email:"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <InputField
            id="password"
            label="Senha:"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Logar'}
          </PrimaryButton>

          <p
            className="login-card__status login-card__status--error"
            role="alert"
          >
            {requestError}
          </p>
        </form>

      </div>
    </section>
  )
}

export default LoginFormCard
