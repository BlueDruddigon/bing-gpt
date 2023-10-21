import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import ChatIcon from '@/../assets/svg/chat.svg'
import ComposeIcon from '@/../assets/svg/compose.svg'

const Navbar: React.FC = () => {
  const router: NextRouter = useRouter()
  const { theme }: ParsedUrlQuery = router.query

  return (
    <div
      className={`flex flex-row h-12 w-full ${
        theme === 'dark' ? 'bg-[#3b3b3b] text-white' : 'bg-[#f3f3f3] text-black'
      } rounded-md justify-center`}
    >
      <Link href={`/chat?theme=${theme}`}>
        <a
          id="chat-btn"
          className={`relative flex flex-row justify-center items-center px-3 gap-1 rounded-md`}
        >
          <Image
            style={{
              filter:
                theme === 'dark'
                  ? 'invert(100%) sepia(3%) saturate(720%) hue-rotate(339deg) brightness(118%) contrast(103%)'
                  : 'invert(0%) sepia(0%) saturate(17%) hue-rotate(174deg) brightness(101%) contrast(100%)'
            }}
            height={20}
            width={20}
            priority={true}
            src={ChatIcon}
            alt="Chat Icon"
          />
          <span
            className={`${
              router.route === '/chat' || router.route === '/'
                ? 'after:absolute after:content-[""] after:border-b-2 after:border-[#8ab4f7] after:border-solid after:w-[20px] after:bottom-[8px] after:left-[43px]'
                : ''
            }`}
          >
            Chat
          </span>
        </a>
      </Link>
      <Link href={`/compose?theme=${theme}`}>
        <a
          id="compose-btn"
          className={`relative flex flex-row justify-center items-center px-3 gap-1 rounded-md`}
        >
          <Image
            style={{
              filter:
                theme === 'dark'
                  ? 'invert(100%) sepia(3%) saturate(720%) hue-rotate(339deg) brightness(118%) contrast(103%)'
                  : 'invert(0%) sepia(0%) saturate(17%) hue-rotate(174deg) brightness(101%) contrast(100%)'
            }}
            height={20}
            width={20}
            priority={true}
            src={ComposeIcon}
            alt="Compose Icon"
          ></Image>
          <span
            className={`${
              router.route === '/compose'
                ? 'after:absolute after:content-[""] after:border-b-2 after:border-[#8ab4f7] after:border-solid after:w-[20px] after:bottom-[8px] after:left-[58px]'
                : ''
            }`}
          >
            Compose
          </span>
        </a>
      </Link>
      <Link href={`/about?theme=${theme}`}>
        <a
          id="about-btn"
          className={`relative flex justify-center items-center px-3 rounded-md`}
        >
          <span
            className={`${
              router.route === '/about'
                ? 'after:absolute after:content-[""] after:border-b-2 after:border-[#8ab4f7] after:border-solid after:w-[20px] after:bottom-[8px] after:left-[30px]'
                : ''
            }`}
          >
            Insights
          </span>
        </a>
      </Link>
    </div>
  )
}

export default Navbar
