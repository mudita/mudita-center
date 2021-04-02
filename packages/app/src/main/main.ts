/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PureDeviceManager from "@mudita/pure"
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
import registerAutoLaunchListener from "App/main/functions/register-auto-launch-listener"
import { Scope } from "Renderer/models/external-providers/google/google.interface"
import registerContactsExportListener from "App/contacts/backend/export-contacts"
import registerEventsExportListener from "App/calendar/backend/export-events"
import { OutlookAuthActions } from "Common/enums/outlook-auth-actions.enum"
import {
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import { TokenRequester } from "Renderer/models/external-providers/outlook/token-requester"

require("dotenv").config()

logger.info("Starting the app")

let win: BrowserWindow | null
let helpWindow: BrowserWindow | null = null
let googleAuthWindow: BrowserWindow | null = null
let outlookAuthWindow: BrowserWindow | null = null

// Disables CORS in Electron 9
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")

// Fetch and log all errors
process.on("uncaughtException", async (error) => {
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

  const enabled = process.env.PURE_LOGGER_ENABLED === "true"

  PureDeviceManager.registerLogger(logger)
  PureDeviceManager.toggleLogs(enabled)

  startBackend(PureDeviceManager, ipcMain)
  registerPureOsDownloadListener(registerDownloadListener)
  registerPureOsUpdateListener()
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerAppLogsListeners()
  registerTranslationListener()
  registerAutoLaunchListener()
  registerContactsExportListener()
  registerEventsExportListener()

  if (productionEnvironment) {
    win.setMenuBarVisibility(false)
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

  win.on("page-title-updated", (event) => {
    // prevent window name change to "Webpack App"
    event.preventDefault()
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

ipcMain.answerRenderer(HelpActions.OpenWindow, (props?: { code?: string }) => {
  const code = props?.code ?? ""
  if (helpWindow === null) {
    helpWindow = new BrowserWindow(
      getWindowOptions({
        width: HELP_WINDOW_SIZE.width,
        height: HELP_WINDOW_SIZE.height,
      })
    )
    helpWindow.loadURL(
      developmentEnvironment
        ? `http://localhost:2003/?mode=${Mode.Help}#${URL_MAIN.help}?code=${code}`
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

  helpWindow.on("page-title-updated", (event) => {
    // prevent window name change to "Webpack App"
    event.preventDefault()
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

ipcMain.answerRenderer(GoogleAuthActions.OpenWindow, async (scope: Scope) => {
  if (process.env.MUDITA_GOOGLE_AUTH_URL) {
    const cb = (data: string) => {
      ipcMain.callRenderer(
        win as BrowserWindow,
        GoogleAuthActions.GotCredentials,
        data
      )
    }

    if (googleAuthWindow === null) {
      googleAuthWindow = new BrowserWindow(
        getWindowOptions({
          width: GOOGLE_AUTH_WINDOW_SIZE.width,
          height: GOOGLE_AUTH_WINDOW_SIZE.height,
          titleBarStyle:
            process.env.NODE_ENV === "development" ? "default" : "hidden",
        })
      )

      if (await checkPort(authServerPort)) {
        await createErrorWindow(googleAuthWindow)
        return
      }

      createAuthServer(cb)

      let scopeUrl: string

      switch (scope) {
        case Scope.Calendar:
          scopeUrl = "https://www.googleapis.com/auth/calendar"
          break
        case Scope.Contacts:
          scopeUrl = "https://www.googleapis.com/auth/contacts"
          break
      }

      googleAuthWindow.loadURL(
        `${process.env.MUDITA_GOOGLE_AUTH_URL}?scope=${scopeUrl}`
      )
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

ipcMain.answerRenderer(
  OutlookAuthActions.OpenWindow,
  async (data: { authorizationUrl: string; scope: string }) => {
    const { authorizationUrl, scope } = data
    if (clientId) {
      if (outlookAuthWindow === null) {
        outlookAuthWindow = new BrowserWindow(
          getWindowOptions({
            width: 600,
            height: 600,
            titleBarStyle:
              process.env.NODE_ENV === "development" ? "default" : "hidden",
          })
        )

        outlookAuthWindow.loadURL(authorizationUrl)

        const {
          session: { webRequest },
        } = outlookAuthWindow.webContents
        webRequest.onBeforeRequest(
          {
            urls: [`${redirectUrl}*`],
          }, // * character is used to "catch all" url params
          async ({ url }) => {
            const code = new URL(url).searchParams.get("code") || ""
            try {
              const tokenRequester = new TokenRequester()
              const tokens = await tokenRequester.requestTokens(code, scope)
              ipcMain.callRenderer(
                win as BrowserWindow,
                OutlookAuthActions.GotCredentials,
                tokens
              )
            } catch (error) {
              ipcMain.callRenderer(
                win as BrowserWindow,
                OutlookAuthActions.GotCredentials,
                { error }
              )
            }

            outlookAuthWindow?.close()
            outlookAuthWindow = null
          }
        )
      } else {
        outlookAuthWindow.show()
      }
    } else {
      logger.info("No Outlook Auth URL defined!")
    }
  }
)

ipcMain.answerRenderer(OutlookAuthActions.CloseWindow, () => {
  outlookAuthWindow?.close()
})
