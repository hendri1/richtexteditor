import { PropsWithChildren } from 'react'

import {
  TypeBold,
  TypeItalic,
  TypeUnderline,
  Code,
  Quote,
  TextLeft,
  TextCenter,
  TextRight,
  Justify,
} from 'react-bootstrap-icons'

interface BaseProps {
  [key: string]: unknown
}

const Toolbar = ({ ...props }: PropsWithChildren<BaseProps>) => {
  const { icon } = props

  switch (icon) {
    case 'bold':
      return <TypeBold />
    case 'italic':
      return <TypeItalic />
    case 'underline':
      return <TypeUnderline />
    case 'code':
      return <Code />
    case 'quote':
      return <Quote />
    case 'left':
      return <TextLeft />
    case 'right':
      return <TextRight />
    case 'center':
      return <TextCenter />
    case 'justify':
      return <Justify />
    default:
      return null
  }
}

export default Toolbar
