import React from 'react'
import Navbar from '@/components/navbar'

interface Props {
  className?: string
  children?: React.ReactNode
}

const BaseLayout: React.FC<Props> = ({ className, children }: Props) => {
  return (
    <div className={`flex flex-col relative h-screen w-screen ${className}`}>
      <Navbar className="h-12 w-full bg-[#f3f3f3] border-2 rounded-md" />
      <div className="flex flex-col flex-1 bg-[#e7e7e7]">{children}</div>
    </div>
  )
}

export default BaseLayout
