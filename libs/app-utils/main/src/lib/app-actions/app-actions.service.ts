/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app, dialog, OpenDialogOptions, BrowserWindow, shell } from "electron"
import * as path from "path"
import { formatMessage } from "app-localize/utils"

const devToolsEnabled =
  process.env.ENABLE_DEVTOOLS === "true" ||
  process.env.NODE_ENV === "development"

export class AppActionsService {
  private readonly defaultOptions: OpenDialogOptions = {
    title: formatMessage({ id: "general.app.title" }),
    filters: [],
    properties: [],
  }

  private createInfoWindow(urlHash: string, title: string) {
    const production = process.env.NODE_ENV === "production"

    const win = new BrowserWindow({
      title,
      width: 1008,
      height: 600,
      show: false,
      useContentSize: true,
      autoHideMenuBar: true,
      titleBarStyle: "default",
      trafficLightPosition: { x: 32, y: 10 },
      titleBarOverlay: {
        color: "#FFFFFF",
        symbolColor: "#000000",
        height: 32,
      },
      webPreferences: {
        preload: path.join(__dirname, "..", "preload", "index.js"),
        sandbox: false,
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    win.removeMenu()

    const fullUrl = production
      ? `file://${path.join(__dirname, "..", "renderer", "index.html")}?mode=legal#${urlHash}`
      : `http://localhost:5173?mode=legal#${urlHash}`

    win
      .loadURL(fullUrl)
      .then(() => win.show())
      .catch((err) => console.error("Failed to load URL in info window:", err))

    if (devToolsEnabled) {
      win.webContents.openDevTools()
    }

    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url)
      return { action: "deny" }
    })
  }

  close() {
    app.quit()
  }

  async openFileDialog(
    options: OpenDialogOptions
  ): Promise<string | undefined> {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
      defaultPath: options.defaultPath || this.defaultOptions.defaultPath,
    }

    const result = await dialog.showOpenDialog(
      BrowserWindow.getFocusedWindow() as BrowserWindow,
      mergedOptions
    )

    if (result.canceled || result.filePaths.length === 0) {
      return undefined
    }

    return result.canceled ? undefined : result.filePaths[0]
  }

  openLegalWindow(path: string, title: string) {
    this.createInfoWindow(path, title)
  }
}
