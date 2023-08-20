import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextRouter, useRouter } from 'next/router'

import '@/styles/globals.css'

const isProd: boolean = process.env.NODE_ENV === 'production'

function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter()

  useEffect((): void => {
    // Save the location
    const { location } = window
    if (isProd) {
      if (location.href.search(/\d/) > 0) {
        return
      }
      if (location.href.search('.html') < 0) {
        location.replace(`${location.href}.html`)
      }
    }
  }, [router.asPath])

  return <Component {...pageProps} />
}

export default MyApp
