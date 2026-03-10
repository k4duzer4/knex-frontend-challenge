import './InputField.css'

type InputFieldProps = {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autoComplete?: string
  required?: boolean
}

function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  required = true,
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  )
}

export default InputField
