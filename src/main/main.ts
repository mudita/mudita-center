import startBackend from "Backend/bootstrap"
import { app, BrowserWindow } from "electron"
import * as path from "path"
import * as url from "url"
import { WINDOW_SIZE } from "./config"
import createDownloadListenerRegistrar from "App/main/functions/create-download-listener-registrar"
import registerPureOsUpdateListener from "App/main/functions/register-pure-os-update-listener"
import registerPureOsDownloadListener from "App/main/functions/register-pure-os-download-listener"
import registerOsUpdateAlreadyDownloadedCheck from "App/main/functions/register-os-update-already-downloaded-checker"

let win: BrowserWindow | null

// Fetch all errors and display in console along with alert box
process.on("uncaughtException", error => {
  console.log(error)
  alert(error.message)
})

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== "production") {
    await installExtensions()
  }

  win = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const registerDownloadListener = createDownloadListenerRegistrar(win)

  registerPureOsDownloadListener(registerDownloadListener)
  registerPureOsUpdateListener()
  registerOsUpdateAlreadyDownloadedCheck()

  if (process.env.NODE_ENV !== "production") {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"
    win.loadURL(`http://localhost:2003`)
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
  }

  if (process.env.NODE_ENV !== "production") {
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
