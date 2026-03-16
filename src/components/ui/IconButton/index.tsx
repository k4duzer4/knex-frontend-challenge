import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './styles.css'

type IconButtonProps = {
  icon: ReactNode
  ariaLabel: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'>

function IconButton({
  icon,
  ariaLabel,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`icon-button ${className}`.trim()}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
