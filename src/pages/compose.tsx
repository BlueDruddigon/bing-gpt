import React from 'react'
import BaseLayout from '@/layouts/base'

interface Props {
  id?: string
}

const ComposePage: React.FC<Props> = ({ id }: Props) => {
  return (
    <BaseLayout>
      <iframe
        id={id || 'compose'}
        name="coauthor"
        className="h-full w-full"
        src="https://edgeservices.bing.com/edgesvc/compose?clientscopes=chat,noheader,coauthor,channelstable"
      ></iframe>
    </BaseLayout>
  )
}

export default ComposePage
