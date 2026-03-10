import './styles.css'

type PrimaryButtonProps = {
  children: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

function PrimaryButton({ children, type = 'button', disabled = false }: PrimaryButtonProps) {
  return (
    <button className="primary-button" type={type} disabled={disabled}>
      {children}
    </button>
  )
}

export default PrimaryButton
