import React from 'react'
import BaseLayout from '@/layouts/base'
import { NextRouter, useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  id?: string
}

const ComposePage: React.FC<Props> = ({ id }: Props) => {
  const router: NextRouter = useRouter()
  const { theme }: ParsedUrlQuery = router.query

  const isDarkMode = theme === 'system' ? false : theme === 'dark'

  return (
    <BaseLayout>
      <iframe
        id={id || 'compose'}
        name="coauthor"
        className="h-full w-full"
        src={`https://edgeservices.bing.com/edgesvc/compose?clientscopes=chat,noheader,coauthor,channelstable&${
          isDarkMode ? 'dark' : 'light'
        }schemeovr=1`}
      ></iframe>
    </BaseLayout>
  )
}

export default ComposePage
