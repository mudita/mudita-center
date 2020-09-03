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
import { OpenNewWindow } from "Common/enums/open-new-window.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { Mode } from "Common/enums/mode.enum"
import fs from "fs-extra"

require("dotenv").config()

const trimLogs = async () => {
  const logFilePaths = [
    log.transports.file.getFile().path,
    log.transports.file.getFile().path.replace("main.log", "renderer.log"),
  ]
  for (const logFilePath of logFilePaths) {
    const data = await fs.readFile(logFilePath, "utf-8")
    const newLog = "[" + data.split("\n[").slice(-100).join("\n[")
    await fs.writeFile(logFilePath, newLog, "utf-8")
  }
}

let win: BrowserWindow | null
let helpWindow: BrowserWindow | null = null

// Disables CORS in Electron 9
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors")

// Fetch and log all errors
process.on("uncaughtException", (error) => {
  // TODO: add a Rollbar
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

app.on("ready", trimLogs)
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

ipcMain.answerRenderer(OpenNewWindow.Help, (event, arg) => {
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
  } else {
    helpWindow.show()
  }

  helpWindow.on("closed", () => {
    helpWindow = null
  })
})
