import React from 'react'
import BaseLayout from '@/layouts/base'

interface Props {
  id?: string
}

const ChatPage: React.FC<Props> = ({ id }: Props) => {
  return (
    <BaseLayout>
      <iframe
        id={id || 'chat'}
        name="chat"
        className="h-full w-full"
        src="https://edgeservices.bing.com/edgesvc/chat?clientscopes=chat,noheader,coauthor,channelstable"
      ></iframe>
    </BaseLayout>
  )
}

export default ChatPage
