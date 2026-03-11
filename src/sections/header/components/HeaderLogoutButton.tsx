type HeaderLogoutButtonProps = {
  onClick: () => void
  ariaLabel: string
}

function HeaderLogoutButton({ onClick, ariaLabel }: HeaderLogoutButtonProps) {
  return (
    <button className="home-header__logout" type="button" onClick={onClick} aria-label={ariaLabel}>
      <svg
        width="40"
        height="35"
        viewBox="0 0 34 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 29H5.33333C4.44928 29 3.60143 28.6839 2.97631 28.1213C2.35119 27.5587 2 26.7956 2 26V5C2 4.20435 2.35119 3.44129 2.97631 2.87868C3.60143 2.31607 4.44928 2 5.33333 2H12M23.6667 23L32 15.5M32 15.5L23.6667 8M32 15.5H12"
          stroke="#653321"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default HeaderLogoutButton
