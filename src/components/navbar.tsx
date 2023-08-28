import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import ChatIcon from '@/../assets/svg/chat.svg'
import ComposeIcon from '@/../assets/svg/compose.svg'

interface Props {
  className?: string
}

const Navbar: React.FC<Props> = ({ className }: Props) => {
  const router: NextRouter = useRouter()
  const { theme }: ParsedUrlQuery = router.query

  return (
    <div className={`flex flex-row ${className}`}>
      <Link href={`/chat?theme=${theme}`}>
        <a
          id="chat-btn"
          className={`flex flex-row justify-center items-center text-black px-3 rounded-md ${
            router.route === '/chat' || router.route === '/'
              ? 'bg-blue-200'
              : ''
          }`}
        >
          <Image
            height={20}
            width={20}
            priority={true}
            src={ChatIcon}
            alt="Chat Icon"
          />
          <span>Chat</span>
        </a>
      </Link>
      <Link href={`/compose?theme=${theme}`}>
        <a
          id="compose-btn"
          className={`flex flex-row justify-center items-center text-black px-3 rounded-md ${
            router.route === '/compose' ? 'bg-blue-200' : ''
          }`}
        >
          <Image
            height={20}
            width={20}
            priority={true}
            src={ComposeIcon}
            alt="Compose Icon"
          ></Image>
          <span>Compose</span>
        </a>
      </Link>
      <Link href={`/about?theme=${theme}`}>
        <a
          id="about-btn"
          className={`flex justify-center items-center text-black px-3 rounded-md ${
            router.route === '/about' ? 'bg-blue-200' : ''
          }`}
        >
          <span>Insights</span>
        </a>
      </Link>
    </div>
  )
}

export default Navbar
