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
  protocol,
  net,
} from "electron"
import { ipcMain } from "electron-better-ipc"
import * as path from "path"
import * as url from "url"
import registerPureOsDownloadListener from "Core/__deprecated__/main/functions/register-pure-os-download-listener"
import registerNewsListener from "Core/__deprecated__/main/functions/register-news-listener/register-news-listener"
import registerAppLogsListeners from "Core/__deprecated__/main/functions/register-app-logs-listener"
import registerContactsExportListener from "Core/contacts/backend/export-contacts"
import registerWriteFileListener from "Core/__deprecated__/main/functions/register-write-file-listener"
import registerCopyFileListener from "Core/__deprecated__/main/functions/register-copy-file-listener"
import registerWriteGzipListener from "Core/__deprecated__/main/functions/register-write-gzip-listener"
import registerRmdirListener from "Core/__deprecated__/main/functions/register-rmdir-listener"
import registerArchiveFilesListener from "Core/__deprecated__/main/functions/register-archive-files-listener"
import createDownloadListenerRegistrar from "Core/__deprecated__/main/functions/create-download-listener-registrar"
import { GoogleAuthActions } from "Core/__deprecated__/common/enums/google-auth-actions.enum"
import {
  authServerPort,
  createAuthServer,
  killAuthServer,
} from "Core/__deprecated__/main/auth-server"
import logger from "Core/__deprecated__/main/utils/logger"
import {
  clientId,
  redirectUrl,
  Scope,
  TokenRequester,
} from "generic-view/store"
import { OutlookAuthActions } from "Core/__deprecated__/common/enums/outlook-auth-actions.enum"
import {
  DEFAULT_WINDOWS_SIZE,
  GOOGLE_AUTH_WINDOW_SIZE,
  WINDOW_SIZE,
} from "Core/__deprecated__/main/config"
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { Mode } from "Core/__deprecated__/common/enums/mode.enum"
import { AboutActions } from "Core/__deprecated__/common/enums/about-actions.enum"
import { PureSystemActions } from "Core/__deprecated__/common/enums/pure-system-actions.enum"
import { BrowserActions } from "Core/__deprecated__/common/enums/browser-actions.enum"
import {
  createMetadataStore,
  MetadataInitializer,
  MetadataStore,
  registerMetadataAllGetValueListener,
  registerMetadataGetValueListener,
  registerMetadataSetValueListener,
} from "Core/metadata"
import { registerOsUpdateAlreadyDownloadedCheck } from "Core/update/requests"
import { createSettingsService } from "Core/settings/containers/settings.container"
import { ApplicationModule } from "Core/core/application.module"
import registerExternalUsageDevice from "Core/device/listeners/register-external-usage-device.listner"
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import {
  AppEvents,
  callRenderer,
  getMainAppWindow,
  MuditaCenterServerRoutes,
  openDevToolsOnceDomReady,
  preventDefaultShortcuts,
  registerShortcuts,
} from "shared/utils"
import { mockServiceEnabled, startServer, stopServer } from "e2e-mock-server"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv").config()

// FIXME: electron v12 added changes to the remote module. This module has many subtle pitfalls.
//  There is almost always a better way to accomplish your task than using this module.
//  You can read more in https://github.com/electron/remote#migrating-from-remote
require("@electron/remote/main").initialize()

if (mockServiceEnabled) {
  startServer()
}

logger.info("Starting the app!")

let win: BrowserWindow | null
let googleAuthWindow: BrowserWindow | null = null
let outlookAuthWindow: BrowserWindow | null = null
const licenseWindow: BrowserWindow | null = null
const termsWindow: BrowserWindow | null = null
const policyWindow: BrowserWindow | null = null
const metadataStore: MetadataStore = createMetadataStore()

// Disabling browser security features
// to address CORS issue between local and remote servers.
// To be handled as part of ticket https://appnroll.atlassian.net/browse/CP-2242
app.commandLine.appendSwitch(
  "disable-features",
  "BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights"
)

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
  fullscreenable: true,
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
  ...commonWindowOptions,
  ...extendedWindowOptions,
})

const installElectronDevToolExtensions = async () => {
  try {
    await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    })
    console.info(`[INFO] Successfully added devtools extensions`)
  } catch (err) {
    console.warn(
      "[WARN] An error occurred while trying to add devtools extensions:\n",
      err
    )
  }
}

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

  win.on("closed", () => {
    win = null
    app.exit()
  })

  win.on("focus", () => {
    callRenderer(AppEvents.WindowFocused)
  })

  new MetadataInitializer(metadataStore).init()

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  const settingsService = createSettingsService()
  settingsService.init()

  const appModules = new ApplicationModule(ipcMain, win)

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
  } else {
    await installElectronDevToolExtensions()
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    win.loadURL(`http://localhost:2003`)
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return {
      action: "deny",
      overrideBrowserWindowOptions: {},
    }
  })

  win.webContents.once("dom-ready", () => {
    appModules.lateInitialization()
  })

  logger.updateMetadata()
}

if (!gotTheLock) {
  app.quit()
} else {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: "safe-file",
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        bypassCSP: true,
      },
    },
  ])

  app.whenReady().then(() => {
    protocol.handle("safe-file", async (request) => {
      const fileUrl = request.url.replace("safe-file://", "file:///")
      if (
        !fileUrl
          .toLowerCase()
          .startsWith(`file://${encodeURI(getAppPath())}`.toLowerCase())
      ) {
        throw new Error(
          "Access to files outside of the userData directory is not allowed."
        )
      }
      return net.fetch(fileUrl)
    })
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.on("ready", createWindow)

  app.on("browser-window-created", (_event, window) => {
    preventDefaultShortcuts(window)
    registerShortcuts(window)
    openDevToolsOnceDomReady(window)
  })

  app.on("before-quit", () => {
    stopServer()
  })

  app.on("window-all-closed", () => {
    app.quit()
  })

  app.on("activate", () => {
    if (win === null) {
      void createWindow()
    }
  })
}

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
    `${process.env.MUDITA_CENTER_SERVER_URL ?? ""}/${
      MuditaCenterServerRoutes.PrivacyPolicyUrl
    }`
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
          movable: false,
          minimizable: false,
          maximizable: false,
          resizable: false,
          title,
          webPreferences: {
            nodeIntegration: true,
          },
        })
      )
      const mainWindowBounds = getMainAppWindow()?.getBounds()
      if (mainWindowBounds) {
        googleAuthWindow.setPosition(
          Math.round(
            mainWindowBounds.width / 2 +
              mainWindowBounds.x -
              GOOGLE_AUTH_WINDOW_SIZE.width / 2
          ),
          Math.round(
            mainWindowBounds.height / 2 +
              mainWindowBounds.y -
              GOOGLE_AUTH_WINDOW_SIZE.height / 2
          )
        )
      }
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
      const url = `${process.env.MUDITA_CENTER_SERVER_URL}/${MuditaCenterServerRoutes.GoogleAuthInit}`
      void (await googleAuthWindow.loadURL(`${url}?scope=${scopeUrl}`))
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
  //
)

ipcMain.answerRenderer(OutlookAuthActions.CloseWindow, () => {
  outlookAuthWindow?.close()
})

ipcMain.answerRenderer("get-downloads-path", async () => {
  return app.getPath("downloads")
})
