import type { ContactContent } from './types'

export const CONTACT_CONTENT: ContactContent = {
  sectionTitle: 'Contato',
  sectionSubtitle: 'Conecte-se conosco.',
  formTitle: 'Receba nossas promoções',
  submitLabel: 'Enviar',
  detailsSocialTitle: 'Redes sociais',
  detailsHoursTitle: 'Horário de funcionamento',
  detailsHoursItems: ['8h às 21h (exceto segunda)', 'Não abrimos feriados'],
  fields: [
    { id: 'promo-name', name: 'name', type: 'text', label: 'Nome' },
    { id: 'promo-email', name: 'email', type: 'email', label: 'Email' },
    {
      id: 'promo-phone',
      name: 'phone',
      type: 'tel',
      label: 'Telefone',
      className: 'home-contact__input--phone',
    },
  ],
  socialItems: [
    { ariaLabel: 'WhatsApp', iconKind: 'whatsapp' },
    { ariaLabel: 'Email', iconKind: 'email' },
    { ariaLabel: 'Instagram', iconKind: 'instagram' },
  ],
}
