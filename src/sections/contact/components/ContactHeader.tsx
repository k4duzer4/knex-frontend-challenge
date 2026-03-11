import SectionTitleWithLines from '../../../components/ui/SectionTitleWithLines'

type ContactHeaderProps = {
  title: string
  subtitle: string
}

function ContactHeader({ title, subtitle }: ContactHeaderProps) {
  return (
    <>
      <SectionTitleWithLines as="h2" className="home-contact__title" lineWidth={95} lineHeight={8}>
        {title}
      </SectionTitleWithLines>
      <p className="home-contact__subtitle">{subtitle}</p>
    </>
  )
}

export default ContactHeader
