import React from 'react'
import BaseLayout from '@/layouts/base'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  id?: string
}

const ChatPage: React.FC<Props> = ({ id }: Props) => {
  const router: NextRouter = useRouter()
  const { theme }: ParsedUrlQuery = router.query

  const isDarkMode: boolean = theme === 'system' ? false : theme === 'dark'

  return (
    <BaseLayout>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-src https://www.bing.com/search https://edgeservices.bing.com/ https://www.bing.com/images/create https://www.bing.com/lite/auw"
        />
      </Head>
      <iframe
        id={id || 'chat'}
        name="chat"
        className="h-full w-full"
        src={`https://edgeservices.bing.com/edgesvc/chat?clientscopes=chat,noheader,coauthor,channelstable&udsframed=1&form=SHORUN&${
          isDarkMode ? 'dark' : 'light'
        }schemeovr=1`}
      ></iframe>
    </BaseLayout>
  )
}

export default ChatPage
