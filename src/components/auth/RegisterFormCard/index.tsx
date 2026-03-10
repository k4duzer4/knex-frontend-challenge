import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerSchema, type RegisterSchemaType } from '../../../schemas/registerSchema'
import { registerUser } from '../../../services/authService'
import InputField from '../../ui/InputField'
import PrimaryButton from '../../ui/PrimaryButton'
import '../LoginFormCard/styles.css'
import './styles.css'

type RegisterFormCardProps = {
  onSwitchToLogin: () => void
}

function RegisterFormCard({ onSwitchToLogin }: RegisterFormCardProps) {
  const [requestError, setRequestError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async (values) => {
    setRequestError('')

    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      toast.success('Cadastro realizado com sucesso.')
      setTimeout(() => {
        onSwitchToLogin()
      }, 1000)
    } catch {
      setRequestError('Nao foi possivel cadastrar. Tente novamente.')
    }
  })

  return (
    <section className="login-card register-card" aria-label="Formulario de cadastro administrativo">
      <button className="login-card__tab" type="button" onClick={onSwitchToLogin}>
        Login
      </button>

      <div className="login-card__container">
        <h2>CADASTRO ADMIN</h2>

        <form className="login-card__form" onSubmit={onSubmit} noValidate>
          <InputField
            id="register-name"
            label="Nome:"
            type="text"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <InputField
            id="register-email"
            label="Email:"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <InputField
            id="register-password"
            label="Senha:"
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <InputField
            id="register-confirm-password"
            label="Confirmar Senha:"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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

export default RegisterFormCard
