import { ipcRenderer, IpcRendererEvent } from 'electron'

const createSignOut = (asIcon: boolean) => {
  let signOutBtn: HTMLDivElement | HTMLButtonElement
  if (asIcon) {
    signOutBtn = document.createElement('button')
  } else {
    signOutBtn = document.createElement('div')
  }

  if (asIcon) {
    signOutBtn.setAttribute('is', 'cib-button')
    signOutBtn.id = 'cib-header-button-sign-out'
    signOutBtn.setAttribute('appearance', 'subtle')
    signOutBtn.setAttribute('type', 'button')

    signOutBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" stroke-width="1" stroke="#ceccca" fill="none">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
      <path d="M9 12h12l-3 -3"></path>
      <path d="M18 15l3 -3"></path>
    </svg>
  `
  } else {
    signOutBtn.className = 'header'
    signOutBtn.innerHTML = `
      <a href="javascript:void(0);" ><h2>SignOut</h2></a>
    `
  }
  return signOutBtn
}

window.addEventListener('DOMContentLoaded', (): void => {
  // query and check if user has logged in, and set initial style as centered
  setTimeout((): void => {
    const chat: HTMLIFrameElement = <HTMLIFrameElement>(
      document.getElementById('chat')
    )
    const dom: Document = chat.contentWindow.document
    const serp: Element = dom.querySelector('.cib-serp-main')
    const conversationMain: HTMLElement = serp.shadowRoot.getElementById(
      'cib-conversation-main'
    )

    // add logout icon
    const windowWidth = document.body.clientWidth
    if (windowWidth <= 832) {
      const header = serp.shadowRoot.querySelector('cib-header-bar')
      const signOutBtn = createSignOut(true)
      signOutBtn.onclick = () => {
        ipcRenderer.send('logout')
      }
      header.shadowRoot.append(signOutBtn)
    } else {
      const panelHeader = conversationMain.querySelector('cib-side-panel')
      const signOutBtn = createSignOut(false)
      signOutBtn.onclick = () => {
        ipcRenderer.send('logout')
      }
      panelHeader.shadowRoot.prepend(signOutBtn)
    }

    // Centered Elements
    const scroller: HTMLElement =
      conversationMain.shadowRoot.querySelector('.scroller')
    const actionBarMain: HTMLElement = serp.shadowRoot.getElementById(
      'cib-action-bar-main'
    )
    scroller.style.cssText += 'justify-content: center;'
    actionBarMain.style.cssText += 'max-width: unset'
  }, 1200)
})

// New Topic
ipcRenderer.on('new-topic', (): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const newTopicBtn: HTMLElement = dom
        .getElementsByTagName('cib-serp')[0]
        .shadowRoot.getElementById('cib-action-bar-main')
        .shadowRoot.querySelector('.button-compose')
      if (newTopicBtn) {
        newTopicBtn.click()
      }
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

// Focus on TextArea
ipcRenderer.on('focus-on-textarea', (): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const textArea: HTMLElement = dom
        .getElementsByTagName('cib-serp')[0]
        .shadowRoot.getElementById('cib-action-bar-main')
        .shadowRoot.querySelector('.input-container.as-ghost-placement')
        .getElementsByTagName('cib-text-input')[0]
        .shadowRoot.getElementById('searchbox')
      if (textArea) {
        textArea.focus()
      }
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

// Stop Responding
ipcRenderer.on('stop-responding', (): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const stopBtn: HTMLElement = dom
        .getElementsByTagName('cib-serp')[0]
        .shadowRoot.getElementById('cib-action-bar-main')
        .shadowRoot.querySelector('.root')
        .getElementsByTagName('cib-typing-indicator')[0]
        .shadowRoot.getElementById('stop-responding-button')
      if (stopBtn) {
        stopBtn.click()
      }
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

// Quick Reply
ipcRenderer.on('quick-reply', (_: IpcRendererEvent, id: number): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const suggestionReplies: HTMLCollectionOf<Element> = dom
        .getElementsByTagName('cib-serp')[0]
        .shadowRoot.getElementById('cib-conversation-main')
        .shadowRoot.querySelector('.content')
        .getElementsByTagName('cib-suggestion-bar')[0]
        .shadowRoot.querySelector('.suggestion-items')
        .getElementsByTagName('cib-suggestion-item')
      if (suggestionReplies) {
        suggestionReplies[id - 1].shadowRoot.querySelector('button').click()
      }
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

// Switch Tone
ipcRenderer.on(
  'switch-tone',
  (_: IpcRendererEvent, direction: string): void => {
    setTimeout((): void => {
      try {
        const chat: HTMLIFrameElement = <HTMLIFrameElement>(
          document.getElementById('chat')
        )
        const dom: Document = chat.contentWindow.document
        const toneOptions: HTMLElement = dom
          .getElementsByTagName('cib-serp')[0]
          .shadowRoot.getElementById('cib-conversation-main')
          .shadowRoot.querySelector('#cib-chat-main')
          .getElementsByTagName('cib-welcome-container')[0]
          .shadowRoot.querySelector('.controls')
          .getElementsByTagName('cib-tone-selector')[0]
          .shadowRoot.getElementById('tone-options')
        if (toneOptions) {
          const toneButtons: NodeListOf<HTMLButtonElement> =
            toneOptions.querySelectorAll('button')
          const selectedBtn: HTMLButtonElement =
            toneOptions.querySelector('button[selected]')
          let index: number = Array.from(toneButtons).indexOf(selectedBtn)
          switch (direction) {
            case 'right':
              if (index === toneButtons.length - 1) {
                index = 0
              } else {
                index++
              }
              break
            case 'left':
              if (index === 0) {
                index = toneButtons.length - 1
              } else {
                index--
              }
          }
          toneButtons[index].click()
        }
      } catch (error) {
        console.log(error)
      }
    }, 1000)
  }
)

// Set Font Size
ipcRenderer.on('set-font-size', (_: IpcRendererEvent, size: number): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const serp: HTMLElement = dom.querySelector('.cib-serp-main')
      const conversationMain: HTMLElement = serp.shadowRoot.getElementById(
        'cib-conversation-main'
      )
      conversationMain.style.cssText =
        serp.style.cssText += `--cib-type-body1-font-size: ${size}px; --cib-type-body1-strong-font-size: ${size}px; --cib-type-body2-font-size: ${size}px; --cib-type-body2-line-height: ${
          size + 6
        }px`
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

// Set Initial Style
ipcRenderer.on('set-initial-style', (): void => {
  setTimeout((): void => {
    try {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const serp: HTMLElement = dom.querySelector('.cib-serp-main')
      const conversationMain: HTMLElement = serp.shadowRoot.getElementById(
        'cib-conversation-main'
      )
      // Centered elements
      const scroller: HTMLElement =
        conversationMain.shadowRoot.querySelector('.scroller')
      const actionBarMain: HTMLElement = serp.shadowRoot.getElementById(
        'cib-action-bar-main'
      )
      scroller.style.cssText += 'justify-content: center'
      actionBarMain.style.cssText += 'max-width: unset'
    } catch (error) {
      console.log(error)
    }
  }, 1000)
})

ipcRenderer.on('init-logout', () => {
  if (window.location.href.includes('/chat?')) {
    setTimeout(() => {
      const chat: HTMLIFrameElement = <HTMLIFrameElement>(
        document.getElementById('chat')
      )
      const dom: Document = chat.contentWindow.document
      const serp: HTMLElement = dom.querySelector('.cib-serp-main')
      const conversationMain: HTMLElement = serp.shadowRoot.getElementById(
        'cib-conversation-main'
      )

      // add logout icon
      const windowWidth = document.body.clientWidth
      if (windowWidth <= 832) {
        const header = serp.shadowRoot.querySelector('cib-header-bar')
        const signOutBtn = createSignOut(true)
        signOutBtn.onclick = () => {
          ipcRenderer.send('logout')
        }
        header.shadowRoot.append(signOutBtn)
      } else {
        const panelHeader = conversationMain.querySelector('cib-side-panel')
        const signOutBtn = createSignOut(false)
        signOutBtn.onclick = () => {
          ipcRenderer.send('logout')
        }
        panelHeader.shadowRoot.prepend(signOutBtn)
      }
    }, 1000)
  }
})
