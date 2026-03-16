import type { FormEventHandler } from 'react'

export type HomeContactProps = Record<string, never>

export type ContactField = {
  id: string
  name: string
  type: 'text' | 'email' | 'tel'
  label: string
  className?: string
}

export type SocialIconKind = 'whatsapp' | 'email' | 'instagram'

export type ContactSocialItem = {
  ariaLabel: string
  iconKind: SocialIconKind
}

export type ContactContent = {
  sectionTitle: string
  sectionSubtitle: string
  formTitle: string
  submitLabel: string
  detailsSocialTitle: string
  detailsHoursTitle: string
  detailsHoursItems: string[]
  fields: ContactField[]
  socialItems: ContactSocialItem[]
}

export type ContactFormProps = {
  title: string
  fields: ContactField[]
  submitLabel: string
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting?: boolean
}
