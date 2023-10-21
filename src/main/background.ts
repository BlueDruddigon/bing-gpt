import {
  app,
  BrowserWindow,
  ContextMenuParams,
  dialog,
  Input,
  ipcMain,
  IpcMainEvent,
  MessageBoxReturnValue,
  nativeTheme,
  OnHeadersReceivedListenerDetails,
  shell
} from 'electron'
import serve from 'electron-serve'
import Store, { Schema } from 'electron-store'
import path from 'path'
import contextMenu, { Actions } from 'electron-context-menu'

const isProd: boolean = process.env.NODE_ENV === 'production'

app.commandLine.appendSwitch('disable-site-isolation-trials')

if (isProd) {
  serve({ directory: 'app' })
}

interface configSchemaType {
  theme: 'system' | 'light' | 'dark'
  fontSize: number
  alwaysOnTop: boolean
}

const configSchema: Schema<configSchemaType> = {
  theme: {
    type: 'string',
    enum: ['system', 'light', 'dark'],
    default: 'system'
  },
  fontSize: {
    type: 'number',
    enum: [14, 16, 18, 20],
    default: 14
  },
  alwaysOnTop: {
    type: 'boolean',
    default: false
  }
}

const config: Store<configSchemaType> = new Store<configSchemaType>({
  schema: configSchema
})

const createWindow = (URL?: string): void => {
  // Init style
  ipcMain.on('init-style', (): void => {
    const fontSize: number = config.get('fontSize')
    if (fontSize !== 14) {
      BrowserWindow.getAllWindows()[0].webContents.send(
        'set-font-size',
        fontSize
      )
    }
    BrowserWindow.getAllWindows()[0].webContents.send('set-initial-style')
  })

  // Error
  ipcMain.on('error', (_: IpcMainEvent, detail: string): void => {
    dialog
      .showMessageBox({
        type: 'info',
        message: 'Error',
        detail: detail
      })
      .then((): void => {})
  })

  // Get theme settings
  const theme: string = config.get('theme')
  const isDarkMode: boolean =
    theme === 'system' ? nativeTheme.shouldUseDarkColors : theme === 'dark'

  // Handle URL
  let mainURL: string
  if (typeof URL !== 'undefined') {
    mainURL = URL
  } else if (isProd) {
    mainURL = `app://./index.html?theme=${theme}`
  } else {
    const port = process.argv[2]
    mainURL = `http://localhost:${port}?theme=${theme}`
  }

  // Create Window
  const mainWindow: BrowserWindow = new BrowserWindow({
    title: 'BingGPT',
    backgroundColor: isDarkMode ? '#1c1c1c' : '#eeeeee',
    height: 870,
    width: 600,
    titleBarStyle: 'default',
    titleBarOverlay: {
      color: isDarkMode ? '#333333' : '#ffffff',
      symbolColor: isDarkMode ? '#eeeeee' : '#1c1c1c'
    },
    webPreferences: {
      preload: path.join(__dirname, '../app/preload.js'),
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  })

  // Theme Handler
  const themeHandler = (newTheme: configSchemaType['theme']): void => {
    config.set('theme', newTheme)
    dialog
      .showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Yes', 'No'],
        message: 'Theme saved',
        detail: 'Do you want to reload BingGPT now ?'
      })
      .then((result: MessageBoxReturnValue) => {
        if (result.response === 0) {
          mainURL =
            mainWindow.webContents.getURL().split('?theme=')[0] +
            `?theme=${newTheme}`
          mainWindow.close()
          createWindow(mainURL)
        }
      })
  }

  // Font Size Handler
  const fontSizeHandler = (newSize: configSchemaType['fontSize']): void => {
    config.set('fontSize', newSize)
    mainWindow.webContents.send('set-font-size', newSize)
  }

  // Always On Top Handler
  const alwaysOnTopHandler = (): void => {
    config.set('alwaysOnTop', !mainWindow.isAlwaysOnTop())
    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
  }

  contextMenu({
    window: mainWindow.webContents,
    showServices: true,
    showSelectAll: false,
    prepend: (_: Actions, parameters: ContextMenuParams) => [
      {
        label: 'Reload',
        visible: parameters.selectionText.trim().length === 0,
        click: (): void => mainWindow.reload()
      },
      {
        type: 'separator',
        visible: parameters.selectionText.trim().length === 0
      },
      {
        label: 'Always on Top',
        type: 'checkbox',
        checked: mainWindow.isAlwaysOnTop(),
        visible: parameters.selectionText.trim().length === 0,
        click: (): void => alwaysOnTopHandler()
      },
      {
        type: 'separator',
        visible: parameters.selectionText.trim().length === 0
      },
      {
        label: 'Appearance',
        visible: parameters.selectionText.trim().length === 0,
        submenu: [
          {
            label: 'Theme',
            submenu: [
              {
                label: 'System',
                type: 'radio',
                checked: config.get('theme') === 'system',
                click: (): void => themeHandler('system')
              },
              {
                label: 'Light',
                type: 'radio',
                checked: config.get('theme') === 'light',
                click: (): void => themeHandler('light')
              },
              {
                label: 'Dark',
                type: 'radio',
                checked: config.get('theme') === 'dark',
                click: (): void => themeHandler('dark')
              }
            ]
          },
          {
            label: 'Font Size',
            submenu: [
              {
                label: 'Default',
                type: 'radio',
                checked: config.get('fontSize') === 14,
                click: (): void => fontSizeHandler(14)
              },
              {
                label: 'Medium',
                type: 'radio',
                checked: config.get('fontSize') === 16,
                click: (): void => fontSizeHandler(16)
              },
              {
                label: 'Large',
                type: 'radio',
                checked: config.get('fontSize') === 18,
                click: (): void => fontSizeHandler(18)
              },
              {
                label: 'Extra Large',
                type: 'radio',
                checked: config.get('fontSize') === 20,
                click: (): void => fontSizeHandler(20)
              }
            ]
          }
        ]
      },
      {
        type: 'separator',
        visible: parameters.selectionText.trim().length === 0
      },
      {
        label: 'Reset',
        visible: parameters.selectionText.trim().length === 0,
        click: (): void => {
          mainWindow.webContents.session.clearStorageData().then((): void => {
            mainWindow.reload()
          })
        }
      },
      {
        type: 'separator',
        visible: parameters.selectionText.trim().length === 0
      },
      {
        label: 'Quit',
        visible: parameters.selectionText.trim().length === 0,
        click: (): void => mainWindow.close()
      }
    ]
  })

  // User Agent
  const userAgent: string =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203'
  mainWindow.webContents.setUserAgent(userAgent)

  // Load URL
  mainWindow.loadURL(mainURL).then((): void => {})

  // Open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url).then((): void => {})
    return { action: 'deny' }
  })

  // Redirect after logging in
  mainWindow.webContents.on(
    'will-redirect',
    (event: Event, url: string): void => {
      if (
        url.indexOf('https://edgeservices.bing.com/edgesvc/urlredirect') !== -1
      ) {
        event.preventDefault()
        // Get cookies
        mainWindow
          .loadURL('https://edgeservices.bing.com/edgesvc/shell')
          .then((): void => {
            setTimeout((): void => {
              mainWindow.loadURL(mainURL).then((): void => {})
            }, 3000)
          })
      }
    }
  )

  // Modify Content-Security-Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details: OnHeadersReceivedListenerDetails, callback) => {
      const { responseHeaders }: OnHeadersReceivedListenerDetails = details
      if (responseHeaders['content-security-policy']) {
        responseHeaders['content-security-policy'][0]
          .replace(`require-trusted-types-for 'script'`, '')
          .replace('report-to csp-endpoint', '')
        callback({ cancel: false, responseHeaders: responseHeaders })
      } else {
        return callback({ cancel: false })
      }
    }
  )

  // Create Shortcuts
  mainWindow.webContents.on(
    'before-input-event',
    (event: Event, input: Input): void => {
      const cmdKey: boolean =
        process.platform === 'darwin' ? input.meta : input.control
      if (cmdKey) {
        switch (input.code) {
          case 'KeyN':
            mainWindow.webContents.send('new-topic')
            event.preventDefault()
            break
          case 'KeyR':
            mainWindow.reload()
            event.preventDefault()
            break
          case 'KeyT':
            alwaysOnTopHandler()
            event.preventDefault()
            break
          case 'KeyI':
            mainWindow.webContents.send('focus-on-textarea')
            event.preventDefault()
            break
          case 'KeyS':
            mainWindow.webContents.send('stop-responding')
            event.preventDefault()
            break
          case 'Equal':
            if (
              configSchema.fontSize.enum.indexOf(config.get('fontSize') + 2) !==
              -1
            ) {
              fontSizeHandler(config.get('fontSize') + 2)
              event.preventDefault()
            }
            break
          case 'Minus':
            if (
              configSchema.fontSize.enum.indexOf(config.get('fontSize') - 2) !==
              1
            ) {
              fontSizeHandler(config.get('fontSize') - 2)
              event.preventDefault()
            }
            break
          case 'Comma':
            mainWindow.webContents.send('switch-tone', 'left')
            event.preventDefault()
            break
          case 'Period':
            mainWindow.webContents.send('switch-tone', 'right')
            event.preventDefault()
            break
          default:
            if (input.code.indexOf('Digit') === 0) {
              const id: string = input.code.split('Digit')[1]
              mainWindow.webContents.send('quick-reply', Number(id))
              event.preventDefault()
            }
        }
      }
    }
  )
}

app.whenReady().then(() => createWindow())

app.on('activate', () => {
  if (BrowserWindow.getAllWindows.length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', (): void => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
