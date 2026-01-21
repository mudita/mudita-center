/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as electron from "electron"
import { app, BrowserWindow, shell } from "electron"
import * as path from "path"
import { join } from "path"
import { electronApp, optimizer } from "@electron-toolkit/utils"
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import { mockServer } from "e2e-mock/server"
import icon from "../../resources/icons/icon.png"
import { initAppLibs } from "./init-app-libs"
import "./setup-logger"
import logger from "electron-log/main"

const appWidth = process.env.APP_WIDTH
const appHeight = process.env.APP_HEIGHT
const devToolsEnabled =
  process.env.ENABLE_DEVTOOLS === "true" ||
  process.env.NODE_ENV === "development"

const centerWindow = (window: BrowserWindow) => {
  const bounds = electron.screen.getPrimaryDisplay().bounds
  const { width, height } = window.getBounds()
  const x = bounds.x + (bounds.width - width) / 2
  const y = bounds.y + (bounds.height - height) / 2

  window.setPosition(Math.round(x), Math.round(y))
}

const createWindow = () => {
  let splashStartTime: number
  let splashWindow: BrowserWindow

  if (process.env.NODE_ENV !== "test") {
    splashWindow = new BrowserWindow({
      width: 960,
      height: 550,
      frame: false,
      center: true,
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
    })
    centerWindow(splashWindow)

    if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
      void splashWindow.loadURL(
        `${process.env["ELECTRON_RENDERER_URL"]}/splash.html`
      )
    } else {
      void splashWindow.loadFile(
        path.join(__dirname, "..", "renderer", "splash.html")
      )
    }

    splashWindow.on("ready-to-show", () => {
      splashStartTime = Date.now()
    })
  }

  const mainWindow = new BrowserWindow({
    title: "Mudita Center",
    width:
      appWidth && process.env.NODE_ENV === "development"
        ? Number(appWidth)
        : 1280,
    height:
      appHeight && process.env.NODE_ENV === "development"
        ? Number(appHeight)
        : 800,
    show: false,
    useContentSize: true,
    autoHideMenuBar: process.env.NODE_ENV !== "development",
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "..", "preload", "index.js"),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  centerWindow(mainWindow)

  if (devToolsEnabled) {
    mainWindow.webContents.openDevTools()
  }

  app.whenReady().then(() => {
    mockServer.start()
    initAppLibs(mainWindow, mockServer)
  })

  mainWindow.on("ready-to-show", async () => {
    logger.log(`[${new Date().toISOString()}] [mainWindow] ready-to-show event`)

    if (process.env.NODE_ENV !== "test") {
      // Ensure splash is visible for at least 1s
      const splashTimeLeft = Math.max(0, 1000 - (Date.now() - splashStartTime))
      await new Promise((resolve) => setTimeout(resolve, splashTimeLeft))
      splashWindow.destroy()
    }

    logger.log(`[${new Date().toISOString()}] [mainWindow] showing main window`)
    if (process.env.NODE_ENV === "development") {
      mainWindow.showInactive()
    } else {
      mainWindow.show()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    void shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    void mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    void mainWindow.loadFile(
      path.join(__dirname, "..", "renderer", "index.html")
    )
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (devToolsEnabled) {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
      loadExtensionOptions: { allowFileAccess: true },
    })
      .then(([redux, react]) =>
        console.log(`Added Extensions: ${redux.name}, ${react.name}`)
      )
      .catch((err) =>
        console.error("An error occurred during extensions installation:", err)
      )
  }

  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron")

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit the app on dev process kill
app.on("before-quit", () => {
  app.quit()
  mockServer.stop()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("before-quit", () => {
  if (process.env.NODE_ENV === "development") {
    app.quit()
  }
})
