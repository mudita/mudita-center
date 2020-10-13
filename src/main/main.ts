import startBackend from "Backend/bootstrap"
import { check as checkPort } from "tcp-port-used"
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from "electron"
import * as path from "path"
import * as url from "url"
import {
  GOOGLE_AUTH_WINDOW_SIZE,
  HELP_WINDOW_SIZE,
  WINDOW_SIZE,
} from "./config"
import autoupdate from "./autoupdate"
import createDownloadListenerRegistrar from "App/main/functions/create-download-listener-registrar"
import registerPureOsUpdateListener from "App/main/functions/register-pure-os-update-listener"
import registerPureOsDownloadListener from "App/main/functions/register-pure-os-download-listener"
import registerOsUpdateAlreadyDownloadedCheck from "App/main/functions/register-os-update-already-downloaded-checker"
import registerNewsListener from "App/main/functions/register-news-listener"
import registerAppLogsListeners from "App/main/functions/register-app-logs-listener"
import { ipcMain } from "electron-better-ipc"
import { URL_MAIN } from "Renderer/constants/urls"
import { Mode } from "Common/enums/mode.enum"
import { HelpActions } from "Common/enums/help-actions.enum"
import {
  registerDownloadHelpHandler,
  removeDownloadHelpHandler,
} from "App/main/functions/download-help-handler"
import {
  registerSetHelpStoreHandler,
  removeSetHelpStoreHandler,
} from "App/main/functions/set-help-store-handler"
import {
  registerGetHelpStoreHandler,
  removeGetHelpStoreHandler,
} from "App/main/functions/get-help-store-handler"
import registerTranslationListener from "App/main/functions/register-translation-listener"
import updateTranslations from "App/main/functions/update-translations"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import {
  authServerPort,
  createAuthServer,
  killAuthServer,
} from "App/main/auth-server"
import logger from "App/main/utils/logger"
import AutoLaunch from "auto-launch"
import { SettingsActions } from "Common/enums/settings-actions.enum"

require("dotenv").config()

logger.info("Starting the app")

let win: BrowserWindow | null
let helpWindow: BrowserWindow | null = null
let googleAuthWindow: BrowserWindow | null = null

// Disables CORS in Electron 9
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")

// Fetch and log all errors
process.on("uncaughtException", (error) => {
  // TODO: add a Rollbar
  logger.error(error)

  // TODO: Add contact support modal
})

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(logger.error)
}

const developmentEnvironment = process.env.NODE_ENV === "development"
const productionEnvironment = process.env.NODE_ENV === "production"
const commonWindowOptions = {
  resizable: developmentEnvironment,
  fullscreen: false,
  useContentSize: true,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false,
  },
}
const getWindowOptions = (
  extendedWindowOptions?: BrowserWindowConstructorOptions
) => ({
  ...extendedWindowOptions,
  ...commonWindowOptions,
})

const createWindow = async () => {
  await updateTranslations()

  if (developmentEnvironment) {
    await installExtensions()
  }

  win = new BrowserWindow(
    getWindowOptions({ width: WINDOW_SIZE.width, height: WINDOW_SIZE.height })
  )

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  startBackend()
  registerPureOsDownloadListener(registerDownloadListener)
  registerPureOsUpdateListener()
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerAppLogsListeners()
  registerTranslationListener()

  if (productionEnvironment) {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
    autoupdate(win)
  } else {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"
    win.loadURL(`http://localhost:2003`)
  }

  win.webContents.on("new-window", (event, href) => {
    event.preventDefault()
    shell.openExternal(href)
  })

  if (developmentEnvironment) {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      win!.webContents.openDevTools()
    })
  }

  win.on("closed", () => {
    win = null
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.answerRenderer(HelpActions.OpenWindow, () => {
  if (helpWindow === null) {
    helpWindow = new BrowserWindow(
      getWindowOptions({
        width: HELP_WINDOW_SIZE.width,
        height: HELP_WINDOW_SIZE.height,
      })
    )
    helpWindow.loadURL(
      developmentEnvironment
        ? `http://localhost:2003/?mode=${Mode.Help}#${URL_MAIN.help}`
        : url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
            hash: URL_MAIN.help,
            search: `?mode=${Mode.Help}`,
          })
    )
    registerDownloadHelpHandler()
    registerSetHelpStoreHandler()
    registerGetHelpStoreHandler()
  } else {
    helpWindow.show()
  }

  helpWindow.on("closed", () => {
    removeDownloadHelpHandler()
    removeSetHelpStoreHandler()
    removeGetHelpStoreHandler()
    helpWindow = null
  })
})

const createErrorWindow = async (googleAuthWindow: BrowserWindow) => {
  return await googleAuthWindow.loadURL(
    developmentEnvironment
      ? `http://localhost:2003/?mode=${Mode.ServerError}#${URL_MAIN.error}`
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
          hash: URL_MAIN.error,
          search: `?mode=${Mode.ServerError}`,
        })
  )
}

ipcMain.answerRenderer(GoogleAuthActions.OpenWindow, async () => {
  if (process.env.MUDITA_GOOGLE_AUTH_URL) {
    const cb = (input: string | Record<string, string>) => {
      const perform = () => {
        if (typeof input === "string") {
          return JSON.parse(input)
        }

        return input
      }

      ipcMain.answerRenderer(GoogleAuthActions.SendData, perform)
      ipcMain.removeListener(GoogleAuthActions.SendData, perform)
    }

    if (googleAuthWindow === null) {
      googleAuthWindow = new BrowserWindow(
        getWindowOptions({
          width: GOOGLE_AUTH_WINDOW_SIZE.width,
          height: GOOGLE_AUTH_WINDOW_SIZE.height,
          titleBarStyle:
            process.env.NODE_ENV === "development" ? "default" : "hidden",
          webPreferences: {
            nodeIntegration: false,
            webSecurity: false,
          },
        })
      )

      if (await checkPort(authServerPort)) {
        await createErrorWindow(googleAuthWindow)
        return
      }

      createAuthServer(cb)

      googleAuthWindow.loadURL(process.env.MUDITA_GOOGLE_AUTH_URL)
    } else {
      googleAuthWindow.show()
    }

    googleAuthWindow.on("close", () => {
      googleAuthWindow = null
      killAuthServer()
    })
  } else {
    console.log("No Google Auth URL defined!")
  }
})

ipcMain.answerRenderer(GoogleAuthActions.CloseWindow, () => {
  killAuthServer()
  googleAuthWindow?.close()
})

const setupAutoLaunch = async () => {
  if (process.env.NODE_ENV === "production") {
    const autoLaunch = new AutoLaunch({
      name: "PureDesktopApp",
      path: app.getPath("exe"),
      isHidden: true,
    })
    const enabled = await autoLaunch.isEnabled()
    ipcMain.answerRenderer(SettingsActions.GetAutostartValue, () => {
      return enabled
    })
    ipcMain.answerRenderer(SettingsActions.SetAutostart, async (response) => {
      if (response && !enabled) {
        await autoLaunch.enable()
      } else {
        await autoLaunch.disable()
      }
      return !enabled
    })
  }
}

app.on("ready", setupAutoLaunch)
