import React from 'react'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'

import ChatIcon from '@/../assets/svg/chat.svg'
import ComposeIcon from '@/../assets/svg/compose.svg'

interface Props {
  className?: string
}

const Navbar: React.FC<Props> = ({ className }: Props) => {
  const router: NextRouter = useRouter()

  return (
    <div className={`flex flex-row ${className}`}>
      <a
        id="chat-btn"
        href="/chat"
        className={`flex flex-row justify-center items-center text-black px-3 rounded-md ${
          router.route === '/chat' || router.route === '/' ? 'bg-blue-200' : ''
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
      <a
        id="compose-btn"
        href="/compose"
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
      <a
        id="about-btn"
        href="/about"
        className={`flex justify-center items-center text-black px-3 active:bg-blue-200 rounded-md ${
          router.route === '/about' ? 'bg-blue-200' : ''
        }`}
      >
        <span>Insights</span>
      </a>
    </div>
  )
}

export default Navbar
