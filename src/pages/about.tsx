import React from 'react'
import BaseLayout from '@/layouts/base'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  id?: string
}

const AboutPage: React.FC<Props> = ({ id }: Props) => {
  const router = useRouter()
  const { theme }: ParsedUrlQuery = router.query

  const isDarkMode: boolean = theme === 'system' ? false : theme === 'dark'

  return (
    <BaseLayout>
      <iframe
        id={id || 'about'}
        name="about"
        className="h-full w-full"
        src={`https://edgeservices.bing.com/edgesvc/discover?clientscopes=noheader,insights,channelstable&${
          isDarkMode ? 'dark' : 'light'
        }schemeovr=1`}
      ></iframe>
    </BaseLayout>
  )
}

export default AboutPage
