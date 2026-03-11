import type { ContactContent } from './types'

export function buildContactContent(content: ContactContent) {
  return {
    sectionTitle: content.sectionTitle,
    sectionSubtitle: content.sectionSubtitle,
    formTitle: content.formTitle,
    submitLabel: content.submitLabel,
    detailsSocialTitle: content.detailsSocialTitle,
    detailsHoursTitle: content.detailsHoursTitle,
    detailsHoursItems: content.detailsHoursItems,
    fields: content.fields,
    socialItems: content.socialItems,
  }
}
