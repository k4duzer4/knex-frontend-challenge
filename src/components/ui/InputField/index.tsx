import type { InputHTMLAttributes } from 'react'
import './styles.css'

type InputFieldProps = {
  id: string
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

function InputField({ id, label, error, className, ...inputProps }: InputFieldProps) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={className}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />
      <span className="input-field__error" role="alert">
        {error ?? ''}
      </span>
    </div>
  )
}

export default InputField
