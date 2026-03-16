import type { HeaderContent } from './types'

export const HEADER_CONTENT: HeaderContent = {
  brandLabel: 'Cup&Cake',
  brandHref: '#hero',
  navItems: [
    { label: 'Quem somos?', href: '#about' },
    { label: 'Produtos', href: '#products' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'Contato', href: '#contact' },
  ],
  navAriaLabel: 'Navegação principal da loja',
  logoutAriaLabel: 'Sair da conta',
}
