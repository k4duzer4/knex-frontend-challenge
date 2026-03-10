import './PrimaryButton.css'

type PrimaryButtonProps = {
  children: string
  type?: 'button' | 'submit'
}

function PrimaryButton({ children, type = 'button' }: PrimaryButtonProps) {
  return (
    <button className="primary-button" type={type}>
      {children}
    </button>
  )
}

export default PrimaryButton
