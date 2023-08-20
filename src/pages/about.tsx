import React from 'react'
import BaseLayout from '@/layouts/base'

interface Props {
  id?: string
}

const AboutPage: React.FC<Props> = ({ id }: Props) => {
  return (
    <BaseLayout>
      <iframe
        id={id || 'about'}
        name="about"
        className="h-full w-full"
        src="https://edgeservices.bing.com/edgesvc/discover?clientscopes=noheader,insights,channelstable"
      ></iframe>
    </BaseLayout>
  )
}

export default AboutPage
