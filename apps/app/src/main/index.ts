/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app, BrowserWindow, shell } from "electron"
import { autoUpdater } from "electron-updater"
import * as path from "path"
import { join } from "path"
import { electronApp, optimizer } from "@electron-toolkit/utils"
import icon from "../../resources/icons/icon.png"
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import { initAppLibs } from "./init-app-libs"
import "./setup-logger"

if (process.env.NODE_ENV === "test") {
  import("wdio-electron-service/main")
}

const appWidth = process.env.APP_WIDTH
const appHeight = process.env.APP_HEIGHT

const createWindow = () => {
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
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: {
      x: 32,
      y: 10,
    },
    titleBarOverlay: {
      color: "#FFFFFF",
      symbolColor: "#000000",
      height: 32,
    },
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "..", "preload", "index.js"),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (process.env.AUTOUPDATE_ENABLED === "true") {
    void autoUpdater.checkForUpdatesAndNotify()
  }

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on("ready-to-show", () => {
    initAppLibs(mainWindow.webContents)

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
  if (process.env.NODE_ENV === "development") {
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
