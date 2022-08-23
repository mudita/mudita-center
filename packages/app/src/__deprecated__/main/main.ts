/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager from "@mudita/pure"
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from "electron"
import { ipcMain } from "electron-better-ipc"
import * as path from "path"
import * as url from "url"
import registerPureOsDownloadListener from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import registerNewsListener from "App/__deprecated__/main/functions/register-news-listener/register-news-listener"
import registerAppLogsListeners from "App/__deprecated__/main/functions/register-app-logs-listener"
import registerContactsExportListener from "App/contacts/backend/export-contacts"
import registerEventsExportListener from "App/__deprecated__/calendar/backend/export-events"
import registerWriteFileListener from "App/__deprecated__/main/functions/register-write-file-listener"
import registerCopyFileListener from "App/__deprecated__/main/functions/register-copy-file-listener"
import registerWriteGzipListener from "App/__deprecated__/main/functions/register-write-gzip-listener"
import registerRmdirListener from "App/__deprecated__/main/functions/register-rmdir-listener"
import registerArchiveFilesListener from "App/__deprecated__/main/functions/register-archive-files-listener"
import registerReadFileListener from "App/file-system/listeners/read-file.listener"
import registerGetFileDataListener from "App/__deprecated__/main/functions/register-get-file-data-listener"
import registerPureOsDownloadProxy from "App/__deprecated__/main/functions/register-pure-os-download-proxy"
import createDownloadListenerRegistrar from "App/__deprecated__/main/functions/create-download-listener-registrar"
import registerEncryptFileListener from "App/file-system/listeners/encrypt-file.listener"
import registerDecryptFileListener from "App/file-system/listeners/decrypt-file.listener"
import registerUnlinkFileListener from "App/file-system/listeners/unlink-file.listener"
import {
  registerDownloadHelpHandler,
  removeDownloadHelpHandler,
} from "App/__deprecated__/main/functions/download-help-handler"
import {
  registerSetHelpStoreHandler,
  removeSetHelpStoreHandler,
} from "App/__deprecated__/main/functions/set-help-store-handler"
import {
  registerGetHelpStoreHandler,
  removeGetHelpStoreHandler,
} from "App/__deprecated__/main/functions/get-help-store-handler"
import { GoogleAuthActions } from "App/__deprecated__/common/enums/google-auth-actions.enum"
import logger from "App/__deprecated__/main/utils/logger"
import { Scope } from "App/__deprecated__/renderer/models/external-providers/google/google.interface"
import { OutlookAuthActions } from "App/__deprecated__/common/enums/outlook-auth-actions.enum"
import {
  clientId,
  redirectUrl,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.constants"
import { TokenRequester } from "App/__deprecated__/renderer/models/external-providers/outlook/token-requester"
import {
  GOOGLE_AUTH_WINDOW_SIZE,
  WINDOW_SIZE,
  DEFAULT_WINDOWS_SIZE,
} from "./config"
import autoupdate, { mockAutoupdate } from "./autoupdate"
import startBackend from "App/__deprecated__/backend/bootstrap"
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import { Mode } from "App/__deprecated__/common/enums/mode.enum"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"
import PureLogger from "App/__deprecated__/main/utils/pure-logger"
import { flags, Feature } from "App/feature-flags"
import { PureSystemActions } from "App/__deprecated__/common/enums/pure-system-actions.enum"
import {
  createMetadataStore,
  MetadataStore,
  MetadataInitializer,
  registerMetadataAllGetValueListener,
  registerMetadataGetValueListener,
  registerMetadataSetValueListener,
} from "App/metadata"
import { registerGetAllReleasesListener } from "App/__deprecated__/update/listeners/get-all-releases.listener"
import { registerOsUpdateAlreadyDownloadedCheck } from "App/__deprecated__/update/requests/register-os-update-already-downloaded-checker.request"
import { registerGetLatestReleaseListener } from "App/__deprecated__/update/listeners/get-latest-release.listener"
import { createSettingsService } from "App/settings/containers/settings.container"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv").config()

// FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
//  There is almost always a better way to accomplish your task than using this module.
//  You can read more in https://github.com/electron/remote#migrating-from-remote
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
export const authServerPort = 3456
// Disables CORS in Electron 9
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")

// Fetch and log all errors
process.on("uncaughtException", (error) => {
  logger.error(error)
  // TODO: Add contact support modal
})

const installExtensions = async () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  // FIXME: electron v9 throw error, you can read more in https://github.com/zalmoxisus/redux-devtools-extension/issues/767
  // const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]
  const extensions: string[] = []

  return Promise.all(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
    devTools: !productionEnvironment,
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

  const title = "Mudita Center"

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  ;(global as any).__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\")

  win = new BrowserWindow(
    getWindowOptions({
      minWidth: WINDOW_SIZE.minWidth,
      width: WINDOW_SIZE.width,
      minHeight: WINDOW_SIZE.minHeight,
      height: WINDOW_SIZE.height,
      title,
    })
  )

  win.on("closed", () => {
    win = null
  })
  // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
  //  There is almost always a better way to accomplish your task than using this module.
  //  You can read more in https://github.com/electron/remote#migrating-from-remote
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  require("@electron/remote/main").enable(win.webContents)
  new MetadataInitializer(metadataStore).init()

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  const enabled = flags.get(Feature.LoggerEnabled)

  MuditaDeviceManager.registerLogger(new PureLogger())
  MuditaDeviceManager.toggleLogs(enabled)

  const settingsService = createSettingsService()
  settingsService.init()
  startBackend(MuditaDeviceManager, ipcMain)
  registerPureOsDownloadListener(registerDownloadListener)
  registerGetAllReleasesListener()
  registerGetLatestReleaseListener()
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerAppLogsListeners()
  registerContactsExportListener()
  registerEventsExportListener()
  registerWriteFileListener()
  registerCopyFileListener()
  registerRmdirListener()
  registerWriteGzipListener()
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

  if (productionEnvironment) {
    win.setMenuBarVisibility(false)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    win.loadURL(`http://localhost:2003`)
    mockAutoupdate(win)
  }

  // FIXME: Note: the new-window event itself is already deprecated and has been replaced by setWindowOpenHandler,
  //  you can read more in https://www.electronjs.org/blog/electron-14-0#removed-additionalfeatures
  win.webContents.on("new-window", (event, href) => {
    event.preventDefault()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    shell.openExternal(href)
  })

  if (!productionEnvironment) {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      win!.webContents.openDevTools()
    })
  }

  logger.updateMetadata()
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
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
  const title = "Mudita Center - Help"
  if (helpWindow === null) {
    helpWindow = new BrowserWindow(
      getWindowOptions({
        width: DEFAULT_WINDOWS_SIZE.width,
        height: DEFAULT_WINDOWS_SIZE.height,
        title,
      })
    )

    helpWindow.on("closed", () => {
      removeDownloadHelpHandler()
      removeSetHelpStoreHandler()
      removeGetHelpStoreHandler()
      helpWindow = null
    })

    // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
    //  There is almost always a better way to accomplish your task than using this module.
    //  You can read more in https://github.com/electron/remote#migrating-from-remote
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    require("@electron/remote/main").enable(helpWindow.webContents)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
})

const createOpenWindowListener = (
  channel: string,
  mode: string,
  urlMain: string,
  title: string,
  newWindow: BrowserWindow | null = null
) => {
  ipcMain.answerRenderer(channel, async () => {
    if (newWindow === null) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      newWindow = await new BrowserWindow(
        getWindowOptions({
          width: DEFAULT_WINDOWS_SIZE.width,
          height: DEFAULT_WINDOWS_SIZE.height,
          title,
        })
      )

      newWindow.on("closed", () => {
        newWindow = null
      })

      // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
      //  There is almost always a better way to accomplish your task than using this module.
      //  You can read more in https://github.com/electron/remote#migrating-from-remote
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        shell.openExternal(href)
      })
    } else {
      newWindow.show()
    }
  })
}

createOpenWindowListener(
  AboutActions.LicenseOpenWindow,
  Mode.License,
  URL_MAIN.license,
  "Mudita Center - License",
  licenseWindow
)

createOpenWindowListener(
  AboutActions.TermsOpenWindow,
  Mode.TermsOfService,
  URL_MAIN.termsOfService,
  "Mudita Center - Terms of service",
  termsWindow
)

createOpenWindowListener(
  AboutActions.PolicyOpenWindow,
  Mode.PrivacyPolicy,
  URL_MAIN.privacyPolicy,
  "Mudita Center - Privacy policy",
  policyWindow
)

createOpenWindowListener(
  PureSystemActions.SarOpenWindow,
  Mode.Sar,
  URL_OVERVIEW.sar,
  "Mudita Center - SAR information",
  policyWindow
)

ipcMain.answerRenderer(GoogleAuthActions.OpenWindow,(scope: Scope) => {
  const title = "Mudita Center - Google Auth"
  if (process.env.MUDITA_CENTER_SERVER_URL) {
    if (googleAuthWindow === null) {
      googleAuthWindow = new BrowserWindow(
        getWindowOptions({
          width: GOOGLE_AUTH_WINDOW_SIZE.width,
          height: GOOGLE_AUTH_WINDOW_SIZE.height,
          titleBarStyle:
            process.env.NODE_ENV === "development" ? "default" : "hidden",
          title,
        })
      )

       .on("close", () => {
        googleAuthWindow = null
      })

    const filter = {
        urls: [`http://localhost:${authServerPort}/*`]
      };
      const {
        session: { webRequest },
      } = googleAuthWindow.webContents

      webRequest.onBeforeRequest(filter, (details, callback) => {
        const data = details.uploadData[0].bytes.toString()
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ipcMain.callRenderer(
          win as BrowserWindow,
          GoogleAuthActions.GotCredentials,
          data
        )
        callback({})
      });

      let scopeUrl: string

      switch (scope) {
        case Scope.Calendar:
          scopeUrl = "https://www.googleapis.com/auth/calendar"
          break
        case Scope.Contacts:
          scopeUrl = "https://www.googleapis.com/auth/contacts"
          break
      }
      const url = `${process.env.MUDITA_CENTER_SERVER_URL}/google-auth-init`
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      googleAuthWindow.loadURL(`${url}?scope=${scopeUrl}`)
    } else {
      googleAuthWindow.show()
    }
  } else {
    console.log("No Google Auth URL defined!")
  }
})

ipcMain.answerRenderer(GoogleAuthActions.CloseWindow, () => {
  googleAuthWindow?.close()
})

ipcMain.answerRenderer(
  OutlookAuthActions.OpenWindow,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (data: { authorizationUrl: string; scope: string }) => {
    const title = "Mudita Center - Outlook Auth"
    const { authorizationUrl, scope } = data
    if (clientId) {
      if (outlookAuthWindow === null) {
        outlookAuthWindow = new BrowserWindow(
          getWindowOptions({
            width: 600,
            height: 600,
            titleBarStyle:
              process.env.NODE_ENV === "development" ? "default" : "hidden",
            title,
          })
        )

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        outlookAuthWindow.loadURL(authorizationUrl)

        const {
          session: { webRequest },
        } = outlookAuthWindow.webContents
        webRequest.onBeforeRequest(
          {
            urls: [`${redirectUrl}*`],
          }, // * character is used to "catch all" url params
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          async ({ url }) => {
            const code = new URL(url).searchParams.get("code") || ""
            try {
              const tokenRequester = new TokenRequester()
              const tokens = await tokenRequester.requestTokens(code, scope)
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              ipcMain.callRenderer(
                win as BrowserWindow,
                OutlookAuthActions.GotCredentials,
                tokens
              )
            } catch (error) {
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
