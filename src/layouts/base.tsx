import React from 'react'
import Navbar from '@/components/navbar'

interface Props {
  className?: string
  children?: React.ReactNode
}

const BaseLayout: React.FC<Props> = ({ className, children }: Props) => {
  return (
    <div
      className={`flex flex-col relative h-screen w-screen${
        className ? ` ${className}` : ''
      }`}
    >
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  )
}

export default BaseLayout
