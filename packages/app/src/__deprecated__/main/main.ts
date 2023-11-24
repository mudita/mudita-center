/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "reflect-metadata"
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
import registerPureOsDownloadListener from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import registerNewsListener from "App/__deprecated__/main/functions/register-news-listener/register-news-listener"
import registerAppLogsListeners from "App/__deprecated__/main/functions/register-app-logs-listener"
import registerContactsExportListener from "App/contacts/backend/export-contacts"
import registerWriteFileListener from "App/__deprecated__/main/functions/register-write-file-listener"
import registerCopyFileListener from "App/__deprecated__/main/functions/register-copy-file-listener"
import registerWriteGzipListener from "App/__deprecated__/main/functions/register-write-gzip-listener"
import registerRmdirListener from "App/__deprecated__/main/functions/register-rmdir-listener"
import registerArchiveFilesListener from "App/__deprecated__/main/functions/register-archive-files-listener"
import createDownloadListenerRegistrar from "App/__deprecated__/main/functions/create-download-listener-registrar"
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
import {
  authServerPort,
  createAuthServer,
  killAuthServer,
} from "App/__deprecated__/main/auth-server"
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
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import { Mode } from "App/__deprecated__/common/enums/mode.enum"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"
import { PureSystemActions } from "App/__deprecated__/common/enums/pure-system-actions.enum"
import { BrowserActions } from "App/__deprecated__/common/enums/browser-actions.enum"
import {
  createMetadataStore,
  MetadataStore,
  MetadataInitializer,
  registerMetadataAllGetValueListener,
  registerMetadataGetValueListener,
  registerMetadataSetValueListener,
} from "App/metadata"
import { registerOsUpdateAlreadyDownloadedCheck } from "App/update/requests"
import { createSettingsService } from "App/settings/containers/settings.container"
import { ApplicationModule } from "App/core/application.module"
import registerExternalUsageDevice from "App/device/listeners/register-external-usage-device.listner"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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

const gotTheLock = app.requestSingleInstanceLock()

// Fetch and log all errors
process.on("uncaughtException", (error) => {
  logger.error(error)
  // TODO: Add contact support modal
})

const productionEnvironment = process.env.NODE_ENV === "production"
const commonWindowOptions: BrowserWindowConstructorOptions = {
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
  // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
  //  There is almost always a better way to accomplish your task than using this module.
  //  You can read more in https://github.com/electron/remote#migrating-from-remote
  require("@electron/remote/main").enable(win.webContents)
  win.removeMenu()

  win.webContents.on("before-input-event", (event, input) => {
    if ((input.control || input.meta) && input.key.toLowerCase() === "r") {
      event.preventDefault()
    }
  })

  win.on("closed", () => {
    win = null
    app.exit()
  })

  new MetadataInitializer(metadataStore).init()

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  const settingsService = createSettingsService()
  settingsService.init()

  const appModules = new ApplicationModule(ipcMain)

  registerPureOsDownloadListener(registerDownloadListener)
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerAppLogsListeners()
  registerContactsExportListener()
  registerWriteFileListener()
  registerCopyFileListener()
  registerRmdirListener()
  registerWriteGzipListener()
  registerArchiveFilesListener()
  registerMetadataAllGetValueListener()
  registerMetadataGetValueListener()
  registerMetadataSetValueListener()
  registerExternalUsageDevice()

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

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return {
      action: "allow",
      overrideBrowserWindowOptions: {},
    }
  })

  if (productionEnvironment) {
    win.webContents.once("dom-ready", () => {
      appModules.lateInitialization()
    })
  } else {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      win!.webContents.openDevTools()
      appModules.lateInitialization()
    })
  }

  logger.updateMetadata()
}

if (!gotTheLock) {
  app.quit()
} else {
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
}

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
    // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
    //  There is almost always a better way to accomplish your task than using this module.
    //  You can read more in https://github.com/electron/remote#migrating-from-remote
    require("@electron/remote/main").enable(helpWindow.webContents)
    helpWindow.removeMenu()

    helpWindow.on("closed", () => {
      removeDownloadHelpHandler()
      removeSetHelpStoreHandler()
      removeGetHelpStoreHandler()
      helpWindow = null
    })

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
      newWindow = new BrowserWindow(
        getWindowOptions({
          width: DEFAULT_WINDOWS_SIZE.width,
          height: DEFAULT_WINDOWS_SIZE.height,
          title,
        })
      )
      // FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
      //  There is almost always a better way to accomplish your task than using this module.
      //  You can read more in https://github.com/electron/remote#migrating-from-remote
      require("@electron/remote/main").enable(newWindow.webContents)
      newWindow.removeMenu()

      newWindow.on("closed", () => {
        newWindow = null
      })

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

      newWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return {
          action: "allow",
          overrideBrowserWindowOptions: {},
        }
      })
    } else {
      newWindow.show()
    }
  })
}

ipcMain.answerRenderer(BrowserActions.PolicyOpenBrowser, () =>
  shell.openExternal(
    `${process.env.MUDITA_CENTER_SERVER_URL ?? ""}/privacy-policy-url`
  )
)
ipcMain.answerRenderer(BrowserActions.UpdateOpenBrowser, () =>
  shell.openExternal("https://mudita.com")
)

ipcMain.answerRenderer(BrowserActions.AppleOpenBrowser, () =>
  shell.openExternal(
    "https://support.apple.com/en-al/guide/contacts/adrbdcfd32e6/mac#:~:text=In%20the%20Contacts%20app%20on,vcf)%20only."
  )
)

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
  const title = "Mudita Center - Google Auth"
  if (process.env.MUDITA_CENTER_SERVER_URL) {
    const cb = (data: string) => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
          title,
        })
      )
      googleAuthWindow.removeMenu()

      googleAuthWindow.on("close", () => {
        void ipcMain.callRenderer(
          win as BrowserWindow,
          GoogleAuthActions.CloseWindow
        )
        googleAuthWindow = null
        killAuthServer()
      })

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
  killAuthServer()
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
        outlookAuthWindow.removeMenu()

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        outlookAuthWindow.loadURL(authorizationUrl)

        outlookAuthWindow.on("close", () => {
          void ipcMain.callRenderer(
            win as BrowserWindow,
            OutlookAuthActions.CloseWindow
          )
          outlookAuthWindow = null
        })

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
