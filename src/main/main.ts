import startBackend from "Backend/bootstrap"
import { app, BrowserWindow, shell } from "electron"
import * as path from "path"
import * as url from "url"
import { WINDOW_SIZE } from "./config"
import autoupdate from "./autoupdate"
import createDownloadListenerRegistrar from "App/main/functions/create-download-listener-registrar"
import registerPureOsUpdateListener from "App/main/functions/register-pure-os-update-listener"
import registerPureOsDownloadListener from "App/main/functions/register-pure-os-download-listener"
import registerOsUpdateAlreadyDownloadedCheck from "App/main/functions/register-os-update-already-downloaded-checker"
import registerSettingsListeners from "App/main/functions/register-settings-listeners"
import registerNewsListener from "App/main/functions/register-news-listener"
import registerAppLogsListeners from "App/main/functions/register-app-logs-listener"
import registerPureBackupListeners from "App/main/functions/register-pure-backup-listeners"

require("dotenv").config()

let win: BrowserWindow | null

// Fetch all errors and display in console along with alert box
process.on("uncaughtException", (error) => {
  console.log(error)
  alert(error.message)
})

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

const developmentEnvironment = process.env.NODE_ENV === "development"
const productionEnvironment = process.env.NODE_ENV === "production"

const createWindow = async () => {
  if (developmentEnvironment) {
    await installExtensions()
  }

  win = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    resizable: developmentEnvironment,
    fullscreen: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  registerPureOsDownloadListener(registerDownloadListener)
  registerPureOsUpdateListener()
  registerOsUpdateAlreadyDownloadedCheck()
  registerNewsListener()
  registerSettingsListeners(win)
  registerAppLogsListeners()
  registerPureBackupListeners()

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
app.on("ready", startBackend)

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
