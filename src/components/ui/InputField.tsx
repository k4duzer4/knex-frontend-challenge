import './InputField.css'

type InputFieldProps = {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
}

function InputField({ id, label, type = 'text', placeholder }: InputFieldProps) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} autoComplete="off" />
    </div>
  )
}

export default InputField
