import startBackend from "Backend/bootstrap"
import log from "electron-log"
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from "electron"
import * as path from "path"
import * as url from "url"
import { HELP_WINDOW_SIZE, WINDOW_SIZE } from "./config"
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

require("dotenv").config()

let win: BrowserWindow | null
let helpWindow: BrowserWindow | null = null

// Fetch and log all errors along with alert box
process.on("uncaughtException", (error) => {
  // TODO: add a remote url to send logs to the specified the server or use Rollbar
  // See also src/renderer/utils/log.ts
  // log.transports.remote.level = "warn"
  // log.transports.remote.url = "http://localhost:3000/log"
  log.error(error)

  // TODO: Add contact support modal
})

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(log.error)
}

const developmentEnvironment = process.env.NODE_ENV === "development"
const productionEnvironment = process.env.NODE_ENV === "production"
const commonWindowOptions = {
  resizable: developmentEnvironment,
  fullscreen: false,
  useContentSize: true,
  webPreferences: {
    nodeIntegration: true,
  },
}
const getWindowOptions = (
  extendedWindowOptions?: BrowserWindowConstructorOptions
) => ({
  ...extendedWindowOptions,
  ...commonWindowOptions,
})

const createWindow = async () => {
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

ipcMain.answerRenderer(HelpActions.OpenWindow, (event, arg) => {
  if (helpWindow === null) {
    helpWindow = new BrowserWindow(
      getWindowOptions({
        width: HELP_WINDOW_SIZE.width,
        height: HELP_WINDOW_SIZE.height,
        titleBarStyle: "hidden",
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
  } else {
    helpWindow.show()
  }

  helpWindow.on("closed", () => {
    removeDownloadHelpHandler()
    removeSetHelpStoreHandler()
    helpWindow = null
  })
})
