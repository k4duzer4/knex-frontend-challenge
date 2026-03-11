import type { CSSProperties, ElementType, ReactNode } from 'react'
import './styles.css'

type SectionTitleWithLinesProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  lineWidth?: number
  lineHeight?: number
}

function SectionTitleWithLines({
  as: Tag = 'h2',
  children,
  className,
  lineWidth = 113,
  lineHeight = 9,
}: SectionTitleWithLinesProps) {
  const style = {
    '--section-title-line-width': `${lineWidth}px`,
    '--section-title-line-height': `${lineHeight}px`,
  } as CSSProperties

  return (
    <div className={`section-title-with-lines ${className ?? ''}`.trim()} style={style}>
      <span className="section-title-with-lines__line" aria-hidden />
      <Tag className="section-title-with-lines__text">{children}</Tag>
      <span className="section-title-with-lines__line" aria-hidden />
    </div>
  )
}

export default SectionTitleWithLines
