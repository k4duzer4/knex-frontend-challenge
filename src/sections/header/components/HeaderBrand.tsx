type HeaderBrandProps = {
  href: string
  label: string
}

function HeaderBrand({ href, label }: HeaderBrandProps) {
  return (
    <a className="home-header__brand" href={href}>
      {label}
    </a>
  )
}

export default HeaderBrand
