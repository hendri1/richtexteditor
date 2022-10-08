import { PropsWithChildren } from 'react'

interface BaseProps {
  className?: string
  [key: string]: unknown
}

const Toolbar = ({ className, ...props }: PropsWithChildren<BaseProps>) => {
  const { children } = props

  return (
    <div className={`mb-2 border-b-2 ${className ? className : ''}`}>
      <div className="flex p-4">{children}</div>
    </div>
  )
}

export default Toolbar
