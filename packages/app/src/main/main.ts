/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager from "@mudita/pure"
import { check as checkPort } from "tcp-port-used"
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from "electron"
import { ipcMain } from "electron-better-ipc"
import * as path from "path"
import * as url from "url"
import registerPureOsDownloadListener from "App/main/functions/register-pure-os-download-listener"
import registerNewsListener from "App/main/functions/register-news-listener"
import registerAppLogsListeners from "App/main/functions/register-app-logs-listener"
import registerContactsExportListener from "App/contacts/backend/export-contacts"
import registerEventsExportListener from "App/calendar/backend/export-events"
import registerWriteFileListener from "App/main/functions/register-write-file-listener"
import registerCopyFileListener from "App/main/functions/register-copy-file-listener"
import registerWriteGzipListener from "App/main/functions/register-write-gzip-listener"
import registerRmdirListener from "App/main/functions/register-rmdir-listener"
import registerArchiveFilesListener from "App/main/functions/register-archive-files-listener"
import registerReadFileListener from "App/file-system/listeners/read-file.listener"
import registerGetApplicationConfigurationListener from "App/main/functions/register-get-application-configuration-listener"
import registerGetFileDataListener from "App/main/functions/register-get-file-data-listener"
import registerPureOsDownloadProxy from "App/main/functions/register-pure-os-download-proxy"
import createDownloadListenerRegistrar from "App/main/functions/create-download-listener-registrar"
import registerEncryptFileListener from "App/file-system/listeners/encrypt-file.listener"
import registerDecryptFileListener from "App/file-system/listeners/decrypt-file.listener"
import registerUnlinkFileListener from "App/file-system/listeners/unlink-file.listener"
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
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import {
  authServerPort,
  createAuthServer,
  killAuthServer,
} from "App/main/auth-server"
import logger from "App/main/utils/logger"
import { Scope } from "Renderer/models/external-providers/google/google.interface"
import { OutlookAuthActions } from "Common/enums/outlook-auth-actions.enum"
import {
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import { TokenRequester } from "Renderer/models/external-providers/outlook/token-requester"
import {
  GOOGLE_AUTH_WINDOW_SIZE,
  WINDOW_SIZE,
  DEFAULT_WINDOWS_SIZE,
} from "./config"
import autoupdate, { mockAutoupdate } from "./autoupdate"
import startBackend from "Backend/bootstrap"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import { Mode } from "Common/enums/mode.enum"
import { HelpActions } from "Common/enums/help-actions.enum"
import { AboutActions } from "App/common/enums/about-actions.enum"
import PureLogger from "App/main/utils/pure-logger"
import { flags, Feature } from "App/feature-flags"
import { PureSystemActions } from "App/common/enums/pure-system-actions.enum"
import {
  createMetadataStore,
  MetadataStore,
  MetadataInitializer,
  registerMetadataAllGetValueListener,
  registerMetadataGetValueListener,
  registerMetadataSetValueListener,
} from "App/metadata"
import { registerGetIndexListener } from "App/data-sync/listeners"
import { registerIndexAllListener } from "App/data-sync/listeners/index-all.listener"
import { registerGetAllReleasesListener } from "App/update/listeners/get-all-releases.listener"
import { registerOsUpdateAlreadyDownloadedCheck } from "App/update/requests/register-os-update-already-downloaded-checker.request"
import { registerGetProductionReleaseListener } from "App/update/listeners/get-production-release.listener"
import { registerInitializeDataSyncListener } from "App/data-sync/listeners/initialize-data-sync.listener"

require("dotenv").config()

// FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
//  There is almost always a better way to accomplish your task than using this module.
//  You can read more in https://github.com/electron/remote#migrating-from-remote
require("@electron/remote/main").initialize()

logger.info("Starting the app")

let win: BrowserWindow | null
let helpWindow: BrowserWindow | null = null
let googleAuthWindow: BrowserWindow | null = null
let outlookAuthWindow: BrowserWindow | null = null
const licenseWindow: BrowserWindow | null = null
const termsWindow: BrowserWindow | null = null
const policyWindow: BrowserWindow | null = null
const metadataStore: MetadataStore = createMetadataStore()

// Disables CORS in Electron 9
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")

// Fetch and log all errors
process.on("uncaughtException", (error) => {
  logger.error(error)
  // TODO: Add contact support modal
})

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  // FIXME: electron v9 throw error, you can read more in https://github.com/zalmoxisus/redux-devtools-extension/issues/767
  // const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]
  const extensions: string[] = []

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(logger.error)
}

const productionEnvironment = process.env.NODE_ENV === "production"
const commonWindowOptions = {
  resizable: true,
  fullscreen: false,
  useContentSize: true,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false,
    // FIXME: electron v12 throw error: 'Require' is not defined. `contextIsolation` default value is changed to `true`.
    //  You can read more in https://www.electronjs.org/blog/electron-12-0#breaking-changes
    contextIsolation: false,
  },
}

const getWindowOptions = (
  extendedWindowOptions?: BrowserWindowConstructorOptions
) => ({
  ...extendedWindowOptions,
  ...commonWindowOptions,
})

const createWindow = async () => {
  if (!productionEnvironment) {
    await installExtensions()
  }

  ;(global as any).__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\")

  win = new BrowserWindow(
    getWindowOptions({
      minWidth: WINDOW_SIZE.minWidth,
      width: WINDOW_SIZE.width,
      minHeight: WINDOW_SIZE.minHeight,
      height: WINDOW_SIZE.height,
    })
  )
  // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
  //  There is almost always a better way to accomplish your task than using this module.
  //  You can read more in https://github.com/electron/remote#migrating-from-remote
  require("@electron/remote/main").enable(win.webContents)

  new MetadataInitializer(metadataStore).init()

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  const enabled = flags.get(Feature.LoggerEnabled)

  MuditaDeviceManager.registerLogger(new PureLogger())
  MuditaDeviceManager.toggleLogs(enabled)

  startBackend(MuditaDeviceManager, ipcMain)
  registerPureOsDownloadListener(registerDownloadListener)
  registerGetAllReleasesListener()
  registerGetProductionReleaseListener()
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerAppLogsListeners()
  registerContactsExportListener()
  registerEventsExportListener()
  registerWriteFileListener()
  registerCopyFileListener()
  registerRmdirListener()
  registerWriteGzipListener()
  registerGetApplicationConfigurationListener()
  registerArchiveFilesListener()
  registerGetFileDataListener()
  registerEncryptFileListener()
  registerReadFileListener()
  registerUnlinkFileListener()
  registerDecryptFileListener()
  registerPureOsDownloadProxy()
  registerMetadataAllGetValueListener()
  registerMetadataGetValueListener()
  registerMetadataSetValueListener()
  registerGetIndexListener()
  registerIndexAllListener()
  registerInitializeDataSyncListener()

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
    mockAutoupdate(win)
  }

  // FIXME: Note: the new-window event itself is already deprecated and has been replaced by setWindowOpenHandler,
  //  you can read more in https://www.electronjs.org/blog/electron-14-0#removed-additionalfeatures
  win.webContents.on("new-window", (event, href) => {
    event.preventDefault()
    shell.openExternal(href)
  })

  win.on("page-title-updated", (event) => {
    // prevent window name change to "Webpack App"
    event.preventDefault()
  })

  if (!productionEnvironment) {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      win!.webContents.openDevTools()
    })
  }

  win.on("closed", () => {
    win = null
  })

  logger.updateMetadata()
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  app.quit()
})

app.on("activate", () => {
  if (win === null) {
    void createWindow()
  }
})

ipcMain.answerRenderer(HelpActions.OpenWindow, () => {
  if (helpWindow === null) {
    helpWindow = new BrowserWindow(
      getWindowOptions({
        width: DEFAULT_WINDOWS_SIZE.width,
        height: DEFAULT_WINDOWS_SIZE.height,
      })
    )
    // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
    //  There is almost always a better way to accomplish your task than using this module.
    //  You can read more in https://github.com/electron/remote#migrating-from-remote
    require("@electron/remote/main").enable(helpWindow.webContents)
    helpWindow.loadURL(
      !productionEnvironment
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

  helpWindow.on("page-title-updated", (event) => {
    // prevent window name change to "Webpack App"
    event.preventDefault()
  })
})

const createOpenWindowListener = (
  channel: string,
  mode: string,
  urlMain: string,
  newWindow: BrowserWindow | null = null
) => {
  ipcMain.answerRenderer(channel, async () => {
    if (newWindow === null) {
      newWindow = await new BrowserWindow(
        getWindowOptions({
          width: DEFAULT_WINDOWS_SIZE.width,
          height: DEFAULT_WINDOWS_SIZE.height,
        })
      )
      // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
      //  There is almost always a better way to accomplish your task than using this module.
      //  You can read more in https://github.com/electron/remote#migrating-from-remote
      require("@electron/remote/main").enable(newWindow.webContents)
      await newWindow.loadURL(
        !productionEnvironment
          ? `http://localhost:2003/?mode=${mode}#${urlMain}`
          : url.format({
              pathname: path.join(__dirname, "index.html"),
              protocol: "file:",
              slashes: true,
              hash: urlMain,
              search: `?mode=${mode}`,
            })
      )
      // FIXME: Note: the new-window event itself is already deprecated and has been replaced by setWindowOpenHandler,
      //  you can read more in https://www.electronjs.org/blog/electron-14-0#removed-additionalfeatures
      newWindow.webContents.on("new-window", (event, href) => {
        event.preventDefault()
        shell.openExternal(href)
      })
    } else {
      newWindow.show()
    }

    newWindow.on("closed", () => {
      newWindow = null
    })

    newWindow.on("page-title-updated", (event) => {
      // prevent window name change to "Webpack App"
      event.preventDefault()
    })
  })
}

createOpenWindowListener(
  AboutActions.LicenseOpenWindow,
  Mode.License,
  URL_MAIN.license,
  licenseWindow
)

createOpenWindowListener(
  AboutActions.TermsOpenWindow,
  Mode.TermsOfService,
  URL_MAIN.termsOfService,
  termsWindow
)

createOpenWindowListener(
  AboutActions.PolicyOpenWindow,
  Mode.PrivacyPolicy,
  URL_MAIN.privacyPolicy,
  policyWindow
)

createOpenWindowListener(
  PureSystemActions.SarOpenWindow,
  Mode.Sar,
  URL_OVERVIEW.sar,
  policyWindow
)

const createErrorWindow = async (googleAuthWindow: BrowserWindow) => {
  return await googleAuthWindow.loadURL(
    !productionEnvironment
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
